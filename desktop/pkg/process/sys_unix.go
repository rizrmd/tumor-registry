//go:build !windows

package process

import (
	"fmt"
	"os"
	"os/exec"
	"syscall"
)

func SetProcessGroup(cmd *exec.Cmd) {
	if cmd.SysProcAttr == nil {
		cmd.SysProcAttr = &syscall.SysProcAttr{}
	}
	cmd.SysProcAttr.Setpgid = true
}

func KillProcessGroup(cmd *exec.Cmd, sig Signal) error {
	if cmd == nil || cmd.Process == nil {
		return nil
	}
	pgid, err := syscall.Getpgid(cmd.Process.Pid)
	if err != nil {
		return err
	}

	var sysSig syscall.Signal
	switch sig {
	case SigTerm:
		sysSig = syscall.SIGTERM
	case SigKill:
		sysSig = syscall.SIGKILL
	case SigQuit:
		sysSig = syscall.SIGQUIT
	default:
		sysSig = syscall.SIGKILL
	}

	// Kill the whole process group
	return syscall.Kill(-pgid, sysSig)
}

func CleanupPort(port int) {
	fmt.Printf("⚠️  Checking port %d...\n", port)
	// Use sh -c for unix pipes
	exec.Command("sh", "-c", fmt.Sprintf("lsof -i :%d -t | xargs kill -9", port)).Run()
}
