var tools = require("../modules/tools");
var hqConfig = require('../Apiconfig');
var delayparams = require("../../src/modules/quotedelay");


module.exports = function (pars, callback) {
    //61.152.230.207

    // http://61.152.230.32:38618/api/qt/clist/get?pi=0&pz=20&po=1&fs=m:113+t:15&fid=f3&fields=f1,f2,f3,f4,f5,f6,f15,f16,f17,f28,f34,f35,f108&ut=fa5fd1943c7b386f172d6893dbfba10b

    //http://61.152.230.32:38618/api/qt/clist/get


    //外牌汇价
    // var url = "http://61.129.249.233:18665/api/qt/clist/get"

    var url = window.location.href;
    var hu_plag = url.split("#")[1];


    //统一接口  测试地址
    // var url = "http://61.152.230.191/api/qt/clist/get"


    //测试接口
    // var url = "http://61.129.249.233:18665/api/qt/clist/get"

    //正式接口
    //    var url = "http://" + Math.floor(Math.random()*100+1) +  ".push2.eastmoney.com/api/qt/clist/get";
    var url = hqConfig.getEnvPath("tsApi") + "api/qt/clist/get";

    var par = {
        pn: 0,
        pz: 20, // 每页大小
        // fs: "m:113+t:15",       // 证券过滤器
        // fs: "m:1+t:2",       // 证券过滤器
        po: 1, // 排序方向（正序填0，倒序填1，默认为1。）
        // fid: "f3",      // 排序字段
        np: 1,
        // fields: "f1,f12,f14,f2,f4,f3,f17,f15,f16,f28,f5,f6,f34,f35,f108",       // 需要获取的字段
        ut: "bd1d9ddb04089700cf9c27f6f7426281",
        fltt: 2,
        invt: 2,
        dect:1,
        wbp2u: delayparams
    }

    par = $.extend(par, pars);

    $.ajax({
        url: url,
        method: "GET",
        data: tools.objToPars(par),
        dataType: "jsonp",
        jsonp: "cb",
        success: function (msg) {
            // console.log('------------------')
            // console.log(msg);
            // console.log('------------------')
            // if (msg.rc === 0) {
            // if(msg && msg.data && msg.data.diff instanceof Array && msg.data.diff.length > 0){
            //      msg.data.diff.forEach(function(item){
            //          if(item.f14){
            //              item.f14 = tools.txtLeft(item.f14, 12, false)
            //          }
            //        item = item
            //      })
            // }
            callback(msg);
            // }
        },
        error: function (err) {

        }
    });


};