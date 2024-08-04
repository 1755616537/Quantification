package Quantification

import (
	"encoding/json"
	"errors"
	"fmt"
	"gitee.com/quant1x/gotdx"
	"gitee.com/quant1x/gotdx/proto"
	"gitee.com/quant1x/gotdx/quotes"
	"github.com/1755616537/utils"
	"github.com/gogf/gf/encoding/gjson"
	"io/ioutil"
	"os"
	"strings"
	"tdx/Public"
	Publics "tdx/Quantification/Public"
	"time"
)

// 股票数据文件路径
const QuDataUrl = "QuData"

// 获取日线最大长度
const IKGetMxLen = 30 * 1

// 获取历史分时图数据最大天数
const HistoryMinuteTimeDataGetMxLen = 2

// 获取历史分时成交最大天数
const HistoryTransactionDataGetMxLen = 2

// 缓存服务器地址
// C:\Users\17556\.quant1x\meta\tdx.json
var Api *quotes.StdApi

// 自选股数据
var Qu_ZXGx_Arrs []string

// 自选股数据_没有前缀
var Qu_ZXG_Arrs []string

func init() {
	//初始化量化连接池
	if Api == nil {
		Api = gotdx.GetTdxApi()
	}

	var err error

	//Qu_ZXGx_Arrs, Qu_ZXG_Arrs, err := ZXGGet("C:\\通达信\\T0002\\blocknew/ZXG.blk")
	Qu_ZXGx_Arrs, Qu_ZXG_Arrs, err = ZXGGet("C:\\Users\\17556\\Desktop/1.txt")
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	//读取缓存数据
	if utils.IsExistFileCatalog(QuDataUrl) {
		for i := 0; i < len(Qu_ZXG_Arrs); i++ {
			code := Qu_ZXG_Arrs[i]
			quData := QuDataGet(code)
			if quData == nil {
				continue
			}

			fileUrl := fmt.Sprint(QuDataUrl, "/", code)
			if !utils.IsExistFileCatalog(fileUrl) {
				continue
			}

			fileUrl = fmt.Sprint(QuDataUrl, "/", code, "/SecurityBarsReply")
			if utils.IsExistFileCatalog(fileUrl) {
				fileData, err := ioutil.ReadFile(fmt.Sprint(fileUrl, "/KLINE_TYPE_5MIN.json"))
				if err == nil {
					var mapData []quotes.SecurityBar
					err = json.Unmarshal([]byte(fileData), &mapData)
					if err != nil {
						fmt.Println("解析", code, "KLINE_TYPE_5MIN", "失败-"+err.Error())
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

			fileUrl = fmt.Sprint(QuDataUrl, "/", code, "/SecurityBarsReply")
			if utils.IsExistFileCatalog(fileUrl) {
				fileData, err := ioutil.ReadFile(fmt.Sprint(fileUrl, "/KLINE_TYPE_15MIN.json"))
				if err == nil {
					var mapData []quotes.SecurityBar
					err = json.Unmarshal([]byte(fileData), &mapData)
					if err != nil {
						fmt.Println("解析", code, "KLINE_TYPE_15MIN", "失败-"+err.Error())
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

			fileUrl = fmt.Sprint(QuDataUrl, "/", code, "/SecurityBarsReply")
			if utils.IsExistFileCatalog(fileUrl) {
				fileData, err := ioutil.ReadFile(fmt.Sprint(fileUrl, "/KLINE_TYPE_30MIN.json"))
				if err == nil {
					var mapData []quotes.SecurityBar
					err = json.Unmarshal([]byte(fileData), &mapData)
					if err != nil {
						fmt.Println("解析", code, "KLINE_TYPE_30MIN", "失败-"+err.Error())
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

			fileUrl = fmt.Sprint(QuDataUrl, "/", code, "/SecurityBarsReply")
			if utils.IsExistFileCatalog(fileUrl) {
				fileData, err := ioutil.ReadFile(fmt.Sprint(fileUrl, "/KLINE_TYPE_1HOUR.json"))
				if err == nil {
					var mapData []quotes.SecurityBar
					err = json.Unmarshal([]byte(fileData), &mapData)
					if err != nil {
						fmt.Println("解析", code, "KLINE_TYPE_1HOUR", "失败-"+err.Error())
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

			fileUrl = fmt.Sprint(QuDataUrl, "/", code, "/SecurityBarsReply")
			if utils.IsExistFileCatalog(fileUrl) {
				fileData, err := ioutil.ReadFile(fmt.Sprint(fileUrl, "/KLINE_TYPE_DAILY.json"))
				if err == nil {
					var mapData []quotes.SecurityBar
					err = json.Unmarshal([]byte(fileData), &mapData)
					if err != nil {
						fmt.Println("解析", code, "KLINE_TYPE_DAILY", "失败-"+err.Error())
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

			fileUrl = fmt.Sprint(QuDataUrl, "/", code, "/SecurityBarsReply")
			if utils.IsExistFileCatalog(fileUrl) {
				fileData, err := ioutil.ReadFile(fmt.Sprint(fileUrl, "/KLINE_TYPE_WEEKLY.json"))
				if err == nil {
					var mapData []quotes.SecurityBar
					err = json.Unmarshal([]byte(fileData), &mapData)
					if err != nil {
						fmt.Println("解析", code, "KLINE_TYPE_WEEKLY", "失败-"+err.Error())
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

			fileUrl = fmt.Sprint(QuDataUrl, "/", code, "/SecurityBarsReply")
			if utils.IsExistFileCatalog(fileUrl) {
				fileData, err := ioutil.ReadFile(fmt.Sprint(fileUrl, "/KLINE_TYPE_MONTHLY.json"))
				if err == nil {
					var mapData []quotes.SecurityBar
					err = json.Unmarshal([]byte(fileData), &mapData)
					if err != nil {
						fmt.Println("解析", code, "KLINE_TYPE_MONTHLY", "失败-"+err.Error())
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

			fileUrl = fmt.Sprint(QuDataUrl, "/", code, "/SecurityBarsReply")
			if utils.IsExistFileCatalog(fileUrl) {
				fileData, err := ioutil.ReadFile(fmt.Sprint(fileUrl, "/KLINE_TYPE_1MIN.json"))
				if err == nil {
					var mapData []quotes.SecurityBar
					err = json.Unmarshal([]byte(fileData), &mapData)
					if err != nil {
						fmt.Println("解析", code, "KLINE_TYPE_1MIN", "失败-"+err.Error())
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

			fileUrl = fmt.Sprint(QuDataUrl, "/", code, "/SecurityBarsReply")
			if utils.IsExistFileCatalog(fileUrl) {
				fileData, err := ioutil.ReadFile(fmt.Sprint(fileUrl, "/KLINE_TYPE_3MONTH.json"))
				if err == nil {
					var mapData []quotes.SecurityBar
					err = json.Unmarshal([]byte(fileData), &mapData)
					if err != nil {
						fmt.Println("解析", code, "KLINE_TYPE_3MONTH", "失败-"+err.Error())
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

			fileUrl = fmt.Sprint(QuDataUrl, "/", code, "/SecurityBarsReply")
			if utils.IsExistFileCatalog(fileUrl) {
				fileData, err := ioutil.ReadFile(fmt.Sprint(fileUrl, "/KLINE_TYPE_YEARLY.json"))
				if err == nil {
					var mapData []quotes.SecurityBar
					err = json.Unmarshal([]byte(fileData), &mapData)
					if err != nil {
						fmt.Println("解析", code, "KLINE_TYPE_YEARLY", "失败-"+err.Error())
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
							fmt.Println(err.Error())
						} else {
							fileData, err := ioutil.ReadFile(fmt.Sprint(fileUrl, "/", list[i]))
							if err == nil {
								var mapData []quotes.MinuteTime
								err = json.Unmarshal([]byte(fileData), &mapData)
								if err != nil {
									fmt.Println("解析", code, "MinuteTimeReply", "失败-"+err.Error())
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
							fmt.Println(err.Error())
						} else {
							fileData, err := ioutil.ReadFile(fmt.Sprint(fileUrl, "/", list[i]))
							if err == nil {
								var mapData []quotes.TickTransaction
								err = json.Unmarshal([]byte(fileData), &mapData)
								if err != nil {
									fmt.Println("解析", code, "TransactionReply", "失败-"+err.Error())
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
	}
}

func Exit() {
	if Api != nil {
		Api.Close()
	}

	//保存缓存数据
	if QuData != nil {
		var err error
		if !utils.IsExistFileCatalog(QuDataUrl) {
			//创建目录
			err = os.Mkdir(fmt.Sprintf("./%s", QuDataUrl), os.ModePerm)
			if err != nil {
				fmt.Println("创建", "股票数据文件", "目录失败-"+err.Error())
			}
		}

		if err == nil {
			for code := range QuData {
				quData := QuDataGet(code)

				fileUrl := fmt.Sprint(QuDataUrl, "/", code)
				if !utils.IsExistFileCatalog(fileUrl) {
					//创建目录
					err := os.Mkdir(fmt.Sprintf("./%s", fileUrl), os.ModePerm)
					if err != nil {
						fmt.Println("创建", code, "目录失败-"+err.Error())
						continue
					}
				}

				if !quData.SecurityBarsReply.KLINE_TYPE_5MIN.IsEmpty() {
					fileUrl := fmt.Sprint(QuDataUrl, "/", code, "/SecurityBarsReply")
					if !utils.IsExistFileCatalog(fileUrl) {
						//创建目录
						err := os.Mkdir(fmt.Sprintf("./%s", fileUrl), os.ModePerm)
						if err != nil {
							fmt.Println("创建", code, "SecurityBarsReply", "目录失败-"+err.Error())
							continue
						}
					}

					json := gjson.New(quData.SecurityBarsReply.KLINE_TYPE_5MIN.Get().data.List).MustToJsonString()
					err := utils.Setfile(json, fmt.Sprint(fileUrl, "/KLINE_TYPE_5MIN.json"))
					if err != nil {
						fmt.Println("保存", code, "KLINE_TYPE_5MIN", "失败-"+err.Error())
						continue
					}
				}

				if !quData.SecurityBarsReply.KLINE_TYPE_15MIN.IsEmpty() {
					fileUrl := fmt.Sprint(QuDataUrl, "/", code, "/SecurityBarsReply")
					if !utils.IsExistFileCatalog(fileUrl) {
						//创建目录
						err := os.Mkdir(fmt.Sprintf("./%s", fileUrl), os.ModePerm)
						if err != nil {
							fmt.Println("创建", code, "SecurityBarsReply", "目录失败-"+err.Error())
							continue
						}
					}

					json := gjson.New(quData.SecurityBarsReply.KLINE_TYPE_15MIN.Get().data.List).MustToJsonString()
					err := utils.Setfile(json, fmt.Sprint(fileUrl, "/KLINE_TYPE_15MIN.json"))
					if err != nil {
						fmt.Println("保存", code, "KLINE_TYPE_15MIN", "失败-"+err.Error())
						continue
					}
				}

				if !quData.SecurityBarsReply.KLINE_TYPE_30MIN.IsEmpty() {
					fileUrl := fmt.Sprint(QuDataUrl, "/", code, "/SecurityBarsReply")
					if !utils.IsExistFileCatalog(fileUrl) {
						//创建目录
						err := os.Mkdir(fmt.Sprintf("./%s", fileUrl), os.ModePerm)
						if err != nil {
							fmt.Println("创建", code, "SecurityBarsReply", "目录失败-"+err.Error())
							continue
						}
					}

					json := gjson.New(quData.SecurityBarsReply.KLINE_TYPE_30MIN.Get().data.List).MustToJsonString()
					err := utils.Setfile(json, fmt.Sprint(fileUrl, "/KLINE_TYPE_30MIN.json"))
					if err != nil {
						fmt.Println("保存", code, "KLINE_TYPE_30MIN", "失败-"+err.Error())
						continue
					}
				}

				if !quData.SecurityBarsReply.KLINE_TYPE_1HOUR.IsEmpty() {
					fileUrl := fmt.Sprint(QuDataUrl, "/", code, "/SecurityBarsReply")
					if !utils.IsExistFileCatalog(fileUrl) {
						//创建目录
						err := os.Mkdir(fmt.Sprintf("./%s", fileUrl), os.ModePerm)
						if err != nil {
							fmt.Println("创建", code, "SecurityBarsReply", "目录失败-"+err.Error())
							continue
						}
					}

					json := gjson.New(quData.SecurityBarsReply.KLINE_TYPE_1HOUR.Get().data.List).MustToJsonString()
					err := utils.Setfile(json, fmt.Sprint(fileUrl, "/KLINE_TYPE_1HOUR.json"))
					if err != nil {
						fmt.Println("保存", code, "KLINE_TYPE_1HOUR", "失败-"+err.Error())
						continue
					}
				}

				if !quData.SecurityBarsReply.KLINE_TYPE_DAILY.IsEmpty() {
					fileUrl := fmt.Sprint(QuDataUrl, "/", code, "/SecurityBarsReply")
					if !utils.IsExistFileCatalog(fileUrl) {
						//创建目录
						err := os.Mkdir(fmt.Sprintf("./%s", fileUrl), os.ModePerm)
						if err != nil {
							fmt.Println("创建", code, "SecurityBarsReply", "目录失败-"+err.Error())
							continue
						}
					}

					json := gjson.New(quData.SecurityBarsReply.KLINE_TYPE_DAILY.Get().data.List).MustToJsonString()
					err := utils.Setfile(json, fmt.Sprint(fileUrl, "/KLINE_TYPE_DAILY.json"))
					if err != nil {
						fmt.Println("保存", code, "KLINE_TYPE_DAILY", "失败-"+err.Error())
						continue
					}
				}

				if !quData.SecurityBarsReply.KLINE_TYPE_WEEKLY.IsEmpty() {
					fileUrl := fmt.Sprint(QuDataUrl, "/", code, "/SecurityBarsReply")
					if !utils.IsExistFileCatalog(fileUrl) {
						//创建目录
						err := os.Mkdir(fmt.Sprintf("./%s", fileUrl), os.ModePerm)
						if err != nil {
							fmt.Println("创建", code, "SecurityBarsReply", "目录失败-"+err.Error())
							continue
						}
					}

					json := gjson.New(quData.SecurityBarsReply.KLINE_TYPE_WEEKLY.Get().data.List).MustToJsonString()
					err := utils.Setfile(json, fmt.Sprint(fileUrl, "/KLINE_TYPE_WEEKLY.json"))
					if err != nil {
						fmt.Println("保存", code, "KLINE_TYPE_WEEKLY", "失败-"+err.Error())
						continue
					}
				}

				if !quData.SecurityBarsReply.KLINE_TYPE_MONTHLY.IsEmpty() {
					fileUrl := fmt.Sprint(QuDataUrl, "/", code, "/SecurityBarsReply")
					if !utils.IsExistFileCatalog(fileUrl) {
						//创建目录
						err := os.Mkdir(fmt.Sprintf("./%s", fileUrl), os.ModePerm)
						if err != nil {
							fmt.Println("创建", code, "SecurityBarsReply", "目录失败-"+err.Error())
							continue
						}
					}

					json := gjson.New(quData.SecurityBarsReply.KLINE_TYPE_MONTHLY.Get().data.List).MustToJsonString()
					err := utils.Setfile(json, fmt.Sprint(fileUrl, "/KLINE_TYPE_MONTHLY.json"))
					if err != nil {
						fmt.Println("保存", code, "KLINE_TYPE_MONTHLY", "失败-"+err.Error())
						continue
					}
				}

				if !quData.SecurityBarsReply.KLINE_TYPE_1MIN.IsEmpty() {
					fileUrl := fmt.Sprint(QuDataUrl, "/", code, "/SecurityBarsReply")
					if !utils.IsExistFileCatalog(fileUrl) {
						//创建目录
						err := os.Mkdir(fmt.Sprintf("./%s", fileUrl), os.ModePerm)
						if err != nil {
							fmt.Println("创建", code, "SecurityBarsReply", "目录失败-"+err.Error())
							continue
						}
					}

					json := gjson.New(quData.SecurityBarsReply.KLINE_TYPE_1MIN.Get().data.List).MustToJsonString()
					err := utils.Setfile(json, fmt.Sprint(fileUrl, "/KLINE_TYPE_1MIN.json"))
					if err != nil {
						fmt.Println("保存", code, "KLINE_TYPE_1MIN", "失败-"+err.Error())
						continue
					}
				}

				if !quData.SecurityBarsReply.KLINE_TYPE_3MONTH.IsEmpty() {
					fileUrl := fmt.Sprint(QuDataUrl, "/", code, "/SecurityBarsReply")
					if !utils.IsExistFileCatalog(fileUrl) {
						//创建目录
						err := os.Mkdir(fmt.Sprintf("./%s", fileUrl), os.ModePerm)
						if err != nil {
							fmt.Println("创建", code, "SecurityBarsReply", "目录失败-"+err.Error())
							continue
						}
					}

					json := gjson.New(quData.SecurityBarsReply.KLINE_TYPE_3MONTH.Get().data.List).MustToJsonString()
					err := utils.Setfile(json, fmt.Sprint(fileUrl, "/KLINE_TYPE_3MONTH.json"))
					if err != nil {
						fmt.Println("保存", code, "KLINE_TYPE_3MONTH", "失败-"+err.Error())
						continue
					}
				}

				if !quData.SecurityBarsReply.KLINE_TYPE_YEARLY.IsEmpty() {
					fileUrl := fmt.Sprint(QuDataUrl, "/", code, "/SecurityBarsReply")
					if !utils.IsExistFileCatalog(fileUrl) {
						//创建目录
						err := os.Mkdir(fmt.Sprintf("./%s", fileUrl), os.ModePerm)
						if err != nil {
							fmt.Println("创建", code, "SecurityBarsReply", "目录失败-"+err.Error())
							continue
						}
					}

					json := gjson.New(quData.SecurityBarsReply.KLINE_TYPE_YEARLY.Get().data.List).MustToJsonString()
					err := utils.Setfile(json, fmt.Sprint(fileUrl, "/KLINE_TYPE_YEARLY.json"))
					if err != nil {
						fmt.Println("保存", code, "KLINE_TYPE_YEARLY", "失败-"+err.Error())
						continue
					}
				}

				//分时图数据
				if quData.MinuteTimeReply != nil {
					fileUrl := fmt.Sprint(QuDataUrl, "/", code, "/MinuteTimeReply")
					if !utils.IsExistFileCatalog(fileUrl) {
						//创建目录
						err := os.Mkdir(fmt.Sprintf("./%s", fileUrl), os.ModePerm)
						if err != nil {
							fmt.Println("创建", code, "MinuteTimeReply", "目录失败-"+err.Error())
							continue
						}
					}

					for key := range quData.MinuteTimeReply {
						minuteTimeReply := quData.MinuteTimeReply[key]

						json := gjson.New(minuteTimeReply.Get().data.List).MustToJsonString()
						err := utils.Setfile(json, fmt.Sprint(fileUrl, "/", key, ".json"))
						if err != nil {
							fmt.Println("保存", code, key, "MinuteTimeReply", "失败-"+err.Error())
							continue
						}
					}
				}

				//分时成交
				if quData.TransactionReply != nil {
					fileUrl := fmt.Sprint(QuDataUrl, "/", code, "/TransactionReply")
					if !utils.IsExistFileCatalog(fileUrl) {
						//创建目录
						err := os.Mkdir(fmt.Sprintf("./%s", fileUrl), os.ModePerm)
						if err != nil {
							fmt.Println("创建", code, "TransactionReply", "目录失败-"+err.Error())
							continue
						}
					}

					for key := range quData.TransactionReply {
						transactionReply := quData.TransactionReply[key]

						json := gjson.New(transactionReply.Get().data.List).MustToJsonString()
						err := utils.Setfile(json, fmt.Sprint(fileUrl, "/", key, ".json"))
						if err != nil {
							fmt.Println("保存", code, key, "TransactionReply", "失败-"+err.Error())
							continue
						}
					}
				}

			}
		}

	}
}

func Run() {
	fmt.Println("开始数据操作", Public.LogPrintln隔行符号)

	//获取QuData
	go func() {
		snapshot, err := Api.GetSnapshot(Qu_ZXG_Arrs)

		if err == nil {
			for i := 0; i < len(snapshot); i++ {
				quData := QuDataGet(snapshot[i].Code)
				if !quData.IsEmpty() {
					quData.SetSnapshot(Snapshot{
						time.Now(),
						snapshot[i],
					})
				}
			}
		}

		date, err := utils.DateTyUint32(time.Now())
		if err != nil {
			fmt.Println(err.Error())
			return
		}

		//获取一次性数据
		for code := range QuData {

			codeTypeTy := Publics.CodeTypeTy(code)

			quData := QuDataGet(code)

			//基本面
			if quData.FinanceInfo.IsEmpty() {
				info, err := Api.GetFinanceInfo(codeTypeTy)
				if err == nil {
					quData.SetFinanceInfo(FinanceInfo{
						time.Now(),
						info,
					})
				} else {
					fmt.Println("【数据获取失败】", "【基本面】", code)
				}
			}

			//除权除息信息
			if quData.XdxrInfo.IsEmpty() {
				xdxrInfo, err := Api.GetXdxrInfo(codeTypeTy)
				if err == nil {
					quData.SetXdxrInfo(XdxrInfo{
						time.Now(),
						xdxrInfo,
					})
				} else {
					fmt.Println("【数据获取失败】", "【除权除息信息】", code)
				}
			}

			//K线
			klines, err := Api.GetKLine(codeTypeTy, proto.KLINE_TYPE_RI_K, 0, IKGetMxLen)
			if err == nil {
				quData.SetSecurityBarsReply(proto.KLINE_TYPE_DAILY, SecurityBarsReply_data_KLINE_TYPE{
					time.Now(),
					klines,
				})
			} else {
				fmt.Println("【数据获取失败】", "【K线】", code)
			}

			//历史分时图数据
			dateAoArr, err := utils.DateAoArr(time.Now(), HistoryMinuteTimeDataGetMxLen)
			if err == nil {
				for i := 0; i < len(dateAoArr); i++ {
					dateAo := dateAoArr[i]

					//已经存在数据，跳过获取
					{
						minuteTimeReply := quData.GetMinuteTimeReply(dateAo)
						if minuteTimeReply != nil {
							continue
						}
					}

					historyMinuteTimeData, err := Api.GetHistoryMinuteTimeData(codeTypeTy, dateAo)
					if err == nil {
						quData.SetMinuteTimeReply(dateAo, MinuteTimeReply{
							time.Now(),
							historyMinuteTimeData,
						})
					} else {
						fmt.Println("【数据获取失败】", "【历史分时图数据】", code, dateAo)
					}
				}
			} else {
				fmt.Println("【数据获取失败】", "【历史分时图数据】", code)
			}

			//历史分时成交
			dateAoArr, err = utils.DateAoArr(time.Now(), HistoryTransactionDataGetMxLen)
			if err == nil {
				for i := 0; i < len(dateAoArr); i++ {
					dateAo := dateAoArr[i]

					//已经存在数据，跳过获取
					{
						transactionReply := quData.GetTransactionReply(dateAo)
						if transactionReply != nil {
							continue
						}
					}

					var tickTransactions []quotes.TickTransaction
					start := 0
					for {
						//一次获取最大数量
						getIxCount := uint16(3600)
						historyTransactionData, err := Api.GetHistoryTransactionData(codeTypeTy, dateAo, uint16(start), getIxCount)
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
							fmt.Println("【数据获取失败】", "【历史分时成交】", code, dateAo)
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
				fmt.Println("【数据获取失败】", "【历史分时成交】", code)
			}

		}

		return

		//循环获取数据
		for {
			//获取当日数据
			for code := range QuData {

				codeTypeTy := Publics.CodeTypeTy(code)

				quData := QuDataGet(code)

				//K线
				klines, err := Api.GetKLine(codeTypeTy, proto.KLINE_TYPE_RI_K, 0, 1)
				if err == nil {
					quData.SetSecurityBarsReply(proto.KLINE_TYPE_DAILY, SecurityBarsReply_data_KLINE_TYPE{
						time.Now(),
						klines,
					})
				} else {
					fmt.Println("【数据获取失败】", "【K线】", code)
				}

				//分时图数据
				minuteTimeData, err := Api.GetMinuteTimeData(codeTypeTy)
				if err == nil {
					quData.SetMinuteTimeReply(date, MinuteTimeReply{
						time.Now(),
						minuteTimeData,
					})
				} else {
					fmt.Println("【数据获取失败】", "【分时图数据】", code)
				}

				//分时成交
				//transactionData, err := Api.GetTransactionData(codeTypeTy, 0, 1800)
				//if err == nil {
				//	quData.SetTransactionReply (date,TransactionReply{
				//		time.Now(),
				//		transactionData,
				//	})
				//} else {
				//	fmt.Println("【数据获取失败】", "【分时成交】", code)
				//}

				time.Sleep(time.Second * 2)
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

			for i := 0; i < len(Qu_ZXG_Arrs); i++ {
				code := Qu_ZXG_Arrs[i]
				snapshot := QuDataGet(code).Snapshot.Get()
				if snapshot == nil {
					continue
				}
				卖档1金额 := float64(snapshot.data.AskVol1) * snapshot.data.Ask1
				if 卖档1金额 >= 卖金额阈值 {
					监控列表add(监控列表_data{"开盘竞价量监控-卖", snapshot.data.Code})
				}
				买档1金额 := float64(snapshot.data.BidVol1) * snapshot.data.Bid1
				if 买档1金额 >= 买金额阈值 {
					监控列表add(监控列表_data{"开盘竞价量监控-买", snapshot.data.Code})
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
func ZXGGet(file string) (qu_ZXGx_Arrs []string, qu_ZXG_Arrs []string, err error) {
	arrs, err := utils.LineByLine(file)
	if err != nil {
		return nil, nil, errors.New(fmt.Sprint("读取文本失败 ", err.Error()))
	}
	for i := 0; i < len(arrs); i++ {
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
