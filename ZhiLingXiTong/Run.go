package ZhiLingXiTong

import (
	"bufio"
	"errors"
	"github.com/1755616537/utils"
	"os"
	"strings"
	"tdx/ZhiLingXiTong/ZhiLingChuLi"
)

//指令系统

// 初始化指令系统
func RunScan() {
	riJiAlL, _ := utils.GetRiJi()
	riJi := riJiAlL[0]

	riJi.RiJiShuChuTiShiPrintln(utils.GetConfig("ZhiLingXiTong.QianZhuiMing").(string), "指令系统初始化中...")
	input := bufio.NewScanner(os.Stdin) //初始化一个扫表对象
	riJi.RiJiShuChuTiShiPrintln(utils.GetConfig("ZhiLingXiTong.QianZhuiMing").(string), "指令系统初始化完毕!请输入指令.")
	riJi.RiJiShuChuTiShiPrintln(utils.GetConfig("ZhiLingXiTong.QianZhuiMing").(string), "提示:输入help查看指令库.")

	for input.Scan() { //扫描输入内容
		//把输入内容转换为字符串
		line := input.Text()
		//返回Title化的字符串
		line = strings.Title(line)
		riJi.RiJiShuChuZhengChangPrintln(utils.GetConfig("ZhiLingXiTong.QianZhuiMing").(string), "**********************************")
		riJi.RiJiShuChuZhengChangPrintln(utils.GetConfig("ZhiLingXiTong.QianZhuiMing").(string), line+"指令处理开始")
		riJi.RiJiShuChuZhengChangPrintln(utils.GetConfig("ZhiLingXiTong.QianZhuiMing").(string), "")
		riJi.RiJiShuChuZhengChangPrintln(utils.GetConfig("ZhiLingXiTong.QianZhuiMing").(string), "")
		riJi.RiJiShuChuZhengChangPrintln(utils.GetConfig("ZhiLingXiTong.QianZhuiMing").(string), "----------------------------------")
		var (
			err error
		)
		//返回使用空格分割的字符串 s，结果为切片
		if len(strings.Fields(line)) > 1 {
			err = errors.New("输入非法格式")
		} else {
			switch line {
			case "Exit":
				riJi.RiJiShuChuZhengChangPrintln(utils.GetConfig("ZhiLingXiTong.QianZhuiMing").(string), "启动结束处理程序")
				riJi.RiJiShuChuZhengChangPrintln(utils.GetConfig("ZhiLingXiTong.QianZhuiMing").(string), "----------------------------------")
				riJi.RiJiShuChuZhengChangPrintln(utils.GetConfig("ZhiLingXiTong.QianZhuiMing").(string), "")
				riJi.RiJiShuChuZhengChangPrintln(utils.GetConfig("ZhiLingXiTong.QianZhuiMing").(string), line+"指令处理结束")
				riJi.RiJiShuChuZhengChangPrintln(utils.GetConfig("ZhiLingXiTong.QianZhuiMing").(string), "**********************************")
				goto JieShu
			default:
				err = ZhiLingChuLi.HanShuYunXing(line)
				if err == nil {
					err = errors.New("成功")
				}
				//riJi.RiJiShuChuZhengChangPrintln(Public.QianZhuiMing, "未定义指令")
			}
		}
		riJi.RiJiShuChuZhengChangPrintln(utils.GetConfig("ZhiLingXiTong.QianZhuiMing").(string), "----------------------------------")
		riJi.RiJiShuChuZhengChangPrintln(utils.GetConfig("ZhiLingXiTong.QianZhuiMing").(string), "处理结果：", err.Error())
		riJi.RiJiShuChuZhengChangPrintln(utils.GetConfig("ZhiLingXiTong.QianZhuiMing").(string), "")
		riJi.RiJiShuChuZhengChangPrintln(utils.GetConfig("ZhiLingXiTong.QianZhuiMing").(string), line+"指令处理结束")
		riJi.RiJiShuChuZhengChangPrintln(utils.GetConfig("ZhiLingXiTong.QianZhuiMing").(string), "**********************************")
	}
JieShu:
}
