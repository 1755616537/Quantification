package Context

import (
	"github.com/1755616537/utils"
	"github.com/gin-gonic/gin"
	"net/http"
)

// DianCanWaiMai 从token申请地址判断是用的什么端
func DianCanWaiMaiChangJingDuanType(context *gin.Context) {
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

	//从token申请地址判断是什么端的用户
	var (
		//订单类型 1=微信 2=支付宝 3=QQ
		DingDanType int
		//支付类型 -1=未定义 1=公众号支付 2=扫码支付 3=APP支付 4=付款码支付 5=H5支付 6=刷脸支付 7=小程序
		ZhiFuType int
	)
	{
		switch tokenPayloadType.ShenQingDiZhi {
		case "/api/v1/DianCanWaiMai/public/wechat/CodeShouQuanHuanQuAccessToken":
			//微信小程序
			DingDanType = 1
			//在微信小程序中，支付会是公众号支付
			ZhiFuType = 1
		case "/api/v1/DianCanWaiMai/public/alipay/CodeShouQuanHuanQuAccessToken":
			DingDanType = 2
			ZhiFuType = 7
		default:
			context.JSON(http.StatusOK, gin.H{
				"code": "1",
				"msg":  "签发地址,无权限",
			})
			//数据挂起,打断
			context.Abort()
			return
		}
	}

	var ShiYongLeiXing string
	switch DingDanType {
	case 1:
		switch ZhiFuType {
		case 1:
			ShiYongLeiXing = "微信小程序(或公众号)"
		case 2:
			ShiYongLeiXing = "微信PC网页"
		case 3:
			ShiYongLeiXing = "微信APP"
		case 4:
			ShiYongLeiXing = "微信设备"
		case 5:
			ShiYongLeiXing = "微信公众号"
		case 6:
			ShiYongLeiXing = "微信手机(或设备)"
		case 7:
			ShiYongLeiXing = "微信小程序"
		default:
			context.JSON(http.StatusInternalServerError, gin.H{
				"code": "1",
				"msg":  "判断使用类型失败",
			})
			//数据挂起,打断
			context.Abort()
			return
		}
	case 2:
		switch ZhiFuType {
		case 1:
			ShiYongLeiXing = "支付宝公众号"
		case 2:
			ShiYongLeiXing = "支付宝PC网页"
		case 3:
			ShiYongLeiXing = "支付宝APP"
		case 4:
			ShiYongLeiXing = "支付宝设备"
		case 5:
			ShiYongLeiXing = "支付宝H5"
		case 6:
			ShiYongLeiXing = "支付宝手机(或设备)"
		case 7:
			ShiYongLeiXing = "支付宝小程序"
		default:
			context.JSON(http.StatusInternalServerError, gin.H{
				"code": "1",
				"msg":  "判断使用类型失败",
			})
			//数据挂起,打断
			context.Abort()
			return
		}
	case 3:
		switch ZhiFuType {
		default:
			context.JSON(http.StatusInternalServerError, gin.H{
				"code": "1",
				"msg":  "判断使用类型失败",
			})
			//数据挂起,打断
			context.Abort()
			return
		}
	default:
		context.JSON(http.StatusInternalServerError, gin.H{
			"code": "1",
			"msg":  "判断使用类型失败",
		})
		//数据挂起,打断
		context.Abort()
		return
	}

	context.Set("DingDanType", DingDanType)
	context.Set("ZhiFuType", ZhiFuType)
	context.Set("ShiYongLeiXing", ShiYongLeiXing)

	context.Next() //处理请求(只能在中间件中使用)
	return
}
