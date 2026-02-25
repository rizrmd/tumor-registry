//go:build !windows

package main

import "os/exec"

func applyPlatformSysProcAttr(cmd *exec.Cmd) {
	_ = cmd
}
