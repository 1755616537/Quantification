package eastmoney

import (
	"fmt"
	"math/rand"
	"time"
)

type GetQtClist_data struct {
	//股票代码 f12
	Code String
	//名称 f14
	Name String
	//最新价           f2
	Close String
	//涨跌幅           f3
	ChangePercent String
	//涨跌额           f4
	Change String
	//成交量(手) f5
	Volume String
	//成交额 f6
	Amount String
	//振幅 f7
	Amplitude String
	//最高 f15
	Hign String
	//最低 f16
	Low String
	//今开 f17
	Open String
	//昨收 f18
	PreviousClose String
	//量比 f10
	VolumeRate String
	//换手率 f8
	TurnoverRate String
	//市盈率(动态) f9
	PERation String
	//市净率 f23
	PB String
	//总市值 f20
	TMC String
	//流通市值 f21
	CMC String
	//60日涨跌幅 f24
	DPC60 String
	//年初至今涨跌幅 f25
	YearToDate String
	//涨速 f22
	RateOfIncrease String
	//5分钟涨跌 f11
	MPC5 String
	//加自选 addzixuan
	Links String
}

type String string

func (r String) Get() string {
	if r == "-" {
		return ""
	}
	return string(r)
}

// 获取行情数据
func GetQtClist(fsty bool) ([]GetQtClist_data, error) {
	//indexjsonJson := gjson.New(indexjson)
	//ops := indexjsonJson.GetJson("ops4")

	//config := gjson.New(configData)
	//tableHead := config.GetJson("head")

	//ops = gjson.New(mergeMaps(ops.Map(), tableHead.Map()))

	//dft := &gjson.Json{}
	//_ = dft.Set("container.orderDur", false)
	//_ = dft.Set("container.index", 1)
	//_ = dft.Set("container.pagesize", config.Get("sumcount"))

	//上证a股
	fs := "m:1+t:2,m:1+t:23"
	if !fsty {
		//深证a股
		fs = "m:0+t:6,m:0+t:80"
	}

	timestamp := time.Now().UnixNano() / int64(time.Millisecond)

	//每页大小
	pz := 20
	//页数
	pn := 1

	np := 1
	ut := "bd1d9ddb04089700cf9c27f6f7426281"
	//ut := ""
	fltt := 2
	invt := 2
	dect := 1

	//wbp2u=UID|用户组织类型|通行证类型|用户交易类型|终端名称（app包名）
	//原文件 webpack:///src/modules/quotedelay/index.ts
	wbp2u := "|0|0|0|web"

	//排序
	//大到小
	po := "1"
	//小到大
	//po:="0"

	//排序的类型
	//涨幅榜
	fid := "f3"

	//类型列表
	//fields := config.GetString("hushenAStock.fields")
	//沪深A股
	fields := "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152"

	rand.Seed(time.Now().UnixNano())
	randomNumber := rand.Intn(100) + 1

	cb := GenerateJSONPCallbackName()

	httpUrl := fmt.Sprint(
		"http:", "//", randomNumber, ".push2.eastmoney.com", "/api/qt/clist/get?",
		"cb=", cb, "&",
		"pn=", pn, "&",
		"pz=", pz, "&",
		"po=", po, "&",
		"np=", np, "&",
		"ut=", ut, "&",
		"fltt=", fltt, "&",
		"invt=", invt, "&",
		"dect=", dect, "&",
		"wbp2u=", wbp2u, "&",
		"fid=", fid, "&",
		"fs=", fs, "&",
		"fields=", fields, "&",
		"_=", timestamp,
	)
	//fmt.Println(httpUrl)

	_, ressJsonData, err := HttpGet("GET", httpUrl, cb)
	if err != nil {
		return nil, err
	}

	var data []GetQtClist_data
	for _, v := range ressJsonData {
		vm := v.(map[string]interface{})
		data = append(data, GetQtClist_data{
			Code:           String(fmt.Sprint(vm["f12"])),
			Name:           String(fmt.Sprint(vm["f14"])),
			Close:          String(fmt.Sprint(vm["f3"])),
			ChangePercent:  String(fmt.Sprint(vm["f3"])),
			Change:         String(fmt.Sprint(vm["f4"])),
			Volume:         String(fmt.Sprint(vm["f5"])),
			Amount:         String(fmt.Sprintf("%.f", vm["f6"])),
			Amplitude:      String(fmt.Sprint(vm["f7"])),
			Hign:           String(fmt.Sprint(vm["f15"])),
			Low:            String(fmt.Sprint(vm["f16"])),
			Open:           String(fmt.Sprint(vm["f17"])),
			PreviousClose:  String(fmt.Sprint(vm["f18"])),
			VolumeRate:     String(fmt.Sprint(vm["f10"])),
			TurnoverRate:   String(fmt.Sprint(vm["f8"])),
			PERation:       String(fmt.Sprint(vm["f9"])),
			PB:             String(fmt.Sprint(vm["f23"])),
			TMC:            String(fmt.Sprintf("%.f", vm["f20"])),
			CMC:            String(fmt.Sprintf("%.f", vm["f21"])),
			DPC60:          String(fmt.Sprint(vm["f24"])),
			YearToDate:     String(fmt.Sprint(vm["f25"])),
			RateOfIncrease: String(fmt.Sprint(vm["f22"])),
			MPC5:           String(fmt.Sprint(vm["f11"])),
			//Links:        String(fmt.Sprint(vm["addzixuan"])),
		})
	}

	return data, nil
}

// 获取指数
func GetQtUlistNp() {

}
