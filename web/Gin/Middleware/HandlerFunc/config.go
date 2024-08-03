package HandlerFunc

import (
	"github.com/gin-gonic/gin"
	"tdx/web/Gin/Middleware/Context"
)

// 校验Token中间件 HandlerFunc类型
func GetTokenHandlerFunc() gin.HandlerFunc {
	return Context.GetTokenContext
}

// 处理跨域问题 中间件
func KuaYuChuLiHandlerFunc() gin.HandlerFunc {
	return Context.KuaYuChuLiContext
}

// 中间件 判断是否签发者是 DianCanWaiMai
func DianCanWaiOnHandlerFunc() gin.HandlerFunc {
	return Context.DianCanWaiOn
}

// 中间件 DianCanWaiMai 从token申请地址判断是用的什么端
func DianCanWaiMaiChangJingDuanTypeHandlerFunc() gin.HandlerFunc {
	return Context.DianCanWaiMaiChangJingDuanType
}

// 中间件 Cookie2转换Cookie
func Cookie2SetCookieHandlerFunc() gin.HandlerFunc {
	return Context.Cookie2SetCookie
}

// 中间件 判断是否签发者是 DianCanWaiMai 并且是 后台管理员
func DianCanWaiHouTaiOnGuanLiYuanHandlerFunc() gin.HandlerFunc {
	return Context.DianCanWaiHouTaiOnGuanLiYuan
}
