package ControllerUserPuTong

//
//import (
//	"fmt"
//	"github.com/1755616537/utils"
//	"github.com/gin-gonic/gin"
//	"net/http"
//)
//
//func Login(c *gin.Context) {
//	//取值
//	PostData, err := utils.PostGetValue(c)
//	if err != nil {
//		c.JSON(http.StatusOK, gin.H{
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
//		c.JSON(http.StatusOK, gin.H{
//			"code": "1",
//			"msg":  "名称为空",
//		})
//		return
//	}
//	if UserPassword == "" {
//		c.JSON(http.StatusOK, gin.H{
//			"code": "1",
//			"msg":  "密码为空",
//		})
//		return
//	}
//
//	//数据库查询
//	var admin []test.Admin
//	admin, err = test.GetBiaoAdminWhere("username = ?", UserName)
//	if err != nil {
//		c.JSON(http.StatusOK, gin.H{
//			"code": "1",
//			"msg":  "遇到未知错误",
//		})
//		return
//	}
//	if len(admin) == 0 {
//		c.JSON(http.StatusOK, gin.H{
//			"code": "1",
//			"msg":  "账号不存在,或密码不正确",
//		})
//		return
//	}
//
//	JiamiMaList, err := User.JiaMiGeShiFenGe(admin[0].Password)
//	if err != nil {
//		c.JSON(http.StatusInternalServerError, gin.H{
//			"code": "1",
//			"msg":  "遇到未知错误",
//		})
//		return
//	}
//
//	if !utils.JiaoYanSHATongYiGeShi(UserPassword,admin[0].Password,JiamiMaList[2],"") {
//		c.JSON(http.StatusInternalServerError, gin.H{
//			"code": "1",
//			"msg":  "账号不存在,或密码不正确",
//		})
//		return
//	}
//
//
//	//adminPassword := admin[0].Password
//	//if UserPassword!=adminPassword {
//	//	c.JSON(http.StatusOK, gin.H{
//	//		"code": "1",
//	//		"msg":     "密码错误",
//	//	})
//	//	return
//	//}
//	//map[string]interface{}{}
//
//	//ip, err := Util.GetPublic().GetClientIp()
//	//获取token
//	payload := &utils.PayloadType{
//		UserID:       1,
//		UserName:     UserName,
//		UserPassword: UserPassword,
//		IP:           fmt.Sprintf("%s-%s", c.ClientIP(), "ip"),
//	}
//	Token, err := utils.SetToken(payload,"")
//	if err != nil {
//		c.String(http.StatusOK, err.Error())
//		return
//	}
//
//	//设置cookie
//	c.SetCookie("token", Token, -1, "/", "localhost", false, true)
//
//	c.JSON(http.StatusOK, gin.H{
//		"code": "0",
//		"msg":  "登陆成功",
//		//"Token":   Token,
//	})
//	return
//}
