
var bankuai = require('./newbankuai');
var indexjson = require('../config/index.square.cfg.json');

var qihuo = require('../qihuo/newQihuo');
var TXingBaoJia = require('./txbj');
var QhTXingBaoJia = require('../qihuo/txbj');

var urlconfig = require("../qihuo/urlConfig");

var hk_rule = require("../../src/modules/hk_rule");

var user = require('../user')
var islogin = user.get() ? true: false

function addQqAds(){
    if($('.qqiframe').length){
        return;
    }
    $('.page-wrapper').prepend('<iframe class="qqiframe" width="1200" height="60" frameborder="0" scrolling="no" marginwidth="0" marginheight="0" src="//same.eastmoney.com/s?z=eastmoney&c=1659&op=1" ></iframe>')
}

/**
 * 延迟港股逻辑
 */
function delayHK(marketstring, delaymarketstring){
    hk_rule.default.isDelayCache().then(function(isdelay){
        var index_sz = new bankuai(indexjson.hkstocks);
        if(isdelay.re){
            index_sz.Bankuai("#table_wrapper", delaymarketstring);
            $('.hkruletip').html(isdelay.message).css({display:'inline-block'})
        }
        else{
            index_sz.Bankuai("#table_wrapper", marketstring);
        }
    })
}


/**
 * 延迟港股逻辑人民币计价
 */
function delayHK_RMB(marketstring, delaymarketstring){
    hk_rule.default.isDelayCache().then(function(isdelay){
        var index_sz = new bankuai(indexjson.hkstocks_rmb);
        if(isdelay.re){
            index_sz.Bankuai("#table_wrapper", delaymarketstring);
            $('.hkruletip').html(isdelay.message).css({display:'inline-block'})
        }
        else{
            index_sz.Bankuai("#table_wrapper", marketstring);
        }
    })
}


module.exports = function() {


    // console.log('新的方法');
    //沪深个股
    var url = window.location.href;
    var hu_plag = url.split("#")[1];
    // console.log(hu_plag);

    //统一 延迟声明 隐藏
    $("#yssm").hide();
    $('.linkToApp').remove();
    $('.hkruletip').css({display:'none'})

    switch(hu_plag) {
        //沪深a股
        case 'hs_a_board':
            var new_bankuai = new bankuai(indexjson.ops4);
            new_bankuai.Bankuai("#table_wrapper", "m:0+t:6,m:0+t:80,m:1+t:2,m:1+t:23,m:0+t:81+s:2048");
            break;

        //上证a股
        case 'sh_a_board':
            var new_bankuai = new bankuai(indexjson.ops4);
            new_bankuai.Bankuai("#table_wrapper", "m:1+t:2,m:1+t:23");
            break;
        //注册制上证a股
        case 'sh_a_board_zcz':
            var new_bankuai = new bankuai(indexjson.ops4);
            new_bankuai.Bankuai("#table_wrapper", "m:1+t:2+s:131072,m:1+t:23+s:131072");
            new_bankuai.refreshInit(60)
            break;
        //核准制上证a股
        case 'sh_a_board_hzz':
            var new_bankuai = new bankuai(indexjson.ops4);
            new_bankuai.Bankuai("#table_wrapper", "m:1+t:2+s:524288,m:1+t:23+s:524288");
            new_bankuai.refreshInit(60)
            break;

        //深证a股
        case 'sz_a_board':
            var new_bankuai = new bankuai(indexjson.ops4);
            new_bankuai.Bankuai("#table_wrapper", "m:0+t:6,m:0+t:80");
            break;
        //注册制深证a股
        case 'sz_a_board_zcz':
            var new_bankuai = new bankuai(indexjson.ops4);
            new_bankuai.Bankuai("#table_wrapper", "m:0+t:6+s:131072,m:0+t:80+s:131072");
            new_bankuai.refreshInit(60)
            break;
        //核准制深证a股
        case 'sz_a_board_hzz':
            var new_bankuai = new bankuai(indexjson.ops4);
            new_bankuai.Bankuai("#table_wrapper", "m:0+t:6+s:524288,m:0+t:80+s:524288");
            new_bankuai.refreshInit(60)
            break;

        //北证A股
        case 'bj_a_board':
            var new_bankuai = new bankuai(indexjson.ops4);
            new_bankuai.Bankuai("#table_wrapper", "m:0+t:81+s:2048");
            break;
        //新股
        case 'newshares':
            var new_bankuai = new bankuai(indexjson.opsnewgu);
            new_bankuai.Bankuai("#table_wrapper", "m:0+f:8,m:1+f:8");
            break;
        //中小板
        case 'sme_board':
            var new_bankuai = new bankuai(indexjson.ops4);
            new_bankuai.Bankuai("#table_wrapper", "m:0+t:13");
            break;
        //创业板
        case 'gem_board':
            var new_bankuai = new bankuai(indexjson.ops4);
            new_bankuai.Bankuai("#table_wrapper", "m:0+t:80");
            new_bankuai.refreshInit(60)
            break;

        //注册制创业板
        case 'gem_board_zcz':
            var new_bankuai = new bankuai(indexjson.ops4);
            new_bankuai.Bankuai("#table_wrapper", "m:0+t:80+s:131072");
            new_bankuai.refreshInit(60)
            break;
        //核准制创业板
        case 'gem_board_hzz':
            var new_bankuai = new bankuai(indexjson.ops4);
            new_bankuai.Bankuai("#table_wrapper", "m:0+t:80+s:!131072");
            new_bankuai.refreshInit(60)
            break;


        //科创板
        case 'kcb_board':
            var new_bankuai = new bankuai(indexjson.opsKcb);
            new_bankuai.Bankuai("#table_wrapper", "m:1+t:23");
            new_bankuai.refreshInit(60)
            break;

        //沪股通
        case 'sh_hk_board':
            var new_bankuai_sh_hk_board = new bankuai(indexjson.ops5);
            new_bankuai_sh_hk_board.Bankuai("#table_wrapper", "b:BK0707");
            break;

        //深股通
        case 'sz_hk_board':
            var new_bankuai_sz_hk_board = new bankuai(indexjson.ops5);
            new_bankuai_sz_hk_board.Bankuai("#table_wrapper", "b:BK0804");
            break;

        //b股
        case 'b_board':
            var new_bankuai = new bankuai(indexjson.ops4);
            new_bankuai.Bankuai("#table_wrapper", "m:0+t:7,m:1+t:3");
            break;

        //上证ab股比价
        case 'ab_comparison_sh':
            var new_bankuai = new bankuai(indexjson.abgu);
            new_bankuai.Bankuai("#table_wrapper", "m:1+b:BK0498");
            break;

        //深圳ab股比价
        case 'ab_comparison_sz':
            var new_bankuai = new bankuai(indexjson.abgu);
            new_bankuai.Bankuai("#table_wrapper", "m:0+b:BK0498");
            break;

        //风险警示板
        case 'st_board':
            var new_bankuai = new bankuai(indexjson.ops4);
            new_bankuai.Bankuai("#table_wrapper", "m:0+f:4,m:1+f:4");
            break;

        //上证风险
        case 'st_board_sh':
            var new_bankuai = new bankuai(indexjson.ops4);
            new_bankuai.Bankuai("#table_wrapper", "m:1+f:4");
            break;

        //深证风险
        case 'st_board_sz':
            var new_bankuai = new bankuai(indexjson.ops4);
            new_bankuai.Bankuai("#table_wrapper", "m:0+f:4");
            break;

        //科创板风险
        case 'st_board_kcb':
            var new_bankuai = new bankuai(indexjson.ops4);
            new_bankuai.Bankuai("#table_wrapper", "m:1+t:23+f:4");
            break;

        //创业板风险
        case 'st_board_cyb':
            var new_bankuai = new bankuai(indexjson.ops4);
            new_bankuai.Bankuai("#table_wrapper", "m:0+t:80+f:4");
            break;


        //两网及退市
        case 'staq_net_board':
            var new_staq_net_board = new bankuai(indexjson.ops6);
            new_staq_net_board.Bankuai("#table_wrapper", "m:0+s:3");
            break;

        //沪深指数  --- 上证系列指数
        case 'index_sh':
            var index_sh = new bankuai(indexjson.ops7);
            index_sh.Bankuai("#table_wrapper", "m:1+s:2");
            break;


        //沪深指数  --- 深圳系列指数
        case 'index_sz':
            var index_sz = new bankuai(indexjson.ops7);
            index_sz.Bankuai("#table_wrapper", "m:0+t:5");
            break;

        //沪深指数  --- 指数成分
        case 'index_components':
            var index_sz = new bankuai(indexjson.ops7);
            index_sz.Bankuai("#table_wrapper", "m:1+s:3,m:0+t:5");
            break;

        //沪深指数  --- 中证系列指数
        case 'index_zzzs':
            var index_sz = new bankuai(indexjson.ops7);
            index_sz.Bankuai("#table_wrapper", "m:2");
            break;

        //沪深港通  --- 港股通（沪）
        case 'hk_sh_stocks':
            // var index_sz = new bankuai(indexjson.hkshstocks);
            // index_sz.Bankuai("#table_wrapper", "b:MK0144");
            delayHK("b:MK0144", "b:DLMK0144")
            // 显示延迟声明
            $("#yssm").show();
            break;

        //沪深港通  --- 港股通（深）
        case 'hk_sz_stocks':
            // var index_sz = new bankuai(indexjson.hkshstocks);
            // index_sz.Bankuai("#table_wrapper", "b:MK0146");
            delayHK("b:MK0146", "b:DLMK0146")
            // 显示延迟声明
            $("#yssm").show();
            break;


        //沪深港通  --- ah股比价
        case 'ah_comparison':
        case 'hkah_comparison':

            hk_rule.default.isDelayCache().then(function(isdelay){
                var zd = "b:MK0101"

                if(isdelay.re){
                    zd = "b:DLMK0101"
                    $('.hkruletip').html(isdelay.message).css({display:'inline-block'})
                }

                var index_sz = new bankuai(indexjson.ahgu2);
                index_sz.Bankuai("#table_wrapper", zd);


            })

            // var index_sz = new bankuai(indexjson.ahgu2);
            // index_sz.Bankuai("#table_wrapper", "b:DLMK0101");

            // //显示延时数据的时候 显示延时声明
            // $("#yssm").show();
            break;

        //请求接口 判断是否是国外ip
        // var fullurl = 'http://push2.eastmoney.com/api/qt/clist/get?pn=1&pz=20&po=1&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&fid=f3&fs=b:MK0101&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10'

        // $.ajax({
        //     type: "get",
        //     data: '',
        //     url: fullurl,
        //     dataType: "jsonp",
        //     jsonp: 'cb',
        //     success: function (msg) {
        //         if(msg && msg.lt) {
        //             var lt = msg.lt
        //             //大陆 & 登录用户 显示实时行情
        //             if(lt == 1 && islogin) {
        //                 var index_sz = new bankuai(indexjson.ahgu2);
        //                 index_sz.Bankuai("#table_wrapper", "b:MK0101");
        //                 $("#yssm").hide();

        //             }
        //             //否则显示 延时行情
        //             else {
        //                 var index_sz = new bankuai(indexjson.ahgu2);
        //                 index_sz.Bankuai("#table_wrapper", "b:DLMK0101");

        //                 //显示延时数据的时候 显示延时声明
        //                 $("#yssm").show();

        //             }
        //         }

        //     }

        // });




        //新三板 ---全部
        case 'neeq_stocks':
            var index_sz = new bankuai(indexjson.ops9);
            index_sz.Bankuai("#table_wrapper", "m:0+t:81+s:!2052");
            break;

        //新三板 ---精选层
        case 'neeq_selected':
            var index_sz = new bankuai(indexjson.ops9);
            index_sz.Bankuai("#table_wrapper", "m:0+t:81+s:2048");
            break;

        //新三板 ---创新层
        case 'neeq_innovate':
            var index_sz = new bankuai(indexjson.ops9);
            index_sz.Bankuai("#table_wrapper", "m:0+s:512");
            break;

        //新三板 ---基础层
        case 'neeq_basic':
            var index_sz = new bankuai(indexjson.ops9);
            index_sz.Bankuai("#table_wrapper", "m:0+s:256");
            break;

        //新三板 ---连续竞价
        case 'neeq_agreement':
            var index_sz = new bankuai(indexjson.ops9);
            index_sz.Bankuai("#table_wrapper", "m:0+s:64");
            break;

        //新三板 ---集合竞价
        case 'neeq_marketmaking':
            var index_sz = new bankuai(indexjson.ops9);
            index_sz.Bankuai("#table_wrapper", "m:0+s:128");
            break;

        //新三板 ---做市转让
        case 'neeq_bidding':
            var index_sz = new bankuai(indexjson.ops9);
            index_sz.Bankuai("#table_wrapper", "m:0+s:32");
            break;


        //港股市场 ---全部
        case 'hk_stocks':
            delayHK("m:116+t:3,m:116+t:4,m:116+t:1,m:116+t:2", "m:128+t:3,m:128+t:4,m:128+t:1,m:128+t:2")

            // var index_sz = new bankuai(indexjson.hkstocks);
            // index_sz.Bankuai("#table_wrapper", "m:128+t:3,m:128+t:4,m:128+t:1,m:128+t:2");
            // // 显示延迟声明
            // $("#yssm").show();
            break;


        //港股市场--港股主板
        case 'hk_mainboard':
            delayHK("m:116+t:3", "m:128+t:3")

            // var index_sz = new bankuai(indexjson.hkstocks);
            // index_sz.Bankuai("#table_wrapper", "m:128+t:3");
            // // 显示延迟声明
            // $("#yssm").show();
            break;

        //港股市场--港股创业板
        case 'hk_gem':
            delayHK("m:116+t:4", "m:128+t:4")

            // var index_sz = new bankuai(indexjson.hkstocks);
            // index_sz.Bankuai("#table_wrapper", "m:128+t:4");
            // // 显示延迟声明
            // $("#yssm").show();
            break;


        //港股市场--知名港股
        case 'hk_wellknown':
            delayHK("b:MK0106", "b:DLMK0106")

            // var index_sz = new bankuai(indexjson.hkstocks);
            // index_sz.Bankuai("#table_wrapper", "b:DLMK0106");
            // // 显示延迟声明
            // $("#yssm").show();
            break;

        //港股市场--人民币交易
        case 'hk_rmb':
            delayHK_RMB("m:116+s:64", "m:128+s:64")

            // var index_sz = new bankuai(indexjson.hkstocks);
            // index_sz.Bankuai("#table_wrapper", "b:DLMK0106");
            // // 显示延迟声明
            // $("#yssm").show();
            break;

        //港股市场--蓝筹股
        case 'hk_bluechips':
            delayHK("b:MK0105", "b:DLMK0105")

            // var index_sz = new bankuai(indexjson.hkstocks);
            // index_sz.Bankuai("#table_wrapper", "b:DLMK0105");
            // // 显示延迟声明
            // $("#yssm").show();
            break;

        //港股市场--红筹股
        case 'hk_redchips':
            delayHK("b:MK0102", "b:DLMK0102")

            // var index_sz = new bankuai(indexjson.hkstocks);
            // index_sz.Bankuai("#table_wrapper", "b:DLMK0102");
            // // 显示延迟声明
            // $("#yssm").show();
            break;


        //港股市场-红筹指数成分股
        case 'hk_redchips_components':
            delayHK("b:MK0111", "b:DLMK0111")

            // var index_sz = new bankuai(indexjson.hkstocks);
            // index_sz.Bankuai("#table_wrapper", "b:DLMK0111");
            // // 显示延迟声明
            // $("#yssm").show();
            break;


        //港股市场---国企股
        case 'hk_stateowned':
            delayHK("b:MK0103", "b:DLMK0103")

            // var index_sz = new bankuai(indexjson.hkstocks);
            // index_sz.Bankuai("#table_wrapper", "b:DLMK0103");
            // // 显示延迟声明
            // $("#yssm").show();
            break;

        //港股市场---国企指数成分股
        case 'hk_stateowned_components':
            delayHK("b:MK0112", "b:DLMK0112")
            // var index_sz = new bankuai(indexjson.hkstocks);
            // index_sz.Bankuai("#table_wrapper", "b:DLMK0112");
            // // 显示延迟声明
            // $("#yssm").show();
            break;


        //港股市场---港股通成份股
        case 'hk_components':
            delayHK("b:MK0146,b:MK0144", "b:DLMK0146,b:DLMK0144")
            // var index_sz = new bankuai(indexjson.hkstocks);
            // index_sz.Bankuai("#table_wrapper", "b:DLMK0146,b:DLMK0144");
            // 显示延迟声明
            // $("#yssm").show();
            break;



        //  //港股市场---港股通成分股
        //  case 'hk_components':
        //     var index_sz = new bankuai(indexjson.hkstocks);
        //     index_sz.Bankuai("#table_wrapper", "111");
        //     break;


        //港股市场---恒新综合大型成分股
        case 'hsi_large_components':
            delayHK("b:MK0141", "b:DLMK0141")
            // var index_sz = new bankuai(indexjson.hkstocks);
            // index_sz.Bankuai("#table_wrapper", "b:DLMK0141");
            // // 显示延迟声明
            // $("#yssm").show();
            break;


        //港股市场---恒生综合中型成份股
        case 'hsi_medium_components':
            delayHK("b:MK0142", "b:DLMK0142")
            // var index_sz = new bankuai(indexjson.hkstocks);
            // index_sz.Bankuai("#table_wrapper", "b:DLMK0142");
            // // 显示延迟声明
            // $("#yssm").show();
            break;



        //港股市场---ADR
        case 'hk_adr':
            hk_rule.default.isDelayCache().then(function(isdelay){
                var index_sz = new bankuai(indexjson.hkadr);
                if(isdelay.re){
                    index_sz.Bankuai("#table_wrapper", "m:128+s:1");
                    $('.hkruletip').html(isdelay.message).css({display:'inline-block'})
                }
                else{
                    index_sz.Bankuai("#table_wrapper", "m:116+s:1");
                }
            })
            // var index_sz = new bankuai(indexjson.hkadr);
            // index_sz.Bankuai("#table_wrapper", "m:128+s:1");
            // // 显示延迟声明
            // $("#yssm").show();
            break;



        //港股市场---香港指数
        case 'hk_index':
            var index_sz = new bankuai(indexjson.hkindex);
            index_sz.Bankuai("#table_wrapper", "m:124,m:125,m:305");
            break;


        //港股市场---香港涡轮
        case 'hk_warrants':
            hk_rule.default.isDelayCache().then(function(isdelay){
                var index_sz = new bankuai(indexjson.hkindex);
                if(isdelay.re){
                    index_sz.Bankuai("#table_wrapper", "m:128+t:6");
                    $('.hkruletip').html(isdelay.message).css({display:'inline-block'})
                }
                else{
                    index_sz.Bankuai("#table_wrapper", "m:116+t:6");
                }
            })

            // var index_sz = new bankuai(indexjson.hkindex);
            // index_sz.Bankuai("#table_wrapper", "m:128+t:6");
            // // 显示延迟声明
            // $("#yssm").show();
            break;

        //港股市场---港股通ETF
        case 'ggt_etf_board':
            hk_rule.default.isDelayCache().then(function(isdelay){
                var index_sz = new bankuai(indexjson.hkindex);
                // if(isdelay.re){
                //     index_sz.Bankuai("#table_wrapper", "m:128+t:6");
                //     $('.hkruletip').html(isdelay.message).css({display:'inline-block'})
                // }
                // else{
                index_sz.Bankuai("#table_wrapper", "b:MK0837,b:MK0838");
                // }
            })

            // var index_sz = new bankuai(indexjson.hkindex);
            // index_sz.Bankuai("#table_wrapper", "m:128+t:6");
            // // 显示延迟声明
            // $("#yssm").show();
            break;


        //港股市场---港股通ETF-沪
        case 'hk_sh_board_fund':
            hk_rule.default.isDelayCache().then(function(isdelay){
                var index_sz = new bankuai(indexjson.hkindex);
                // if(isdelay.re){
                //     index_sz.Bankuai("#table_wrapper", "m:128+t:6");
                //     $('.hkruletip').html(isdelay.message).css({display:'inline-block'})
                // }
                // else{
                index_sz.Bankuai("#table_wrapper", "b:MK0838");
                // }
            })

            // var index_sz = new bankuai(indexjson.hkindex);
            // index_sz.Bankuai("#table_wrapper", "m:128+t:6");
            // // 显示延迟声明
            // $("#yssm").show();
            break;

        //港股市场---港股通ETF-深
        case 'hk_sz_board_fund':
            hk_rule.default.isDelayCache().then(function(isdelay){
                var index_sz = new bankuai(indexjson.hkindex);
                // if(isdelay.re){
                //     index_sz.Bankuai("#table_wrapper", "m:128+t:6");
                //     $('.hkruletip').html(isdelay.message).css({display:'inline-block'})
                // }
                // else{
                index_sz.Bankuai("#table_wrapper", "b:MK0837");
                // }
            })

            // var index_sz = new bankuai(indexjson.hkindex);
            // index_sz.Bankuai("#table_wrapper", "m:128+t:6");
            // // 显示延迟声明
            // $("#yssm").show();
            break;

        //港股市场---港股牛熊证
        case 'hk_CBBCs':
            hk_rule.default.isDelayCache().then(function(isdelay){
                var index_sz = new bankuai(indexjson.hkindexNXZ);
                if(isdelay.re){
                    index_sz.Bankuai("#table_wrapper", "m:128+t:5");
                    $('.hkruletip').html(isdelay.message).css({display:'inline-block'})
                }
                else{
                    index_sz.Bankuai("#table_wrapper", "m:116+t:5");
                }
            })
            // var index_sz = new bankuai(indexjson.hkindexNXZ);
            // index_sz.Bankuai("#table_wrapper", "m:128+t:5");
            // // 显示延迟声明
            // $("#yssm").show();
            break;



        //美股市场---全部美股
        case 'us_stocks':
            var index_sz = new bankuai(indexjson.usstocks);
            index_sz.Bankuai("#table_wrapper", "m:105,m:106,m:107");
            break;


        //美股市场---中国概念股
        case 'us_chinese':
            var index_sz = new bankuai(indexjson.usstocks);
            index_sz.Bankuai("#table_wrapper", "b:MK0201");
            break;


        //美股市场---美股指数
        case 'us_index':
            var index_sz = new bankuai(indexjson.usindex);
            index_sz.Bankuai("#table_wrapper", "i:100.NDX,i:100.DJIA,i:100.SPX");
            break;

        //美股市场---粉单市场
        case 'us_pinksheet':
            var index_sz = new bankuai(indexjson.usstocks);
            index_sz.Bankuai("#table_wrapper", "m:153");
            break;

        //美股市场---知名美股
        case 'us_wellknown':
            var index_sz = new bankuai(indexjson.usstocks);
            index_sz.Bankuai("#table_wrapper", "b:MK0001");
            break;


        //美股市场---知名美股--科技类
        case 'us_technology':
            var index_sz = new bankuai(indexjson.usstocks);
            index_sz.Bankuai("#table_wrapper", "b:MK0216");
            break;


        //美股市场---知名美股--金融类
        case 'us_financial':
            var index_sz = new bankuai(indexjson.usstocks);
            index_sz.Bankuai("#table_wrapper", "b:MK0217");
            break;


        //美股市场---知名美股--医药食品类
        case 'us_medicine_food':
            var index_sz = new bankuai(indexjson.usstocks);
            index_sz.Bankuai("#table_wrapper", "b:MK0218");
            break;

        //美股市场---知名美股--媒体类
        case 'us_media':
            var index_sz = new bankuai(indexjson.usstocks);
            index_sz.Bankuai("#table_wrapper", "b:MK0220");
            break;


        //美股市场---知名美股--汽车能源类
        case 'us_automotive_energy':
            var index_sz = new bankuai(indexjson.usstocks);
            index_sz.Bankuai("#table_wrapper", "b:MK0219");
            break;


        //美股市场---知名美股--制造零售类
        case 'us_manufacture_retail':
            var index_sz = new bankuai(indexjson.usstocks);
            index_sz.Bankuai("#table_wrapper", "b:MK0221");
            break;


        //美股市场---互联网中国
        case 'us_chinese_internet':
            var index_sz = new bankuai(indexjson.usstocks);
            index_sz.Bankuai("#table_wrapper", "b:MK0202");
            break;


        //全球指数---亚洲股市
        case 'global_asia':
            var index_sz = new bankuai(indexjson.globalamerica);
            index_sz.Bankuai("#table_wrapper", "i:1.000001,i:0.399001,i:0.399005,i:0.399006,i:1.000300,i:100.HSI,i:100.HSCEI,i:124.HSCCI,i:100.TWII,i:100.N225,i:100.KOSPI200,i:100.KS11,i:100.STI,i:100.SENSEX,i:100.KLSE,i:100.SET,i:100.PSI,i:100.KSE100,i:100.VNINDEX,i:100.JKSE,i:100.CSEALL");
            break;


        //全球指数---美洲股市
        case 'global_america':
            var index_sz = new bankuai(indexjson.globalamerica);
            index_sz.Bankuai("#table_wrapper", "i:100.DJIA,i:100.SPX,i:100.NDX,i:100.TSX,i:100.BVSP,i:100.MXX");
            break;

        //全球指数---欧洲股市
        case 'global_euro':
            var index_sz = new bankuai(indexjson.globalamerica);
            index_sz.Bankuai("#table_wrapper", "i:100.SX5E,i:100.FTSE,i:100.MCX,i:100.AXX,i:100.FCHI,i:100.GDAXI,i:100.RTS,i:100.IBEX,i:100.PSI20,i:100.OMXC20,i:100.BFX,i:100.AEX,i:100.WIG,i:100.OMXSPI,i:100.SSMI,i:100.HEX,i:100.OSEBX,i:100.ATX,i:100.MIB,i:100.ASE,i:100.ICEXI,i:100.PX,i:100.ISEQ");
            break;

        //全球指数---澳洲股市
        case 'global_australia':
            var index_sz = new bankuai(indexjson.globalamerica);
            index_sz.Bankuai("#table_wrapper", "i:100.AS51,i:100.AORD,i:100.NZ50");
            break;

        //全球指数---其他指数
        case 'global_qtzs':
            var index_sz = new bankuai(indexjson.globalamerica);
            index_sz.Bankuai("#table_wrapper", "i:100.UDI,i:100.BDI,i:100.CRB");
            break;


        //期货市场 -- 中金所
        case 'futures_cffex':
            // var index_sz = new bankuai(indexjson.zjs);
            // index_sz.Bankuai("#table_wrapper", "m:8+f:!8192");

            var obj = {
                type: 'zjs',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/220'
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");

            break;


        //期货市场 -- 中金所 --2年期国债
        case 'futures_cffex-_TS':
            // var index_sz = new bankuai(indexjson.zjs);
            // index_sz.Bankuai("#table_wrapper", "m:8+s:32+f:!8192");

            var obj = {
                type: 'zjs',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/variety/220/6'
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");
            break;



        //期货市场 -- 中金所 -- 10年期国债
        case 'futures_cffex-_T':
            // var index_sz = new bankuai(indexjson.zjs);
            // index_sz.Bankuai("#table_wrapper", "m:8+s:8+f:!8192");
            var obj = {
                type: 'zjs',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/variety/220/4'
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");
            break;

        //期货市场 -- 中金所 -- 30年期国债
        case 'futures_cffex-_TL':
            // var index_sz = new bankuai(indexjson.zjs);
            // index_sz.Bankuai("#table_wrapper", "m:8+s:8+f:!8192");
            var obj = {
                type: 'zjs',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/variety/220/8'
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");
            break;


        //期货市场 -- 中金所 -- 5年期国债
        case 'futures_cffex-_TF':
            // var index_sz = new bankuai(indexjson.zjs);
            // index_sz.Bankuai("#table_wrapper", "m:8+s:16+f:!8192");
            var obj = {
                type: 'zjs',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/variety/220/5'
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");
            break;


        //期货市场 -- 中金所 -- 沪深300
        case 'futures_cffex-_IF':
            // var index_sz = new bankuai(indexjson.zjs);
            // index_sz.Bankuai("#table_wrapper", "m:8+s:2");
            var obj = {
                type: 'zjs',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/variety/220/2'
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");
            break;
        //期货市场 -- 中金所 -- 中证1000
        case 'futures_cffex-_IM':
            // var index_sz = new bankuai(indexjson.zjs);
            // index_sz.Bankuai("#table_wrapper", "m:8+s:2");
            var obj = {
                type: 'zjs',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/variety/220/7'
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");
            break;

        //期货市场 -- 中金所 -- 上证50
        case 'futures_cffex-_IH':
            // var index_sz = new bankuai(indexjson.zjs);
            // index_sz.Bankuai("#table_wrapper", "m:8+s:4");
            var obj = {
                type: 'zjs',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/variety/220/3'
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");
            break;


        //期货市场 -- 中金所 -- 中正500
        case 'futures_cffex-_IC':
            // var index_sz = new bankuai(indexjson.zjs);
            // index_sz.Bankuai("#table_wrapper", "m:8+s:1");

            var obj = {
                type: 'zjs',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/variety/220/1'
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");
            break;


        //期货市场 -- 中金所 -- 深证100
        case 'futures_cffex-_IZ':
            // var index_sz = new bankuai(indexjson.zjs);
            // index_sz.Bankuai("#table_wrapper", "m:8+s:1");

            var obj = {
                type: 'zjs',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/variety/220/9'
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");
            break;


        //期货市场 -- 港交所 -- 指数期货  indexqhNew
        case 'hk_index_futures':
            // var index_sz = new bankuai(indexjson.indexqhNew);
            // index_sz.Bankuai("#table_wrapper", "m:134");

            hk_rule.default.isDelayCache().then(function(isdelay){
                if(isdelay.re){
                    var obj = {
                        type: 'gjs',
                        order: 'name',
                        orderDur: '1', //正序
                        url: urlconfig.qihuourl + '/list/HKINDEXFDL'
                    }
                    var index_sz = new qihuo(obj);
                    index_sz.Qihuo("#table_wrapper");
                    $('.hkruletip').html(isdelay.message).css({display:'inline-block'})
                }
                else{
                    var obj = {
                        type: 'gjs',
                        order: 'name',
                        orderDur: '1', //正序
                        url: urlconfig.qihuourl + '/list/HKINDEXF'
                    }
                    var index_sz = new qihuo(obj);
                    index_sz.Qihuo("#table_wrapper");
                }
            })



            break;


        //期货市场 -- 港交所 --股票期货
        case 'hk_stock_futures':
            // var index_sz = new bankuai(indexjson.indexqh);
            // index_sz.Bankuai("#table_wrapper", "m:130");

            hk_rule.default.isDelayCache().then(function(isdelay){
                if(isdelay.re){
                    var obj = {
                        type: 'gjs_gpqh',
                        order: 'name',
                        orderDur: '1', //正序
                        url: urlconfig.qihuourl + '/list/HKSTOCKFDL'
                    }
                    var index_sz = new qihuo(obj);
                    index_sz.Qihuo("#table_wrapper");
                    $('.hkruletip').html(isdelay.message).css({display:'inline-block'})
                }
                else{
                    var obj = {
                        type: 'gjs_gpqh',
                        order: 'name',
                        orderDur: '1', //正序
                        url: urlconfig.qihuourl + '/list/HKSTOCKF'
                    }
                    var index_sz = new qihuo(obj);
                    index_sz.Qihuo("#table_wrapper");
                }
            })



            break;


        //期货市场 -- 港交所 --外汇
        case 'HCF_CUS':
            // var index_sz = new bankuai(indexjson.indexqhNew);
            // index_sz.Bankuai("#table_wrapper", "m:131+t:4");

            hk_rule.default.isDelayCache().then(function(isdelay){
                if(isdelay.re){
                    var obj = {
                        type: 'gjs',
                        order: 'name',
                        orderDur: '1', //正序
                        url: urlconfig.qihuourl + '/list/HKCNYFDL'
                    }
                    var index_sz = new qihuo(obj);
                    index_sz.Qihuo("#table_wrapper");
                    $('.hkruletip').html(isdelay.message).css({display:'inline-block'})
                }
                else{
                    var obj = {
                        type: 'gjs',
                        order: 'name',
                        orderDur: '1', //正序
                        url: urlconfig.qihuourl + '/list/HKCNYF'
                    }
                    var index_sz = new qihuo(obj);
                    index_sz.Qihuo("#table_wrapper");
                }
            })



            break;


        //期货市场 -- 港交所 --商品
        case 'HMFS_LRP':
            // var index_sz = new bankuai(indexjson.indexqhNew);
            // index_sz.Bankuai("#table_wrapper", "m:131+t:5");

            hk_rule.default.isDelayCache().then(function(isdelay){
                if(isdelay.re){
                    var obj = {
                        type: 'gjs',
                        order: 'name',
                        orderDur: '1', //正序
                        url: urlconfig.qihuourl + '/list/HKMETALFSDL'
                    }
                    var index_sz = new qihuo(obj);
                    index_sz.Qihuo("#table_wrapper");
                    $('.hkruletip').html(isdelay.message).css({display:'inline-block'})
                }
                else{
                    var obj = {
                        type: 'gjs',
                        order: 'name',
                        orderDur: '1', //正序
                        url: urlconfig.qihuourl + '/list/HKMETALFS'
                    }
                    var index_sz = new qihuo(obj);
                    index_sz.Qihuo("#table_wrapper");
                }
            })



            break;


        //  //日元兑人民币
        // case 'HCF_CJP':
        //     var index_sz = new bankuai(indexjson.indexqhNew);
        //      index_sz.Bankuai("#table_wrapper", "m:131+t:3");
        // break;

        // //欧元兑人民币
        //     case 'HCF_CEU':
        //         var index_sz = new bankuai(indexjson.indexqhNew);
        //         index_sz.Bankuai("#table_wrapper", "m:131+t:2");
        //     break;

        //     //澳元兑人民币
        //     case 'HCF_CAU':
        //         var index_sz = new bankuai(indexjson.indexqhNew);
        //         index_sz.Bankuai("#table_wrapper", "m:131+t:1");
        //     break;


        //     //轮签
        //     case 'HMFS_LRP':
        //         var index_sz = new bankuai(indexjson.indexqhNew);
        //         index_sz.Bankuai("#table_wrapper", "m:132+t:4");
        //     break;


        //      //轮铜
        //     case 'HMFS_LRC':
        //         var index_sz = new bankuai(indexjson.indexqhNew);
        //         index_sz.Bankuai("#table_wrapper", "m:132+t:2");
        //     break;

        //      //伦镍
        //     case 'HMFS_LRS':
        //         var index_sz = new bankuai(indexjson.indexqhNew);
        //         index_sz.Bankuai("#table_wrapper", "m:132+t:5");
        //     break;


        //     //轮吕
        //     case 'HMFS_LRA':
        //         var index_sz = new bankuai(indexjson.indexqhNew);
        //         index_sz.Bankuai("#table_wrapper", "m:132+t:1");
        //     break;


        //     //轮锌
        //     case 'HMFS_LRZ':
        //         var index_sz = new bankuai(indexjson.indexqhNew);
        //         index_sz.Bankuai("#table_wrapper", "m:132+t:6");
        //     break;


        //      //轮锡
        //     case 'HMFS_LRN':
        //         var index_sz = new bankuai(indexjson.indexqhNew);
        //         index_sz.Bankuai("#table_wrapper", "m:132+t:3");
        //     break;


        //     //铁矿石期货月
        //     case 'HMFS_FEM':
        //         var index_sz = new bankuai(indexjson.indexqhNew);
        //         index_sz.Bankuai("#table_wrapper", "m:132+t:7");
        //     break;


        //      //铁矿石期货季
        //     case 'HMFS_FEQ':
        //         var index_sz = new bankuai(indexjson.indexqhNew);
        //         index_sz.Bankuai("#table_wrapper", "m:132+t:8");
        //     break;




        //期货市场 -- 国际期货 --
        case 'futures_global':
            // var index_sz = new bankuai(indexjson.gjqh);
            // index_sz.Bankuai("#table_wrapper", "m:102,m:103,m:108,m:109,m:111,m:112");

            var obj = {
                type: 'gjqh',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/COMEX,NYMEX,COBOT,SGX,NYBOT,LME,MDEX,TOCOM,IPE'
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");

            break;

        //期货市场 -- CME金属期货
        case 'futures_global-comex':
            var obj = {
                type: 'gjqh',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/COMEX'
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");
            break;

        //期货市场 -- CME能源期货
        case 'futures_global-nymex':
            var obj = {
                type: 'gjqh',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/NYMEX'
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");

            break;


        //期货市场 -- CME农业期货
        case 'futures_global-cobot':
            var obj = {
                type: 'gjqh',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/COBOT'
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");


            break;


        //期货市场 -- 新加坡交易所
        case 'futures_global-sgx':
            var obj = {
                type: 'gjqh',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/SGX'
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");

            break;


        //期货市场 -- ICE农业期货
        case 'futures_global-nybot':
            var obj = {
                type: 'gjqh',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/NYBOT'
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");

            break;


        //期货市场 -- 伦敦金属交易所
        case 'futures_global-lme':
            var obj = {
                type: 'gjqh',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/LME'
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");

            break;


        //期货市场 -- 马来西亚交易所
        case 'futures_global-mdex':
            var obj = {
                type: 'gjqh',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/MDEX'
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");

            break;


        //期货市场 -- 东京商品期货
        case 'futures_global-tocom':
            var obj = {
                type: 'gjqh',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/TOCOM'
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");

            break;


        //期货市场 -- ICE能源期货
        case 'futures_global-ipe':
            var obj = {
                type: 'gjqh',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/IPE'
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");

            break;


        //期货市场 -- 金融期货
        case 'futures_finance':
            // var index_sz = new bankuai(indexjson.gjqh);
            // index_sz.Bankuai("#table_wrapper", "b:MK0019");
            var obj = {
                blockName: 'financial',
                type: 'gjqh',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/block'
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");

            if(!$('.linkToApp').length){
                $("#table_wrapper-table").after('<a class="linkToApp"  tracker-eventcode="hqzx_jrqh_ckgdjrqh_dj" style="display:block;margin-top:10px;" href="https://zqhd.eastmoney.com/Html/aghd/pc/20170918/html/activity2.html?tz=xxlout_dfcfappweb_random_0001447a" target="_blank">剩余28个国际金融期货，请至东方财富APP内查看 》</a>')
            }
            break;


        //期货市场 -- 能源化工
        case 'futures_energy':
            // var index_sz = new bankuai(indexjson.gjqh);
            // index_sz.Bankuai("#table_wrapper", "b:MK0016");
            var obj = {
                blockName: 'energy',
                type: 'gjqh',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/block'
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");
            break;


        //期货市场 -- 金属钢材
        case 'futures_metal':
            // var index_sz = new bankuai(indexjson.gjqh);
            // index_sz.Bankuai("#table_wrapper", "b:MK0017");
            var obj = {
                blockName: 'metal',
                type: 'gjqh',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/block'
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");
            break;


        //期货市场 -- 农产品食品原料
        case 'futures_farmproduce':
            // var index_sz = new bankuai(indexjson.gjqh);
            // index_sz.Bankuai("#table_wrapper", "b:MK0018");

            var obj = {
                blockName: 'agricultural',
                type: 'gjqh',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/block'
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");
            break;



        //基金市场 --封闭基金行情
        case 'fund_close_end':
            var index_sz = new bankuai(indexjson.fundcloseend);
            index_sz.Bankuai("#table_wrapper", "e:19");
            break;

        //基金市场 --etf
        case 'fund_etf':
            var index_sz = new bankuai(indexjson.fundcloseend);
            index_sz.Bankuai("#table_wrapper", "b:MK0021,b:MK0022,b:MK0023,b:MK0024");
            break;

        //基金市场 -- 沪股通ETF
        case 'sh_hk_board_fund':
            var index_sz = new bankuai(indexjson.fundcloseend);
            index_sz.Bankuai("#table_wrapper", "b:MK0839");
            break;
        //基金市场 -- 深股通ETF
        case 'sz_hk_board_fund':
            var index_sz = new bankuai(indexjson.fundcloseend);
            index_sz.Bankuai("#table_wrapper", "b:MK0840");
            break;




        //基金市场 --lof
        case 'fund_lof':
            var index_sz = new bankuai(indexjson.fundcloseend);
            index_sz.Bankuai("#table_wrapper", "b:MK0404,b:MK0405,b:MK0406,b:MK0407");
            break;

        //基金市场 --reits
        case 'fund_reits_all':
            var index_sz = new bankuai(indexjson.fundcloseend_reits);
            index_sz.Bankuai("#table_wrapper", "m:1+t:9+e:97,m:0+t:10+e:97");
            break;
        //基金市场 --reits-sh
        case 'fund_reits_sh':
            var index_sz = new bankuai(indexjson.fundcloseend_reits);
            index_sz.Bankuai("#table_wrapper", "m:1+t:9+e:97");
            break;
        //基金市场 --reits-sz
        case 'fund_reits_sz':
            var index_sz = new bankuai(indexjson.fundcloseend_reits);
            index_sz.Bankuai("#table_wrapper", "m:0+t:10+e:97");
            break;


        //债券市场 --债券指数
        case 'bond_index':
            var index_sz = new bankuai(indexjson.bond);
            index_sz.Bankuai("#table_wrapper", "i:1.000012,i:1.000013,i:1.000022,i:1.000061,i:0.395021,i:0.395022,i:0.395031,i:0.395032,i:0.399481");
            break;


        //债券市场 --上海债券
        case 'bond_sh':
            var index_sz = new bankuai(indexjson.bond);
            index_sz.Bankuai("#table_wrapper", "m:1+t:4");
            break;

        case 'bond_bj':
            var index_sz = new bankuai(indexjson.bond);
            index_sz.Bankuai("#table_wrapper", "m:0+t:35");
            break;

        case 'bond_enterprise_bj':
            var index_sz = new bankuai(indexjson.bond);
            index_sz.Bankuai("#table_wrapper", "m:0+t:35+e:10");
            break;


        //债券市场 --沪国债券  bondnew
        case 'bond_national_sh':
            var index_sz = new bankuai(indexjson.bondnew);
            index_sz.Bankuai("#table_wrapper", "m:1+b:MK0351");
            break;


        //债券市场 --沪启债
        case 'bond_enterprise_sh':
            var index_sz = new bankuai(indexjson.bondnew);
            index_sz.Bankuai("#table_wrapper", "m:1+b:MK0353");
            break;


        //债券市场 --沪转债
        case 'bond_convertible_sh':
            var index_sz = new bankuai(indexjson.bond);
            index_sz.Bankuai("#table_wrapper", "m:1+b:MK0354");
            break;

        //债券市场 -深圳国债
        case 'bond_sz':
            var index_sz = new bankuai(indexjson.bond);
            index_sz.Bankuai("#table_wrapper", "m:0+t:8");
            break;


        //债券市场 -深国债
        case 'bond_national_sz':
            var index_sz = new bankuai(indexjson.bondnew);
            index_sz.Bankuai("#table_wrapper", "m:0+b:MK0351");
            break;


        //债券市场 -深启债
        case 'bond_enterprise_sz':
            var index_sz = new bankuai(indexjson.bondnew);
            index_sz.Bankuai("#table_wrapper", "m:0+b:MK0353");
            break;


        //债券市场 -深转债
        case 'bond_convertible_sz':
            var index_sz = new bankuai(indexjson.bond);
            index_sz.Bankuai("#table_wrapper", "m:0+b:MK0354");
            break;


        //债券市场 -上证回购
        case 'bond_sh_buyback':
            var index_sz = new bankuai(indexjson.bondnew);
            index_sz.Bankuai("#table_wrapper", "m:1+b:MK0356");
            break;


        //债券市场 -深证回购
        case 'bond_sz_buyback':
            var index_sz = new bankuai(indexjson.bondnew);
            index_sz.Bankuai("#table_wrapper", "m:0+b:MK0356");
            break;


        //外汇市场 -所有汇率
        case 'forex_all':
            var index_sz = new bankuai(indexjson.forex);
            index_sz.Bankuai("#table_wrapper", "m:119,m:120,m:133");
            break;


        //外汇市场 -基本汇率
        case 'forex_basic':
            var index_sz = new bankuai(indexjson.forex);
            index_sz.Bankuai("#table_wrapper", "b:MK0300");
            break;


        //外汇市场 -交叉汇率
        case 'forex_cross':
            var index_sz = new bankuai(indexjson.forex);
            index_sz.Bankuai("#table_wrapper", "b:MK0301");
            break;


        //外汇市场 -人民币品种
        case 'forex_cny':
            var index_sz = new bankuai(indexjson.forex);
            index_sz.Bankuai("#table_wrapper", "m:120+t:!2,m:133");
            break;

        //外汇市场 -人民币品种中间件
        case 'forex_cnyc':
            var index_sz = new bankuai(indexjson.forex3);
            index_sz.Bankuai("#table_wrapper", "b:MK0002");
            break;


        //外汇市场 -人民币询价
        // case 'forex_cnyi':
        //     var index_sz = new bankuai(indexjson.forex);
        //     index_sz.Bankuai("#table_wrapper", "m:121+t:1");
        //     break;


        //外汇市场 -人民币竞价
        case 'forex_cnyb':
            location.href="/center/gridlist.html#forex_cny";
            // var index_sz = new bankuai(indexjson.forex);
            // index_sz.Bankuai("#table_wrapper", "m:121+t:2");
            break;

        //外汇市场 -离岸人民币外币
        case 'forex_cnh':
            var index_sz = new bankuai(indexjson.forex);
            index_sz.Bankuai("#table_wrapper", "m:133");
            break;


        //外汇市场 -外汇牌价
        case 'forex_exchange_icbc':
            var index_sz = new bankuai(indexjson.whpj);
            index_sz.Bankuai("#table_wrapper", "m:162+s:1");
            break;


        //外汇市场 -农业银行报价
        case 'forex_exchange_abc':
            var index_sz = new bankuai(indexjson.whpj);
            index_sz.Bankuai("#table_wrapper", "m:162+s:2");
            break;

        //外汇市场 -中国银行报价
        case 'forex_exchange_boc':
            var index_sz = new bankuai(indexjson.whpj);
            index_sz.Bankuai("#table_wrapper", "m:162+s:4");
            break;


        //外汇市场 -建设银行报价
        case 'forex_exchange_ccb':
            var index_sz = new bankuai(indexjson.whpj);
            index_sz.Bankuai("#table_wrapper", "m:162+s:8");
            break;


        //外汇市场 -交通银行报价
        case 'forex_exchange_bcm':
            var index_sz = new bankuai(indexjson.whpj);
            index_sz.Bankuai("#table_wrapper", "m:162+s:16");
            break;


        //外汇市场 -招商银行报价
        case 'forex_exchange_cmb':
            var index_sz = new bankuai(indexjson.whpj);
            index_sz.Bankuai("#table_wrapper", "m:162+s:32");
            break;


        //期权市场 -上交所   和  上证50
        case 'options_sh50etf_all':
            window.quotedelaytip_is_option = true
            var index_sz = new bankuai(indexjson.qqsc);
            index_sz.Bankuai("#table_wrapper", "m:10");
            addQqAds();
            break;

        //期权市场 -上交所 - 上证50ETF
        case 'options_sz50etf_txbj':
            window.quotedelaytip_is_option = true
            new TXingBaoJia({
                name:"50ETF",
                type:"1.510050"
            });
            addQqAds();
            break;

        //期权市场 -上交所 - 上证50ETF全部合约
        case 'options_sz50etf_all':
            window.quotedelaytip_is_option = true
            var index_sz = new bankuai(indexjson.qqsc);
            index_sz.Bankuai("#table_wrapper", "m:10+c:510050");
            addQqAds();
            break;

        //期权市场 -上交所 - 上证50ETF认购合约
        case 'options_sz50etf_rengou':
            window.quotedelaytip_is_option = true
            var index_sz = new bankuai(indexjson.qqsc);
            index_sz.Bankuai("#table_wrapper", "m:10+c:510050+t:173");
            addQqAds();
            break;

        //期权市场 -上交所 - 上证50ETF认沽合约
        case 'options_sz50etf_rengu':
            window.quotedelaytip_is_option = true
            var index_sz = new bankuai(indexjson.qqsc);
            index_sz.Bankuai("#table_wrapper", "m:10+c:510050+t:174");
            addQqAds();
            break;





        //期权市场 -上交所 - 科创50ETF全部合约
        case 'options_kc50etf_all':
            window.quotedelaytip_is_option = true
            var index_sz = new bankuai(indexjson.qqsc);
            index_sz.Bankuai("#table_wrapper", "m:10+c:588000,m:10+c:588080");
            addQqAds();
            break;

        //期权市场 -上交所 - 科创50ETF
        case 'options_kc50etf1_txbj':
            window.quotedelaytip_is_option = true
            new TXingBaoJia({
                name:"科创50",
                type:"1.588000"
            });
            addQqAds();
            break;
        case 'options_kc50etf1_all':
            window.quotedelaytip_is_option = true
            var index_sz = new bankuai(indexjson.qqsc);
            index_sz.Bankuai("#table_wrapper", "m:10+c:588000");
            addQqAds();
            break;
        //期权市场 -上交所 - 科创50ETF认购合约
        case 'options_kc50etf1_rengou':
            window.quotedelaytip_is_option = true
            var index_sz = new bankuai(indexjson.qqsc);
            index_sz.Bankuai("#table_wrapper", "m:10+c:588000+t:173");
            addQqAds();
            break;

        //期权市场 -上交所 - 科创50ETF认沽合约
        case 'options_kc50etf1_rengu':
            window.quotedelaytip_is_option = true
            var index_sz = new bankuai(indexjson.qqsc);
            index_sz.Bankuai("#table_wrapper", "m:10+c:588000+t:174");
            addQqAds();
            break;


        case 'options_kc50etf2_txbj':
            window.quotedelaytip_is_option = true
            new TXingBaoJia({
                name:"科创板50",
                type:"1.588080"
            });
            addQqAds();
            break;
        case 'options_kc50etf2_all':
            window.quotedelaytip_is_option = true
            var index_sz = new bankuai(indexjson.qqsc);
            index_sz.Bankuai("#table_wrapper", "m:10+c:588080");
            addQqAds();
            break;
        //期权市场 -上交所 - 科创50ETF认购合约
        case 'options_kc50etf2_rengou':
            window.quotedelaytip_is_option = true
            var index_sz = new bankuai(indexjson.qqsc);
            index_sz.Bankuai("#table_wrapper", "m:10+c:588080+t:173");
            addQqAds();
            break;

        //期权市场 -上交所 - 科创50ETF认沽合约
        case 'options_kc50etf2_rengu':
            window.quotedelaytip_is_option = true
            var index_sz = new bankuai(indexjson.qqsc);
            index_sz.Bankuai("#table_wrapper", "m:10+c:588080+t:174");
            addQqAds();
            break;


        //期权市场 -上交所 - 沪深300ETF
        case 'options_sahs300etf_txbj':
            window.quotedelaytip_is_option = true
            new TXingBaoJia({
                type:"1.510300",
                name:"300ETF"
            });
            addQqAds();
            break;
        //期权市场 -上交所 - 沪深300ETF全部合约
        case 'options_sahs300etf_all':
            window.quotedelaytip_is_option = true
            var index_sz = new bankuai(indexjson.qqsc);
            index_sz.Bankuai("#table_wrapper", "m:10+c:510300");
            addQqAds();
            break;
        //期权市场 -上交所 - 沪深300ETF认购合约
        case 'options_sahs300etf_rengou':
            window.quotedelaytip_is_option = true
            var index_sz = new bankuai(indexjson.qqsc);
            index_sz.Bankuai("#table_wrapper", "m:10+c:510300+t:173");
            addQqAds();
            break;
        //期权市场 -上交所 - 沪深300ETF认沽合约
        case 'options_sahs300etf_rengu':
            window.quotedelaytip_is_option = true
            var index_sz = new bankuai(indexjson.qqsc);
            index_sz.Bankuai("#table_wrapper", "m:10+c:510300+t:174");
            addQqAds();
            break;


        //期权市场 -上交所 - 中证500ETF
        case 'options_sazz500etf_txbj':
            window.quotedelaytip_is_option = true
            new TXingBaoJia({
                type:"1.510500",
                name:"500ETF"
            });
            addQqAds();
            break;
        //期权市场 -上交所 - 中证500ETF全部合约
        case 'options_sazz500etf_all':
            window.quotedelaytip_is_option = true
            var index_sz = new bankuai(indexjson.qqsc);
            index_sz.Bankuai("#table_wrapper", "m:10+c:510500");
            addQqAds();
            break;
        //期权市场 -上交所 - 中证500ETF认购合约
        case 'options_sazz500etf_rengou':
            window.quotedelaytip_is_option = true
            var index_sz = new bankuai(indexjson.qqsc);
            index_sz.Bankuai("#table_wrapper", "m:10+c:510500+t:173");
            addQqAds();
            break;
        //期权市场 -上交所 - 中证500ETF认沽合约
        case 'options_sazz500etf_rengu':
            window.quotedelaytip_is_option = true
            var index_sz = new bankuai(indexjson.qqsc);
            index_sz.Bankuai("#table_wrapper", "m:10+c:510500+t:174");
            addQqAds();
            break;


        //期权市场 -深交所 - 中证500ETF
        case 'options_sezz500etf_txbj':
            window.quotedelaytip_is_option = true
            new TXingBaoJia({
                type:"0.159922",
                name:"500ETF"
            });
            addQqAds();
            break;
        //期权市场 -深交所 - 中证500ETF全部合约
        case 'options_sezz500etf_all':
            window.quotedelaytip_is_option = true
            var index_sz = new bankuai(indexjson.qqsc);
            index_sz.Bankuai("#table_wrapper", "m:12+c:159922");
            addQqAds();
            break;
        //期权市场 -深交所 - 中证500ETF认购合约
        case 'options_sezz500etf_rengou':
            window.quotedelaytip_is_option = true
            var index_sz = new bankuai(indexjson.qqsc);
            index_sz.Bankuai("#table_wrapper", "m:12+c:159922+t:178");
            addQqAds();
            break;
        //期权市场 -深交所 - 中证500ETF认沽合约
        case 'options_sezz500etf_rengu':
            window.quotedelaytip_is_option = true
            var index_sz = new bankuai(indexjson.qqsc);
            index_sz.Bankuai("#table_wrapper", "m:12+c:159922+t:179");
            addQqAds();
            break;


        //期权市场 -深交所 - 沪深300ETF
        case 'options_sehs300etf_txbj':
            new TXingBaoJia({
                type:"0.159919",
                name:"300ETF"
            });
            addQqAds();
            break;
        //期权市场 -深交所 - 沪深300ETF全部合约
        case 'options_sehs300etf_all':
            var index_sz = new bankuai(indexjson.qqsc);
            index_sz.Bankuai("#table_wrapper", "m:12+c:159919");
            addQqAds();
            break;

        //期权市场 -深交所 - 沪深300ETF认购合约
        case 'options_sehs300etf_rengou':
            var index_sz = new bankuai(indexjson.qqsc);
            index_sz.Bankuai("#table_wrapper", "m:12+c:159919+t:178");
            addQqAds();
            break;

        //期权市场 -深交所 - 沪深300ETF认沽合约
        case 'options_sehs300etf_rengu':
            var index_sz = new bankuai(indexjson.qqsc);
            index_sz.Bankuai("#table_wrapper", "m:12+c:159919+t:179");
            addQqAds();
            break;


        //期权市场 -深交所 - 创业板ETF
        case 'options_secybetf_txbj':
            new TXingBaoJia({
                type:"0.159915",
                name:"创业板ETF"
            });
            addQqAds();
            break;
        //期权市场 -深交所 - 创业板ETF全部合约
        case 'options_secybetf_all':
            var index_sz = new bankuai(indexjson.qqsc);
            index_sz.Bankuai("#table_wrapper", "m:12+c:159915");
            addQqAds();
            break;

        //期权市场 -深交所 - 创业板ETF认购合约
        case 'options_secybetf_rengou':
            var index_sz = new bankuai(indexjson.qqsc);
            index_sz.Bankuai("#table_wrapper", "m:12+c:159915+t:178");
            addQqAds();
            break;

        //期权市场 -深交所 - 创业板ETF认沽合约
        case 'options_secybetf_rengu':
            var index_sz = new bankuai(indexjson.qqsc);
            index_sz.Bankuai("#table_wrapper", "m:12+c:159915+t:179");
            addQqAds();
            break;


        //期权市场 -深交所
        case 'options_szetf_all':
            var index_sz = new bankuai(indexjson.qqsc);
            index_sz.Bankuai("#table_wrapper", "m:12");
            addQqAds();
            break;

        //期权市场 -深交所 -300ETF
        case 'options_sz300etf_all':
            var index_sz = new bankuai(indexjson.qqsc);
            index_sz.Bankuai("#table_wrapper", "m:12");
            break;


        //期权市场 -上期所---上交所  认购
        case 'options_sh50etf_call':
            var index_sz = new bankuai(indexjson.qqsc);
            index_sz.Bankuai("#table_wrapper", "m:10+t:173");
            addQqAds();
            break;


        //期权市场 -上期所---上交所  认沽
        case 'options_sh50etf_put':
            var index_sz = new bankuai(indexjson.qqsc);
            index_sz.Bankuai("#table_wrapper", "m:10+t:174");
            addQqAds();
            break;



        //期权市场 -上期所
        case 'options_shfe_all':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:151");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/151'
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");


            break;



        //期权市场 -上期所---铜
        case 'options_cu_all':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:151+t:1");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                // url: urlconfig.qihuourl + '/list/variety/SHFEOPTION/1'
                url: urlconfig.qihuourl + '/list/option/151',
                variety: 1
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");


            break;


        //期权市场 -上期所---橡胶
        case 'options_ru_all':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:151+t:2");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/151',
                variety: 2
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");

            break;

        //期权市场 -上期所---黄金
        case 'options_au_all':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:151+t:2");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/151',
                variety: 3
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");

            break;

        //期权市场 -上期所---沪铝
        case 'options_al_all':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:151+t:2");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/151',
                variety: 4
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");

            break;

        //期权市场 -上期所---沪锌
        case 'options_zn_all':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:151+t:2");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/151',
                variety: 5
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");

            break;

        //期权市场 -上期所---螺纹钢
        case 'options_rb_all':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:151+t:2");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/151',
                variety: 6
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");

            break;

        //期权市场 -上期所---沪银
        case 'options_ag_all':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:151+t:2");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/151',
                variety: 7
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");

            break;
        //期权市场 -上期所---沪银
        case 'options_br_all':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:151+t:2");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/151',
                variety: 8
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");

            break;

        //期权市场 -大商所  m:140
        case 'options_dce_all':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:140");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/140',
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");

            break;



        //期权市场 -大商所---豆泊
        case 'options_beanpulp_all':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:140+t:1");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/140',
                variety: 1
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");


            break;


        //期权市场 -大商所---玉米
        case 'options_c_all':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:140+t:2");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/140',
                variety: 2
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");


            break;



        //期权市场 -大商所---铁矿石
        case 'options_t_all':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:140+t:2");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/140',
                variety: 3
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");


            break;

        //期权市场 -大商所---液化石油气
        case 'options_lpg_all':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:140+t:2");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/140',
                variety: 4
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");


            break;

        //期权市场 -大商所---聚丙烯
        case 'options_pp_all':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:140+t:2");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/140',
                variety: 5
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");


            break;

        //期权市场 -大商所---聚氯乙烯
        case 'options_pvc_all':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:140+t:2");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/140',
                variety: 6
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");


            break;


        //期权市场 -大商所---聚乙烯
        case 'options_pe_all':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:140+t:2");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/140',
                variety: 7
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");


            break;

        //期权市场 -大商所---棕榈油
        case 'options_p_all':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:140+t:2");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/140',
                variety: 8
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");


            break;

        //期权市场 -大商所---豆一
        case 'options_a_all':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:140+t:2");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/140',
                variety: 9
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");


            break;

        //期权市场 -大商所---豆二
        case 'options_b_all':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:140+t:2");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/140',
                variety: 10
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");


            break;

        //期权市场 -大商所---豆油
        case 'options_y_all':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:140+t:2");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/140',
                variety: 11
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");


            break;


        //期权市场 -大商所---乙二醇
        case 'options_eg_all':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:140+t:2");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/140',
                variety: 12
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");


            break;

        //期权市场 -大商所---苯乙烯
        case 'options_eb_all':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:140+t:2");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/140',
                variety: 13
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");


            break;



        //期权市场 -上期能源---原油
        case 'options_sc_all':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:140+t:2");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/163',
                variety: 1
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");


            break;

        //期权市场 -郑商所
        case 'options_czce_all':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:141");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/141',
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");



            break;


        //期权市场 -郑商所
        case 'options_ine_all':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:141");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/163',
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");



            break;


        //期权市场 -郑商所---白糖
        case 'options_sugar_all':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:141+t:1");


            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/141',
                variety: 1
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");

            break;


        //期权市场 -郑商所---棉花
        case 'options_cf_all':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:141+t:2");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/141',
                variety: 2
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");


            break;
        //期权市场 -郑商所---PTA期权
        case 'options_cf_ta':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:141+t:2");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/141',
                variety: 4
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");


            break;
        //期权市场 -郑商所---甲醇
        case 'options_cf_ma':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:141+t:2");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/141',
                variety: 3
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");


            break;

        //期权市场 -郑商所---菜粕
        case 'options_cf_cp':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:141+t:2");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/141',
                variety: 5
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");


            break;

        //期权市场 -郑商所---菜籽油
        case 'options_cf_oi':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:141+t:2");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/141',
                variety: 7
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");


            break;

        //期权市场 -郑商所---花生
        case 'options_cf_pk':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:141+t:2");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/141',
                variety: 8
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");


            break;

        //期权市场 -郑商所---PX
        case 'options_cf_px':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:141+t:2");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/141',
                variety: 9
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");


            break;

        //期权市场 -郑商所---烧碱
        case 'options_cf_sh':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:141+t:2");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/141',
                variety: 10
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");


            break;



        //期权市场 -郑商所---硅铁
        case 'options_cf_sf':
            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/141',
                variety: 11
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");
            break;

        //期权市场 -郑商所---锰硅
        case 'options_cf_sm':
            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/141',
                variety: 12
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");
            break;
        //期权市场 -郑商所---苹果
        case 'options_cf_ap':
            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/141',
                variety: 13
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");
            break;

        //期权市场 -郑商所---尿素
        case 'options_cf_ur':
            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/141',
                variety: 14
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");
            break;
        //期权市场 -郑商所---纯碱
        case 'options_cf_sa':
            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/141',
                variety: 15
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");
            break;

        //期权市场 -郑商所---短纤
        case 'options_cf_pf':
            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/141',
                variety: 16
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");
            break;


        //期权市场 -郑商所---玻璃
        case 'options_cf_fg':
            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/141',
                variety: 17
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");
            break;
        //期权市场 -郑商所---红枣
        case 'options_cf_cj':
            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/141',
                variety: 18
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");
            break;


        //期权市场 -中金所
        case 'options_cffex_all':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:141");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/221',
                sc:221
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");



            break;



        //期权市场 --中金所---沪深300
        case 'options_cffex_io':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:141+t:1");


            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/11',
                sc:221
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");

            break;


        //  //期权市场 --中金所---沪深300指数
        case 'options_zjcffex_txbj':
            new QhTXingBaoJia({
                cacheName:"zjstxbj_1"
            }, '1');
            break;

        //期权市场 --中金所---沪深300指数全部
        case 'options_zjcffex_all':
            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/221?variety=1',
                sc:221
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");
            break;

        //期权市场 --中金所---沪深300指数认购合约
        case 'options_zjcffex_rengou':
            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/221?variety=1&cp=c',
                sc:221
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");
            break;

        //期权市场 --中金所---沪深300指数认沽
        case 'options_zjcffex_rengu':
            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/221?variety=1&cp=p',
                sc:221
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");
            break;



        //  //期权市场 --中金所---中证1000指数
        case 'options_zjcffex_mo_txbj':
            new QhTXingBaoJia({
                cacheName:"zjstxbj_2"
            }, '2');
            break;
        //期权市场 --中金所---中证1000指数
        case 'options_zjcffex_mo_all':
            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/221?variety=2',
                sc:221
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");
            break;

        //期权市场 --中金所---中证1000指数认购合约
        case 'options_zjcffex_mo_rengou':
            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/221?variety=2&cp=c',
                sc:221
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");
            break;

        //期权市场 --中金所---中证1000指数认沽
        case 'options_zjcffex_mo_rengu':
            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/221?variety=2&cp=p',
                sc:221
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");
            break;




        //  //期权市场 --中金所---深证100指数
        case 'options_zjcffex_zo_txbj':
            new QhTXingBaoJia({
                cacheName:"zjstxbj_4"
            }, '4');
            break;
        //期权市场 --中金所---深证100指数
        case 'options_zjcffex_zo_all':
            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/221?variety=4',
                sc:221
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");
            break;

        //期权市场 --中金所---深证100指数认购合约
        case 'options_zjcffex_zo_rengou':
            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/221?variety=4&cp=c',
                sc:221
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");
            break;

        //期权市场 --中金所---深证100指数认沽
        case 'options_zjcffex_zo_rengu':
            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/221?variety=4&cp=p',
                sc:221
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");
            break;



        //  //期权市场 --中金所---上证50指数
        case 'options_zjcffex_ho_txbj':
            new QhTXingBaoJia({
                cacheName:"zjstxbj_3"
            }, '3');
            break;
        //期权市场 --中金所---上证50指数
        case 'options_zjcffex_ho_all':
            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/221?variety=3',
                sc:221
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");
            break;

        //期权市场 --中金所---上证50指数认购合约
        case 'options_zjcffex_ho_rengou':
            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/221?variety=3&cp=c',
                sc:221
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");
            break;

        //期权市场 --中金所---上证50指数认沽
        case 'options_zjcffex_ho_rengu':
            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/221?variety=3&cp=p',
                sc:221
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");
            break;


        //期权市场 -广期所
        case 'options_gfex_all':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:140");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/226',
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");

            break;

        //期权市场 -广期所---工业硅
        case 'options_gfex_si':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:141+t:2");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/226',
                variety: 1
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");


            break;

        //期权市场 -广期所---碳酸锂
        case 'options_gfex_lc':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:141+t:2");

            var obj = {
                type: 'qqsc',
                order: 'zdf',
                url: urlconfig.qihuourl + '/list/option/226',
                variety: 2
            }
            var index_sz = new qihuo(obj);
            index_sz.Qihuo("#table_wrapper");


            break;

        //期权市场 -香港交易所  和  美元兑人民币
        case 'options_uscny_all':
            // var index_sz = new bankuai(indexjson.qqsc);
            // index_sz.Bankuai("#table_wrapper", "m:139");


            hk_rule.default.isDelayCache().then(function(isdelay){

                var obj = {
                    type: 'qqsc',
                    order: 'zdf',
                    url: urlconfig.qihuourl + '/list/HKUSDCNHOP'
                }


                if(isdelay.re){
                    obj.url = urlconfig.qihuourl + '/list/HKUSDCNHOPDL'
                    obj.sc = 139
                    $('.hkruletip').html(isdelay.message).css({display:'inline-block'})
                }


                var index_sz = new qihuo(obj);
                index_sz.Qihuo("#table_wrapper");
            })


            // var obj = {
            //     type: 'qqsc',
            //     order: 'zdf',
            //     url: urlconfig.qihuourl + '/list/HKUSDCNHOP'
            // }
            // var index_sz = new qihuo(obj);
            // index_sz.Qihuo("#table_wrapper");


            break;



        //黄金市场 -上海黄金现货
        case 'gold_sh_spotgoods':
            var index_sz = new bankuai(indexjson.gold);
            index_sz.Bankuai("#table_wrapper", "m:118");
            break;



        //黄金市场 -上海黄金期货
        case 'gold_sh_futures':
            var index_sz = new bankuai(indexjson.zjs);
            index_sz.Bankuai("#table_wrapper", "m:113+t:5");
            break;


        //黄金市场 -国际贵金属现货
        case 'nobalmetal_spotgoods':
            var index_sz = new bankuai(indexjson.gold,"nobalmetal_spotgoods");
            index_sz.Bankuai("#table_wrapper", "m:122,m:123");
            break;


        //黄金市场 -国际贵金属期货
        case 'nobalmetal_futures':
            var index_sz = new bankuai(indexjson.gold);
            index_sz.Bankuai("#table_wrapper", "i:111.JAGC,i:101.QI00Y,i:111.JPAC,i:101.HG00Y,i:111.JAUC,i:111.JPLC,i:102.PL00Y,i:101.QO00Y,i:101.MGC00Y,i:101.GC00Y,i:101.SI00Y,i:102.PA00Y");
            break;


        //若没有配置 则显示沪深a股
        default:
            // var new_bankuai = new bankuai(indexjson.ops4);
            // new_bankuai.Bankuai("#table_wrapper", "m:0+t:6,m:0+t:80,m:1+t:2,m:1+t:23");
            window.location.href = "/center/gridlist.html#hs_a_board";
            break;
    }




};