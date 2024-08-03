package ZhiLingChuLi

import (
	"errors"
	"fmt"
	"github.com/1755616537/utils"
	"strconv"
	"tdx/web/Gin"
	"tdx/web/Gin/Public"
)

// 添加Gin服务
func (zhiLingXiTong *ZhiLingXiTong) AddGin(v ...interface{}) error {
	value := KongZhiTaiQuZhiFangFa("添加Gin-程序", []string{"端口"})
	duanKouInt, err := strconv.Atoi(value[0])
	if err != nil {
		return err
	}
	err = _runGin("", duanKouInt)
	if err != nil {
		return err
	}
	return errors.New("处理成功")
}

// 创建Gin服务 内部方法
func _runGin(ip string, duanKou int) error {
	var (
		_gin Public.Gin
		_err error
	)
	if fmt.Sprint(_err) == "成功" {
		fmt.Println(_err)
		fmt.Println(_gin.QianZhuiMing)
	}
	//启动Gin
	//go Gin.RunGin(ip, duanKou, &_gin, &_err)
	Gin.RunGin(ip, duanKou, &_gin, &_err)
	//检测Gin是否启动成功 死循环检测
	//errBool := Public.JianCeGinShiFouQiDongChengGong(&_err)
	if !true {
		return errors.New("创建失败")
	}

	return errors.New("创建成功")
}

// 删除Gin服务
func (zhiLingXiTong *ZhiLingXiTong) DelGin(v ...interface{}) error {
	value := KongZhiTaiQuZhiFangFa("关闭Gin-程序", []string{"端口"})
	duanKouInt, err := strconv.Atoi(value[0])
	if err != nil {
		return err
	}
	err = _delGin(duanKouInt)
	if err != nil {
		return err
	}
	return errors.New("处理成功")
}

// 移除Gin服务 内部方法
func _delGin(duanKou int) error {
	gin, err := Public.GetGin()
	if err != nil {
		return err
	}
	for _, i2 := range gin {
		if i2.DuanKou == duanKou {
			err = i2.DelGin()
			if err != nil {
				return err
			}
			return errors.New("移除成功")
		}
	}
	return errors.New("服务池中找不到对应已经启动的服务")
}

// 获取Gin服务
func (zhiLingXiTong *ZhiLingXiTong) GetGin(v ...interface{}) error {
	value := KongZhiTaiQuZhiFangFa("获取Gin-程序", []string{"输入Y确认继续"})
	if value[0] != "Y" && value[0] != "y" {
		return errors.New("输入错误,返回上级")
	}
	err := _getGin()
	if err != nil {
		return err
	}
	return errors.New("处理成功")
}

// 获取Gin服务 内部方法
func _getGin() error {
	gin, err := Public.GetGin()
	if err != nil {
		return err
	}
	riJiAlL, _ := utils.GetRiJi()
	riJi := riJiAlL[0]
	for _, i2 := range gin {
		riJi.RiJiShuChuTiShiPrintln(utils.GetConfig("Gin.QianZhuiMing").(string), "序号:", i2.WeiShu, "IP:", i2.Ip, "端口:", i2.DuanKou)
	}
	return nil
}
