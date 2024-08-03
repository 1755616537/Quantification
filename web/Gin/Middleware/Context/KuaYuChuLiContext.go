package Context

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

// 处理跨域问题
func KuaYuChuLiContext(context *gin.Context) {
	//for i, i2 := range context.Request.Header {
	//	fmt.Println(i,i2)
	//}

	method := context.Request.Method

	//允许跨域的请求源
	context.Header("Origin", "*")
	//接收的请求方法
	context.Header("Access-Control-Request-Method", "*")
	//请求头接收类型
	context.Header("Access-Control-Request-Headers", "*")

	context.Header("Access-Control-Allow-Origin", "*")
	context.Header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,AccessToken,X-CSRF-Token,Authorization,Token")
	context.Header("Access-Control-Allow-Methods", "POST,GET,OPTIONS,PUT,PATCH,DELETE")
	context.Header("Access-Control-Expose-Headers", "Content-Length,Access-Control-Allow-Origin,Access-Control-Allow-Headers,Cache-Control,Content-Language,Content-Type")
	context.Header("Access-Control-Allow-Credentials", "true")
	//context.Header("Access-Control-Allow-Credentials", "false")

	// 放行所有OPTIONS方法，因为有的模板是要请求两次的
	if method == "OPTIONS" {
		context.AbortWithStatus(http.StatusNoContent)
	}

	context.Next() //处理请求(只能在中间件中使用)
}
