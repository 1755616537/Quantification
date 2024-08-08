/**
 * T型报价
 *
 * @Author: xujun
 * @Date: 2020-02-10 16:12:36
 */

var hqConfig = require('../Apiconfig');
var tools = require("./tools");
var heads = require("./heads")
var delayparams = require("../../src/modules/quotedelay");

var paging = require("./paging");
// //http://61.152.230.191/api/qt/slist/get?secid=1.510300&exti=202009&spt=9&fltt=2&fields=f1,f2,f3,f4,f5,f12,f13,f14,f108,f152,f249,f250,f330,f339,f340,f341,f342,f343,f344,f345,f346,f347&fid=f161&pn=1&pz=20&po=0

// http://61.152.230.191/api/qt/stock/get?mspt=1&secid=1.510300
function TXingBaoJia(options){
    var default_options = {
        container:"#table_wrapper",
        name:"",
        type:"",//品种
        time:0,//时间 等于0 代表所有所有期权
        fields:'f1,f2,f3,f4,f5,f12,f13,f14,f108,f152,f161,f249,f250,f330,f334,f339,f340,f341,f342,f343,f344,f345,f346,f347',
        px:"f161",//排序字段
        pageIndex:1,
        pageSize:20,
        po:0, //正序  倒叙
        ut: "bd1d9ddb04089700cf9c27f6f7426281", //行情utoken
        orderBy:"xqj",
        sort:"asc",
        cp:'c',
        wbp2u: delayparams
    }
    this.options = $.extend({},default_options,options);

    this.page = new paging();
    this.cacheName = this.options.name + (this.options.type+"").substring(2);
    this.heads = heads.txbj;
    this.initDom();
}

TXingBaoJia.prototype.initDom = function(){
    if($('.tx_header').length){
        $(".tx_header").remove();
    }
    var html = '<div class="tx_header"><div>'+
        '<div class="left">'+this.options.name+'认购期权</div>'+
        '<div class="center"><select class="tx_dete" id="tx_dete"></select></div>'+
        '<div class="right">'+this.options.name+'认沽期权</div>'+
        '</div></div>';
    $(this.options.container).prepend(html);

    this.$table = $(this.options.container).find("#table_wrapper-table");
    this.$table.addClass("tx_table");
    this.loadDate();
    this.event();

}

TXingBaoJia.prototype.pageClick = function() {
    //paging 的点击事件
    var that = this;
    that.page.onPage = function (index) {
        that.options.pageIndex = index;

        if(index > that.options.sumPage){
            that.options.pageIndex = that.options.sumPage;
        }
        that.update();

    }
}

TXingBaoJia.prototype.loadDate = function(){
    var that = this;
    var url = hqConfig.getEnvPath("tsApi") + "api/qt/stock/get";
    $.ajax({
        url: url,
        method: "GET",
        data:{
            mspt:1,
            secid:this.options.type,
            ut:this.options.ut
        },
        dataType: "jsonp",
        jsonp: "cb",
        success: function (json) {
            if(json && json.data && json.data.optionExpireInfo){
                var data = json.data.optionExpireInfo || [];
                var html = "";
                var firstVal = 0;
                for(var i = 0;i<data.length;i++){
                    var date = data[i].date + "";
                    var val = date.substring(0,6);
                    var name = date.substring(0,4) + "年" + parseInt( date.substring(4,6) )+ "月(" + data[i].days+"天)";

                    var isSelected = "";

                    if(localStorage.getItem(that.cacheName) === val){
                        isSelected = "selected";
                        that.options.time = val
                    }

                    html += '<option value="'+val+'" '+isSelected+'>'+name+'</option>';
                    if(i === 0){
                        firstVal = val;
                    }
                }

                $("#tx_dete").html(html)

                if(!that.options.time){
                    that.options.time = firstVal;
                }
            }
            that.update();
        },
        error: function (err) {
            console && console.log(err)
            that.update();
        }
    })
}
// sorting_asc
TXingBaoJia.prototype.createThead = function(){

    var head = this.heads.head;
    var html = [];
    for(var i = 0;i<head.length;i++){
        var item = head[i];
        if(!item) {continue;}
        var className = item.order ? "sorting" : "";
        var sortClassName = "";
        if(this.options.px === item.key){
            sortClassName = this.options.po === 0 ? "sorting_asc" : "sorting_desc";
        }
        if(item.tips){
            html.push('<th class="'+className+' '+sortClassName+'"  data-key="'+item.key+'"><span title="'+item.tips+'"><span>'+item.title+'</span><b class="icon_yiwen"></b></span><b class="icon"></b></th>')
        }else{
            html.push('<th class="'+className+' '+sortClassName+'"  data-key="'+item.key+'"><span>'+item.title+'</span><b class="icon"></b></th>')
        }
    }
    this.$table.find("thead").html(html.join(""))
}

TXingBaoJia.prototype.update = function(){
    var that =this;
    that.createThead();
    that.gehqtData(function(json){
        if(json && json.data && json.data.diff){
            var total = json.data.total;
            var sumpage = Math.ceil(total / that.options.pageSize);
            that.options.sumPage = sumpage;
            if(sumpage > 1){
                that.page.setOps({
                    index: that.options.pageIndex,
                    sumPage: that.options.sumPage
                });

                that.pageClick();
                $(".dataTables_paginate").show();
            }else{
                //若是不足以分页 将分页隐藏
                $(".dataTables_paginate").hide();
            }

            that.loadTable(json.data.diff)
        }else{
            that.errorLoad();
        }
    })
}

TXingBaoJia.prototype.errorLoad = function(){
    // this.$table.find("thead").html("")
    this.$table.find("tbody").html("")
    $(".dataTables_paginate").hide();
}


// &fid=f161&pn=1&pz=20&po=0
TXingBaoJia.prototype.gehqtData = function(callback){
    var that =this;
    var url = hqConfig.getEnvPath("tsApi") + "api/qt/slist/get";
    var params = {
        secid:this.options.type,//品种
        exti:this.options.time,//时间
        spt:9,//固定
        fltt: 2,
        invt: 2,
        np:1,
        ut: this.options.ut,
        fields:this.options.fields,
        fid:this.options.px,//排序
        pn:this.options.pageIndex,
        pz:this.options.pageSize,
        po:this.options.po, //降序 升序
        wbp2u: this.options.wbp2u
    }

    $.ajax({
        url: url,
        method: "GET",
        data:params,
        dataType: "jsonp",
        jsonp: "cb",
        success: function (msg) {
            callback && callback(msg);
        },
        error: function (err) {
            that.errorLoad();
            console && console.log(err)
        }
    })
}

TXingBaoJia.prototype.loadTable = function(data){
    var html = "";
    for(var i = 0;i<data.length;i++){
        var item = data[i];
        // 多个接口，数据统一处理
        var obj = {
            gouName:item.f14,//认购名称
            gouCode:item.f12,//认购代码
            gouMarket:item.f13,//认购市场
            gouZxj:tools.formatNumberFlag(item.f2,item.f1) ,//认购最新价
            gouZdf:tools.formatNumberIndexZdf(item.f3,item.f152),//认购涨跌幅
            gouZde:tools.formatNumberFlag(item.f4,item.f1),//认购涨跌额
            gouCcl:item.f108,//认购持仓量
            gouCjl:item.f5,//认购成交量
            gouYxbd:tools.toPercent(item.f249,2) ,//认购隐形波动
            gouZYjl:tools.toPercent(item.f250,2),//认购折溢价率

            Xqj:tools.formatNumberFlag(item.f161,item.f330),//行权价

            guName:item.f340,//认沽名称
            guCode:item.f339,//认沽代码
            guMarket:item.f13,//认沽市场
            guZxj:tools.formatNumberFlag(item.f341,item.f1),//认沽最新价
            guZdf:tools.formatNumberIndexZdf(item.f343,item.f152),//认沽涨跌幅
            guZde:tools.formatNumberFlag(item.f342,item.f1),//认沽涨跌额
            guCcl:tools.formatNumberFlag(item.f345),//认沽持仓量
            guCjl:tools.formatNumber(item.f344),//认沽成交量
            guYxbd:tools.toPercent(item.f346,2),//认沽隐形波动
            guZYjl:tools.toPercent(item.f347,2),//认沽折溢价率
        }

        // "#fff1f1","#f2faf6" 浅红浅绿
        // 认购及认沽背景颜色
        var bgColorLeft = tools.getColor(item.f161,item.f334,["bgLightGreen","bgLightRed"])
        var bgColorRight = tools.getColor(item.f161,item.f334,["bgLightRed","bgLightGreen"])
        // 涨跌幅颜色
        var colorLeft  = tools.getColor(item.f4);
        var colorRight  = tools.getColor(item.f342);


        html += '<tr>'+

            '<td class="'+bgColorLeft+'"><a href="'+tools.quoteLink(obj.gouCode,obj.gouMarket)+'" target="_blank">'+obj.gouName+'</a></td>'+
            '<td class="'+bgColorLeft+'"><span class="'+colorLeft+'">'+obj.gouZxj+'</span></td>'+
            '<td class="'+bgColorLeft+'"><span class="'+colorLeft+'">'+obj.gouZdf+'</span></td>'+
            '<td class="'+bgColorLeft+'"><span class="'+colorLeft+'">'+obj.gouZde+'</span></td>'+
            '<td class="'+bgColorLeft+'"><span >'+obj.gouCcl+'</span></td>'+
            '<td class="'+bgColorLeft+'"><span >'+obj.gouCjl+'</span></td>'+
            '<td class="'+bgColorLeft+'"><span >'+obj.gouYxbd+'</span></td>'+
            '<td class="'+bgColorLeft+'"><span >'+obj.gouZYjl+'</span></td>'+

            '<td class="xq_orange"><span >'+obj.Xqj+'</span></td>'+

            '<td class="'+bgColorRight+'"><a href="'+tools.quoteLink(obj.guCode,obj.guMarket)+'" target="_blank">'+obj.guName+'</a></td>'+
            '<td class="'+bgColorRight+'"><span class="'+colorRight+'">'+obj.guZxj+'</span></td>'+
            '<td class="'+bgColorRight+'"><span class="'+colorRight+'">'+obj.guZdf+'</span></td>'+
            '<td class="'+bgColorRight+'"><span class="'+colorRight+'">'+obj.guZde+'</span></td>'+
            '<td class="'+bgColorRight+'"><span >'+obj.guCcl+'</span></td>'+
            '<td class="'+bgColorRight+'"><span >'+obj.guCjl+'</span></td>'+
            '<td class="'+bgColorRight+'"><span >'+obj.guYxbd+'</span></td>'+
            '<td class="'+bgColorRight+'"><span >'+obj.guZYjl+'</span></td>'+

            '</tr>'

    }
    this.$table.find("tbody").html(html)
    localStorage.setItem(this.cacheName,this.options.time);
    // return html
}

TXingBaoJia.prototype.event = function(){
    var that = this;
    $("#tx_dete").change(function(){
        that.options.time = $(this).val();
        that.options.pageIndex = 1
        that.update();
    })
    that.$table.find("thead").off();
    that.$table.find("thead").on("click","th.sorting",function(e){
        e.stopPropagation();
        e.preventDefault();
        var sortVal = $(this).data("key");
        if(sortVal){
            if(that.options.px === sortVal){
                that.options.po = 1 - that.options.po;
            }else{
                that.options.px = sortVal
            }
            that.update();
        }

    })

    $(window).hashchange(function (e) {
        try{
            clearInterval(window.cd)
        }
        catch(error){
        }

        if(location.hash.indexOf("_txbj") === -1){
            $("#table_wrapper-table").removeClass("tx_table");
            $('.tx_header').remove();
        }

    });
}


module.exports = TXingBaoJia;