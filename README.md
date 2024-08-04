# 量化程序

## 说明

程序会自动获取指定股票的数据到缓存，然后根据缓存的数据多开协程进行量化程序。

---

## 数据目录格式

数据目录结构及对应文件的含义说明:

```
./
├── Public               # 公开数据
│   └── index.go             # 数据
├── Quantification       # 量化程序
│   ├── monitoringList.go    # 监控列表
│   ├── StockData.go         # 股票数据
│   └── run.go               # 入口
├── web                  # web服务器
│   ├── Gin                  # web服务
│   │   ├── Api                  # api管理
│   │   ├── Html                 # html模板
│   │   ├── privateImg           # 不公开的文件目录（无法通过web请求获取）
│   │   ├── Public               # 公共配置
│   │   ├── static               # 公共文件
│   │   ├── WebSocket            # 长连接
│   │   ├── Middleware           # 中间件
│   │   └── Run.go               # 入口
│   ├── Sentinel             # 限流控制
│   │   └── Run.go               # 入口
│   └── run.go               # 入口
├── ZhiLingXiTong        #指令系统
│   ├── ZhiLingChuLi         # 处理指令
│   └── Run.go               # 入口
├── config.yml           # 配置信息
├── main.go              # 程序启动入口
└── README.md            # 说明
```

