package eastmoney

import (
	"fmt"
	"github.com/1755616537/utils"
	"github.com/gogf/gf/encoding/gjson"
	"github.com/gogf/gf/util/grand"
	"strconv"
	"time"
)

func HttpGet(method, httpUrl, cb string) (*gjson.Json, []interface{}, error) {
	headers := make(map[string]string)
	headers["Content-Type"] = "application/javascript; charset=UTF-8"
	headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
	headers["Access-Control-Allow-Origin"] = "*"
	headers["Access-Control-Allow-Credentials"] = "true"
	//headers["Connection"] = "close"
	//headers["Cache-Control"] = "no-cache"
	//headers["Cache-Length"] = fmt.Sprint(len(httpUrl))

	_, ress, err := utils.HTTPGet2Headers(method, httpUrl, nil, headers)
	if err != nil {
		return nil, nil, err
	}

	//ressJsons := utils.GetBetweenStr(ress, utils.GetBetweenStr(ress, "jQuery", "("), ")")
	ressJsons := utils.GetBetweenStr(ress, fmt.Sprint(cb, "("), ")")
	ressJson := gjson.New(ressJsons)
	ressJsonData := ressJson.GetArray("data.diff")
	return ressJson, ressJsonData, nil
}

// mergeMaps 合并两个映射，ops 中的键值会覆盖 dft 中相同的键值
func mergeMaps(dft, ops map[string]interface{}) map[string]interface{} {
	// 创建一个新的映射来存储合并的结果
	merged := make(map[string]interface{})
	for k, v := range dft {
		merged[k] = v
	}
	for k, v := range ops {
		merged[k] = v
	}
	return merged
}

func GenerateJSONPCallbackName() string {
	// 生成一个随机数
	randomNumber := grand.Str("1234567890", 21)
	// 生成时间戳
	timestamp := time.Now().UnixNano() / int64(time.Millisecond)
	// 拼接时间戳、随机数和前缀
	prefix := "jQuery"
	suffix := fmt.Sprint(randomNumber, "_", strconv.FormatInt(timestamp, 10))
	return fmt.Sprint(prefix, suffix)
}
