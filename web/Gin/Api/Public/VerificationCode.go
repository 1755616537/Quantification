package Public

import (
	"github.com/1755616537/utils"
	"github.com/gin-gonic/gin"
	"net/http"
)

// 获取验证码
func GetVerificationCodeImg(c *gin.Context) {
	id, b64s, _, err := utils.GetCaptcha()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code": "1",
			"msg":  err.Error(),
		})
		return
	}
	type data struct {
		Id   string
		B64s string
	}

	c.JSON(http.StatusInternalServerError, gin.H{
		"code": "0",
		"msg":  "成功",
		"data": data{id, b64s},
	})
	return
}

// 验证验证码
func GetVerificationCode(c *gin.Context) {
	//取值
	PostData, err := utils.PostGetValue(c)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"code": "1",
			"msg":  err.Error(),
		})
		return
	}

	//记录参值
	id := PostData.GetString("Id")
	b64s := PostData.GetString("B64s")

	//验证参值合法性
	YanZhengCanZhiHeFaXing := ""
	if id == "" {
		YanZhengCanZhiHeFaXing = "验证码ID为空"
	} else if b64s == "" {
		YanZhengCanZhiHeFaXing = "验证码为空"
	}
	if YanZhengCanZhiHeFaXing != "" {
		c.JSON(http.StatusOK, gin.H{
			"code": "1",
			"msg":  YanZhengCanZhiHeFaXing,
		})
		return
	}

	VerifyBool := utils.Verify(id, b64s)
	if !VerifyBool {
		c.JSON(http.StatusOK, gin.H{
			"code": "1",
			"msg":  "验证码错误",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code": "0",
		"msg":  "验证码正确",
	})
	return

}
