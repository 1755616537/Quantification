package Context

import (
	"github.com/1755616537/utils"
	"github.com/gin-gonic/gin"
	"net/http"
)

// 校验Token中间件 Context类型
func GetTokenContext(context *gin.Context) {
	//获取Token
	token, err := context.Cookie("token")
	if err != nil || token == "" {
		token = context.GetHeader("Token")
		if token == "" {
			context.JSON(http.StatusCreated, gin.H{
				"code": "1",
				"msg":  "校验令牌失败",
			})
			//数据挂起,打断
			context.Abort()
			return
		}
	}
	//传递未解析字符串型的Token
	context.Set("tokenString", token)

	//校验Token
	tokenPayloadType, err := utils.GetToken(token, context)
	if err != nil {
		context.JSON(http.StatusCreated, gin.H{
			"code": "1",
			"msg":  err.Error(),
		})
		//数据挂起,打断
		context.Abort()
		return
	}

	//传递Token中的payload
	context.Set("token", tokenPayloadType)

	context.Next() //处理请求(只能在中间件中使用)
	return
}
