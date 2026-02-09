//go:build windows

package process

import (
	"fmt"
	"os/exec"
	"syscall"
)

func SetProcessGroup(cmd *exec.Cmd) {
	cmd.SysProcAttr = &syscall.SysProcAttr{
		HideWindow: true,
	}
}

func KillProcessGroup(cmd *exec.Cmd, sig Signal) error {
	if cmd == nil || cmd.Process == nil {
		return nil
	}
	// Windows doesn't support pgid in the same way via syscall.Kill
	// We use the standard Process.Kill() for simple cleanup
	return cmd.Process.Kill()
}

func CleanupPort(port int) {
	fmt.Printf("⚠️  Checking port %d...\n", port)
	// Windows equivalent using netstat and taskkill
	// Note: using %a instead of %%a when calling direct from cmd /c
	cmdStr := fmt.Sprintf("for /f \"tokens=5\" %%a in ('netstat -aon ^| findstr :%d') do taskkill /f /pid %%a", port)
	exec.Command("cmd", "/c", cmdStr).Run()
}
