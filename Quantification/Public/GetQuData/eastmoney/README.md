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

GET
http://92.push2.eastmoney.com/api/qt/clist/get?cb=jQuery112409973741177667631_1723110980389&pn=1&pz=20&po=1&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&dect=1&wbp2u=|0|0|0|web&fid=f3&fs=m:1 t:2,m:1 t:23&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152&_=1723110980390

地址 121.43.13.201:80
状态 200 OK
版本HTTP/1.1
传输7.84 kB（大小 7.58 kB）
Referrer 策略unsafe-url
DNS 解析系统

HTTP/1.1 200 OK
Content-Type: application/javascript; charset=UTF-8
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
Connection: close
Cache-Control: no-cache
Content-Length: 7576

GET /api/qt/clist/get?cb=jQuery112409973741177667631_1723110980389&pn=1&pz=20&po=1&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&dect=1&wbp2u=|0|0|0|web&fid=f3&fs=m:1+t:2,m:1+t:23&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152&_=1723110980390 HTTP/1.1
Host: 92.push2.eastmoney.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0
Accept: */*
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Referer: http://quote.eastmoney.com/center/gridlist.html
Connection: keep-alive
Cookie: qgqp_b_id=ad8456a84582a436e961f4f2fd2d4a8c; intellpositionL=1236px; intellpositionT=2219px; HAList=ty-0-873167-%u65B0%u8D63%u6C5F%2Cty-0-000001-%u5E73%u5B89%u94F6%u884C%2Ca-sz-000636-%u98CE%u534E%u9AD8%u79D1; st_si=58506393651519; st_sn=12; st_psi=20240808175301322-113200301321-2161386496; st_asi=delete; st_pvi=46706524675933; st_sp=2019-07-01%2018%3A51%3A13; st_inirUrl=https%3A%2F%2Fwww.baidu.com%2Flink


jQuery112409973741177667631_1723110980389({"rc":0,"rt":6,"svr":2887178003,"lt":1,"full":1,"dlmkts":"","data":{"total":2384,"diff":[{"f1":2,"f2":3.69,"f3":10.15,"f4":0.34,"f5":89585,"f6":32711449.0,"f7":6.27,"f8":2.49,"f9":-24.51,"f10":0.48,"f11":0.0,"f12":"600107","f13":1,"f14":"美尔雅","f15":3.69,"f16":3.48,"f17":3.5,"f18":3.35,"f20":1328400000,"f21":1328400000,"f22":0.0,"f23":2.43,"f24":-19.78,"f25":-39.71,"f62":20829178.0,"f115":-19.47,"f128":"-","f140":"-","f141":"-","f136":"-","f152":2},{"f1":2,"f2":3.83,"f3":10.06,"f4":0.35,"f5":2010664,"f6":709170306.0,"f7":18.1,"f8":17.82,"f9":173.53,"f10":3.31,"f11":0.0,"f12":"600280","f13":1,"f14":"中央商场","f15":3.83,"f16":3.2,"f17":3.2,"f18":3.48,"f20":4321522238,"f21":4321522238,"f22":0.0,"f23":5.11,"f24":41.85,"f25":1.32,"f62":19621329.0,"f115":-36.8,"f128":"-","f140":"-","f141":"-","f136":"-","f152":2},{"f1":2,"f2":5.48,"f3":10.04,"f4":0.5,"f5":833696,"f6":439781106.0,"f7":17.27,"f8":18.87,"f9":-21.72,"f10":7.42,"f11":0.0,"f12":"600192","f13":1,"f14":"长城电工","f15":5.48,"f16":4.62,"f17":4.85,"f18":4.98,"f20":2420779040,"f21":2420779040,"f22":0.0,"f23":1.74,"f24":24.26,"f25":-11.47,"f62":20486643.0,"f115":-19.43,"f128":"-","f140":"-","f141":"-","f136":"-","f152":2},{"f1":2,"f2":8.99,"f3":10.04,"f4":0.82,"f5":145107,"f6":124192718.0,"f7":9.67,"f8":3.93,"f9":10.01,"f10":2.41,"f11":0.0,"f12":"603558","f13":1,"f14":"健盛集团","f15":8.99,"f16":8.2,"f17":8.22,"f18":8.17,"f20":3318037732,"f21":3318037732,"f22":0.0,"f23":1.37,"f24":-26.61,"f25":-4.77,"f62":14238355.0,"f115":10.62,"f128":"-","f140":"-","f141":"-","f136":"-","f152":2},{"f1":2,"f2":15.24,"f3":10.04,"f4":1.39,"f5":33135,"f6":49161604.0,"f7":10.69,"f8":2.55,"f9":-83.87,"f10":8.23,"f11":0.0,"f12":"600265","f13":1,"f14":"景谷林业","f15":15.24,"f16":13.76,"f17":13.94,"f18":13.85,"f20":1978152000,"f21":1978152000,"f22":0.0,"f23":12.4,"f24":-12.26,"f25":-15.99,"f62":6381058.0,"f115":2759.05,"f128":"-","f140":"-","f141":"-","f136":"-","f152":2},{"f1":2,"f2":13.4,"f3":10.02,"f4":1.22,"f5":102316,"f6":135759858.0,"f7":5.75,"f8":5.98,"f9":150.4,"f10":0.91,"f11":0.0,"f12":"603079","f13":1,"f14":"圣达生物","f15":13.4,"f16":12.7,"f17":12.88,"f18":12.18,"f20":2293932037,"f21":2293932037,"f22":0.0,"f23":1.86,"f24":7.8,"f25":-7.65,"f62":49082335.0,"f115":-42.69,"f128":"-","f140":"-","f141":"-","f136":"-","f152":2},{"f1":2,"f2":5.28,"f3":10.0,"f4":0.48,"f5":275468,"f6":139851742.0,"f7":11.88,"f8":7.52,"f9":-14.83,"f10":1.73,"f11":0.0,"f12":"600889","f13":1,"f14":"南京化纤","f15":5.28,"f16":4.71,"f17":4.8,"f18":4.8,"f20":1934306933,"f21":1934306933,"f22":0.0,"f23":2.3,"f24":-15.65,"f25":-8.33,"f62":38532845.0,"f115":-11.16,"f128":"-","f140":"-","f141":"-","f136":"-","f152":2},{"f1":2,"f2":7.48,"f3":10.0,"f4":0.68,"f5":19555,"f6":14626856.0,"f7":0.0,"f8":1.46,"f9":-171.51,"f10":1.23,"f11":0.0,"f12":"600768","f13":1,"f14":"宁波富邦","f15":7.48,"f16":7.48,"f17":7.48,"f18":6.8,"f20":1000429056,"f21":1000429056,"f22":0.0,"f23":2.46,"f24":-14.12,"f25":-36.88,"f62":7128155.0,"f115":73.92,"f128":"-","f140":"-","f141":"-","f136":"-","f152":2},{"f1":2,"f2":1.21,"f3":10.0,"f4":0.11,"f5":5875743,"f6":709769910.0,"f7":2.73,"f8":2.64,"f9":14.4,"f10":1.18,"f11":0.0,"f12":"600157","f13":1,"f14":"永泰能源","f15":1.21,"f16":1.18,"f17":1.21,"f18":1.1,"f20":26883494615,"f21":26883494615,"f22":0.0,"f23":0.58,"f24":-9.7,"f25":-11.68,"f62":55420112.0,"f115":11.62,"f128":"-","f140":"-","f141":"-","f136":"-","f152":2},{"f1":2,"f2":16.4,"f3":9.99,"f4":1.49,"f5":595832,"f6":958331110.0,"f7":5.23,"f8":6.2,"f9":35.96,"f10":0.74,"f11":0.0,"f12":"600216","f13":1,"f14":"浙江医药","f15":16.4,"f16":15.62,"f17":15.95,"f18":14.91,"f20":15770859100,"f21":15770788990,"f22":0.0,"f23":1.64,"f24":53.27,"f25":55.01,"f62":158726284.0,"f115":37.04,"f128":"-","f140":"-","f141":"-","f136":"-","f152":2},{"f1":2,"f2":8.37,"f3":9.99,"f4":0.76,"f5":249418,"f6":197771504.0,"f7":13.53,"f8":7.46,"f9":-35.6,"f10":1.22,"f11":0.0,"f12":"600696","f13":1,"f14":"岩石股份","f15":8.37,"f16":7.34,"f17":7.41,"f18":7.61,"f20":2799509137,"f21":2799509137,"f22":0.0,"f23":4.8,"f24":-24.59,"f25":-53.47,"f62":44543694.0,"f115":76.96,"f128":"-","f140":"-","f141":"-","f136":"-","f152":2},{"f1":2,"f2":2.98,"f3":9.96,"f4":0.27,"f5":2414409,"f6":690995339.0,"f7":14.02,"f8":14.96,"f9":611.14,"f10":0.99,"f11":0.0,"f12":"600187","f13":1,"f14":"国中水务","f15":2.98,"f16":2.6,"f17":2.65,"f18":2.71,"f20":4809067687,"f21":4809067687,"f22":0.0,"f23":1.52,"f24":33.04,"f25":12.88,"f62":122842563.0,"f115":98.45,"f128":"-","f140":"-","f141":"-","f136":"-","f152":2},{"f1":2,"f2":2.76,"f3":9.96,"f4":0.25,"f5":3930156,"f6":1054416190.0,"f7":6.77,"f8":4.33,"f9":8.5,"f10":2.92,"f11":0.0,"f12":"601933","f13":1,"f14":"永辉超市","f15":2.76,"f16":2.59,"f17":2.6,"f18":2.51,"f20":25047102101,"f21":25047102101,"f22":0.0,"f23":3.75,"f24":15.0,"f25":-2.13,"f62":157064862.0,"f115":-19.31,"f128":"-","f140":"-","f141":"-","f136":"-","f152":2},{"f1":2,"f2":6.96,"f3":9.95,"f4":0.63,"f5":318794,"f6":214654092.0,"f7":11.22,"f8":15.83,"f9":110.97,"f10":1.03,"f11":0.0,"f12":"603716","f13":1,"f14":"塞力医疗","f15":6.96,"f16":6.25,"f17":6.26,"f18":6.33,"f20":1401210481,"f21":1401210481,"f22":0.0,"f23":1.27,"f24":-4.53,"f25":-37.24,"f62":68442764.0,"f115":-9.97,"f128":"-","f140":"-","f141":"-","f136":"-","f152":2},{"f1":2,"f2":5.75,"f3":9.94,"f4":0.52,"f5":271006,"f6":154486929.0,"f7":8.99,"f8":10.31,"f9":-13.36,"f10":1.26,"f11":0.0,"f12":"603389","f13":1,"f14":"亚振家居","f15":5.75,"f16":5.28,"f17":5.28,"f18":5.23,"f20":1510824000,"f21":1510824000,"f22":0.0,"f23":4.34,"f24":11.22,"f25":-13.27,"f62":58434286.0,"f115":-11.57,"f128":"-","f140":"-","f141":"-","f136":"-","f152":2},{"f1":2,"f2":7.3,"f3":9.94,"f4":0.66,"f5":167839,"f6":115337822.0,"f7":12.8,"f8":3.39,"f9":34.07,"f10":1.53,"f11":0.0,"f12":"605188","f13":1,"f14":"国光连锁","f15":7.3,"f16":6.45,"f17":6.5,"f18":6.64,"f20":3617734000,"f21":3617734000,"f22":0.0,"f23":3.19,"f24":0.27,"f25":-14.12,"f62":19312836.0,"f115":262.65,"f128":"-","f140":"-","f141":"-","f136":"-","f152":2},{"f1":2,"f2":1.58,"f3":9.72,"f4":0.14,"f5":356138,"f6":55249125.0,"f7":10.42,"f8":2.79,"f9":-16.64,"f10":1.37,"f11":0.0,"f12":"600227","f13":1,"f14":"赤天化","f15":1.58,"f16":1.43,"f17":1.43,"f18":1.44,"f20":2675152038,"f21":2019523684,"f22":0.0,"f23":1.02,"f24":-13.66,"f25":-39.92,"f62":18785708.0,"f115":-21.44,"f128":"-","f140":"-","f141":"-","f136":"-","f152":2},{"f1":2,"f2":1.47,"f3":9.7,"f4":0.13,"f5":5287037,"f6":753324653.0,"f7":11.19,"f8":14.45,"f9":7.8,"f10":1.15,"f11":0.0,"f12":"600811","f13":1,"f14":"东方集团","f15":1.47,"f16":1.32,"f17":1.35,"f18":1.34,"f20":5378355054,"f21":5378355054,"f22":0.0,"f23":0.32,"f24":-18.33,"f25":-26.13,"f62":-3686440.0,"f115":-3.63,"f128":"-","f140":"-","f141":"-","f136":"-","f152":2},{"f1":2,"f2":1.5,"f3":8.7,"f4":0.12,"f5":878919,"f6":130210240.0,"f7":10.14,"f8":3.3,"f9":-7.27,"f10":2.41,"f11":0.0,"f12":"601588","f13":1,"f14":"北辰实业","f15":1.52,"f16":1.38,"f17":1.39,"f18":1.38,"f20":5050530000,"f21":3990000000,"f22":0.0,"f23":0.4,"f24":-14.29,"f25":-20.21,"f62":25717958.0,"f115":-36.5,"f128":"-","f140":"-","f141":"-","f136":"-","f152":2},{"f1":2,"f2":4.37,"f3":8.17,"f4":0.33,"f5":1268462,"f6":543384533.0,"f7":10.64,"f8":5.89,"f9":-7.13,"f10":2.03,"f11":-0.23,"f12":"600266","f13":1,"f14":"城建发展","f15":4.44,"f16":4.01,"f17":4.04,"f18":4.04,"f20":9416013632,"f21":9416013632,"f22":0.0,"f23":0.48,"f24":9.8,"f25":-7.81,"f62":97734748.0,"f115":56.65,"f128":"-","f140":"-","f141":"-","f136":"-","f152":2}]}});


跌幅榜
GET
http://92.push2.eastmoney.com/api/qt/clist/get?cb=jQuery112409973741177667631_1723110980391&pn=1&pz=20&po=0&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&dect=1&wbp2u=|0|0|0|web&fid=f3&fs=m:1 t:2,m:1 t:23&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152&_=1723110980396


成交量大到小
GET
http://92.push2.eastmoney.com/api/qt/clist/get?cb=jQuery112409973741177667631_1723110980391&pn=1&pz=20&po=1&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&dect=1&wbp2u=|0|0|0|web&fid=f6&fs=m:1 t:2,m:1 t:23&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152&_=1723110980421

&pz=20&po=1&np=1&ut=&fltt=2&invt=2&dect=1&wbp2u=|0|0|0|web&fid=f3&fs=m:1+t:2,m:1+t:23&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152&_=1723110980390 HTTP/1.1
&pz=20&po=0&np=1&ut=&fltt=2&invt=2&dect=1&wbp2u=|0|0|0|web&fid=f3&fs=m:1 t:2,m:1 t:23&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152&_=1723110980396
&pz=20&po=1&np=1&ut=&fltt=2&invt=2&dect=1&wbp2u=|0|0|0|web&fid=f6&fs=m:1 t:2,m:1 t:23&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152&_=1723110980421

http://9.push2.eastmoney.com//api/qt/clist/get?pn=20&pz=20&po=1&np=1&ut=&fltt=2&invt=2&dect=1&wbp2u=|0|0|0|web&fid=f3&fs=m:1+t:2,m:1+t:23&fields=
http://14.push2.eastmoney.com//api/qt/clist/get?cb=jQuery194730322110294711898_1723127655681&pn=20&pz=20&po=1&np=1&ut=&fltt=2&invt=2&dect=1&wbp2u=|0|0|0|web&fid=f3&fs=m:1+t:2,m:1+t:23&fields=&_=1723127655681
http://53.push2.eastmoney.com//api/qt/clist/get?cb=jQuery128621833650356842636_1723128520137&pn=20&pz=20&po=1&np=1&ut=&fltt=2&invt=2&dect=1&wbp2u=|0|0|0|web&fid=f3&fs=m:1+t:2,m:1+t:23&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152&_=1723128520137

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