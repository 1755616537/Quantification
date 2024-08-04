package Quantification

import (
	"fmt"
	"gitee.com/quant1x/gotdx"
	Publics "tdx/Quantification/Public"
	"testing"
)

func Test_codeTy(t *testing.T) {
	a := Publics.CodeTypeTy("600280")
	fmt.Println(a)
	b := Publics.CodeTypeTyN("sh600280")
	fmt.Println(b)
}

func Test_ZXGGet(t *testing.T) {
	a, b, err := ZXGGet("C:\\Users\\17556\\Desktop/1.txt")
	fmt.Println(a, b, err)
	fmt.Println()
}

func Test_示例(t *testing.T) {
	api := gotdx.GetTdxApi()

	////基本面
	//info, err := api.GetFinanceInfo("sh600280")
	//fmt.Println("info", err, info)
	////K线
	//klines, err := api.GetKLine("sh600280", proto.KLINE_TYPE_RI_K, 0, 1)
	//fmt.Println("klines", err, klines)
	////指数K线
	//indexBars, err := api.GetIndexBars("sh000001", proto.KLINE_TYPE_RI_K, 0, 1)
	//fmt.Println("indexBars", err, indexBars)
	//// 指定市场内的证券数目
	//sc, err := api.GetSecurityCount(exchange.MarketIdShangHai)
	//fmt.Println("sc", err, sc)
	//// 5档行情
	//sq1, err := api.GetSecurityQuotes([]uint8{exchange.MarketIdShangHai}, []string{"600280"})
	//fmt.Println("sq1", err, sq1)
	//// 5档行情 测试版本快照
	//sq2, err := api.V2GetSecurityQuotes([]uint8{exchange.MarketIdShangHai}, []string{"600280"})
	//fmt.Println("sq2", err, sq2)
	////快照数据
	//snapshot, err := api.GetSnapshot([]string{"600280"})
	//fmt.Println("snapshot", err, snapshot)
	////分时图数据
	//minuteTimeData, err := api.GetMinuteTimeData("sh600280")
	//fmt.Println("minuteTimeData", err, minuteTimeData)
	////历史分时图数据
	historyMinuteTimeData, err := api.GetHistoryMinuteTimeData("sh600280", 20240802)
	fmt.Println("historyMinuteTimeData", err, historyMinuteTimeData)
	////分时成交
	//transactionData, err := api.GetTransactionData("sh600280", 0, 1800)
	//fmt.Println("transactionData", err, transactionData)
	////data, _ := json.Marshal(transactionData)
	////text := api2.Bytes2String(data)
	////fmt.Println("text", text)
	////历史分时成交
	//historyTransactionData, err := api.GetHistoryTransactionData("sh600280", 20240802, 0, 1800)
	//fmt.Println("historyTransactionData", err, historyTransactionData)
	////除权除息信息
	//xdxrInfo, err := api.GetXdxrInfo("sh600280")
	//fmt.Println("xdxrInfo", err, xdxrInfo)
	//// 板块meta信息
	//blkMeta, err := api.GetBlockMeta(quotes.BLOCK_DEFAULT)
	//fmt.Println("blkMeta", err, blkMeta)
	//// 板块信息
	//blkInfo, err := api.GetBlockInfo(quotes.BLOCK_DEFAULT)
	//fmt.Println("blkInfo", err, blkInfo)

	fmt.Println(Api.NumOfServers())
}
