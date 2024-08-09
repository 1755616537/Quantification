# 同花顺

```
https://data.hexin.cn/complex/out/


GET
	https://data.10jqka.com.cn/dataapi/limit_up/trade_status
	
HTTP/1.1 200 OK
Content-Type: application/json
Date: Fri, 09 Aug 2024 13:25:59 GMT
Server: Stargate
X-GATEWAY-PASS: datacenter-apisix-79658cd75b-t7cvj
X-GATEWAY-TIME: 09/Aug/2024:21:25:59 +0800
X-Cache: MISS from cachewc77.10jqka.com.cn
X-Cache: MISS from cachedxfs13
Transfer-Encoding: chunked
Via: 1.1 cachewc77.10jqka.com.cn (squid/3.5.20), 1.1 cachedxfs13 (squid/3.5.20)
Connection: keep-alive

GET /dataapi/limit_up/trade_status HTTP/1.1
Host: data.10jqka.com.cn
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0
Accept: application/json, text/plain, */*
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Referer: https://data.10jqka.com.cn/datacenterph/limitup/limtupInfo.html
Cookie: v=A23pR4V393qQMJMWB8dCPBkNfAjiyqGcK_4FcK9yqYRzJoN8dxqxbLtOFUI8; Hm_lvt_78c58f01938e4d85eaf619eae71b4ed1=1723205412; Hm_lvt_929f8b362150b1f77b477230541dbbc2=1723205457; Hm_lvt_722143063e4892925903024537075d0d=1723205457; searchGuide=sg; Hm_lpvt_78c58f01938e4d85eaf619eae71b4ed1=1723206061; HMACCOUNT=BAE4ECDA2F898A8A; u_ukey=A10702B8689642C6BE607730E11E6E4A; u_uver=1.0.0; u_dpass=8b8LDeC%2Fqxya8YivIbo4dsp48L%2FNYbfjmnzsEt%2BWwAnqX3sWx6QE%2Bs%2BOO5Y343gWHi80LrSsTFH9a%2B6rtRvqGg%3D%3D; u_did=9D9EA1DDE5424AC9B2C9B15842CA58F0; u_ttype=WEB; Hm_lpvt_722143063e4892925903024537075d0d=1723205457; Hm_lpvt_929f8b362150b1f77b477230541dbbc2=1723205457; historystock=600843%7C*%7C300033; spversion=20130314; Hm_lvt_60bad21af9c824a4a0530d5dbf4357ca=1723205516; Hm_lpvt_60bad21af9c824a4a0530d5dbf4357ca=1723205974; Hm_lvt_f79b64788a4e377c608617fba4c736e2=1723205516; Hm_lpvt_f79b64788a4e377c608617fba4c736e2=1723205974; refreshStat=off; _ga_KQBDS1VPQF=GS1.1.1723206091.1.1.1723206287.0.0.0; _ga=GA1.1.2083718513.1723206092
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: same-origin

{"status_code":0,"data":{"stat":"已收盘","timestamp":1723209959},"status_msg":"success"}

连板天梯
GET
	https://data.10jqka.com.cn/dataapi/limit_up/continuous_limit_up?filter=HS,GEM2STAR&date=

HTTP/1.1 200 OK
Content-Type: application/json
Date: Fri, 09 Aug 2024 13:26:00 GMT
Server: Stargate
X-GATEWAY-PASS: datacenter-apisix-79658cd75b-dm5kl
X-GATEWAY-TIME: 09/Aug/2024:21:26:00 +0800
X-Cache: MISS from cachewc106.10jqka.com.cn
X-Cache: MISS from cachedxfs13
Transfer-Encoding: chunked
Via: 1.1 cachewc106.10jqka.com.cn (squid/3.5.20), 1.1 cachedxfs13 (squid/3.5.20)
Connection: keep-alive

GET /dataapi/limit_up/continuous_limit_up?filter=HS,GEM2STAR&date= HTTP/1.1
Host: data.10jqka.com.cn
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0
Accept: application/json, text/plain, */*
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Referer: https://data.10jqka.com.cn/datacenterph/limitup/limtupInfo.html
Cookie: v=A8pO3k4mmLN7MRQfnJb9BSKsG7Fpu04VQD_CuVQDdp2oB2RlPEueJRDPEswn; Hm_lvt_78c58f01938e4d85eaf619eae71b4ed1=1723205412; Hm_lvt_929f8b362150b1f77b477230541dbbc2=1723205457; Hm_lvt_722143063e4892925903024537075d0d=1723205457; searchGuide=sg; Hm_lpvt_78c58f01938e4d85eaf619eae71b4ed1=1723206061; HMACCOUNT=BAE4ECDA2F898A8A; u_ukey=A10702B8689642C6BE607730E11E6E4A; u_uver=1.0.0; u_dpass=8b8LDeC%2Fqxya8YivIbo4dsp48L%2FNYbfjmnzsEt%2BWwAnqX3sWx6QE%2Bs%2BOO5Y343gWHi80LrSsTFH9a%2B6rtRvqGg%3D%3D; u_did=9D9EA1DDE5424AC9B2C9B15842CA58F0; u_ttype=WEB; Hm_lpvt_722143063e4892925903024537075d0d=1723205457; Hm_lpvt_929f8b362150b1f77b477230541dbbc2=1723205457; historystock=600843%7C*%7C300033; spversion=20130314; Hm_lvt_60bad21af9c824a4a0530d5dbf4357ca=1723205516; Hm_lpvt_60bad21af9c824a4a0530d5dbf4357ca=1723205974; Hm_lvt_f79b64788a4e377c608617fba4c736e2=1723205516; Hm_lpvt_f79b64788a4e377c608617fba4c736e2=1723205974; refreshStat=off; _ga_KQBDS1VPQF=GS1.1.1723206091.1.1.1723206287.0.0.0; _ga=GA1.1.2083718513.1723206092
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: same-origin

{"status_code":0,"data":[{"height":4,"code_list":[{"code":"000597","name":"东北制药","market_id":33,"continue_num":4}],"number":1},{"height":3,"code_list":[{"code":"300615","name":"欣天科技","market_id":33,"continue_num":3}],"number":1},{"height":2,"code_list":[{"code":"000011","name":"深物业A","market_id":33,"continue_num":2},{"code":"000509","name":"华塑控股","market_id":33,"continue_num":2},{"code":"002285","name":"世联行","market_id":33,"continue_num":2},{"code":"600696","name":"岩石股份","market_id":17,"continue_num":2},{"code":"603389","name":"亚振家居","market_id":17,"continue_num":2}],"number":5}],"status_msg":"success"}

打板预警
GET
	https://data.10jqka.com.cn/dataapi/limit_up/limit_up_pool?page=1&limit=15&field=199112,10,9001,330323,330324,330325,9002,330329,133971,133970,1968584,3475914,9003,9004&filter=HS,GEM2STAR&order_field=330324&order_type=0&date=&_=1723210322068

HTTP/1.1 200 OK
Content-Type: application/json
Date: Fri, 09 Aug 2024 13:32:03 GMT
Server: Stargate
X-GATEWAY-PASS: datacenter-apisix-79658cd75b-4dvft
X-GATEWAY-TIME: 09/Aug/2024:21:32:04 +0800
X-Cache: MISS from cachewc106.10jqka.com.cn
X-Cache: MISS from cachedxfs13
Transfer-Encoding: chunked
Via: 1.1 cachewc106.10jqka.com.cn (squid/3.5.20), 1.1 cachedxfs13 (squid/3.5.20)
Connection: keep-alive

GET /dataapi/limit_up/limit_up_pool?page=1&limit=15&field=199112,10,9001,330323,330324,330325,9002,330329,133971,133970,1968584,3475914,9003,9004&filter=HS,GEM2STAR&order_field=330324&order_type=0&date=&_=1723210322068 HTTP/1.1
Host: data.10jqka.com.cn
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0
Accept: application/json, text/plain, */*
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Referer: https://data.10jqka.com.cn/datacenterph/limitup/limtupInfo.html
Cookie: v=AyOnaW9FQbznSg2IX-I0OhMfsmbIGLda8az7jlWAfwL5lE0S3ehHqgF8i9pm; Hm_lvt_78c58f01938e4d85eaf619eae71b4ed1=1723205412; Hm_lvt_929f8b362150b1f77b477230541dbbc2=1723205457; Hm_lvt_722143063e4892925903024537075d0d=1723205457; searchGuide=sg; Hm_lpvt_78c58f01938e4d85eaf619eae71b4ed1=1723210012; HMACCOUNT=BAE4ECDA2F898A8A; u_ukey=A10702B8689642C6BE607730E11E6E4A; u_uver=1.0.0; u_dpass=8b8LDeC%2Fqxya8YivIbo4dsp48L%2FNYbfjmnzsEt%2BWwAnqX3sWx6QE%2Bs%2BOO5Y343gWHi80LrSsTFH9a%2B6rtRvqGg%3D%3D; u_did=9D9EA1DDE5424AC9B2C9B15842CA58F0; u_ttype=WEB; Hm_lpvt_722143063e4892925903024537075d0d=1723210012; Hm_lpvt_929f8b362150b1f77b477230541dbbc2=1723210012; historystock=600843%7C*%7C300033; spversion=20130314; Hm_lvt_60bad21af9c824a4a0530d5dbf4357ca=1723205516; Hm_lpvt_60bad21af9c824a4a0530d5dbf4357ca=1723205974; Hm_lvt_f79b64788a4e377c608617fba4c736e2=1723205516; Hm_lpvt_f79b64788a4e377c608617fba4c736e2=1723205974; refreshStat=off; _ga_KQBDS1VPQF=GS1.1.1723206091.1.1.1723206287.0.0.0; _ga=GA1.1.2083718513.1723206092; log=
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: same-origin

{"status_code":0,"data":{"page":{"limit":15,"total":32,"count":3,"page":1},"info":[{"open_num":5,"first_limit_up_time":"1723167821","last_limit_up_time":"1723186112","code":"600696","limit_up_type":"换手板","order_volume":147808.0,"is_new":0,"limit_up_suc_rate":1.0,"currency_value":3.0804635E9,"market_id":17,"is_again_limit":1,"change_rate":10.0358,"turnover_rate":12.3652,"reason_type":"白酒+电商","order_amount":1361311.7,"high_days":"8天5板","name":"岩石股份","high_days_value":327688,"change_tag":"LIMIT_BACK","market_type":"HS","latest":9.21,"time_preview":[4.779,4.54,4.54,3.1063,7.8853,10.0358,9.1995,8.3632,7.5269,7.5269,8.0048,6.9295,7.049,7.7658,7.7658,8.1243,8.0048,8.0048,9.08,9.08,9.1995,8.4827,9.08,8.9606,9.08,8.2437,8.9606,8.7216,8.8411,8.9606,9.9164,9.08,9.4385,10.0358,10.0358,10.0358,10.0358,10.0358,8.7216,9.9164,9.9164,9.1995,9.4385,9.9164,9.7969,9.9164,9.7969,9.6774,10.0358,10.0358,10.0358,10.0358,10.0358,10.0358,10.0358,10.0358,10.0358,10.0358,10.0358,10.0358,10.0358,10.0358,10.0358,10.0358,10.0358,10.0358,10.0358,9.6774,9.4385,9.6774,9.6774,9.319,9.4385,9.4385,9.4385,9.9164,10.0358,10.0358,10.0358,10.0358]},{"open_num":3,"first_limit_up_time":"1723184283","last_limit_up_time":"1723186095","code":"002717","limit_up_type":"换手板","order_volume":1016965.0,"is_new":0,"limit_up_suc_rate":0.625,"currency_value":1.6269369E9,"market_id":33,"is_again_limit":1,"change_rate":9.901,"turnover_rate":26.3102,"reason_type":"低价股+“生态+文旅”+国企","order_amount":1128831.15,"high_days":"首板","name":"岭南股份","high_days_value":65537,"change_tag":"LIMIT_BACK","market_type":"HS","latest":1.11,"time_preview":[-9.901,-0.9901,3.9604,6.9307,4.9505,3.9604,6.9307,5.9406,6.9307,7.9208,8.9109,6.9307,6.9307,6.9307,4.9505,4.9505,6.9307,6.9307,5.9406,5.9406,3.9604,3.9604,5.9406,6.9307,6.9307,6.9307,6.9307,5.9406,6.9307,5.9406,6.9307,5.9406,6.9307,6.9307,5.9406,6.9307,5.9406,5.9406,6.9307,5.9406,6.9307,7.9208,6.9307,6.9307,6.9307,5.9406,6.9307,5.9406,6.9307,6.9307,4.9505,4.9505,5.9406,4.9505,5.9406,5.9406,6.9307,6.9307,5.9406,7.9208,7.9208,8.9109,9.901,9.901,9.901,9.901,9.901,9.901,9.901,9.901,9.901,9.901,9.901,9.901,9.901,9.901,9.901,9.901,9.901,9.901]},{"open_num":10,"first_limit_up_time":"1723167003","last_limit_up_time":"1723186086","code":"003026","limit_up_type":"换手板","order_volume":235730.0,"is_new":0,"limit_up_suc_rate":0.6,"currency_value":2.5805622E9,"market_id":33,"is_again_limit":1,"change_rate":9.9966,"turnover_rate":34.4428,"reason_type":"半导体单晶硅片+芯片概念+汽车电子","order_amount":7574004.9,"high_days":"首板","name":"中晶科技","high_days_value":65537,"change_tag":"LIMIT_BACK","market_type":"HS","latest":32.13,"time_preview":[6.3677,9.9966,9.9966,9.9966,9.9966,9.9966,9.9966,8.7299,8.4902,7.6686,8.011,7.9083,8.6272,8.0794,9.4146,8.9695,8.6614,8.5587,8.4218,8.0452,8.1821,8.011,8.1137,7.7713,8.1479,8.5245,9.9966,9.9966,9.9966,9.9966,9.9966,9.9966,9.9966,9.1065,9.5515,9.9281,9.3461,9.4146,9.0038,8.9695,8.6614,8.456,9.3803,8.9353,9.038,9.038,9.1749,9.3119,9.5858,9.5858,9.6542,9.7569,9.8939,9.9623,9.9281,9.4146,9.4831,9.1407,9.038,9.2776,9.3461,9.9281,9.9623,9.9966,9.9623,9.7912,9.6885,9.7569,9.9623,9.9966,9.9966,9.9966,9.9966,9.9966,9.9966,9.5515,9.8596,9.9966,9.9966,9.9966]},{"open_num":2,"first_limit_up_time":"1723185660","last_limit_up_time":"1723185897","code":"300615","limit_up_type":"换手板","order_volume":1147618.0,"is_new":0,"limit_up_suc_rate":1.0,"currency_value":2.1365005E9,"market_id":33,"is_again_limit":1,"change_rate":20.0,"turnover_rate":35.744,"reason_type":"拟增资晶萃光学+航天航空结构件和紧固件+射频器件+工业母机","order_amount":1.8660269E7,"high_days":"3天3板","name":"欣天科技","high_days_value":196611,"change_tag":"LIMIT_BACK","market_type":"GEM","latest":16.26,"time_preview":[-4.6494,8.6347,12.3985,11.9557,8.4871,9.1513,7.1587,7.0111,8.1919,4.797,6.7159,7.1587,10.6273,9.3727,11.2915,10.2583,10.1107,10.0369,11.0701,9.8155,10.2583,7.7491,9.7417,8.1181,9.4465,9.2251,9.9631,10.3321,9.5203,11.0701,11.6605,12.6199,15.8672,14.2435,13.0627,14.0959,15.7196,14.9815,13.4317,13.7269,12.0295,13.5793,12.7675,11.4391,11.5129,11.4391,10.8487,9.8893,10.0369,11.5129,11.8081,14.3911,13.6531,12.8413,12.6199,13.2841,12.5461,13.1365,16.9742,18.0074,17.8598,16.679,17.048,17.417,16.31,16.4576,16.2362,15.572,17.1218,16.0886,16.5314,16.4576,16.5314,17.1218,17.3432,20.0,20.0,20.0,20.0,20.0]},{"open_num":7,"first_limit_up_time":"1723170442","last_limit_up_time":"1723185868","code":"603389","limit_up_type":"换手板","order_volume":1679400.0,"is_new":0,"limit_up_suc_rate":0.96,"currency_value":1.6632202E9,"market_id":17,"is_again_limit":1,"change_rate":10.087,"turnover_rate":19.5393,"reason_type":"智能家居+培育钻石+新零售","order_amount":1.0630602E7,"high_days":"2天2板","name":"亚振家居","high_days_value":131074,"change_tag":"LIMIT_BACK","market_type":"HS","latest":6.33,"time_preview":[2.6087,2.087,0.0,0.0,2.4348,1.2174,1.0435,0.6957,0.5217,1.3913,3.3043,4.8696,4.8696,3.1304,3.3043,4.0,4.3478,4.3478,4.1739,4.1739,9.913,8.6957,9.3913,8.8696,8.1739,7.8261,7.3043,6.9565,6.7826,6.087,6.087,7.8261,8.5217,7.1304,7.6522,7.4783,7.4783,7.3043,7.1304,6.7826,6.087,5.913,5.913,5.5652,5.5652,5.7391,6.2609,5.913,5.5652,4.5217,5.3913,5.7391,5.3913,5.0435,5.2174,5.7391,5.2174,6.4348,6.087,6.087,5.5652,5.913,5.7391,7.1304,9.913,8.6957,9.0435,9.0435,8.8696,10.087,9.913,9.5652,8.5217,7.6522,8.8696,10.087,10.087,10.087,10.087,10.087]},{"open_num":6,"first_limit_up_time":"1723169916","last_limit_up_time":"1723185537","code":"300675","limit_up_type":"换手板","order_volume":370700.0,"is_new":0,"limit_up_suc_rate":0.0,"currency_value":2.0152005E9,"market_id":33,"is_again_limit":1,"change_rate":20.0,"turnover_rate":20.1158,"reason_type":"建筑设计+水利+智能电网+深圳国资","order_amount":5093418.0,"high_days":"首板","name":"建科院","high_days_value":65537,"change_tag":"LIMIT_BACK","market_type":"GEM","latest":13.74,"time_preview":[1.1354,0.1747,0.1747,0.262,0.262,0.6114,0.6987,0.786,1.31,0.8734,1.4847,1.048,1.31,1.31,1.6594,1.3974,11.0917,11.0917,20.0,20.0,20.0,20.0,20.0,20.0,20.0,20.0,20.0,20.0,20.0,20.0,20.0,20.0,20.0,20.0,20.0,20.0,20.0,20.0,19.0393,20.0,20.0,20.0,18.4279,18.8646,18.69,18.2533,17.2052,17.8166,17.2052,17.5546,18.8646,19.214,17.9039,18.0786,18.4279,17.9039,18.952,18.3406,18.2533,17.9913,18.1659,18.3406,18.4279,18.4279,18.2533,18.0786,18.0786,18.952,19.0393,18.8646,18.7773,19.0393,19.8253,20.0,20.0,20.0,20.0,20.0,20.0,20.0]},{"open_num":6,"first_limit_up_time":"1723170126","last_limit_up_time":"1723185027","code":"000011","limit_up_type":"换手板","order_volume":4829263.0,"is_new":0,"limit_up_suc_rate":0.5,"currency_value":4.9436053E9,"market_id":33,"is_again_limit":1,"change_rate":9.9532,"turnover_rate":9.9906,"reason_type":"房地产+深圳国资+高股息","order_amount":4.534678E7,"high_days":"2天2板","name":"深物业A","high_days_value":131074,"change_tag":"LIMIT_BACK","market_type":"HS","latest":9.39,"time_preview":[-4.918,-5.3864,-3.7471,-3.3958,-0.4684,-1.4052,-1.4052,-1.6393,-1.7564,-1.5222,-1.2881,0.2342,2.8103,1.5222,5.8548,6.089,6.7916,6.5574,9.4848,9.9532,9.4848,9.9532,9.9532,9.9532,9.9532,9.9532,9.9532,9.9532,9.9532,9.9532,9.9532,9.9532,9.9532,9.9532,9.9532,9.6019,9.8361,9.8361,9.6019,8.0796,8.4309,7.7283,7.0258,6.9087,6.7916,7.1429,6.7916,6.7916,7.0258,7.1429,8.8993,8.6651,6.9087,6.5574,7.377,7.0258,7.26,7.26,6.9087,7.4941,7.0258,7.0258,7.26,8.4309,8.6651,8.4309,9.4848,9.6019,8.7822,9.4848,9.9532,9.9532,9.9532,9.9532,9.9532,9.9532,9.9532,9.9532,9.9532,9.9532]},{"open_num":null,"first_limit_up_time":"1723184977","last_limit_up_time":"1723184977","code":"603978","limit_up_type":"换手板","order_volume":1575300.0,"is_new":0,"limit_up_suc_rate":1.0,"currency_value":1.8503994E9,"market_id":17,"is_again_limit":0,"change_rate":9.9606,"turnover_rate":8.5154,"reason_type":"铝晶粒细化剂（可应用于航空航天）+增持+拟剥离部分六氟磷酸锂项目资产","order_amount":1.7564595E7,"high_days":"5天3板","name":"深圳新星","high_days_value":196613,"change_tag":"FIRST_LIMIT","market_type":"HS","latest":11.15,"time_preview":[-2.071,-4.6351,-4.2406,-4.6351,-3.8462,-4.2406,-4.5365,-4.4379,-4.4379,-4.5365,-4.6351,-5.2268,-5.2268,-5.6213,-5.4241,-5.9172,-6.0158,-5.9172,-5.8185,-5.8185,-5.8185,-5.4241,-5.7199,-5.5227,-5.3254,-5.2268,-4.7337,-4.8323,1.1834,1.7751,2.6627,2.6627,1.7751,1.8738,1.9724,1.5779,0.8876,0.8876,0.9862,0.0986,-0.2959,-0.3945,-0.4931,-1.1834,-1.1834,-0.789,-0.6903,-0.4931,-0.3945,-0.1972,0.4931,0.789,3.0572,1.8738,1.6765,1.3807,1.0848,1.2821,0.789,0.5917,3.6489,3.0572,3.8462,3.3531,3.6489,3.2544,3.5503,3.7475,3.9448,3.9448,9.9606,9.9606,9.9606,9.9606,9.9606,9.9606,9.9606,9.9606,9.9606,9.9606]},{"open_num":6,"first_limit_up_time":"1723173189","last_limit_up_time":"1723184376","code":"300328","limit_up_type":"换手板","order_volume":2092800.0,"is_new":0,"limit_up_suc_rate":0.0,"currency_value":3.6237451E9,"market_id":33,"is_again_limit":1,"change_rate":19.9546,"turnover_rate":13.2611,"reason_type":"折叠屏+华为+液态金属+智能座舱+深圳国资","order_amount":1.1070912E7,"high_days":"首板","name":"宜安科技","high_days_value":65537,"change_tag":"LIMIT_BACK","market_type":"GEM","latest":5.29,"time_preview":[3.6281,3.8549,2.7211,3.4014,3.1746,3.1746,2.7211,2.7211,2.4943,2.2676,2.4943,1.5873,1.8141,1.8141,2.0408,2.0408,1.3605,1.3605,1.1338,1.1338,0.907,0.4535,0.907,0.6803,0.907,1.3605,1.8141,1.3605,1.8141,1.3605,1.1338,1.3605,1.1338,2.7211,3.1746,19.9546,19.9546,19.9546,19.9546,19.9546,19.9546,17.0068,16.78,14.5125,15.873,16.3265,15.873,15.6463,15.6463,15.6463,14.2857,14.059,13.8322,14.5125,14.059,13.6054,14.059,13.6054,13.8322,19.0476,19.7279,18.8209,18.5941,19.7279,19.9546,19.9546,19.9546,19.9546,19.9546,19.9546,19.9546,19.9546,19.9546,19.9546,19.9546,19.9546,19.9546,19.9546,19.9546,19.9546]},{"open_num":1,"first_limit_up_time":"1723167585","last_limit_up_time":"1723183827","code":"002285","limit_up_type":"换手板","order_volume":1.06478E7,"is_new":0,"limit_up_suc_rate":0.5,"currency_value":4.2877672E9,"market_id":33,"is_again_limit":1,"change_rate":10.1523,"turnover_rate":8.1773,"reason_type":"房地产服务+珠海国资+中报预盈","order_amount":2.3105726E7,"high_days":"4天3板","name":"世联行","high_days_value":196612,"change_tag":"LIMIT_BACK","market_type":"HS","latest":2.17,"time_preview":[-3.5533,-3.5533,0.0,2.5381,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523,10.1523]},{"open_num":1,"first_limit_up_time":"1723173109","last_limit_up_time":"1723183713","code":"600552","limit_up_type":"换手板","order_volume":4076800.0,"is_new":0,"limit_up_suc_rate":0.0,"currency_value":9.5594218E9,"market_id":17,"is_again_limit":1,"change_rate":10.0,"turnover_rate":5.2121,"reason_type":"柔性可折叠玻璃（UTG）+华为概念+光伏","order_amount":4.1257216E7,"high_days":"首板","name":"凯盛科技","high_days_value":65537,"change_tag":"LIMIT_BACK","market_type":"HS","latest":10.12,"time_preview":[0.5435,1.087,1.3043,0.7609,0.4348,0.2174,0.0,-0.2174,-0.3261,1.413,1.3043,0.8696,0.6522,0.6522,1.1957,1.087,0.7609,0.7609,0.7609,0.6522,0.6522,0.5435,0.8696,2.0652,2.8261,2.7174,3.913,3.913,5.0,5.0,4.3478,4.5652,4.0217,4.7826,7.0652,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,8.587,8.0435,7.6087,8.2609,8.4783,9.0217,8.3696,8.4783,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0]},{"open_num":null,"first_limit_up_time":"1723183608","last_limit_up_time":"1723183608","code":"000536","limit_up_type":"换手板","order_volume":2.30682E7,"is_new":0,"limit_up_suc_rate":0.8947368421052632,"currency_value":5.7472116E9,"market_id":33,"is_again_limit":0,"change_rate":10.0529,"turnover_rate":2.2705,"reason_type":"华为+显示面板+OLED","order_amount":4.7981856E7,"high_days":"首板","name":"华映科技","high_days_value":65537,"change_tag":"FIRST_LIMIT","market_type":"HS","latest":2.08,"time_preview":[0.0,1.0582,0.5291,0.5291,0.5291,0.5291,0.5291,0.0,-0.5291,0.0,0.5291,0.0,0.0,0.0,0.0,0.5291,0.5291,0.5291,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.5291,0.5291,1.0582,1.0582,0.5291,0.5291,0.0,0.5291,0.5291,0.0,0.5291,1.0582,0.5291,1.0582,0.5291,0.5291,0.0,0.0,0.5291,0.0,0.5291,0.0,0.5291,0.5291,0.5291,0.0,0.0,0.0,0.5291,0.5291,0.0,0.5291,0.5291,0.0,0.0,1.0582,1.0582,1.5873,10.0529,10.0529,10.0529,10.0529,10.0529,10.0529,10.0529,10.0529,10.0529,10.0529,10.0529,10.0529,10.0529,10.0529,10.0529,10.0529,10.0529]},{"open_num":null,"first_limit_up_time":"1723183083","last_limit_up_time":"1723183083","code":"300256","limit_up_type":"换手板","order_volume":1.955915E7,"is_new":0,"limit_up_suc_rate":1.0,"currency_value":3.4182582E9,"market_id":33,"is_again_limit":0,"change_rate":20.2312,"turnover_rate":5.4469,"reason_type":"折叠屏+华为+毫米波雷达传感器芯片+低价股","order_amount":4.0683032E7,"high_days":"首板","name":"星星科技","high_days_value":65537,"change_tag":"FIRST_LIMIT","market_type":"GEM","latest":2.08,"time_preview":[0.0,0.0,-0.578,0.0,0.0,0.0,-0.578,-0.578,-0.578,-0.578,-1.1561,-0.578,-0.578,-0.578,-0.578,-0.578,-0.578,-0.578,-0.578,-0.578,-0.578,-0.578,-0.578,-0.578,0.0,-0.578,0.578,0.578,0.0,0.0,0.0,-0.578,-0.578,0.0,0.0,0.578,1.1561,2.3121,1.7341,1.1561,1.1561,1.1561,1.1561,1.1561,1.1561,1.1561,1.1561,1.1561,1.1561,1.1561,1.1561,1.7341,1.1561,1.1561,1.1561,2.8902,4.6243,5.7803,4.6243,9.8266,20.2312,20.2312,20.2312,20.2312,20.2312,20.2312,20.2312,20.2312,20.2312,20.2312,20.2312,20.2312,20.2312,20.2312,20.2312,20.2312,20.2312,20.2312,20.2312,20.2312]},{"open_num":1,"first_limit_up_time":"1723166700","last_limit_up_time":"1723181250","code":"000597","limit_up_type":"T字板","order_volume":1.1591911E7,"is_new":0,"limit_up_suc_rate":null,"currency_value":8.2864383E9,"market_id":33,"is_again_limit":1,"change_rate":10.0935,"turnover_rate":17.6382,"reason_type":"拟收购鼎成肽源+维生素+化学制药+创新药","order_amount":6.8276356E7,"high_days":"4天4板","name":"东北制药","high_days_value":262148,"change_tag":"LIMIT_BACK","market_type":"HS","latest":5.89,"time_preview":[10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,8.785,7.8505,8.2243,8.972,8.785,7.6636,8.4112,9.5327,9.7196,9.9065,10.0935,9.7196,9.9065,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935,10.0935]},{"open_num":2,"first_limit_up_time":"1723167423","last_limit_up_time":"1723179981","code":"600843","limit_up_type":"换手板","order_volume":4854003.0,"is_new":0,"limit_up_suc_rate":0.7647058823529411,"currency_value":3.8007041E9,"market_id":17,"is_again_limit":1,"change_rate":10.0543,"turnover_rate":15.4326,"reason_type":"碳纤维运动飞机+缝纫设备+机器人","order_amount":3.9317424E7,"high_days":"首板","name":"上工申贝","high_days_value":65537,"change_tag":"LIMIT_BACK","market_type":"HS","latest":8.1,"time_preview":[0.5435,4.4837,5.7065,8.6957,10.0543,10.0543,10.0543,8.4239,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543,10.0543]}],"limit_up_count":{"today":{"num":32,"history_num":51,"rate":0.6274509803921569,"open_num":19},"yesterday":{"num":44,"history_num":63,"rate":0.6984126984126984,"open_num":19}},"limit_down_count":{"today":{"num":10,"history_num":14,"rate":0.7142857142857143,"open_num":4},"yesterday":{"num":15,"history_num":18,"rate":0.8333333333333334,"open_num":3}},"date":"20240809","msg":null,"trade_status":{"id":"closed","name":"已收盘","start_time":"15:30","end_time":"23:59:59.999999999"}},"status_msg":"success"}

评论
GET https://t.10jqka.com.cn/lgt/post/open/api/forum/post/v2/recent?page=1&page_size=15&pid=0&time=0&sort=reply&code=002085&market_id=33 






















