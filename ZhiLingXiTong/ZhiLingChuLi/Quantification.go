package ZhiLingChuLi

import (
	"fmt"
	"github.com/gogf/gf/encoding/gjson"
	"tdx/Quantification"
)

// 查看量化数据
func (zhiLingXiTong *ZhiLingXiTong) QuGet(v ...interface{}) error {
	value := KongZhiTaiQuZhiFangFa("查看量化数据-程序", []string{"代码"})
	code := value[0]
	if code == "" {
		return nil
	}
	quData := Quantification.QuDataGet(code)
	fmt.Println(gjson.New(quData).MustToJsonString())

	return nil
}

func (zhiLingXiTong *ZhiLingXiTong) Q(v ...interface{}) error {
	value := []string{"000049"}
	code := value[0]
	quData := Quantification.QuDataGet(code).SecurityBarsReply.KLINE_TYPE_DAILY.Get()
	fmt.Println(gjson.New(quData).MustToJsonString())

	return nil
}

func (zhiLingXiTong *ZhiLingXiTong) Q2(v ...interface{}) error {
	value := []string{"000049"}
	code := value[0]
	quData := Quantification.QuDataGet(code).MinuteTimeReply
	fmt.Println(gjson.New(quData).MustToJsonString())

	return nil
}

func (zhiLingXiTong *ZhiLingXiTong) Q3(v ...interface{}) error {
	value := []string{"000049"}
	code := value[0]
	quData := Quantification.QuDataGet(code).TransactionReply
	fmt.Println(gjson.New(quData).MustToJsonString())

	return nil
}

func (zhiLingXiTong *ZhiLingXiTong) Q4(v ...interface{}) error {
	value := []string{"000049"}
	code := value[0]
	quData := Quantification.QuDataGet(code).Snapshot
	fmt.Println(gjson.New(quData).MustToJsonString())

	return nil
}
