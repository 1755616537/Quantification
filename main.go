package main

import (
	"github.com/1755616537/utils"
	"log"
	"tdx/Quantification"
	"tdx/ZhiLingXiTong"
	"tdx/web"
)

func init() {
	//defer func() {
	//	//恢复程序的控制权
	//	err := recover()
	//	if err != nil {
	//		fmt.Println("init启动错误", err)
	//	}
	//}()
}

func main() {
	//defer func() {
	//	//恢复程序的控制权
	//	err := recover()
	//	if err != nil {
	//		fmt.Println("main启动错误", err)
	//	}
	//}()

	//注册结束事件 量化连接
	defer Quantification.Exit()

	//启动日记
	RjJi, err := utils.RunRiJi(false)
	if err != nil {
		log.Println(err.Error())
		return
	}

	//读配置文件信息=>设置全局配置
	getConfigs := utils.GetConfigs{}
	err = getConfigs.Run()
	if err != nil {
		RjJi.RiJiShuChuJingGaoFatal(err.Error())
		return
	}
	//
	//注册结束事件
	defer web.Exit()
	//
	////web服务器
	//web.Run()

	//量化程序
	Quantification.Run()

	//初始化指令系统
	ZhiLingXiTong.RunScan()

	return
}
