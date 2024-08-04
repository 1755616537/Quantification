package Quantification

import (
	"gitee.com/quant1x/gotdx/proto"
	"gitee.com/quant1x/gotdx/quotes"
	"time"
)

// 股票数据
var QuData = make(map[string]*QuData_data)

// 股票数据 获取
func QuDataGet(code string) *QuData_data {
	date, ok := QuData[code]
	if !ok {
		QuData[code] = new(QuData_data)
		return QuData[code]
	}
	return date
}

// 股票数据类型
type QuData_data struct {
	//快照数据
	Snapshot Snapshot
	//基本面
	FinanceInfo FinanceInfo
	//K线
	SecurityBarsReply SecurityBarsReply_data
	//分时图数据
	MinuteTimeReply map[uint32]MinuteTimeReply
	//分时成交
	TransactionReply map[uint32]TransactionReply
	//除权除息信息
	XdxrInfo XdxrInfo
}

// 判断 是否为空
func (s *QuData_data) IsEmpty() bool {
	return s == nil
}

// 分时图数据 获取
func (s *QuData_data) GetMinuteTimeReply(ix uint32) *MinuteTimeReply {
	if s.IsEmpty() {
		return nil
	}
	if s.MinuteTimeReply == nil {
		s.MinuteTimeReply = make(map[uint32]MinuteTimeReply)
		return nil
	}
	r := s.MinuteTimeReply[ix]
	if r.IsEmpty() {
		return nil
	}
	return &r
}

// 分时成交 获取
func (s *QuData_data) GetTransactionReply(ix uint32) *TransactionReply {
	if s.IsEmpty() {
		return nil
	}
	if s.TransactionReply == nil {
		s.TransactionReply = make(map[uint32]TransactionReply)
		return nil
	}
	r := s.TransactionReply[ix]
	if r.IsEmpty() {
		return nil
	}
	return &r
}

// 快照数据 修改
func (s *QuData_data) SetSnapshot(d Snapshot) {
	if s.IsEmpty() {
		return
	}
	s.Snapshot = d
}

// 基本面 修改
func (s *QuData_data) SetFinanceInfo(d FinanceInfo) {
	if s.IsEmpty() {
		return
	}
	s.FinanceInfo = d
}

// K线 修改
func (s *QuData_data) SetSecurityBarsReply(ty int, d SecurityBarsReply_data_KLINE_TYPE) {
	if s.IsEmpty() {
		return
	}
	if ty == proto.KLINE_TYPE_5MIN {
		s.SecurityBarsReply.KLINE_TYPE_5MIN = d
	} else if ty == proto.KLINE_TYPE_15MIN {
		s.SecurityBarsReply.KLINE_TYPE_15MIN = d
	} else if ty == proto.KLINE_TYPE_30MIN {
		s.SecurityBarsReply.KLINE_TYPE_30MIN = d
	} else if ty == proto.KLINE_TYPE_1HOUR {
		s.SecurityBarsReply.KLINE_TYPE_1HOUR = d
	} else if ty == proto.KLINE_TYPE_DAILY {
		s.SecurityBarsReply.KLINE_TYPE_DAILY = d
	} else if ty == proto.KLINE_TYPE_WEEKLY {
		s.SecurityBarsReply.KLINE_TYPE_WEEKLY = d
	} else if ty == proto.KLINE_TYPE_MONTHLY {
		s.SecurityBarsReply.KLINE_TYPE_MONTHLY = d
	} else if ty == proto.KLINE_TYPE_1MIN {
		s.SecurityBarsReply.KLINE_TYPE_1MIN = d
	} else if ty == proto.KLINE_TYPE_3MONTH {
		s.SecurityBarsReply.KLINE_TYPE_3MONTH = d
	} else if ty == proto.KLINE_TYPE_YEARLY {
		s.SecurityBarsReply.KLINE_TYPE_YEARLY = d
	}

}

// 分时图数据 修改
func (s *QuData_data) SetMinuteTimeReply(ix uint32, d MinuteTimeReply) {
	if s.IsEmpty() {
		return
	}
	if s.MinuteTimeReply == nil {
		s.MinuteTimeReply = make(map[uint32]MinuteTimeReply)
	}
	s.MinuteTimeReply[ix] = d
}

// 分时成交 修改
func (s *QuData_data) SetTransactionReply(ix uint32, d TransactionReply) {
	if s.IsEmpty() {
		return
	}
	if s.TransactionReply == nil {
		s.TransactionReply = make(map[uint32]TransactionReply)
	}
	s.TransactionReply[ix] = d
}

// 除权除息信息 修改
func (s *QuData_data) SetXdxrInfo(d XdxrInfo) {
	if s.IsEmpty() {
		return
	}
	s.XdxrInfo = d
}

type Snapshot struct {
	//更新时间
	upTime time.Time

	//快照数据
	Data quotes.Snapshot
}

// 判断 是否为空
func (s *Snapshot) IsEmpty() bool {
	if s == nil {
		return true
	}
	return s.upTime.IsZero() || s.Data == quotes.Snapshot{}
}

func (s *Snapshot) Get() *Snapshot {
	if s.IsEmpty() {
		return nil
	}
	return s
}

type FinanceInfo struct {
	//更新时间
	upTime time.Time

	//基本面
	data *quotes.FinanceInfo
}

// 判断 是否为空
func (s *FinanceInfo) IsEmpty() bool {
	if s == nil {
		return true
	}
	return s.upTime.IsZero() || s.data == nil
}

func (s *FinanceInfo) Get() *FinanceInfo {
	if s.IsEmpty() {
		return nil
	}
	return s
}

type MinuteTimeReply struct {
	//更新时间
	upTime time.Time

	//分时图数据
	data *quotes.MinuteTimeReply
}

// 判断 是否为空
func (s *MinuteTimeReply) IsEmpty() bool {
	if s == nil {
		return true
	}
	return s.upTime.IsZero() || s.data == nil
}

func (s *MinuteTimeReply) Get() *MinuteTimeReply {
	if s.IsEmpty() {
		return nil
	}
	return s
}

type TransactionReply struct {
	//更新时间
	upTime time.Time

	//分时成交
	data *quotes.TransactionReply
}

// 判断 是否为空
func (s *TransactionReply) IsEmpty() bool {
	if s == nil {
		return true
	}
	return s.upTime.IsZero() || s.data == nil
}

func (s *TransactionReply) Get() *TransactionReply {
	if s.IsEmpty() {
		return nil
	}
	return s
}

type XdxrInfo struct {
	//更新时间
	upTime time.Time

	//除权除息信息
	data []quotes.XdxrInfo
}

// 判断 是否为空
func (s *XdxrInfo) IsEmpty() bool {
	if s == nil {
		return true
	}
	return s.upTime.IsZero() || s.data == nil
}

func (s *XdxrInfo) Get() *XdxrInfo {
	if s.IsEmpty() {
		return nil
	}
	return s
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

// 判断 是否为空
func (s *SecurityBarsReply_data_KLINE_TYPE) IsEmpty() bool {
	if s == nil {
		return true
	}
	return s.upTime.IsZero() || s.data == nil
}

func (s *SecurityBarsReply_data_KLINE_TYPE) Get() *SecurityBarsReply_data_KLINE_TYPE {
	if s.IsEmpty() {
		return nil
	}
	return s
}
