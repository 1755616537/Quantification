package Middleware

import (
	"github.com/gin-gonic/gin"
	"github.com/unrolled/secure"
)

// HTTPS请求处理
func SSLCertificate() gin.HandlerFunc {
	return func(c *gin.Context) {
		secureMiddleware := secure.New(secure.Options{
			SSLRedirect: true,
			SSLHost:     "localhost:8080",
		})
		err := secureMiddleware.Process(c.Writer, c.Request)

		// If there was an error, do not continue.
		if err != nil {
			return
		}

		c.Next()
	}
}
