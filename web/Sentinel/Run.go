package Sentinel

import (
	"errors"
	"fmt"
	sentinelApi "github.com/alibaba/sentinel-golang/api"
	"github.com/alibaba/sentinel-golang/core/flow"
)

// 初始化 Sentinel
func RunSentinel() error {
	err := sentinelApi.InitDefault()
	if err != nil {
		return errors.New(fmt.Sprint("初始化", "Sentinel", "配置", "失败", err.Error()))
	}

	// 配置一条限流规则
	_, err = flow.LoadRules([]*flow.Rule{
		{
			//资源名
			Resource: "sentinel-go",
			//当前流量控制器的Token计算策略。Direct表示直接使用字段 Threshold 作为阈值；WarmUp表示使用预热方式计算Token的阈值。
			TokenCalculateStrategy: flow.Direct,
			//表示流量控制器的控制策略；Reject表示超过阈值直接拒绝，Throttling表示匀速排队。
			ControlBehavior: flow.Reject,
			//表示流控阈值；如果字段 StatIntervalInMs 是1000(也就是1秒)，那么Threshold就表示QPS，流量控制器也就会依据资源的QPS来做流控。
			Threshold: 80,
			//调用关系限流策略，CurrentResource表示使用当前规则的resource做流控；AssociatedResource表示使用关联的resource做流控，关联的resource在字段 RefResource 定义；
			//RelationStrategy:flow.RelationStrategy(0),
			//关联的resource；
			//RefResource:"",
			//预热的时间长度，该字段仅仅对 WarmUp 的TokenCalculateStrategy生效；
			//WarmUpPeriodSec:10000,
			//预热的因子，默认是3，该值的设置会影响预热的速度，该字段仅仅对 WarmUp 的TokenCalculateStrategy生效；
			WarmUpColdFactor: 3,
			//匀速排队的最大等待时间，该字段仅仅对 Throttling ControlBehavior生效；
			MaxQueueingTimeMs: 500,
			//规则对应的流量控制器的独立统计结构的统计周期。如果StatIntervalInMs是1000，也就是统计QPS。
			StatIntervalInMs: 100,
		},
	})
	if err != nil {
		return errors.New(fmt.Sprint("初始化", "Sentinel", "限流规则", "失败", err.Error()))
	}

	return nil
}
