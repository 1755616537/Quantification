package ZhiLingChuLi

import (
	"github.com/1755616537/utils"
)

// 查看指令库
func (zhiLingXiTong *ZhiLingXiTong) Help(v ...interface{}) error {
	riJiAlL, _ := utils.GetRiJi()
	riJi := riJiAlL[0]

	riJi.RiJiShuChuZhengChangPrintln(utils.GetConfig("ZhiLingXiTong.QianZhuiMing").(string), "Help-查看指令库")
	riJi.RiJiShuChuZhengChangPrintln(utils.GetConfig("ZhiLingXiTong.QianZhuiMing").(string), "Exit-结束程序,或返回")

	riJi.RiJiShuChuZhengChangPrintln(utils.GetConfig("ZhiLingXiTong.QianZhuiMing").(string), "Login-登录")

	riJi.RiJiShuChuZhengChangPrintln(utils.GetConfig("ZhiLingXiTong.QianZhuiMing").(string), "GetGin-获取Gin服务")
	riJi.RiJiShuChuZhengChangPrintln(utils.GetConfig("ZhiLingXiTong.QianZhuiMing").(string), "AddGin-启动新的Gin服务")
	riJi.RiJiShuChuZhengChangPrintln(utils.GetConfig("ZhiLingXiTong.QianZhuiMing").(string), "DelGin-移除Gin服务")

	riJi.RiJiShuChuZhengChangPrintln(utils.GetConfig("ZhiLingXiTong.QianZhuiMing").(string), "Getcpu-获取系统信息")

	riJi.RiJiShuChuZhengChangPrintln(utils.GetConfig("ZhiLingXiTong.QianZhuiMing").(string), "Gitpull-拉取Git")
	return nil
}
