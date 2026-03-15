#!/usr/bin/env bash

set -euo pipefail

COOLIFY_SSH_HOST="${COOLIFY_SSH_HOST:-riz@cf.avolut.com}"
COOLIFY_APP_UUID="${COOLIFY_APP_UUID:-uk80oo8804g4w0co444cgso4}"
COOLIFY_DB_CONTAINER="${COOLIFY_DB_CONTAINER:-coolify-db}"
COOLIFY_DB_USER="${COOLIFY_DB_USER:-coolify}"
COOLIFY_DB_NAME="${COOLIFY_DB_NAME:-coolify}"
PRODUCTION_URL="${PRODUCTION_URL:-https://inamsos.medxamion.com}"
HEALTH_URL="${HEALTH_URL:-${PRODUCTION_URL%/}/api/v1/health}"
WATCH_INTERVAL="${WATCH_INTERVAL:-3}"

usage() {
  cat <<EOF
Usage: $(basename "$0") <command>

Commands:
  app       Show Coolify application metadata
  env       List configured environment variable keys and whether values exist
  deploy    Queue a new Coolify deployment
  status    Show the latest deployment queue entries
  release   Queue, follow, and verify one deployment
  watch     Poll deployment status until interrupted
  verify    Run production health checks
  help      Show this help

Environment overrides:
  COOLIFY_SSH_HOST
  COOLIFY_APP_UUID
  COOLIFY_DB_CONTAINER
  COOLIFY_DB_USER
  COOLIFY_DB_NAME
  PRODUCTION_URL
  HEALTH_URL
  WATCH_INTERVAL
EOF
}

remote_exec() {
  local remote_script="$1"
  ssh "$COOLIFY_SSH_HOST" \
    COOLIFY_APP_UUID="$COOLIFY_APP_UUID" \
    COOLIFY_DB_CONTAINER="$COOLIFY_DB_CONTAINER" \
    COOLIFY_DB_USER="$COOLIFY_DB_USER" \
    COOLIFY_DB_NAME="$COOLIFY_DB_NAME" \
    'bash -s' <<EOF
set -euo pipefail
$remote_script
EOF
}

show_app() {
  remote_exec '
docker exec -i "$COOLIFY_DB_CONTAINER" psql -U "$COOLIFY_DB_USER" -d "$COOLIFY_DB_NAME" -At \
  -c "SELECT id || ''|'' || uuid || ''|'' || name || ''|'' || COALESCE(fqdn, '''')
      FROM applications
      WHERE uuid = ''${COOLIFY_APP_UUID}''
      LIMIT 1;"
'
}

show_env() {
  remote_exec '
docker exec -i "$COOLIFY_DB_CONTAINER" psql -U "$COOLIFY_DB_USER" -d "$COOLIFY_DB_NAME" \
  -c "SELECT e.key,
             CASE
               WHEN e.value IS NULL OR e.value = '''' THEN ''<empty>''
               ELSE ''<set>''
             END AS status
      FROM environment_variables e
      JOIN applications a ON a.id = e.resourceable_id
      WHERE a.uuid = ''${COOLIFY_APP_UUID}''
        AND e.is_preview = false
      ORDER BY e.key;"
'
}

queue_deploy() {
  remote_exec '
docker exec -i "$COOLIFY_DB_CONTAINER" psql -U "$COOLIFY_DB_USER" -d "$COOLIFY_DB_NAME" -At \
  -c "INSERT INTO application_deployment_queues
      (application_id, deployment_uuid, commit, status, is_webhook, created_at, updated_at, application_name, server_id)
      SELECT a.id,
             gen_random_uuid(),
             COALESCE(a.git_commit_sha, ''manual''),
             ''queued'',
             false,
             NOW(),
             NOW(),
             a.name,
             a.server_id
      FROM applications a
      WHERE a.uuid = ''${COOLIFY_APP_UUID}''
      RETURNING deployment_uuid;"
'
}

queue_deploy_verbose() {
  remote_exec '
docker exec -i "$COOLIFY_DB_CONTAINER" psql -U "$COOLIFY_DB_USER" -d "$COOLIFY_DB_NAME" \
  -c "INSERT INTO application_deployment_queues
      (application_id, deployment_uuid, commit, status, is_webhook, created_at, updated_at, application_name, server_id)
      SELECT a.id,
             gen_random_uuid(),
             COALESCE(a.git_commit_sha, ''manual''),
             ''queued'',
             false,
             NOW(),
             NOW(),
             a.name,
             a.server_id
      FROM applications a
      WHERE a.uuid = ''${COOLIFY_APP_UUID}'';"
'
}

show_status() {
  remote_exec '
docker exec -i "$COOLIFY_DB_CONTAINER" psql -U "$COOLIFY_DB_USER" -d "$COOLIFY_DB_NAME" \
  -c "SELECT q.status, q.commit, q.created_at, q.updated_at
      FROM application_deployment_queues q
      JOIN applications a ON a.id = q.application_id
      WHERE a.uuid = ''${COOLIFY_APP_UUID}''
      ORDER BY q.created_at DESC
      LIMIT 5;"
'
}

show_deployment_status() {
  local deployment_uuid="$1"
  remote_exec "
docker exec -i \"\$COOLIFY_DB_CONTAINER\" psql -U \"\$COOLIFY_DB_USER\" -d \"\$COOLIFY_DB_NAME\" -At \\
  -c \"SELECT q.status || '|' || COALESCE(q.commit, '') || '|' || q.created_at || '|' || q.updated_at
      FROM application_deployment_queues q
      JOIN applications a ON a.id = q.application_id
      WHERE a.uuid = '\${COOLIFY_APP_UUID}'
        AND q.deployment_uuid = '${deployment_uuid}'
      ORDER BY q.created_at DESC
      LIMIT 1;\"
"
}

watch_status() {
  while true; do
    date '+%Y-%m-%d %H:%M:%S'
    show_status
    sleep "$WATCH_INTERVAL"
  done
}

watch_deployment() {
  local deployment_uuid="$1"
  local status_line current_status

  while true; do
    status_line="$(show_deployment_status "$deployment_uuid" | tail -n 1)"
    date '+%Y-%m-%d %H:%M:%S'
    echo "${status_line:-<no status returned>}"

    current_status="${status_line%%|*}"

    case "$current_status" in
      queued|pending|in_progress|running|processing|"")
        sleep "$WATCH_INTERVAL"
        ;;
      finished|success|completed)
        return 0
        ;;
      failed|error|cancelled|canceled)
        return 1
        ;;
      *)
        sleep "$WATCH_INTERVAL"
        ;;
    esac
  done
}

verify_production() {
  curl -fsS "$HEALTH_URL"
  echo
  curl -fsSI "$PRODUCTION_URL"
}

run_release() {
  local deployment_uuid

  deployment_uuid="$(queue_deploy | tail -n 1 | tr -d '[:space:]')"

  if [[ -z "$deployment_uuid" ]]; then
    echo "Failed to capture deployment UUID" >&2
    exit 1
  fi

  echo "Queued deployment: $deployment_uuid"

  if watch_deployment "$deployment_uuid"; then
    verify_production
  else
    echo "Deployment failed: $deployment_uuid" >&2
    exit 1
  fi
}

main() {
  local command="${1:-help}"

  case "$command" in
    app)
      show_app
      ;;
    env)
      show_env
      ;;
    deploy)
      queue_deploy_verbose
      ;;
    status)
      show_status
      ;;
    release)
      run_release
      ;;
    watch)
      watch_status
      ;;
    verify)
      verify_production
      ;;
    help|-h|--help)
      usage
      ;;
    *)
      echo "Unknown command: $command" >&2
      usage >&2
      exit 1
      ;;
  esac
}

main "$@"
