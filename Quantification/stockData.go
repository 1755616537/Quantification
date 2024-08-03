package Quantification

import (
	"gitee.com/quant1x/gotdx/quotes"
	"time"
)

var 股票数据 = make(map[string]*股票数据_data)

type 股票数据_data struct {
	//快照数据
	Snapshot *Snapshot
	//基本面
	FinanceInfo *FinanceInfo
	//K线
	SecurityBarsReply *SecurityBarsReply_data
	//分时图数据
	MinuteTimeReply *MinuteTimeReply
	//分时成交
	TransactionReply *TransactionReply
	//除权除息信息
	XdxrInfo *XdxrInfo
}
type Snapshot struct {
	//更新时间
	upTime time.Time

	//快照数据
	data quotes.Snapshot
}
type FinanceInfo struct {
	//更新时间
	upTime time.Time

	//基本面
	data *quotes.FinanceInfo
}
type MinuteTimeReply struct {
	//更新时间
	upTime time.Time

	//分时图数据
	data *quotes.MinuteTimeReply
}
type TransactionReply struct {
	//更新时间
	upTime time.Time

	//分时成交
	data *quotes.TransactionReply
}
type XdxrInfo struct {
	//更新时间
	upTime time.Time

	//除权除息信息
	data []quotes.XdxrInfo
}
type SecurityBarsReply_data struct {
	//5 分钟 K线
	KLINE_TYPE_5MIN SecurityBarsReply_data_KLINE_TYPE
	//15 分钟 K线
	KLINE_TYPE_15MIN SecurityBarsReply_data_KLINE_TYPE
	//30 分钟 K线
	KLINE_TYPE_30MIN SecurityBarsReply_data_KLINE_TYPE
	//1 小时 K线
	KLINE_TYPE_1HOUR SecurityBarsReply_data_KLINE_TYPE
	//日 K线
	KLINE_TYPE_DAILY SecurityBarsReply_data_KLINE_TYPE
	//周 K线
	KLINE_TYPE_WEEKLY SecurityBarsReply_data_KLINE_TYPE
	//月 K线
	KLINE_TYPE_MONTHLY SecurityBarsReply_data_KLINE_TYPE
	//1 分钟 K线
	KLINE_TYPE_1MIN SecurityBarsReply_data_KLINE_TYPE
	//季 K线
	KLINE_TYPE_3MONTH SecurityBarsReply_data_KLINE_TYPE
	//年 K线
	KLINE_TYPE_YEARLY SecurityBarsReply_data_KLINE_TYPE
}

type SecurityBarsReply_data_KLINE_TYPE struct {
	//更新时间
	upTime time.Time

	//K线
	data *quotes.SecurityBarsReply
}
