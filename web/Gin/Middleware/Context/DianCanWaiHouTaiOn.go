package Context

import (
	"github.com/1755616537/utils"
	"github.com/gin-gonic/gin"
	"net/http"
)

// 判断是否签发者是 DianCanWaiMai 并且是 后台管理员
func DianCanWaiHouTaiOnGuanLiYuan(context *gin.Context) {
	tokenInterface, errbool := context.Get("token")
	if !errbool {
		context.JSON(http.StatusOK, gin.H{
			"code": "1",
			"msg":  "令牌异常",
		})
		//数据挂起,打断
		context.Abort()
		return
	}
	//转换结构体
	tokenPayloadType := tokenInterface.(*utils.PayloadType)

	if tokenPayloadType.QianFaZhe != "DianCanWaiMai" {
		context.JSON(http.StatusOK, gin.H{
			"code": "1",
			"msg":  "令牌权限不足",
		})
		//数据挂起,打断
		context.Abort()
		return
	}

	if tokenPayloadType.QuanXian != "后台-超级管理员" && tokenPayloadType.QuanXian != "后台-管理员" {
		context.JSON(http.StatusOK, gin.H{
			"code": "1",
			"msg":  "令牌权限不足",
		})
		//数据挂起,打断
		context.Abort()
		return
	}

	context.Next() //处理请求(只能在中间件中使用)
	return
}
