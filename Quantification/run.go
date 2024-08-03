package Quantification

import (
	"errors"
	"fmt"
	"gitee.com/quant1x/gotdx"
	"gitee.com/quant1x/gotdx/proto"
	"gitee.com/quant1x/gotdx/quotes"
	"github.com/1755616537/utils"
	"github.com/1755616537/utils/TaskProgress"
	"strings"
	"tdx/Public"
	"time"
)

// 缓存服务器地址
// C:\Users\17556\.quant1x\meta\tdx.json
var Api *quotes.StdApi

var 自选股_文本数组, 自选股_文本数组_没有前缀 []string

func init() {
	//初始化量化连接池
	Api = gotdx.GetTdxApi()
}

func Exit() {
	if Api != nil {
		Api.Close()
	}
}

func Run() {
	b := TaskProgress.NewBar(0, 10)
	for i := 0; i < 10; i++ {
		b.Add(1)
		time.Sleep(time.Second * 2)
	}
	return

	自选股_文本数组, 自选股_文本数组_没有前缀, err := 自选股获取("C:\\通达信\\T0002\\blocknew/ZXG.blk")
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	fmt.Println("开始数据操作", Public.LogPrintln隔行符号)

	//获取股票数据
	go func() {
		snapshot, err := Api.GetSnapshot(自选股_文本数组_没有前缀)
		if err == nil {
			for i := 0; i < len(snapshot); i++ {
				股票数据[snapshot[i].Code].Snapshot = &Snapshot{
					time.Now(),
					snapshot[i],
				}
			}
		}

		for i := 0; i < len(自选股_文本数组); i++ {
			code := 自选股_文本数组[i]

			//基本面
			if 股票数据[snapshot[i].Code].FinanceInfo == nil {
				info, err := Api.GetFinanceInfo(code)
				if err == nil {
					股票数据[snapshot[i].Code].FinanceInfo = &FinanceInfo{
						time.Now(),
						info,
					}
				}
			}

			//K线
			klines, err := Api.GetKLine("sh600280", proto.KLINE_TYPE_RI_K, 0, 1)
			if err == nil {
				股票数据[snapshot[i].Code].SecurityBarsReply.KLINE_TYPE_DAILY = SecurityBarsReply_data_KLINE_TYPE{
					time.Now(),
					klines,
				}
			}

			//分时图数据
			minuteTimeData, err := Api.GetMinuteTimeData("sh600280")
			if err == nil {
				股票数据[snapshot[i].Code].MinuteTimeReply = &MinuteTimeReply{
					time.Now(),
					minuteTimeData,
				}
			}

			//分时成交
			transactionData, err := Api.GetTransactionData("sh600280", 0, 1800)
			if err == nil {
				股票数据[snapshot[i].Code].TransactionReply = &TransactionReply{
					time.Now(),
					transactionData,
				}
			}

			//除权除息信息
			if 股票数据[snapshot[i].Code].XdxrInfo == nil {
				xdxrInfo, err := Api.GetXdxrInfo("sh600280")
				if err == nil {
					股票数据[snapshot[i].Code].XdxrInfo = &XdxrInfo{
						time.Now(),
						xdxrInfo,
					}
				}
			}

		}
	}()

	go func() {
		for {
			const 卖金额阈值 = 10000 * 2000
			const 买金额阈值 = 10000 * 2000

			// 获取当前时间
			currentTime := time.Now()
			targetTime := time.Date(currentTime.Year(), currentTime.Month(), currentTime.Day(), 9, 30, 0, 0, currentTime.Location())
			// 判断当前时间是否大于9点30分
			if currentTime.After(targetTime) {
				fmt.Println("开盘竞价量监控【时间超时-结束】")
				return
			}

			for i := 0; i < len(自选股_文本数组_没有前缀); i++ {
				code := 自选股_文本数组_没有前缀[i]
				stockData, ok := 股票数据[code]
				if !ok {
					continue
				}
				卖档1金额 := float64(stockData.Snapshot.data.AskVol1) * stockData.Snapshot.data.Ask1
				if 卖档1金额 >= 卖金额阈值 {
					监控列表add(监控列表_data{"开盘竞价量监控-卖", stockData.Snapshot.data.Code})
				}
				买档1金额 := float64(stockData.Snapshot.data.BidVol1) * stockData.Snapshot.data.Bid1
				if 买档1金额 >= 买金额阈值 {
					监控列表add(监控列表_data{"开盘竞价量监控-买", stockData.Snapshot.data.Code})
				}
			}
		}
	}()
	go func() {
		for {
			for i := 0; i < len(自选股_文本数组); i++ {
				点火监控(自选股_文本数组[i])
			}
		}
	}()
	go func() {
		for {
			for i := 0; i < len(自选股_文本数组); i++ {
				闪崩监控(自选股_文本数组[i])
			}
		}
	}()
	go func() {
		for {
			for i := 0; i < len(自选股_文本数组); i++ {
				压力监控(自选股_文本数组[i])
			}
		}
	}()
	go func() {
		for {
			for i := 0; i < len(自选股_文本数组); i++ {
				支撑监控(自选股_文本数组[i])
			}
		}
	}()
}

func 自选股获取(文件地址_自选股 string) (自选股_文本数组 []string, 自选股_文本数组_没有前缀 []string, err error) {
	自选股_文本数组, err = utils.LineByLine(文件地址_自选股)
	if err != nil {
		return nil, nil, errors.New(fmt.Sprint("读取文本失败 ", err.Error()))
	}
	for i := 0; i < len(自选股_文本数组); i++ {
		string文本 := 自选股_文本数组[i]

		if len(string文本) < 1 {
			continue
		}

		自选股_文本数组_没有前缀 = append(自选股_文本数组_没有前缀, string文本[1:])

		if strings.HasPrefix(string文本, "1") {
			自选股_文本数组 = append(自选股_文本数组, fmt.Sprint("sh", string文本[1:]))
		} else if strings.HasPrefix(string文本, "0") {
			自选股_文本数组 = append(自选股_文本数组, fmt.Sprint("sz", string文本[1:]))
		}
	}
	return 自选股_文本数组, 自选股_文本数组_没有前缀, nil
}

func 点火监控(code string) {

}
func 闪崩监控(code string) {

}
func 压力监控(code string) {

}
func 支撑监控(code string) {

}

func 示例() {
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
	//historyMinuteTimeData, err := api.GetHistoryMinuteTimeData("sh600280", 20240802)
	//fmt.Println("historyMinuteTimeData", err, historyMinuteTimeData)
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
