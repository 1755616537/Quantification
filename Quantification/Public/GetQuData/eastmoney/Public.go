package eastmoney

import (
	"fmt"
	"github.com/gogf/gf/util/grand"
	"strconv"
	"time"
)

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
