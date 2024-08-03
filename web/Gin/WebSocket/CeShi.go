package WebSocket

import (
	"errors"
	"fmt"
	"github.com/1755616537/utils"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"net/http"
)

func CeShi(context *gin.Context) {
	var upGrader = websocket.Upgrader{
		Error: func(w http.ResponseWriter, r *http.Request, status int, reason error) {
			fmt.Println("发生错误", reason)
		},
		//允许跨域访问
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
	//升级将HTTP服务器连接升级到WebSocket协议
	//context.Request.Header
	ws, err := upGrader.Upgrade(context.Writer, context.Request, nil)
	if err != nil {
		return
	}
	conn, err := utils.InitConnection(ws)
	if err != nil {
		context.JSON(http.StatusOK, gin.H{
			"code": "1",
			"msg":  "连接出错",
			//"details":err.Error(),
		})
		return
	}
	//请求结束释放资源
	defer conn.Close()

	//创建发送消息通道
	XiaoXiTongDao := make(chan []byte)
	fmt.Println("连接打开")
	go func() {
		//进入处理 内部方法

		XiaoXiTongDao <- []byte("连接成功")
	}()

	//进入收发消息循环
	//主动发送---------------------------------------
	go func() {
		for {
			//阻塞接收通道数据
			XiaoXiTongDaoData := <-XiaoXiTongDao
			//写入ws数据
			err = conn.WriteMessage(XiaoXiTongDaoData)
			if err != nil {
				//重新添加信息进通道
				XiaoXiTongDao <- XiaoXiTongDaoData
				break
			}
		}
	}()
	//自动回复---------------------------------------
	for {
		//堵塞 读取ws中的数据
		data, err := conn.ReadMessage()
		if err != nil {
			break
		}
		data, err = _XiaoXiChuLi(data)
		if err != nil {
			data = []byte(err.Error())
		}
		if data != nil {
			//写入ws数据
			err = conn.WriteMessage(data)
			if err != nil {
				break
			}
		}
	}

	fmt.Println("连接断开", err)
	go func() {
		//离开处理 内部方法

		//打印消息通道中未发送的数据
		for data := range XiaoXiTongDao {
			fmt.Println("未发送的数据", data)
		}
	}()
}

// 消息处理 内部方法
func _XiaoXiChuLi(data []byte) ([]byte, error) {
	fmt.Println("收到消息", string(data))
	switch string(data) {
	case "ping":
		data = []byte("成功")
	case "help":
		data = []byte("ok")
	default:
		return nil, errors.New("错误信息")
	}
	return data, nil
}
