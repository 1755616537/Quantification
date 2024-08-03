package ControllerUserPuTong

//
//import (
//	"fmt"
//	"github.com/1755616537/utils"
//	"github.com/gin-gonic/gin"
//	"net/http"
//	"time"
//)
//
//func Register(context *gin.Context) {
//	//取值
//	PostData, err := utils.PostGetValue(context)
//	if err != nil {
//		context.JSON(http.StatusOK, gin.H{
//			"code": "1",
//			"msg":  err.Error(),
//		})
//		return
//	}
//
//	//记录参值
//	UserName := PostData.GetString("UserName")
//	UserPassword := PostData.GetString("UserPassword")
//
//	//验证参值合法性
//	if UserName == "" {
//		context.JSON(http.StatusOK, gin.H{
//			"code": "1",
//			"msg":  "名称为空",
//		})
//		return
//	}
//	fmt.Println(UserName)
//	if UserPassword == "" {
//		context.JSON(http.StatusOK, gin.H{
//			"code": "1",
//			"msg":  "密码为空",
//		})
//		return
//	}
//
//	//数据库查询
//	var adminWhere []test.Admin
//	adminWhere, err = test.GetBiaoAdminWhere("username = ?", UserName)
//	if err != nil {
//		context.JSON(http.StatusOK, gin.H{
//			"code": "1",
//			"msg":  "遇到未知错误",
//		})
//		return
//	}
//	if len(adminWhere) != 0 {
//		context.JSON(http.StatusOK, gin.H{
//			"code": "1",
//			"msg":  "账号已存在",
//		})
//		return
//	}
//
//	//加密密码
//	UserPassword=utils.JiaMiSHATongYiGeShi(UserPassword,"","")
//
//	//获取当前时间
//	GetTime := time.Now()
//	ip:= context.ClientIP()
//	adminAdd := &test.Admin{
//		Username:     UserName,
//		Password:     UserPassword,
//		RegisterTime: GetTime,
//		LoginTime:    GetTime,
//		LoginIp:      ip,
//		Type:         0,
//	}
//	//数据库添加
//	id, err := test.AddBiaoAdminWhere(adminAdd)
//	if err != nil {
//		context.JSON(http.StatusOK, gin.H{
//			"code": "1",
//			"msg":  "注册失败",
//		})
//		return
//	}
//	context.JSON(http.StatusOK, gin.H{
//		"code": "0",
//		"msg":  "注册成功",
//		"data": gin.H{
//			"id": id,
//		},
//	})
//	return
//
//}
