package web

import (
	"github.com/1755616537/utils"
	"tdx/web/Gin"
	"tdx/web/Gin/Public"
	"tdx/web/Sentinel"
)

func Run() {
	//获取日记
	getRjJiall, _ := utils.GetRiJi()
	rjJi := getRjJiall[0]

	//初始化Sentinel
	err := Sentinel.RunSentinel()
	if err != nil {
		rjJi.RiJiShuChuJingGaoFatal(err.Error())
		return
	}
	rjJi.RiJiShuChuZhengChangPrintln(utils.GetConfig("Sentinel.QianZhuiMing").(string), "初始化成功！！！")

	var (
		_gin Public.Gin
		_err error
	)
	//启动Gin
	Gin.RunGin("", 8080, &_gin, &_err)
}

func Exit() {
	riJiAlL, err := utils.GetRiJi()
	riJi := riJiAlL[0]

	//输出前缀名
	QianZhuiMing := "[结束事件]"

	riJi.RiJiShuChuTiShiPrintln(QianZhuiMing, "启动中...")

riJiAlL:
	if err == nil {
		for _, i2 := range riJiAlL {
			err = i2.DelRiJi()
			if err != nil {
				riJi.RiJiShuChuTiShiPrintln(QianZhuiMing, err.Error())
			}
			riJiAlL, err = utils.GetRiJi()
			goto riJiAlL
		}
	}

	riJi.RiJiShuChuTiShiPrintln(utils.GetConfig("Gin.QianZhuiMing").(string), "正在关闭Gin服务...")
___gin:
	___gin, err := Public.GetGin()
	if err == nil {
		for _, i2 := range ___gin {
			err = i2.DelGin()
			if err != nil {
				riJi.RiJiShuChuTiShiPrintln(utils.GetConfig("Gin.QianZhuiMing").(string), "关闭Gin服务错误", err.Error())
			}
			___gin, err = Public.GetGin()
			goto ___gin
		}
	}
	riJi.RiJiShuChuTiShiPrintln(utils.GetConfig("Gin.QianZhuiMing").(string), "关闭Gin服务完毕!")
}
