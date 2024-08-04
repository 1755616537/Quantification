package Public

import (
	"fmt"
	"strings"
)

// 股票前缀转换
func CodeTypeTy(code string) string {
	if len(code) < 1 {
		return ""
	}

	if strings.HasPrefix(code, "6") {
		return fmt.Sprint("sh", code)
	} else if strings.HasPrefix(code, "0") {
		return fmt.Sprint("sz", code)
	}

	return ""
}

// 股票前缀转换 反转
func CodeTypeTyN(code string) string {
	if len(code) < 2 {
		return ""
	}

	if strings.HasPrefix(code, "sh") {
		return code[2:]
	} else if strings.HasPrefix(code, "sz") {
		return code[2:]
	}

	return ""
}
