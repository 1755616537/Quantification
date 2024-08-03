package ZhiLingChuLi

import (
	"errors"
)

//登录
func (zhiLingXiTong *ZhiLingXiTong) Login(v ...interface{}) error {
	value := KongZhiTaiQuZhiFangFa("登录-程序", []string{"账号", "密码"})
	err := loginYanZheng(value[0], value[1])

	return err
}

func loginYanZheng(ZhangHao string, MiMa string) error {
	if ZhangHao == "" {
		return errors.New("账号为空")
	}
	if MiMa == "" {
		return errors.New("密码为空")
	}
	if ZhangHao == "1" && MiMa == "2" {
		return nil
	}
	return errors.New("验证失败")
}
