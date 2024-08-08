# 东方财富 行情页面 解析

http://quote.eastmoney.com/center/gridlist.html#sh_a_board

## 数据目录格式

数据目录结构及对应文件的含义说明:

```
./
├── OriginalFile         # 原文件
└── README.md            # 说明
```

## 解析

```

入口
webpack:///ClientApp/gridlist3/index.js
module.exports = function()

工具
webpack:///ClientApp/modules/tools.js

数据更新
webpack:///ClientApp/gridlist3/newbankuai.js
入口 bankuai.prototype.Bankuai = function(content, fs, codes)
板块数据 bankuai.prototype.getBankuai = function(content, fs, codes)

表头名称
webpack:///ClientApp/gridlist3/heads.js

请求
webpack:///ClientApp/gridlist3/getData.js
module.exports = function (pars, callback)

indexjson
'{"ops":{"order":"f3","orderDur":false,"type":"bankuai","thclick":false},"ops2":{"order":"f62","orderDur":false,"type":"zijinliu","thclick":false},"ops3":{"order":"f62","orderDur":true,"type":"zijinliu","thclick":false},"ops4":{"order":"f3","orderDur":false,"type":"hushenAStock","zixuan":true},"opsKcb":{"order":"f3","orderDur":false,"type":"hushenStockKcb","zixuan":true},"opsnewgu":{"order":"f26","orderDur":false,"type":"opsnewgu","zixuan":true},"abgu":{"order":"f199","orderDur":false,"type":"abgu","zixuan":true},"ahgu":{"order":"f3","orderDur":false,"type":"ahgu","zixuan":true,"thclick":false},"ahgu2":{"order":"f3","orderDur":false,"type":"ahgu2","zixuan":true},"ahgu3":{"order":"f3","orderDur":false,"type":"ahgu3","zixuan":true,"thclick":false},"ops5":{"order":"f26","orderDur":false,"type":"shhkBoard","zixuan":true},"ops6":{"order":"f3","orderDur":false,"type":"staqnetBoard"},"ops7":{"order":"f3","orderDur":false,"type":"indexsh"},"ops8":{"order":"f3","orderDur":false,"type":"indexsz"},"ops9":{"order":"f3","orderDur":false,"type":"neeqstocks"},"hkstocks":{"order":"f3","orderDur":false,"type":"hkstocks","zixuan":true},"hkstocks_rmb":{"order":"f3","orderDur":false,"type":"hkstocks_rmb","zixuan":true},"hkshstocks":{"order":"f3","orderDur":false,"type":"hkshstocks","zixuan":true},"hkindex":{"order":"f3","orderDur":false,"type":"hkindex"},"hkindexNXZ":{"order":"f6","orderDur":false,"type":"hkindex"},"usstocks":{"order":"f3","orderDur":false,"type":"usstocks"},"usindex":{"order":"f3","orderDur":false,"type":"usindex"},"globalamerica":{"order":"f3","orderDur":false,"type":"globalamerica"},"globalamerica2":{"orderDur":false,"type":"globalamerica2","thclick":false},"globalamericaOz":{"orderDur":false,"type":"globalamericaOz","thclick":false},"globalamerica3":{"orderDur":false,"type":"globalamerica3","thclick":false},"globalamerica4":{"orderDur":false,"type":"globalamerica4","thclick":false},"conceptboard":{"order":"f3","orderDur":false,"type":"conceptboard"},"conceptboardDatil":{"order":"f3","orderDur":false,"type":"conceptboardDatil","zixuan":true},"hsgt":{"order":"f3","orderDur":false,"type":"hsgt","zixuan":true,"thclick":false},"qhsc_jq":{"order":"f3","orderDur":false,"type":"qhsc_jq","zixuan":true,"thclick":false},"fundcloseend":{"order":"f3","orderDur":false,"type":"fundcloseend"},"fundcloseend_reits":{"order":"f3","orderDur":false,"type":"fundcloseend_reits"},"fundcloseend2":{"order":"f3","orderDur":false,"type":"fundcloseend2","thclick":false},"fundcloseend2d":{"order":"f3","orderDur":true,"type":"fundcloseend2","thclick":false},"bond":{"order":"f3","orderDur":false,"type":"bond"},"bondnew":{"order":"f6","orderDur":false,"type":"bondnew"},"forex":{"order":"f3","orderDur":false,"type":"forex"},"forex2":{"order":"f3","orderDur":false,"type":"forex2","thclick":false},"forex3":{"order":"","orderDur":false,"type":"forex"},"forex4":{"order":"","orderDur":false,"type":"forex2"},"qqsc":{"order":"f3","orderDur":false,"type":"qqsc"},"gold":{"order":"f3","orderDur":false,"type":"gold"},"gold2":{"order":"f3","orderDur":false,"type":"gold2","thclick":false},"hsbk":{"order":"f3","orderDur":false,"type":"hsbk","thclick":false},"hsbkd":{"order":"f3","orderDur":true,"type":"hsbkd","thclick":false},"hsbklz":{"order":"f3","orderDur":false,"type":"hsbklz","thclick":false},"hszs":{"order":"f3","orderDur":false,"type":"hszs","thclick":false},"hszs2":{"order":"","orderDur":false,"type":"hszs2","thclick":false},"ggsc":{"order":"f3","orderDur":false,"type":"ggsc","zixuan":true,"thclick":false},"ggscd":{"order":"f3","orderDur":true,"type":"ggsc","zixuan":true,"thclick":false},"mgsc":{"order":"f3","orderDur":false,"type":"mgsc","thclick":false},"mgscd":{"order":"f3","orderDur":true,"type":"mgsc","thclick":false},"mgsc3":{"order":"f3","orderDur":false,"type":"mgsc3","thclick":false},"bondmine":{"order":"f3","orderDur":false,"type":"bondmine","thclick":false},"indexqh":{"order":"f14","orderDur":true,"type":"indexqh"},"indexqhNew":{"order":"f14","orderDur":true,"type":"indexqhNew"},"indexqh_gjs":{"order":"f14","orderDur":true,"type":"indexqh"},"zjs":{"order":"f3","orderDur":false,"type":"zjs"},"gjqh":{"order":"f3","orderDur":false,"type":"gjqh"},"hjqh":{"order":"f3","orderDur":false,"type":"hjqh","thclick":false},"whpj":{"order":"f3","orderDur":false,"type":"whpj"},"Zqzqzs":{"order":"f3","orderDur":false,"type":"Zqzqzs","thclick":false},"hkadr":{"order":"f3","orderDur":false,"type":"hkadr"},"fullscreenlist":{"order":"f243","orderDur":false,"type":"fullscreenlist","zixuan":true}}'
》
indexjson.ops4
'{"order":"f3","orderDur":false,"type":"hushenAStock","zixuan":true}'
》
var new_bankuai = new bankuai(indexjson.ops4);
new_bankuai.Bankuai("#table_wrapper", "m:1+t:2,m:1+t:23");


var head = this.config.head;
this.tableHead = head;
》
var config = require("./config");

function bankuai(ops,mdName) {
this.config = config[ops.type];
》
var index_sz = new bankuai(indexjson.qqsc);
》
var indexjson = require('../config/index.square.cfg.json');



cb: function(that, row){
    return tools.formatNumber(that);
}





js代码
(Math.floor(Math.random() * 99) + 1)
go代码
rand.Seed(time.Now().UnixNano())
randomNumber := rand.Intn(100) + 1


js代码
objToPars: function(data){
var arr = [];
for (var key in data) {
arr.push(key + "=" + data[key]);
}
return arr.join("&");
}
go代码
func extend(par, pars map[string]int) {
for k, v := range pars {
par[k] = v
}
}


jQuery112409973741177667631_1723110980391
jQuery17231268681643787395827
jQuery217660890625838492353_1723127591935

1723110980391
1643787395827

po 1是大到小 0是小到大
fid 是排序的类型
fields是类型列表

"m:0+t:80+s:131072"

fs m:1+t:2,m:1+t:23

bankuai.Bankuai































