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

	slog.Info("【监控列表】", data.类型, data.代码)
}
