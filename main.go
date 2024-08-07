package main

import (
	"github.com/1755616537/utils"
	"github.com/1755616537/utils/logger"
	"tdx/Quantification"
	"tdx/ZhiLingXiTong"
	"tdx/web"
)

func init() {
	//启动日记
	_, err := utils.RunRiJi(false)
	if err != nil {
		logger.Error("启动日记失败", err)
		return
	}

	err = logger.IniLog()
	if err != nil {
		logger.Error("初始化日志配置失败", err)
	}
}

func main() {
	//defer func() {
	//	//恢复程序的控制权
	//	err := recover()
	//	if err != nil {
	//		logger.Error("main启动错误", err)
	//	}
	//}()

	defer func() {
		err := logger.Exit()
		if err != nil {
			logger.Error("退出日志配置失败", err)
		}
	}()

	//注册结束事件 量化连接
	defer Quantification.Exit()

	//读配置文件信息=>设置全局配置
	getConfigs := utils.GetConfigs{}
	err := getConfigs.Ini()
	if err != nil {
		logger.Error("读取配置文件失败", err)
		return
	}
	//
	//注册结束事件
	defer web.Exit()
	//
	////web服务器
	web.Run()

	//量化程序
	Quantification.Run()

	//初始化指令系统
	ZhiLingXiTong.RunScan()

	return
}
