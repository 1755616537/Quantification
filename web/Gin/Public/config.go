package Public

import (
	"context"
	"errors"
	"fmt"
	"github.com/1755616537/utils"
	"github.com/gin-gonic/gin"
	"net/http"
	"reflect"
	"strings"
	"sync"
	"time"
)

//200 OK - [GET]：服务器成功返回用户请求的数据，该操作是幂等的（Idempotent）。
//201 CREATED - [POST/PUT/PATCH]：用户新建或修改数据成功。
//202 Accepted - [*]：表示一个请求已经进入后台排队（异步任务）
//204 NO CONTENT - [DELETE]：用户删除数据成功。
//400 INVALID REQUEST - [POST/PUT/PATCH]：用户发出的请求有错误，服务器没有进行新建或修改数据的操作，该操作是幂等的。
//401 Unauthorized - [*]：表示用户没有权限（令牌、用户名、密码错误）。
//403 Forbidden - [*] 表示用户得到授权（与401错误相对），但是访问是被禁止的。
//404 NOT FOUND - [*]：用户发出的请求针对的是不存在的记录，服务器没有进行操作，该操作是幂等的。
//406 Not Acceptable - [GET]：用户请求的格式不可得（比如用户请求JSON格式，但是只有XML格式）。
//410 Gone -[GET]：用户请求的资源被永久删除，且不会再得到的。
//422 Unprocesable entity - [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误。
//500 INTERNAL SERVER ERROR - [*]：服务器发生错误，用户将无法判断发出的请求是否成功。

var (
	//Gin池
	_gin []*Gin

	_ZiDongPeiZhi          ZiDongPeiZhi
	_ZiDongPeiZhiZuJian    ZiDongPeiZhiZuJian
	_request               = make(map[string]reflect.Method)
	_middleware            = make(map[string]reflect.Method)
	_middlewareHandlerFunc = make(map[string]*gin.RouterGroup)
)

type Gin struct {
	//输出前缀名
	QianZhuiMing string
	//当前在Gin池的位置
	WeiShu int
	//连接
	HttpServer *http.Server
	//IP
	Ip string
	//端口
	DuanKou int
}

// 请求
type ZiDongPeiZhi struct {
}

// 中间件
type ZiDongPeiZhiZuJian struct {
}

// 获取Gin
func GetGin() ([]*Gin, error) {
	if _gin != nil {
		if len(_gin) != 0 {
			return _gin, nil
		}
	}
	return nil, errors.New("未初始化过一个Gin服务")
}

// 添加Gin
func AddGin(gin *Gin) error {
	//获取当前池中的数量
	var lenGin int
	getGin, err := GetGin()
	if err != nil {
		lenGin = 1
	} else {
		lenGin = len(getGin) + 1
	}
	gin.WeiShu = lenGin
	//添加池中
	_gin = append(_gin, gin)

	return nil
}

// 移除服务
func (gin *Gin) DelGin() error {
	//声明一个互斥锁
	var mutex sync.Mutex
	mutex.Lock()
	defer mutex.Unlock()

	//判断池中数量是否比传递过来的位置要小,防止报错
	if len(_gin) < gin.WeiShu {
		return errors.New("Gin池中数量比传递过来的数位要小")
	}

	//关闭服务
	err := gin._Close()
	if err != nil {
		return err
	}

	//从Gin池中移除
	_gin = append(_gin[:gin.WeiShu-1], _gin[gin.WeiShu:]...)

	//重新排序Gin池中的WeiShu位置
	for i := 0; i < len(_gin); i++ {
		_gin[i].WeiShu = i + 1
	}
	return nil
}

// 关闭服务 内部方法
func (gin *Gin) _Close() error {
	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
	defer cancel()

	riJiAlL, _ := utils.GetRiJi()
	riJi := riJiAlL[0]

	if err := gin.HttpServer.Shutdown(ctx); err != nil {
		riJi.RiJiShuChuTiShiPrintln(utils.GetConfig("Gin.QianZhuiMing").(string), "关闭Gin服务错误", err)
	}
	riJi.RiJiShuChuTiShiPrintln(utils.GetConfig("Gin.QianZhuiMing").(string), "关闭Gin服务成功", fmt.Sprint("[", gin.DuanKou, "]"))
	return nil
}

// 设置Gin输出前缀名
func (gin *Gin) SetGinQianZhuiMing(qianZhuiMing ...interface{}) *Gin {
	gin.QianZhuiMing = fmt.Sprint(fmt.Sprintln(qianZhuiMing...), "\r")
	return gin
}

// 自动配置路由组件
func ZiDongLuYouZuJian(router *gin.Engine) (*gin.Engine, bool) {
	//优先使用错误拦截 在错误出现之前进行拦截 在错误出现后进行错误捕获
	//错误拦截必须配合defer使用  通过匿名函数使用
	defer func() {
		//恢复程序的控制权
		err := recover()
		if err != nil {
			fmt.Println("内部错误,或方法不存在 err:", err)
		}
	}()

	// 通过反射获取ctl中的所有方法
	refCtl := reflect.TypeOf(&_ZiDongPeiZhiZuJian)
	methodCnt := refCtl.NumMethod()
	for index := 0; index < methodCnt; index++ {
		m := refCtl.Method(index)
		methodName := m.Name
		methodNameList := strings.FieldsFunc(methodName, func(r rune) bool {
			return r == '0'
		})
		if len(methodNameList) <= 1 {
			var (
				ON bool = false
			)
			for i2 := range _middlewareHandlerFunc {
				if methodName == i2 || methodName == fmt.Sprint(i2, utils.GetConfig("Gin.FenGeFu").(string)) {
					fmt.Println("自动加载-组件", methodName, "失败-重复加载")
					ON = true
					break
				}
			}
			if ON {
				continue
			}
			//将path对应的反射方法保存
			_middleware[methodName] = m
			// 设置路由统一入口
			_middlewareHandlerFunc[methodName] = router.Group(methodName, ZiDongPeiZhiZhongJianJianRuKou())
			fmt.Println("自动加载-组件", methodName, "成功")
		} else {
			var (
				//上一个中间件
				ShangYigeZhongJianJian *gin.RouterGroup
			)
			for i := range methodNameList {
				var (
					name string = ""
					ON   bool   = false
				)
				//for i3 := 0; i3 <= i; i3++ {
				//	name=fmt.Sprint(name,methodNameList[i3],FenGeFu)
				//}
				name = fmt.Sprint(methodNameList[i], utils.GetConfig("Gin.FenGeFu").(string))
				for i2 := range _middlewareHandlerFunc {
					if name == i2 || methodNameList[i] == i2 {
						fmt.Println("自动加载-组件-多嵌套", i+1, name, "失败-重复加载")
						ON = true
						break
					}
				}
				if ON {
					break
				}
				//将path对应的反射方法保存
				_middleware[name] = m
				// 设置路由统一入口
				if ShangYigeZhongJianJian != nil {
					_middlewareHandlerFunc[name] = ShangYigeZhongJianJian.Group(name, ZiDongPeiZhiZhongJianJianRuKou())
					ShangYigeZhongJianJian = _middlewareHandlerFunc[name]
				} else {
					_middlewareHandlerFunc[name] = router.Group(name, ZiDongPeiZhiZhongJianJianRuKou())
					ShangYigeZhongJianJian = _middlewareHandlerFunc[name]
				}
				fmt.Println("自动加载-组件-多嵌套", i+1, name, "成功")
			}
		}
	}
	return router, true
}

// 自动配置路由请求
func ZiDongLuYou(router *gin.Engine) (*gin.Engine, bool) {
	//优先使用错误拦截 在错误出现之前进行拦截 在错误出现后进行错误捕获
	//错误拦截必须配合defer使用  通过匿名函数使用
	defer func() {
		//恢复程序的控制权
		err := recover()
		if err != nil {
			fmt.Println("内部错误,或方法不存在 err:", err)
		}
	}()

	// 通过反射获取ctl中的所有方法
	refCtl := reflect.TypeOf(&_ZiDongPeiZhi)
	methodCnt := refCtl.NumMethod()
	for index := 0; index < methodCnt; index++ {
		//请求模式
		QingQiuMoShi := ""
		m := refCtl.Method(index)
		methodName := m.Name

		//判断请求模式
		if strings.HasPrefix(methodName, fmt.Sprint("GET", utils.GetConfig("Gin.FenGeFu").(string))) {
			QingQiuMoShi = "GET"
		} else if strings.HasPrefix(methodName, fmt.Sprint("POST", utils.GetConfig("Gin.FenGeFu").(string))) {
			QingQiuMoShi = "POST"
		}

		if QingQiuMoShi != "" {
			//是否已经加载中间件
			ON := false
			name := strings.Replace(methodName, fmt.Sprint(QingQiuMoShi, utils.GetConfig("Gin.FenGeFu").(string)), "", 1)
			nameList := strings.FieldsFunc(name, func(r rune) bool {
				return r == '0'
			})
			if len(nameList) >= 2 {
				for i, i2 := range _middlewareHandlerFunc {
					if strings.HasPrefix(name, fmt.Sprint(i, utils.GetConfig("Gin.FenGeFu").(string))) {
						name = strings.Replace(name, fmt.Sprint(i, utils.GetConfig("Gin.FenGeFu").(string)), "", 1)
						//将path对应的反射方法保存
						_request[name] = m
						// 设置路由统一入口
						if QingQiuMoShi == "GET" {
							i2.GET(name, ZiDongPeiZhiRuKou)
						} else if QingQiuMoShi == "POST" {
							i2.POST(name, ZiDongPeiZhiRuKou)
						}
						ON = true
						break
					} else if strings.HasPrefix(i, fmt.Sprint(nameList[len(nameList)-2], utils.GetConfig("Gin.FenGeFu").(string))) {
						name = nameList[len(nameList)-1]
						//将path对应的反射方法保存
						_request[name] = m
						// 设置路由统一入口
						if QingQiuMoShi == "GET" {
							i2.GET(name, ZiDongPeiZhiRuKou)
						} else if QingQiuMoShi == "POST" {
							i2.POST(name, ZiDongPeiZhiRuKou)
						}
						ON = true
						break
					}
				}
			} else {
				for i, i2 := range _middlewareHandlerFunc {
					if strings.HasPrefix(name, fmt.Sprint(i, utils.GetConfig("Gin.FenGeFu").(string))) {
						name = strings.Replace(name, fmt.Sprint(i, utils.GetConfig("Gin.FenGeFu").(string)), "", 1)
						//将path对应的反射方法保存
						_request[name] = m
						// 设置路由统一入口
						if QingQiuMoShi == "GET" {
							i2.GET(name, ZiDongPeiZhiRuKou)
						} else if QingQiuMoShi == "POST" {
							i2.POST(name, ZiDongPeiZhiRuKou)
						}
						ON = true
						break
					}
				}
			}
			if !ON {
				//将path对应的反射方法保存
				_request[name] = m
				// 设置路由统一入口
				if QingQiuMoShi == "GET" {
					router.GET(name, ZiDongPeiZhiRuKou)
				} else if QingQiuMoShi == "POST" {
					router.POST(name, ZiDongPeiZhiRuKou)
				}
			}
		}
	}
	return router, true
}

// 自动配置入口
func ZiDongPeiZhiRuKou(context *gin.Context) {
	//获取path
	p := strings.Split(context.Request.URL.Path, "/")[1]
	vals := make([]reflect.Value, 2)
	vals[0] = reflect.ValueOf(&context)
	vals[1] = reflect.ValueOf(context)
	//反射进行调用
	_request[p].Func.Call(vals)
}

// 自动配置中间件入口
func ZiDongPeiZhiZhongJianJianRuKou() gin.HandlerFunc {
	return func(context *gin.Context) {
		//获取path
		p := strings.Split(context.Request.URL.Path, "/")[1]
		vals := make([]reflect.Value, 2)
		vals[0] = reflect.ValueOf(&context)
		vals[1] = reflect.ValueOf(context)
		//反射进行调用
		_middleware[p].Func.Call(vals)
	}
}

// 例子 自动加载GET
// 命名规则  [请求类型0请求中间件0请求地址]
func (__ZiDongPeiZhi *ZiDongPeiZhi) GET0B0a(context *gin.Context) {
	context.JSON(http.StatusOK, gin.H{
		"code": "0",
		"msg":  "成功",
	})
	return
}
func (__ZiDongPeiZhi *ZiDongPeiZhi) GET0Aasda(context *gin.Context) {
	context.JSON(http.StatusOK, gin.H{
		"code": "0",
		"msg":  "成功",
	})
	return
}
func (__ZiDongPeiZhi *ZiDongPeiZhi) POST0A0a(context *gin.Context) {
	context.JSON(http.StatusOK, gin.H{
		"code": "0",
		"msg":  "成功",
	})
	return
}

func (__ZiDongPeiZhiZuJian *ZiDongPeiZhiZuJian) A(context *gin.Context) {
	fmt.Println("中间件A成功")

	context.Next() //处理请求(只能在中间件中使用)
}
func (__ZiDongPeiZhiZuJian *ZiDongPeiZhiZuJian) B(context *gin.Context) {
	fmt.Println("中间件A成功")

	context.Next() //处理请求(只能在中间件中使用)
}
func (__ZiDongPeiZhiZuJian *ZiDongPeiZhiZuJian) B0(context *gin.Context) {
	fmt.Println("中间件A成功")

	context.Next() //处理请求(只能在中间件中使用)
}
