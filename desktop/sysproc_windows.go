//go:build windows

package main

import (
	"os/exec"
	"syscall"
)

func applyPlatformSysProcAttr(cmd *exec.Cmd) {
	cmd.SysProcAttr = &syscall.SysProcAttr{HideWindow: true}
}
