package ZhiLingChuLi

import (
	"fmt"
	"github.com/shirou/gopsutil/cpu"
	"github.com/shirou/gopsutil/disk"
	"github.com/shirou/gopsutil/load"
	"github.com/shirou/gopsutil/mem"
	"runtime"
	"time"
)

const (
	B  = 1
	KB = 1024 * B
	MB = 1024 * KB
	GB = 1024 * MB
)

// 查看指令库
func (zhiLingXiTong *ZhiLingXiTong) Getcpu(v ...interface{}) error {
	DiskCheck()
	OSCheck()
	CPUCheck()
	RAMCheck()
	return nil
}

// 服务器硬盘使用量
func DiskCheck() {
	u, _ := disk.Usage("/")
	usedMB := int(u.Used) / MB
	usedGB := int(u.Used) / GB
	totalMB := int(u.Total) / MB
	totalGB := int(u.Total) / GB
	usedPercent := int(u.UsedPercent)
	fmt.Printf("剩余空间: %dMB (%dGB) / %dMB (%dGB) | 使用: %d%%\n", usedMB, usedGB, totalMB, totalGB, usedPercent)
}

// OS
func OSCheck() {
	fmt.Printf("goOs:%s,compiler:%s,numCpu:%d,version:%s,numGoroutine:%d\n", runtime.GOOS, runtime.Compiler, runtime.NumCPU(), runtime.Version(), runtime.NumGoroutine())
}

// CPU 使用量
func CPUCheck() {
	cores, _ := cpu.Counts(false)

	cpus, err := cpu.Percent(time.Duration(200)*time.Millisecond, true)
	if err == nil {
		for i, c := range cpus {
			fmt.Printf("cpu%d : %f%%\n", i, c)
		}
	}
	a, _ := load.Avg()
	l1 := a.Load1
	l5 := a.Load5
	l15 := a.Load15
	fmt.Println(l1, l5, l15, "核心", cores)
}

// 内存使用量
func RAMCheck() {
	u, _ := mem.VirtualMemory()
	usedMB := int(u.Used) / MB
	totalMB := int(u.Total) / MB
	usedPercent := int(u.UsedPercent)
	fmt.Printf("使用MB:%d,总MB:%d,使用百分比 :%d\n", usedMB, totalMB, usedPercent)
}
