'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/layout/Layout';
import auditLogsService, { ActivityLog } from '@/services/audit-logs.service';
import { Shield, Clock, User, Building, Search, FileText } from 'lucide-react';

export default function AuditLogsPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination
  const [page, setPage] = useState(1);
  const limit = 20;

  // Filters
  const [selectedCenterId, setSelectedCenterId] = useState<string | undefined>(undefined);
  const [selectedActorId, setSelectedActorId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    if (isAuthenticated) {
      fetchLogs();
    }
  }, [isAuthenticated, isLoading, page, selectedCenterId, selectedActorId]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const response = await auditLogsService.getLogs({
        page,
        limit,
        centerId: selectedCenterId,
        actorId: selectedActorId
      });
      setLogs(response.data);
      setTotal(response.total);
    } catch (err: any) {
      console.error('Failed to fetch logs:', err);
      // Backend might return 403 if user doesn't have permission
      if (err.response?.status === 403) {
        setError('Anda tidak memiliki izin untuk melihat log aktivitas.');
      } else {
        setError('Gagal memuat log aktivitas.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(total / limit);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Shield className="mr-2 h-6 w-6 text-gray-700" />
          Audit Logs
        </h1>
        <p className="text-gray-600 mt-1">
          Riwayat aktivitas dan perubahan data dalam sistem.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-200">
          {error}
        </div>
      )}

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        {loading && logs.length === 0 ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-2 text-gray-500">Memuat log...</p>
          </div>
        ) : logs.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <FileText className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Tidak ada aktivitas</h3>
            <p>Belum ada log aktivitas yang tercatat.</p>
          </div>
        ) : (
          <div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Waktu
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aktor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aktivitas
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Detail
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pusat
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          {new Date(log.createdAt).toLocaleString('id-ID')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {log.actor ? (
                          <div>
                            <div className="text-sm font-medium text-gray-900">{log.actor.name}</div>
                            <div className="text-xs text-gray-500">{log.actor.email}</div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400 italic">System / Unknown</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {log.action}
                        </span>
                        {/* <div className="text-xs text-gray-500 mt-1">{log.requestMethod} {log.requestPath}</div> */}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {log.changesAfter?.description || log.description || '-'}
                        </div>
                        {log.entity && (
                          <div className="text-xs text-gray-500 mt-0.5">
                            Entity: {log.entity} ({log.entityId})
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.center ? log.center.name : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Menampilkan {(page - 1) * limit + 1} sampai {Math.min(page * limit, total)} dari {total} entri
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 text-sm"
                >
                  Sebelumnya
                </button>
                <span className="px-3 py-1 text-sm font-medium">
                  Halaman {page} / {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                  disabled={page >= totalPages}
                  className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 text-sm"
                >
                  Selanjutnya
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
