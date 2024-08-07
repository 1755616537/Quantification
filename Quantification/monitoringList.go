package Quantification

import (
	"log/slog"
)

var 监控列表 []监控列表_data

type 监控列表_data struct {
	类型 string
	代码 string
}

func 监控列表add(data 监控列表_data) {
	监控列表 = append(监控列表, data)

	code := data.代码
	quData := QuDataGet(code)
	if quData == nil {
		return
	}
	if data.类型 == "开盘竞价量监控-卖" {
		quData.TradingAdvice.Msg = "竞卖"
	} else if data.类型 == "开盘竞价量监控-买" {
		quData.TradingAdvice.Msg = "竞买"
	}

	slog.Info("【监控列表】", data.类型, data.代码)
}
