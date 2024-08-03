package Public

import (
	"encoding/base64"
	"fmt"
	"github.com/1755616537/utils"
	"github.com/gin-gonic/gin"
	"github.com/skip2/go-qrcode"
	"net/http"
)

// 获取 二维码
func GetErWeiMa(c *gin.Context) {
	//取值
	PostData, err := utils.PostGetValue(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code": "1",
			"msg":  err.Error(),
		})
		return
	}

	//记录参值
	text := PostData.GetString("text")

	{
		//验证参值合法性
		YanZhengCanZhiHeFaXing := ""
		if text == "" {
			YanZhengCanZhiHeFaXing = fmt.Sprint("text", "为空")
		}
		if YanZhengCanZhiHeFaXing != "" {
			c.JSON(http.StatusOK, gin.H{
				"code": "2",
				"msg":  YanZhengCanZhiHeFaXing,
			})
			return
		}
	}

	png, err := qrcode.Encode(text, qrcode.Medium, 256)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code": "1",
			"msg":  err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code": "0",
		"msg":  "成功",
		"data": base64.StdEncoding.EncodeToString(png),
	})
	return
}
