package Gin

import (
	"errors"
	"fmt"
	"github.com/1755616537/utils"
	sentinel "github.com/alibaba/sentinel-golang/api"
	"github.com/alibaba/sentinel-golang/core/base"
	"github.com/gin-gonic/gin"
	"github.com/patrickmn/go-cache"
	"html/template"
	"net/http"
	"strings"
	"tdx/Quantification"
	Public2 "tdx/Quantification/Public"
	Public4 "tdx/web/Gin/Api/Public"
	ZhongJianJian2 "tdx/web/Gin/Middleware"
	"tdx/web/Gin/Public"
	"time"
)

// 启动Gin iP=IP地址 duanKou=端口
func RunGin(iP string, duanKou int, _gin *Public.Gin, _err *error) *Public.Gin {
	//默认ip为本地
	if iP == "" {
		//iP="localhost"
		iP = "0.0.0.0"
	}

	//获取日记
	getRjJiall, _ := utils.GetRiJi()
	getRjJi := getRjJiall[0]

	//获取Gin
	__gin := &Public.Gin{
		QianZhuiMing: fmt.Sprint(utils.GetConfig("Gin.QianZhuiMing").(string), "[端口:", duanKou, "]"),
		Ip:           iP,
		DuanKou:      duanKou,
	}

	getRjJi.RiJiShuChuTiShiPrintln(__gin.QianZhuiMing, "启动中...")

	// 创建实例
	router := gin.New()

	//设置日记输出格式
	//gin.DebugPrintRouteFunc = func(httpMethod, absolutePath, handlerName string, nuHandlers int) {
	//	log.Printf("endpoint %v %v %v %v\n", httpMethod, absolutePath, handlerName, nuHandlers)
	//}

	//报错恢复中间件
	router.Use(gin.Recovery())
	//日记中间件
	router.Use(gin.Logger())
	//处理跨域问题
	//router.Use(HandlerFunc.KuaYuChuLiHandlerFunc())
	//把http转换成https中间件
	//router.Use(ZhongJianJian.SSLCertificate())

	//不限制流量的接口路径
	var NoBanList []string = []string{
		//获取验证码
		"/api/v1/Public/GetVerificationCodeImg",
	}
	//Sentinel 中间件 限流
	router.Use(func(context *gin.Context) {
		// Entry 方法用于埋点
		_SentinelEntry, _lockError := sentinel.Entry("sentinel-go", sentinel.WithTrafficType(base.Inbound))
		if _lockError != nil {
			// 请求被拒绝，在此处进行处理
			// 请求被流控，可以从 BlockError 中获取限流详情
			// block 后不需要进行 Exit()

			var On = false
			for _, i2 := range NoBanList {
				if strings.Contains(context.FullPath(), i2) {
					On = true
					break
				}
			}
			if !On {
				//执行限制流量
				{
					context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
						"code": http.StatusInternalServerError,
						"msg":  "服务器繁忙,请稍后再试!",
					})
					//数据挂起,打断
					context.Abort()
					return
				}
			} else {
				// 请求可以通过，在此处编写您的业务逻辑

				context.Next() //处理请求(只能在中间件中使用)

			}
		} else {
			// 请求可以通过，在此处编写您的业务逻辑
			// 务必保证业务逻辑结束后 Exit

			context.Next() //处理请求(只能在中间件中使用)

			// 务必保证业务逻辑结束后 Exit
			_SentinelEntry.Exit()
		}
	})
	//IP,Toekn频繁限制 中间件
	router.Use(func(context *gin.Context) {
		var On = false
		for _, i2 := range NoBanList {
			if strings.Contains(context.FullPath(), i2) {
				On = true
				break
			}
		}
		if !On {
			//执行限制流量
			{
				//同一IP限制1秒11次请求
				{
					var _HuanCunInt int
					_HuanCun, err := _GetHuanCun("限制流量-IP", context.ClientIP())
					if err == nil {
						_HuanCunInt = _HuanCun.(int)
						if _HuanCunInt >= 11 {
							context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
								"code": http.StatusInternalServerError,
								"msg":  "网络繁忙,请稍后再试!",
							})
							//数据挂起,打断
							context.Abort()
							return
						}
					}
					_ = _SetHuanCun("限制流量-IP", context.ClientIP(), _HuanCunInt+1, false)
				}

				//同一Token限制1秒11次请求
				{
					token, err := context.Cookie("token")
					if err != nil || token == "" {
						token = context.GetHeader("Token")
					}
					if token != "" {
						var _HuanCunInt int
						_HuanCun, err := _GetHuanCun("限制流量-Token", token)
						if err == nil {
							_HuanCunInt = _HuanCun.(int)
							if _HuanCunInt >= 11 {
								context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
									"code": http.StatusInternalServerError,
									"msg":  "网络繁忙,请稍后再试!",
								})
								//数据挂起,打断
								context.Abort()
								return
							}
						}
						_ = _SetHuanCun("限制流量-Token", token, _HuanCunInt+1, false)
					}
				}
			}
		}

		context.Next() //处理请求(只能在中间件中使用)
	})

	//设置日记输出场景类型
	//gin.SetMode(gin.ReleaseMode)

	//注册全局模板函数 注意顺序，注册模板函数需要在加载模板上面
	router.SetFuncMap(template.FuncMap{
		"GetQuData": func(code string) string {
			return fmt.Sprint(Quantification.QuData[code].Snapshot.Data.Price)
		},
		"CalculateChange": func(code string) string {
			calculateChange := Public2.CalculateChange(
				Quantification.QuData[code].Snapshot.Data.Price,
				Quantification.QuData[code].Snapshot.Data.LastClose,
			)
			return fmt.Sprintf("%.2f", calculateChange)
		},
	})

	//静态目录
	router.Static("/static", "./web/Gin/Static")
	//router.Static("/static", "/go/web/Gin/static")
	//静态目录 显示文件列表
	router.StaticFS("/public", http.Dir("./web/Gin/Static"))
	//router.StaticFS("/public", http.Dir("/go/web/Gin/static"))
	//静态文件
	//router.StaticFile("/.well-known/pki-validation/fileauth.txt", "Gin/Static/fileauth.txt")
	//Html目录 模板
	router.LoadHTMLGlob("./web/Gin/Html/**/*")
	//单个Html
	//router.LoadHTMLFiles("Gin/Help/1/1.html")

	//设置默认路由当访问一个错误网站时返回
	router.NoRoute(func(context *gin.Context) {
		context.JSON(http.StatusOK, gin.H{
			"code": http.StatusNotFound,
			"msg":  "发生了预料之内的错误!",
		})
	})

	//首页
	router.GET("/hello", func(context *gin.Context) {
		context.JSON(http.StatusOK, gin.H{
			"code": http.StatusOK,
			"msg":  "欢迎使用!",
		})
	})

	//错误页面
	router.GET("/CuoWu/*action", func(context *gin.Context) {
		context.HTML(http.StatusInternalServerError, "CuoWu.tmpl", gin.H{})
	})

	//首页
	router.GET("/", func(context *gin.Context) {
		context.HTML(http.StatusOK, "trendThumbnail/index.tmpl", gin.H{
			"QuZXGArrs": Quantification.Qu_ZXG_Arrs,
			"QuData":    Quantification.QuData,
		})
	})

	//api
	API := router.Group("/api")
	{
		//版本1
		V1 := API.Group("/v1")
		{
			//公共路由
			PublicApi := V1.Group("/Public")
			{
				//获取验证码
				PublicApi.GET("/GetVerificationCodeImg", Public4.GetVerificationCodeImg)
				PublicApi.POST("/GetVerificationCodeImg", Public4.GetVerificationCodeImg)
				//验证验证码
				PublicApi.POST("/GetVerificationCode", Public4.GetVerificationCode)

				//获取 二维码
				PublicApi.GET("/GetErWeiMa", Public4.GetErWeiMa)
				PublicApi.POST("/GetErWeiMa", Public4.GetErWeiMa)
			}
			//测试WebSocket
			//V1.GET("/WebSocket", WebSocket2.CeShi)
			//user路由 用户
			//user := V1.Group("/User", ZhongJianJian.GroupUser())
			//{
			//	//PuTong路由 普通用户 跨越处理
			//	userPuTong := user.Group("/UserPuTong", HandlerFunc.KuaYuChuLiHandlerFunc())
			//	{
			//		//登录
			//		userPuTong.POST("/login", ControllerUserPuTong.Login)
			//		//注册
			//		userPuTong.POST("/register", ControllerUserPuTong.Register)
			//		//找回密码
			//		userPuTong.POST("/RetrievePassword", ControllerUserPuTong.Login)
			//		//验证Token
			//		userPuTong.POST("/Token", Context.GetTokenContext, func(context *gin.Context) {
			//			token, err := context.Get("token")
			//			if !err {
			//				context.JSON(http.StatusOK, gin.H{
			//					"code": "1",
			//					"msg":  "Token异常",
			//				})
			//				return
			//			}
			//			context.JSON(http.StatusOK, gin.H{
			//				"code":  "0",
			//				"msg":   "Token正常",
			//				"Token": token,
			//			})
			//		})
			//	}
			//}
			//Administrators路由 管理员
			Administrators := V1.Group("/Administrators", ZhongJianJian2.GroupAdministrators())
			{
				// 匹配的url格式:  /welcome?firstname=Jane&lastname=Doe
				Administrators.GET("/welcome", func(c *gin.Context) {
					firstname := c.DefaultQuery("firstname", "Guest")
					lastname := c.Query("lastname") // 是 c.Request.URL.Query().Get("lastname") 的简写

					c.String(http.StatusOK, "Hello %s %s", firstname, lastname)
				})
			}

		}

		//v1版本结束--------------------------------------------------------

	}

	srv := &http.Server{
		Addr:    fmt.Sprint(iP, ":", duanKou),
		Handler: router,
	}

	__gin.HttpServer = srv

	go func() {
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			getRjJi.RiJiShuChuJingGaoPrintln(__gin.QianZhuiMing, "启动服务失败:", err.Error())
		}
	}()

	_ = Public.AddGin(__gin)

	getRjJi.RiJiShuChuTiShiPrintln(__gin.QianZhuiMing, "服务初始化成功!")

	return _gin
}

// 缓存 限制
var _Cache *cache.Cache

// 获取 Cache 缓存实例 限制
func _GetCache() *cache.Cache {
	if _Cache == nil {
		//创建一个默认1秒的缓存 每2秒清除过期项目
		_Cache = cache.New(1*time.Second, 2*time.Second)
	}
	return _Cache
}

// 设置缓存 公共 key=存储位置 value=需要存储内容
func _SetHuanCun(标志key, 识别key string, value interface{}, 是否无限期 bool) error {
	var Time time.Duration
	if 是否无限期 {
		//使用无限期
		Time = cache.NoExpiration
	} else {
		//使用默认时间限制
		Time = cache.DefaultExpiration
	}
	_GetCache().Set(fmt.Sprint(标志key, "-", 识别key), value, Time)
	return nil
}

// 获取缓存 公共 key=存储位置
func _GetHuanCun(标志key, 识别key string) (interface{}, error) {
	data, errbool := _GetCache().Get(fmt.Sprint(标志key, "-", 识别key))
	if !errbool {
		return "", errors.New("获取失败(或存储位置无数据")
	}
	return data, nil
}
