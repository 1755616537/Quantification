package Quantification

import (
	"encoding/json"
	"errors"
	"fmt"
	"gitee.com/quant1x/gotdx"
	"gitee.com/quant1x/gotdx/proto"
	"gitee.com/quant1x/gotdx/quotes"
	"gitee.com/quant1x/gotdx/securities"
	goxlogger "gitee.com/quant1x/gox/logger"
	"github.com/1755616537/utils"
	"github.com/1755616537/utils/logger"
	"github.com/gogf/gf/encoding/gjson"
	"io/ioutil"
	"log/slog"
	"os"
	"strings"
	"sync"
	"tdx/Public"
	Publics "tdx/Quantification/Public"
	"time"
)

// 股票代码列表文件路径
var QuCodeSUrl = "C:\\通达信\\T0002\\blocknew/GZ88888888.blk"

// 股票数据文件路径
const QuDataUrl = "QuData"

// 获取日线最大长度
const IKGetMxLen = 30 * 6

// 获取历史分时图数据最大天数
const HistoryMinuteTimeDataGetMxLen = 20

// 获取历史分时成交最大天数
const HistoryTransactionDataGetMxLen = 20

// 缓存服务器地址
// C:\Users\17556\.quant1x\meta\tdx.json

// 自选股数据
var Qu_ZXGx_Arrs []string

// 自选股数据_没有前缀
var Qu_ZXG_Arrs []string

// 初始化完成
var iniBool bool = false

func init() {
	goxlogger.SetLevel(goxlogger.ERROR)

	//循环读取股票代码
	go func() {
		for {
			inix()
			time.Sleep(time.Second * 5)
		}
	}()
}

func inix() {

	var err error

	qu_ZXGx_Arrs, qu_ZXG_Arrs, err := QuListGet(QuCodeSUrl)
	//qu_ZXGx_Arrs, qu_ZXG_Arrs, err := ZXGGet("C:\\Users\\17556\\Desktop/1.txt")
	if err != nil {
		logger.Error("量化-获取股票列表失败", err)
		return
	}

	getArrsBool := true

	//如果已经有读取过数据,只更新不同的
	var qu_ZXG_Arrs_ []string
	if Qu_ZXGx_Arrs == nil && Qu_ZXG_Arrs == nil {
		Qu_ZXGx_Arrs = qu_ZXGx_Arrs
		Qu_ZXG_Arrs = qu_ZXG_Arrs

		qu_ZXG_Arrs_ = qu_ZXG_Arrs
	} else if len(qu_ZXG_Arrs) != len(Qu_ZXG_Arrs) {
		//找出不同
		for i := 0; i < len(qu_ZXG_Arrs); i++ {
			ok := false
			for i2 := 0; i2 < len(Qu_ZXG_Arrs); i2++ {
				if qu_ZXG_Arrs[i] == Qu_ZXG_Arrs[i] {
					ok = true
					break
				}
			}
			if !ok {
				qu_ZXG_Arrs_ = append(qu_ZXG_Arrs_, qu_ZXG_Arrs[i])
			}
		}
	} else {
		getArrsBool = false
	}

	//读取缓存数据
	if utils.IsExistFileCatalog(QuDataUrl) && getArrsBool {
		//声明一个互斥锁
		var mutex sync.Mutex
		mutex.Lock()
		defer mutex.Unlock()

		slog.Info("开始读取缓存数据...")

		for i := 0; i < len(qu_ZXG_Arrs_); i++ {
			code := qu_ZXG_Arrs_[i]

			quData := QuDataGet(code)
			if quData == nil {
				continue
			}

			fileUrl := fmt.Sprint(QuDataUrl, "/", code)
			if !utils.IsExistFileCatalog(fileUrl) {
				continue
			}

			fileUrl = fmt.Sprint(QuDataUrl, "/", code, "/SecurityBarsReply")
			if !utils.IsExistFileCatalog(fileUrl) {
				continue
			}

			fileUrl = fmt.Sprint(QuDataUrl, "/", code, "/SecurityBarsReply", "/KLINE_TYPE_5MIN.json")
			if utils.IsExistFileCatalog(fileUrl) {
				fileData, err := ioutil.ReadFile(fileUrl)
				if err == nil {
					var mapData []quotes.SecurityBar
					err = json.Unmarshal([]byte(fileData), &mapData)
					if err != nil {
						logger.Error(fmt.Sprint("解析", code, "5 分钟 K线"), err)
					} else {
						quData.SetSecurityBarsReply(proto.KLINE_TYPE_5MIN, SecurityBarsReply_data_KLINE_TYPE{
							time.Now(),
							&quotes.SecurityBarsReply{
								uint16(len(mapData)),
								mapData,
							},
						})
					}
				}
			}

			fileUrl = fmt.Sprint(QuDataUrl, "/", code, "/SecurityBarsReply", "/KLINE_TYPE_15MIN.json")
			if utils.IsExistFileCatalog(fileUrl) {
				fileData, err := ioutil.ReadFile(fileUrl)
				if err == nil {
					var mapData []quotes.SecurityBar
					err = json.Unmarshal([]byte(fileData), &mapData)
					if err != nil {
						logger.Error(fmt.Sprint("解析", code, "15 分钟 K线"), err)
					} else {
						quData.SetSecurityBarsReply(proto.KLINE_TYPE_15MIN, SecurityBarsReply_data_KLINE_TYPE{
							time.Now(),
							&quotes.SecurityBarsReply{
								uint16(len(mapData)),
								mapData,
							},
						})
					}
				}
			}

			fileUrl = fmt.Sprint(QuDataUrl, "/", code, "/SecurityBarsReply", "/KLINE_TYPE_30MIN.json")
			if utils.IsExistFileCatalog(fileUrl) {
				fileData, err := ioutil.ReadFile(fileUrl)
				if err == nil {
					var mapData []quotes.SecurityBar
					err = json.Unmarshal([]byte(fileData), &mapData)
					if err != nil {
						logger.Error(fmt.Sprint("解析", code, "30 分钟 K线"), err)
					} else {
						quData.SetSecurityBarsReply(proto.KLINE_TYPE_30MIN, SecurityBarsReply_data_KLINE_TYPE{
							time.Now(),
							&quotes.SecurityBarsReply{
								uint16(len(mapData)),
								mapData,
							},
						})
					}
				}
			}

			fileUrl = fmt.Sprint(QuDataUrl, "/", code, "/SecurityBarsReply", "/KLINE_TYPE_1HOUR.json")
			if utils.IsExistFileCatalog(fileUrl) {
				fileData, err := ioutil.ReadFile(fileUrl)
				if err == nil {
					var mapData []quotes.SecurityBar
					err = json.Unmarshal([]byte(fileData), &mapData)
					if err != nil {
						logger.Error(fmt.Sprint("解析", code, "1 小时 K线"), err)
					} else {
						quData.SetSecurityBarsReply(proto.KLINE_TYPE_1HOUR, SecurityBarsReply_data_KLINE_TYPE{
							time.Now(),
							&quotes.SecurityBarsReply{
								uint16(len(mapData)),
								mapData,
							},
						})
					}
				}
			}

			fileUrl = fmt.Sprint(QuDataUrl, "/", code, "/SecurityBarsReply", "/KLINE_TYPE_DAILY.json")
			if utils.IsExistFileCatalog(fileUrl) {
				fileData, err := ioutil.ReadFile(fileUrl)
				if err == nil {
					var mapData []quotes.SecurityBar
					err = json.Unmarshal([]byte(fileData), &mapData)
					if err != nil {
						logger.Error(fmt.Sprint("解析", code, "日 K线"), err)
					} else {
						quData.SetSecurityBarsReply(proto.KLINE_TYPE_DAILY, SecurityBarsReply_data_KLINE_TYPE{
							time.Now(),
							&quotes.SecurityBarsReply{
								uint16(len(mapData)),
								mapData,
							},
						})
					}
				}
			}

			fileUrl = fmt.Sprint(QuDataUrl, "/", code, "/SecurityBarsReply", "/KLINE_TYPE_WEEKLY.json")
			if utils.IsExistFileCatalog(fileUrl) {
				fileData, err := ioutil.ReadFile(fileUrl)
				if err == nil {
					var mapData []quotes.SecurityBar
					err = json.Unmarshal([]byte(fileData), &mapData)
					if err != nil {
						logger.Error(fmt.Sprint("解析", code, "周 K线"), err)
					} else {
						quData.SetSecurityBarsReply(proto.KLINE_TYPE_WEEKLY, SecurityBarsReply_data_KLINE_TYPE{
							time.Now(),
							&quotes.SecurityBarsReply{
								uint16(len(mapData)),
								mapData,
							},
						})
					}
				}
			}

			fileUrl = fmt.Sprint(QuDataUrl, "/", code, "/SecurityBarsReply", "/KLINE_TYPE_MONTHLY.json")
			if utils.IsExistFileCatalog(fileUrl) {
				fileData, err := ioutil.ReadFile(fileUrl)
				if err == nil {
					var mapData []quotes.SecurityBar
					err = json.Unmarshal([]byte(fileData), &mapData)
					if err != nil {
						logger.Error(fmt.Sprint("解析", code, "月 K线"), err)
					} else {
						quData.SetSecurityBarsReply(proto.KLINE_TYPE_MONTHLY, SecurityBarsReply_data_KLINE_TYPE{
							time.Now(),
							&quotes.SecurityBarsReply{
								uint16(len(mapData)),
								mapData,
							},
						})
					}
				}
			}

			fileUrl = fmt.Sprint(QuDataUrl, "/", code, "/SecurityBarsReply", "/KLINE_TYPE_1MIN.json")
			if utils.IsExistFileCatalog(fileUrl) {
				fileData, err := ioutil.ReadFile(fileUrl)
				if err == nil {
					var mapData []quotes.SecurityBar
					err = json.Unmarshal([]byte(fileData), &mapData)
					if err != nil {
						logger.Error(fmt.Sprint("解析", code, "1 分钟 K线"), err)
					} else {
						quData.SetSecurityBarsReply(proto.KLINE_TYPE_1MIN, SecurityBarsReply_data_KLINE_TYPE{
							time.Now(),
							&quotes.SecurityBarsReply{
								uint16(len(mapData)),
								mapData,
							},
						})
					}
				}
			}

			fileUrl = fmt.Sprint(QuDataUrl, "/", code, "/SecurityBarsReply", "/KLINE_TYPE_3MONTH.json")
			if utils.IsExistFileCatalog(fileUrl) {
				fileData, err := ioutil.ReadFile(fileUrl)
				if err == nil {
					var mapData []quotes.SecurityBar
					err = json.Unmarshal([]byte(fileData), &mapData)
					if err != nil {
						logger.Error(fmt.Sprint("解析", code, "季 K线"), err)
					} else {
						quData.SetSecurityBarsReply(proto.KLINE_TYPE_3MONTH, SecurityBarsReply_data_KLINE_TYPE{
							time.Now(),
							&quotes.SecurityBarsReply{
								uint16(len(mapData)),
								mapData,
							},
						})
					}
				}
			}

			fileUrl = fmt.Sprint(QuDataUrl, "/", code, "/SecurityBarsReply", "/KLINE_TYPE_YEARLY.json")
			if utils.IsExistFileCatalog(fileUrl) {
				fileData, err := ioutil.ReadFile(fileUrl)
				if err == nil {
					var mapData []quotes.SecurityBar
					err = json.Unmarshal([]byte(fileData), &mapData)
					if err != nil {
						logger.Error(fmt.Sprint("解析", code, "年 K线"), err)
					} else {
						quData.SetSecurityBarsReply(proto.KLINE_TYPE_YEARLY, SecurityBarsReply_data_KLINE_TYPE{
							time.Now(),
							&quotes.SecurityBarsReply{
								uint16(len(mapData)),
								mapData,
							},
						})
					}
				}
			}

			//分时图数据
			fileUrl = fmt.Sprint(QuDataUrl, "/", code, "/MinuteTimeReply")
			if utils.IsExistFileCatalog(fileUrl) {
				list, err := utils.ListDirType(fileUrl, ".json")
				if err == nil {
					for i := 0; i < len(list); i++ {
						dateStr := utils.RemoveSuffix(list[i])
						date, err := utils.TyUint32(dateStr)
						if err != nil {
							logger.Error(fmt.Sprint(code, "分时图数据"), err)
						} else {
							fileData, err := ioutil.ReadFile(fmt.Sprint(fileUrl, "/", list[i]))
							if err == nil {
								var mapData []quotes.MinuteTime
								err = json.Unmarshal([]byte(fileData), &mapData)
								if err != nil {
									logger.Error(fmt.Sprint("解析", code, "分时图数据"), err)
								} else {
									quData.SetMinuteTimeReply(date, MinuteTimeReply{
										time.Now(),
										&quotes.MinuteTimeReply{
											uint16(len(mapData)),
											mapData,
										},
									})
								}
							}
						}
					}
				}
			}

			//分时成交
			fileUrl = fmt.Sprint(QuDataUrl, "/", code, "/TransactionReply")
			if utils.IsExistFileCatalog(fileUrl) {
				list, err := utils.ListDirType(fileUrl, ".json")
				if err == nil {
					for i := 0; i < len(list); i++ {
						dateStr := utils.RemoveSuffix(list[i])
						date, err := utils.TyUint32(dateStr)
						if err != nil {
							logger.Error(fmt.Sprint(code, "分时成交"), err)
						} else {
							fileData, err := ioutil.ReadFile(fmt.Sprint(fileUrl, "/", list[i]))
							if err == nil {
								var mapData []quotes.TickTransaction
								err = json.Unmarshal([]byte(fileData), &mapData)
								if err != nil {
									logger.Error(fmt.Sprint("解析", code, "分时成交"), err)
								} else {
									quData.SetTransactionReply(date, TransactionReply{
										time.Now(),
										&quotes.TransactionReply{
											uint16(len(mapData)),
											mapData,
										},
									})
								}
							}
						}
					}
				}
			}

		}

		slog.Info("结束读取缓存数据")
	}

	iniBool = true
}

func Exit() {
	gotdx.ReOpen()

	//保存缓存数据
	if QuData != nil {
		slog.Info("开始保存缓存数据...")

		var err error
		if !utils.IsExistFileCatalog(QuDataUrl) {
			//创建目录
			err = os.MkdirAll(fmt.Sprintf("./%s", QuDataUrl), os.ModePerm)
			if err != nil {
				fmt.Println("创建", "股票数据文件", "目录失败-"+err.Error())
			}
		}

		if err == nil {
			for code := range QuData {
				slog.Info("开始保存", code, "数据...")

				quData := QuDataGet(code)

				fileUrl := fmt.Sprint(QuDataUrl, "/", code)
				if !utils.IsExistFileCatalog(fileUrl) {
					//创建目录
					err := os.MkdirAll(fmt.Sprintf("./%s", fileUrl), os.ModePerm)
					if err != nil {
						fmt.Println("创建", code, "目录失败-"+err.Error())
						continue
					}
				}

				fileUrl = fmt.Sprint(QuDataUrl, "/", code, "/SecurityBarsReply")
				if !utils.IsExistFileCatalog(fileUrl) {
					//创建目录
					err := os.MkdirAll(fmt.Sprintf("./%s", fileUrl), os.ModePerm)
					if err != nil {
						logger.Error(fmt.Sprint("创建", code, "SecurityBarsReply", "目录", "失败"), err)
						continue
					}
				}

				if !quData.SecurityBarsReply.KLINE_TYPE_5MIN.IsEmpty() {
					slog.Info("开始保存", code, "5 分钟 K线...")

					jsonx := gjson.New(quData.SecurityBarsReply.KLINE_TYPE_5MIN.Get().Data.List).MustToJsonString()
					err := utils.Setfile(jsonx, fmt.Sprint(fileUrl, "/KLINE_TYPE_5MIN.json"))
					if err != nil {
						logger.Error(fmt.Sprint("保存", code, "5 分钟 K线"), err)
					}
				}

				if !quData.SecurityBarsReply.KLINE_TYPE_15MIN.IsEmpty() {
					slog.Info("开始保存", code, "15 分钟 K线...")

					jsonx := gjson.New(quData.SecurityBarsReply.KLINE_TYPE_15MIN.Get().Data.List).MustToJsonString()
					err := utils.Setfile(jsonx, fmt.Sprint(fileUrl, "/KLINE_TYPE_15MIN.json"))
					if err != nil {
						logger.Error(fmt.Sprint("保存", code, "15 分钟 K线"), err)
					}
				}

				if !quData.SecurityBarsReply.KLINE_TYPE_30MIN.IsEmpty() {
					slog.Info("开始保存", code, "30 分钟 K线...")

					jsonx := gjson.New(quData.SecurityBarsReply.KLINE_TYPE_30MIN.Get().Data.List).MustToJsonString()
					err := utils.Setfile(jsonx, fmt.Sprint(fileUrl, "/KLINE_TYPE_30MIN.json"))
					if err != nil {
						logger.Error(fmt.Sprint("保存", code, "30 分钟 K线"), err)
					}
				}

				if !quData.SecurityBarsReply.KLINE_TYPE_1HOUR.IsEmpty() {
					slog.Info("开始保存", code, "1 小时 K线...")

					jsonx := gjson.New(quData.SecurityBarsReply.KLINE_TYPE_1HOUR.Get().Data.List).MustToJsonString()
					err := utils.Setfile(jsonx, fmt.Sprint(fileUrl, "/KLINE_TYPE_1HOUR.json"))
					if err != nil {
						logger.Error(fmt.Sprint("保存", code, "1 小时 K线"), err)
					}
				}

				if !quData.SecurityBarsReply.KLINE_TYPE_DAILY.IsEmpty() {
					slog.Info("开始保存", code, "日 K线...")

					jsonx := gjson.New(quData.SecurityBarsReply.KLINE_TYPE_DAILY.Get().Data.List).MustToJsonString()
					err := utils.Setfile(jsonx, fmt.Sprint(fileUrl, "/KLINE_TYPE_DAILY.json"))
					if err != nil {
						logger.Error(fmt.Sprint("保存", code, "日 K线"), err)
					}
				}

				if !quData.SecurityBarsReply.KLINE_TYPE_WEEKLY.IsEmpty() {
					slog.Info("开始保存", code, "周 K线...")

					jsonx := gjson.New(quData.SecurityBarsReply.KLINE_TYPE_WEEKLY.Get().Data.List).MustToJsonString()
					err := utils.Setfile(jsonx, fmt.Sprint(fileUrl, "/KLINE_TYPE_WEEKLY.json"))
					if err != nil {
						logger.Error(fmt.Sprint("保存", code, "周 K线"), err)
					}
				}

				if !quData.SecurityBarsReply.KLINE_TYPE_MONTHLY.IsEmpty() {
					slog.Info("开始保存", code, "月 K线...")

					jsonx := gjson.New(quData.SecurityBarsReply.KLINE_TYPE_MONTHLY.Get().Data.List).MustToJsonString()
					err := utils.Setfile(jsonx, fmt.Sprint(fileUrl, "/KLINE_TYPE_MONTHLY.json"))
					if err != nil {
						logger.Error(fmt.Sprint("保存", code, "月 K线"), err)
					}
				}

				if !quData.SecurityBarsReply.KLINE_TYPE_1MIN.IsEmpty() {
					slog.Info("开始保存", code, "1 分钟 K线...")

					jsonx := gjson.New(quData.SecurityBarsReply.KLINE_TYPE_1MIN.Get().Data.List).MustToJsonString()
					err := utils.Setfile(jsonx, fmt.Sprint(fileUrl, "/KLINE_TYPE_1MIN.json"))
					if err != nil {
						logger.Error(fmt.Sprint("保存", code, "1 分钟 K线"), err)
					}
				}

				if !quData.SecurityBarsReply.KLINE_TYPE_3MONTH.IsEmpty() {
					slog.Info("开始保存", code, "季 K线...")

					jsonx := gjson.New(quData.SecurityBarsReply.KLINE_TYPE_3MONTH.Get().Data.List).MustToJsonString()
					err := utils.Setfile(jsonx, fmt.Sprint(fileUrl, "/KLINE_TYPE_3MONTH.json"))
					if err != nil {
						logger.Error(fmt.Sprint("保存", code, "季 K线"), err)
					}
				}

				if !quData.SecurityBarsReply.KLINE_TYPE_YEARLY.IsEmpty() {
					slog.Info("开始保存", code, "年 K线...")

					jsonx := gjson.New(quData.SecurityBarsReply.KLINE_TYPE_YEARLY.Get().Data.List).MustToJsonString()
					err := utils.Setfile(jsonx, fmt.Sprint(fileUrl, "/KLINE_TYPE_YEARLY.json"))
					if err != nil {
						logger.Error(fmt.Sprint("保存", code, "年 K线"), err)
					}
				}

				//分时图数据
				if quData.MinuteTimeReply != nil {
					slog.Info("开始保存", code, "分时图数据...")
					fileUrl := fmt.Sprint(QuDataUrl, "/", code, "/MinuteTimeReply")
					if !utils.IsExistFileCatalog(fileUrl) {
						//创建目录
						err := os.MkdirAll(fmt.Sprintf("./%s", fileUrl), os.ModePerm)
						if err != nil {
							logger.Error(fmt.Sprint("创建", code, "MinuteTimeReply", "目录", "失败"), err)
							continue
						}
					}

					for key := range quData.MinuteTimeReply {
						minuteTimeReply := quData.MinuteTimeReply[key]

						jsonx := gjson.New(minuteTimeReply.Get().Data.List).MustToJsonString()
						err := utils.Setfile(jsonx, fmt.Sprint(fileUrl, "/", key, ".json"))
						if err != nil {
							logger.Error(fmt.Sprint("保存", code, key, "MinuteTimeReply"), err)
							continue
						}
					}
				}

				//分时成交
				if quData.TransactionReply != nil {
					slog.Info("开始保存", code, "分时成交...")
					fileUrl := fmt.Sprint(QuDataUrl, "/", code, "/TransactionReply")
					if !utils.IsExistFileCatalog(fileUrl) {
						//创建目录
						err := os.MkdirAll(fmt.Sprintf("./%s", fileUrl), os.ModePerm)
						if err != nil {
							logger.Error(fmt.Sprint("创建", code, "TransactionReply", "目录", "失败"), err)
							continue
						}
					}

					for key := range quData.TransactionReply {
						transactionReply := quData.TransactionReply[key]

						jsonx := gjson.New(transactionReply.Get().Data.List).MustToJsonString()
						err := utils.Setfile(jsonx, fmt.Sprint(fileUrl, "/", key, ".json"))
						if err != nil {
							logger.Error(fmt.Sprint("保存", code, key, "TransactionReply"), err)
							continue
						}
					}
				}

			}
		}
		slog.Info("结束保存数据")
	}
}

func Run() {
	for {
		if iniBool {
			break
		}
	}
	slog.Info("开始获取数据", Public.LogPrintln隔行符号)

	var api = gotdx.GetTdxApi()

	//获取QuData
	go func() {
		arrs := utils.SplitSliceIntoChunks(Qu_ZXG_Arrs, quotes.TDX_SECURITY_QUOTES_MAX)
		for _, arr := range arrs {
			snapshot, err := api.GetSnapshot(arr)

			//time.Sleep(time.Second * 1)

			if err == nil {
				for i := 0; i < len(snapshot); i++ {
					quData := QuDataGet(snapshot[i].Code)
					if !quData.IsEmpty() {
						quData.SetSnapshot(Snapshot{
							time.Now(),
							snapshot[i],
							securities.GetStockName(snapshot[i].Code),
						})
					}
				}
			}
		}

		date, err := utils.DateTyUint32(time.Now())
		if err != nil {
			logger.Error("获取数据", err)
			return
		}

		//获取一次性数据
		slog.Info("开始获取一次性数据")
		for code := range QuData {

			codeTypeTy := Publics.CodeTypeTy(code)

			quData := QuDataGet(code)

			//基本面
			if quData.FinanceInfo.IsEmpty() {
				info, err := api.GetFinanceInfo(codeTypeTy)
				if err == nil {
					quData.SetFinanceInfo(FinanceInfo{
						time.Now(),
						info,
					})
				} else {
					logger.Error(fmt.Sprint("获取", code, "基本面"), err)
				}
			}

			//除权除息信息
			if quData.XdxrInfo.IsEmpty() {
				xdxrInfo, err := api.GetXdxrInfo(codeTypeTy)
				if err == nil {
					quData.SetXdxrInfo(XdxrInfo{
						time.Now(),
						xdxrInfo,
					})
				} else {
					logger.Error(fmt.Sprint("获取", code, "除权除息信息"), err)
				}
			}

			//K线
			klines, err := api.GetKLine(codeTypeTy, proto.KLINE_TYPE_RI_K, 0, IKGetMxLen)
			if err == nil {
				quData.SetSecurityBarsReply(proto.KLINE_TYPE_DAILY, SecurityBarsReply_data_KLINE_TYPE{
					time.Now(),
					klines,
				})
			} else {
				logger.Error(fmt.Sprint("获取", code, "K线 日"), err)
			}

			//历史分时图数据
			dateAoArr, err := utils.DateAoArr(time.Now(), HistoryMinuteTimeDataGetMxLen, true)
			if err == nil {
				for i := 0; i < len(dateAoArr); i++ {
					dateAo := dateAoArr[i]

					//已经存在数据，跳过获取
					{
						minuteTimeReply := quData.GetMinuteTimeReply(dateAo)
						if !minuteTimeReply.IsEmpty() {
							continue
						}
					}

					historyMinuteTimeData, err := api.GetHistoryMinuteTimeData(codeTypeTy, dateAo)
					if err == nil {
						quData.SetMinuteTimeReply(dateAo, MinuteTimeReply{
							time.Now(),
							historyMinuteTimeData,
						})
					} else {
						logger.Error(fmt.Sprint("获取", code, "历史分时图数据"), err)
					}
				}
			} else {
				logger.Error(fmt.Sprint("获取", code, "历史分时图数据"), err)
			}

			//历史分时成交
			dateAoArr, err = utils.DateAoArr(time.Now(), HistoryTransactionDataGetMxLen, true)
			if err == nil {
				for i := 0; i < len(dateAoArr); i++ {
					dateAo := dateAoArr[i]

					//已经存在数据，跳过获取
					{
						transactionReply := quData.GetTransactionReply(dateAo)
						if !transactionReply.IsEmpty() {
							continue
						}
					}

					var tickTransactions []quotes.TickTransaction
					start := 0
					for {
						//一次获取最大数量
						getIxCount := uint16(3600)
						historyTransactionData, err := api.GetHistoryTransactionData(codeTypeTy, dateAo, uint16(start), getIxCount)
						if err == nil {
							if historyTransactionData.Count == 0 {
								break
							}
							tickTransactions = append(tickTransactions, historyTransactionData.List...)
							if historyTransactionData.Count < getIxCount {
								break
							}
							//if historyTransactionData.List[len(historyTransactionData.List)-1].Time == "15:00" {
							//	break
							//}
						} else {
							logger.Error(fmt.Sprint("获取", code, dateAo, "历史分时成交"), err)
							break
						}
						start += 1

					}
					transactionReply := quotes.TransactionReply{
						Count: uint16(len(tickTransactions)),
						List:  tickTransactions,
					}
					quData.SetTransactionReply(dateAo, TransactionReply{
						time.Now(),
						&transactionReply,
					})
				}
			} else {
				logger.Error(fmt.Sprint("获取", code, "历史分时成交"), err)
			}

		}

		//循环获取数据
		slog.Info("开始获取循环数据")
		go func() {
			for {
				arrs := utils.SplitSliceIntoChunks(Qu_ZXG_Arrs, quotes.TDX_SECURITY_QUOTES_MAX)
				for _, arr := range arrs {
					snapshot, err := api.GetSnapshot(arr)

					//time.Sleep(time.Second * 1)

					if err == nil {
						for i := 0; i < len(snapshot); i++ {
							quData := QuDataGet(snapshot[i].Code)
							if !quData.IsEmpty() {
								//if exchange.CheckCallAuctionTime(time.Now()) {
								//	snapshot[i].Price = snapshot[i].Bid1
								//
								//	//kLINE_TYPE_DAILY_data := quData.SecurityBarsReply.KLINE_TYPE_DAILY.Get()
								//	//if !kLINE_TYPE_DAILY_data.IsEmpty() {
								//	//	kLINE_TYPE_DAILY_data_list := kLINE_TYPE_DAILY_data.Data.List
								//	//	snapshot[i].LastClose = kLINE_TYPE_DAILY_data_list[len(kLINE_TYPE_DAILY_data_list)-1].Close
								//	//}
								//}

								quData.SetSnapshot(Snapshot{
									time.Now(),
									snapshot[i],
									quData.Snapshot.StockName,
								})
							}
						}
					}
				}

				time.Sleep(time.Second * 1)
			}
		}()
		go func() {
			for {
				//获取当日数据
				for code := range QuData {

					codeTypeTy := Publics.CodeTypeTy(code)

					quData := QuDataGet(code)

					//分时图数据
					minuteTimeData, err := api.GetHistoryMinuteTimeData(codeTypeTy, date)
					//minuteTimeData, err := api.GetMinuteTimeData(codeTypeTy)
					if err == nil {
						quData.SetMinuteTimeReply(date, MinuteTimeReply{
							time.Now(),
							minuteTimeData,
						})
					} else {
						logger.Error(fmt.Sprint("获取", code, "分时图数据"), err)
					}

					//time.Sleep(time.Second * 1)
				}
			}
		}()
		go func() {
			for {
				//获取当日数据
				for code := range QuData {

					codeTypeTy := Publics.CodeTypeTy(code)

					quData := QuDataGet(code)

					//分时成交
					var tickTransactions []quotes.TickTransaction
					start := 0
					for {
						//一次获取最大数量
						getIxCount := uint16(3600)
						historyTransactionData, err := api.GetHistoryTransactionData(codeTypeTy, date, uint16(start), getIxCount)
						if err == nil {
							if historyTransactionData.Count == 0 {
								break
							}
							tickTransactions = append(tickTransactions, historyTransactionData.List...)
							if historyTransactionData.Count < getIxCount {
								break
							}
							//if historyTransactionData.List[len(historyTransactionData.List)-1].Time == "15:00" {
							//	break
							//}
						} else {
							logger.Error(fmt.Sprint("获取", code, date, "分时成交"), err)
							break
						}
						start += 1

					}
					transactionReply := quotes.TransactionReply{
						Count: uint16(len(tickTransactions)),
						List:  tickTransactions,
					}
					quData.SetTransactionReply(date, TransactionReply{
						time.Now(),
						&transactionReply,
					})

					//transactionData, err := api.GetTransactionData(codeTypeTy, 0, 1800)
					//if err == nil {
					//	quData.SetTransactionReply (date,TransactionReply{
					//		time.Now(),
					//		transactionData,
					//	})
					//} else {
					//	fmt.Println("【数据获取失败】", "【分时成交】", code)
					//}

					//time.Sleep(time.Second * 1)
				}
			}
		}()
		go func() {
			for {
				//获取当日数据
				for code := range QuData {

					codeTypeTy := Publics.CodeTypeTy(code)

					quData := QuDataGet(code)

					var klines *quotes.SecurityBarsReply
					var err error

					//K线 5 分钟
					//klines, err = api.GetKLine(codeTypeTy, proto.KLINE_TYPE_5MIN, 0, 1)
					//if err == nil {
					//	quData.SetSecurityBarsReply(proto.KLINE_TYPE_5MIN, SecurityBarsReply_data_KLINE_TYPE{
					//		time.Now(),
					//		klines,
					//	})
					//} else {
					//	fmt.Println("【数据获取失败】", "【K线 5 分钟】", code)
					//}

					//K线 15 分钟
					//klines, err = api.GetKLine(codeTypeTy, proto.KLINE_TYPE_15MIN, 0, 1)
					//if err == nil {
					//	quData.SetSecurityBarsReply(proto.KLINE_TYPE_15MIN, SecurityBarsReply_data_KLINE_TYPE{
					//		time.Now(),
					//		klines,
					//	})
					//} else {
					//	fmt.Println("【数据获取失败】", "【K线 15 分钟】", code)
					//}
					//K线 30 分钟
					//klines, err = api.GetKLine(codeTypeTy, proto.KLINE_TYPE_30MIN, 0, 1)
					//if err == nil {
					//	quData.SetSecurityBarsReply(proto.KLINE_TYPE_30MIN, SecurityBarsReply_data_KLINE_TYPE{
					//		time.Now(),
					//		klines,
					//	})
					//} else {
					//	fmt.Println("【数据获取失败】", "【K线 30 分钟】", code)
					//}

					//K线 1 小时
					//klines, err = api.GetKLine(codeTypeTy, proto.KLINE_TYPE_1HOUR, 0, 1)
					//if err == nil {
					//	quData.SetSecurityBarsReply(proto.KLINE_TYPE_1HOUR, SecurityBarsReply_data_KLINE_TYPE{
					//		time.Now(),
					//		klines,
					//	})
					//} else {
					//	fmt.Println("【数据获取失败】", "【K线 1 小时】", code)
					//}
					//K线 日
					klines, err = api.GetKLine(codeTypeTy, proto.KLINE_TYPE_RI_K, 0, 1)
					if err == nil {
						quData.SetSecurityBarsReply(proto.KLINE_TYPE_DAILY, SecurityBarsReply_data_KLINE_TYPE{
							time.Now(),
							klines,
						})
					} else {
						logger.Error(fmt.Sprint("获取", code, "K线 日"), err)
					}

					//K线 周
					//klines, err = api.GetKLine(codeTypeTy, proto.KLINE_TYPE_WEEKLY, 0, 1)
					//if err == nil {
					//	quData.SetSecurityBarsReply(proto.KLINE_TYPE_WEEKLY, SecurityBarsReply_data_KLINE_TYPE{
					//		time.Now(),
					//		klines,
					//	})
					//} else {
					//	fmt.Println("【数据获取失败】", "【K线 周】", code)
					//}
					//K线 月
					klines, err = api.GetKLine(codeTypeTy, proto.KLINE_TYPE_MONTHLY, 0, 1)
					if err == nil {
						quData.SetSecurityBarsReply(proto.KLINE_TYPE_MONTHLY, SecurityBarsReply_data_KLINE_TYPE{
							time.Now(),
							klines,
						})
					} else {
						logger.Error(fmt.Sprint("获取", code, "K线 月"), err)
					}

					//K线 1 分钟
					klines, err = api.GetKLine(codeTypeTy, proto.KLINE_TYPE_1MIN, 0, 1)
					if err == nil {
						quData.SetSecurityBarsReply(proto.KLINE_TYPE_1MIN, SecurityBarsReply_data_KLINE_TYPE{
							time.Now(),
							klines,
						})
					} else {
						logger.Error(fmt.Sprint("获取", code, "K线 1 分钟"), err)
					}
					//K线 季
					//klines, err = api.GetKLine(codeTypeTy, proto.KLINE_TYPE_3MONTH, 0, 1)
					//if err == nil {
					//	quData.SetSecurityBarsReply(proto.KLINE_TYPE_3MONTH, SecurityBarsReply_data_KLINE_TYPE{
					//		time.Now(),
					//		klines,
					//	})
					//} else {
					//	fmt.Println("【数据获取失败】", "【K线 日】", code)
					//}

					//K线 年
					klines, err = api.GetKLine(codeTypeTy, proto.KLINE_TYPE_YEARLY, 0, 1)
					if err == nil {
						quData.SetSecurityBarsReply(proto.KLINE_TYPE_YEARLY, SecurityBarsReply_data_KLINE_TYPE{
							time.Now(),
							klines,
						})
					} else {
						logger.Error(fmt.Sprint("获取", code, "K线 年"), err)
					}

					//time.Sleep(time.Second * 1)
				}
			}
		}()
	}()

	go func() {
		for {
			const 卖金额阈值 = 10000 * 2000
			const 买金额阈值 = 10000 * 2000

			// 获取当前时间
			currentTime := time.Now()
			if !(currentTime.Hour() == 9 && currentTime.Minute() < 30) {
				//slog.Warn("开盘竞价量监控【时间不在范围-结束】")
				return
			}
			//targetTime := time.Date(currentTime.Year(), currentTime.Month(), currentTime.Day(), 9, 30, 0, 0, currentTime.Location())
			//// 判断当前时间是否大于9点30分
			//if currentTime.After(targetTime) {
			//	fmt.Println("开盘竞价量监控【时间超时-结束】")
			//	return
			//}

			for i := 0; i < len(Qu_ZXG_Arrs); i++ {
				code := Qu_ZXG_Arrs[i]
				snapshot := QuDataGet(code).Snapshot.Get()
				if snapshot == nil {
					continue
				}
				//fmt.Println(snapshot.Data)
				//{2024-08-07 sz000888 1 2 0 000888 0 0 12.9 0 0 0 09:24:12.606 9242101 0 0 0 0 0 0 450000 3915300 0 0 0 0 0 0 12.77 12.77 3066 3066 0 0 45 0 0 0 0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 2024-08-07 09:24:41.488}
				卖档1金额 := float64(snapshot.Data.AskVol1) * snapshot.Data.Ask1
				if 卖档1金额 >= 卖金额阈值 {
					监控列表add(监控列表_data{"开盘竞价量监控-卖", snapshot.Data.Code})
				}
				买档1金额 := float64(snapshot.Data.BidVol1) * snapshot.Data.Bid1
				if 买档1金额 >= 买金额阈值 {
					监控列表add(监控列表_data{"开盘竞价量监控-买", snapshot.Data.Code})
				}
			}
		}
	}()
	go func() {
		for {
			for i := 0; i < len(Qu_ZXGx_Arrs); i++ {
				点火监控(Qu_ZXGx_Arrs[i])
			}
		}
	}()
	go func() {
		for {
			for i := 0; i < len(Qu_ZXGx_Arrs); i++ {
				闪崩监控(Qu_ZXGx_Arrs[i])
			}
		}
	}()
	go func() {
		for {
			for i := 0; i < len(Qu_ZXGx_Arrs); i++ {
				压力监控(Qu_ZXGx_Arrs[i])
			}
		}
	}()
	go func() {
		for {
			for i := 0; i < len(Qu_ZXGx_Arrs); i++ {
				支撑监控(Qu_ZXGx_Arrs[i])
			}
		}
	}()
}

// 自选股获取
func QuListGet(file string) (qu_ZXGx_Arrs []string, qu_ZXG_Arrs []string, err error) {
	arrs, err := utils.LineByLine(file)
	if err != nil {
		return nil, nil, errors.New(fmt.Sprint("读取文本失败 ", err.Error()))
	}
	for i := 0; i < len(arrs); i++ {
		if i == 120 {
			break
		}
		string文本 := arrs[i]

		if len(string文本) < 1 {
			continue
		}

		qu_ZXG_Arrs = append(qu_ZXG_Arrs, string文本[1:])

		if strings.HasPrefix(string文本, "1") {
			qu_ZXGx_Arrs = append(qu_ZXGx_Arrs, fmt.Sprint("sh", string文本[1:]))
		} else if strings.HasPrefix(string文本, "0") {
			qu_ZXGx_Arrs = append(qu_ZXGx_Arrs, fmt.Sprint("sz", string文本[1:]))
		}
	}
	return qu_ZXGx_Arrs, qu_ZXG_Arrs, nil
}

func 点火监控(code string) {

}
func 闪崩监控(code string) {

}
func 压力监控(code string) {

}
func 支撑监控(code string) {

}
