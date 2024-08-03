package Context

import (
	"fmt"
	"github.com/gin-gonic/gin"
)

// Cookie2转换Cookie Context类型
func Cookie2SetCookie(context *gin.Context) {
	//fmt.Println(context.Cookie("token"))
	//fmt.Println("GetHeaderToken===",context.GetHeader("Token"))

	//token, err := context.Cookie("token")
	//if err != nil || token == "" {
	//	context.Request.Header.Set("Cookie",context.GetHeader("Token"))
	//}

	for i, i2 := range context.Request.Header {
		fmt.Println("Header===【", i, i2, "】")
	}

	context.Next() //处理请求(只能在中间件中使用)
	return
}
