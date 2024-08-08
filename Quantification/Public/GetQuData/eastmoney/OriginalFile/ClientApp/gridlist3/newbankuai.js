require('../modules/polyfills/json-polyfill.js');
require('../modules/jquery-plugins/jquery-tooltips/jquery.tooltip');

var changeNum = require('../readomNum');
var formatNum = require('../formatNum');

var getData = require("./getData");

var paging = require("./paging");


var config = require("./config");
var index_order = require('./index.order.js');


var favstock = require('../favstock');
var tools = require('../modules/tools.js');


require('./css/square.css');  //表格样式


var table_refresh_cd;

function bankuai(ops,mdName) {
    this.config = config[ops.type];
    this.mdName = mdName || "";
    var head = this.config.head;
    this.tableHead = head;

    var dft = {
        container: "",
        orderDur: false,      //排序方向（正序填0,false ; 倒序填1, true，默认为1。）
        index: 1,
        pagesize: this.config.sumcount
    }
    this.ops = $.extend(dft, ops);
    // this.ops = dft;
    this.page = new paging();

    this.codearr = [];

    this.mycontent = '';
    this.myfs = '';

    //设置我的自选数据
    this._myFavor_list = null;

}

// bankuai.prototype.Bankuai = function(content, fs) {

bankuai.prototype.Bankuai = function(content, fs, codes) {
    // console.info(content)
    try{
        clearInterval(table_refresh_cd)
    }
    catch(error){
    }
    //   console.log('bankuai 进来了')
    //   console.log(fs)
    this.fs = fs;
    this.content = content
    this.codes = codes
    //板块模块
    this.getBankuai(content, fs, codes);

    // this.pageClick(content, fs);
    if(this.ops.thclick != false) {
        $('.dataTable thead th').css('cursor', 'default');
        this.addEvent(content, fs, codes);
    }


    //select
    this.addEventSelect(content, fs, codes);


    //自选股 添加
    this.add(content);

    //删除
    this.del(content);
}

/**
 * 设置自刷
 * @param {*} refresh_time 自刷时间 秒
 */
bankuai.prototype.refreshInit = function(refresh_time){
    //console.info('设置自刷')
    var _this = this
    try{
        clearInterval(table_refresh_cd)
    }
    catch(error){
    }
    table_refresh_cd = setInterval(function(){
        _this.getBankuai(_this.content, _this.fs, _this.codes)
    }, refresh_time * 1000);
}


bankuai.prototype.pageClick = function(content, fs, sumpage,codes) {
    //paging 的点击事件
    var that = this;
    that.page.onPage = function (index) {
        that.ops.index = index;

        if(index > sumpage) {
            that.ops.index = sumpage;
        }
        that.getDataBank(content, fs, codes);

    }


}



bankuai.prototype.hoverFn = function() {
    //默认
    $("#digest-industry").show();
    $("#digest-concept").hide();
    $("#digest-region").hide();

    $("#digest-industry").hover(function() {
        $("#digest-industry").show();
        $("#digest-concept").hide();
        $("#digest-region").hide();
    })

    $("#digest-concept").hover(function() {
        $("#digest-industry").hide();
        $("#digest-concept").show();
        $("#digest-region").hide();
    })


    $("#digest-region").hover(function() {
        $("#digest-industry").hide();
        $("#digest-concept").hide();
        $("#digest-region").show();
    })

}



bankuai.prototype.getBankuai = function(content, fs, codes) {
    var that = this;

    //判断是否要倒序
    if(this.getParam('sr') == 0 || this.getParam('sr') == 1) {
        // console.log('倒序')
        this.ops.orderDur = true;
    }

    //是否正序
    if(this.getParam('sr') == -1) {
        this.ops.orderDur = false;
    }

    //获取url上面的 需要 排序字段  that.ops
    if(that.getParam('st')) {
        that.ops.order = index_order[that.getParam('st')];
    }


    //增加板块的 首页跳转 第一次默认加载
    var url = window.location.href;
    var hu_plag = url.split("#")[1];
    if(hu_plag == 'region_board' || hu_plag == 'concept_board' || hu_plag == 'industry_board') {
        // console.info(that.ops.orderDur)
        if(that.ops.orderDur == false) {
            that.tableHead[10].title = '领涨股票';  //修改头部
            that.tableHead[10].key = 'f128';
            //涨跌幅
            that.tableHead[11].key = 'f136';
            that.tableHead[11].color = 'f136';
            that.createHead(content, fs);
            that.getDataBank(content, fs, codes);
        }
        if(that.ops.orderDur == true) {
            that.tableHead[10].title = '领跌股票';
            that.tableHead[10].key = 'f207';
            that.tableHead[10].data =["f209","f208"];
            //涨跌幅
            that.tableHead[11].key = 'f222';
            that.tableHead[11].color = 'f222';
            that.createHead(content, fs);
            that.getDataBank(content, fs, codes);


        }


    }else {

        //第一次默认展示  自选指标  首页跳转链接
        var arr = {
            'PB': '市净率',
            'MarketValue': '总市值',
            'FlowCapitalValue': '流通市值',
            'FlowCapitalValue': '流通市值',
            'ChangePercent60Day': '60日涨跌幅',
            'ChangePercent360Day': '年初至今涨跌幅',
            'Speed': '涨速',
            'FiveMinuteChangePercent': '5分钟涨跌',
            'VolumeRate': '量比'
        }
        if(that.getParam('st')) {
            for(var i=0;i< that.tableHead.length; i++) {
                var title =  that.tableHead[i].title;
                //先全部置为false
                if(title == '总市值' || title == '流通市值' || title == '60日涨跌幅' || title == '年初至今涨跌幅' || title == '涨速' || title == '5分钟涨跌' || title == '量比') {
                    that.tableHead[i].show = false;
                }
                if(title == arr[that.getParam('st')]) {
                    that.tableHead[i].show = true;
                }
            }

            //重新渲染表格
            that.createHead(content, fs);
            that.getDataBank(content, fs, codes);

        }else {

            that.createHead(content, fs);
            that.getDataBank(content, fs, codes);

        }

    }





}


bankuai.prototype.createHead = function (content, fs) {
    var head = this.tableHead;
    // console.log('w d head')
    // console.log(head)

    var tr = $('<tr role="row"></tr>');
    for (var i = 0; i < head.length; i++) {
        var item = head[i];

        if(item) {


            if(item.show == true) {
                // console.log(item.key, this.ops.order);

                if(item.title == '序号' || item.title == '加自选' || item.order == false) {
                    var th = $('<th style="" class="listview-col-'+item.name +' sorting_disabled" rowspan="1" colspan="1" aria-label="'+ item.title +'"><span style="color:#333">'+item.title+'</span><b class="icon"></b></th>');
                }
                else if(item.key == this.ops.order) {
                    if(this.ops.orderDur == 1) {

                        //区分可转债比价页面
                        if(item.name == 'zgValue') {
                            var th = $('<th style="" class="listview-col-' + item.name +' sorting_asc" rowspan="1" colspan="1" aria-label="'+ item.title +'"><span>' + '<span  title="转股价值=正股价/转股价*100" class="tooltip-f">转股价值<em class="help-icon"></em></span>' + '</span><b class="icon"></b></th>');
                        }
                        else if(item.name == 'zgYjb') {
                            var th = $('<th style="" class="listview-col-' + item.name +' sorting_asc" rowspan="1" colspan="1" aria-label="'+ item.title +'"><span>' + '<span  title="转股溢价率 = （转债最新价 – 转股价值）/ 转股价值" class="tooltip-f">转股溢价率<em class="help-icon"></em></span>' + '</span><b class="icon"></b></th>');
                        }
                        else if(item.name == 'czYjl') {
                            var th = $('<th style="" class="listview-col-' + item.name +' sorting_asc" rowspan="1" colspan="1" aria-label="'+ item.title +'"><span>' + '<span  title="纯债溢价率 = （转债最新价 – 纯债价值）/ 纯债价值" class="tooltip-f">纯债溢价率<em class="help-icon"></em></span>' + '</span><b class="icon"></b></th>');
                        }
                        else if(item.name == 'hsCfj') {
                            var th = $('<th style="" class="listview-col-' + item.name +' sorting_asc" rowspan="1" colspan="1" aria-label="'+ item.title +'"><span>' + '<span  title="满足回售触发条件时，可转债持有人有权将其持有的可转债全部或部分按债券面值加上当期应计利息的价格回售给公司" class="tooltip-f">回售触发价<em class="help-icon"></em></span>' + '</span><b class="icon"></b></th>');
                        }
                        else if(item.name == 'qsCfj') {
                            var th = $('<th style="" class="listview-col-' + item.name +' sorting_asc" rowspan="1" colspan="1" aria-label="'+ item.title +'"><span>' + '<span  title="满足赎回触发条件时，公司有权按照债券面值加当期应计利息的价格赎回全部或部分未转股的可转债" class="tooltip-f">强赎触发价<em class="help-icon"></em></span>' + '</span><b class="icon"></b></th>');
                        }
                        else if(item.name == 'dqShj') {
                            var th = $('<th style="" class="listview-col-' + item.name +' sorting_asc" rowspan="1" colspan="1" aria-label="'+ item.title +'"><span>' + '<span  title="公司有权以债券发行说明书中规定的到期赎回价买回其发行在外债券" class="tooltip-f">到期赎回价<em class="help-icon"></em></span>' + '</span><b class="icon"></b></th>');
                        }

                        else {
                            var th = $('<th style="" class="listview-col-' + item.name +' sorting_asc" rowspan="1" colspan="1" aria-label="'+ item.title +'"><span>'+item.title+'</span><b class="icon"></b></th>');
                        }

                    }

                    else {

                        if(item.name == 'zgValue') {
                            var th = $('<th style="" class="listview-col-' + item.name +' sorting_desc" rowspan="1" colspan="1" aria-label="'+ item.title +'"><span>' + '<span  title="转股价值=正股价/转股价*100" class="tooltip-f">转股价值<em class="help-icon"></em></span>' + '</span><b class="icon"></b></th>');
                        }
                        else if(item.name == 'zgYjb') {
                            var th = $('<th style="" class="listview-col-' + item.name +' sorting_desc" rowspan="1" colspan="1" aria-label="'+ item.title +'"><span>' + '<span  title="转股溢价率 = （转债最新价 – 转股价值）/ 转股价值" class="tooltip-f">转股溢价率<em class="help-icon"></em></span>' + '</span><b class="icon"></b></th>');
                        }
                        else if(item.name == 'czYjl') {
                            var th = $('<th style="" class="listview-col-' + item.name +' sorting_desc" rowspan="1" colspan="1" aria-label="'+ item.title +'"><span>' + '<span  title="纯债溢价率 = （转债最新价 – 纯债价值）/ 纯债价值" class="tooltip-f">纯债溢价率<em class="help-icon"></em></span>' + '</span><b class="icon"></b></th>');
                        }
                        else if(item.name == 'hsCfj') {
                            var th = $('<th style="" class="listview-col-' + item.name +' sorting_desc" rowspan="1" colspan="1" aria-label="'+ item.title +'"><span>' + '<span  title="满足回售触发条件时，可转债持有人有权将其持有的可转债全部或部分按债券面值加上当期应计利息的价格回售给公司" class="tooltip-f">回售触发价<em class="help-icon"></em></span>' + '</span><b class="icon"></b></th>');
                        }
                        else if(item.name == 'qsCfj') {
                            var th = $('<th style="" class="listview-col-' + item.name +' sorting_desc" rowspan="1" colspan="1" aria-label="'+ item.title +'"><span>' + '<span  title="满足赎回触发条件时，公司有权按照债券面值加当期应计利息的价格赎回全部或部分未转股的可转债" class="tooltip-f">强赎触发价<em class="help-icon"></em></span>' + '</span><b class="icon"></b></th>');
                        }
                        else if(item.name == 'dqShj') {
                            var th = $('<th style="" class="listview-col-' + item.name +' sorting_desc" rowspan="1" colspan="1" aria-label="'+ item.title +'"><span>' + '<span  title="公司有权以债券发行说明书中规定的到期赎回价买回其发行在外债券" class="tooltip-f">到期赎回价<em class="help-icon"></em></span>' + '</span><b class="icon"></b></th>');
                        }


                        else {
                            var th = $('<th style="" class="listview-col-' + item.name +' sorting_desc" rowspan="1" colspan="1" aria-label="'+ item.title +'"><span>'+item.title+'</span><b class="icon"></b></th>');
                        }

                    }

                    //    $(".tooltip").hide();

                }
                //可转债比价
                else if(item.name == 'zgValue') {
                    var th = $('<th style="" class="listview-col-' + item.name +' sorting" rowspan="1" colspan="1" aria-label="'+ item.title +'"><span>' + '<span  title="转股价值=正股价/转股价*100" class="tooltip-f">转股价值<em class="help-icon"></em></span>' + '</span><b class="icon"></b></th>');
                }
                else if(item.name == 'zgYjb') {
                    var th = $('<th style="" class="listview-col-' + item.name +' sorting" rowspan="1" colspan="1" aria-label="'+ item.title +'"><span>' + '<span  title="转股溢价率 = （转债最新价 – 转股价值）/ 转股价值" class="tooltip-f">转股溢价率<em class="help-icon"></em></span>' + '</span><b class="icon"></b></th>');
                }
                else if(item.name == 'czYjl') {
                    var th = $('<th style="" class="listview-col-' + item.name +' sorting" rowspan="1" colspan="1" aria-label="'+ item.title +'"><span>' + '<span  title="纯债溢价率 = （转债最新价 – 纯债价值）/ 纯债价值" class="tooltip-f">纯债溢价率<em class="help-icon"></em></span>' + '</span><b class="icon"></b></th>');
                }
                else if(item.name == 'hsCfj') {
                    var th = $('<th style="" class="listview-col-' + item.name +' sorting" rowspan="1" colspan="1" aria-label="'+ item.title +'"><span>' + '<span  title="满足回售触发条件时，可转债持有人有权将其持有的可转债全部或部分按债券面值加上当期应计利息的价格回售给公司" class="tooltip-f">回售触发价<em class="help-icon"></em></span>' + '</span><b class="icon"></b></th>');
                }
                else if(item.name == 'qsCfj') {
                    var th = $('<th style="" class="listview-col-' + item.name +' sorting" rowspan="1" colspan="1" aria-label="'+ item.title +'"><span>' + '<span  title="满足赎回触发条件时，公司有权按照债券面值加当期应计利息的价格赎回全部或部分未转股的可转债" class="tooltip-f">强赎触发价<em class="help-icon"></em></span>' + '</span><b class="icon"></b></th>');
                }
                else if(item.name == 'dqShj') {
                    var th = $('<th style="" class="listview-col-' + item.name +' sorting" rowspan="1" colspan="1" aria-label="'+ item.title +'"><span>' + '<span  title="公司有权以债券发行说明书中规定的到期赎回价买回其发行在外债券" class="tooltip-f">到期赎回价<em class="help-icon"></em></span>' + '</span><b class="icon"></b></th>');
                }

                else {
                    var th = $('<th style="" class="listview-col-' + item.name +' sorting" rowspan="1" colspan="1" aria-label="'+ item.title +'"><span>' + item.title + '</span><b class="icon"></b></th>');
                }

                th.attr("data-key", item.key);

                tr.append(th)

            }


        }


    }
    $(content).find("table thead").html("");
    $(content).find("table thead").append(tr)
    // var thead1 = $("<thead></thead>").append(tr)
    // $(content).find("table").html("").append(thead1);

    // this.table.find("thead").html("").append(tr);      background-color: #fff;font-weight: bold;border: none;
}


bankuai.prototype.getDataBank = function (content, fs, codes) {

    var that = this;
    var ops = this.ops;
    var config = this.config;
    //增加首页的跳转问题
    // console.log(ops);
    // console.log(that.getParam('st'))
    // console.log(that.getParam('sr'))


    var par = {
        fid: ops.order,
        po: ops.orderDur ? "0" : "1",
        pn: ops.index,
        pz: config.sumcount,
        fs: fs,
        fields: config.fields

    }
    getData(par, function (msg) {
        // console.log('getData  进来了')
        var data = msg.data;
        // console.log(data)
        if(data){
            var list = data.diff;

            var total = data.total;
            var sumpage = Math.ceil(total / ops.pagesize);
            ops.sumPage = sumpage;

            if (sumpage > 1) {
                var page = that.page;
                page.setOps({
                    index: ops.index,
                    sumPage: ops.sumPage
                });

                that.pageClick(content, fs, sumpage, codes);

                $(".dataTables_paginate").show();
            }else {
                //若是不足以分页 将分页隐藏
                $(".dataTables_paginate").hide();
            }

            that.setBody(content, list, codes);

        } else {

            //若数据为空 则将表格置为空
            list = [];
            $(".dataTables_paginate").hide();
            that.setBody(content, list, codes)

        }

    });
}


bankuai.prototype.addEvent = function (content, fs, codes) {
    var that = this;
    // console.log('that.ops.orderDur', that.ops.orderDur)
    // console.log(fs)
    //解除事件绑定
    $(content).find("thead").off();

    $(content).find("thead").on("click", "th", function () {
        var key = $(this).attr("data-key");

        //板块 领涨股票和相关涨跌幅 不排序
        if(key == 'f128' || key == 'f136'){
            return false
        }

        //加自选不可点击
        if (key && key!= 'addzixuan') {
            if (key == that.ops.order) {
                that.ops.orderDur = !that.ops.orderDur;
            } else {
                that.ops.order = key;
                that.ops.orderDur = true;
            }

            //点击  增加板块的涨跌幅排序问题
            var url = window.location.href;
            var hu_plag = url.split("#")[1];
            if(hu_plag == 'region_board' || hu_plag == 'concept_board' || hu_plag == 'industry_board') {
                // console.log('region_board');
                // console.log(that.ops.orderDur);
                // console.log(that.tableHead)
                // console.log(that.config)

                if(that.ops.orderDur == false) {
                    that.tableHead[10].title = '领涨股票';  //修改头部
                    that.tableHead[10].key = 'f128';
                    that.tableHead[10].data =["f141","f140"];
                    //涨跌幅
                    that.tableHead[11].key = 'f136';
                    that.tableHead[11].color = 'f136';
                    that.createHead(content, fs);
                    that.getDataBank(content, fs, codes);
                }
                if(that.ops.orderDur == true) {
                    that.tableHead[10].title = '领跌股票';
                    that.tableHead[10].key = 'f207';
                    that.tableHead[10].data =["f209","f208"];

                    //涨跌幅
                    that.tableHead[11].key = 'f222';
                    that.tableHead[11].color = 'f222';
                    that.createHead(content, fs);
                    that.getDataBank(content, fs, codes);
                }

            }else {
                that.createHead(content, fs);
                that.getDataBank(content, fs, codes);
            }


        }




    });
}


bankuai.prototype.addEventSelect = function (content, fs) {
    var that = this;


    $('#custom-fields').change(function(){
        var p2 = $(this).val();//这就是selected的值
        var arr = {
            'PB': '市净率',
            "JLV":"净利润",
            'MarketValue': '总市值',
            'FlowCapitalValue': '流通市值',
            'ChangePercent60Day': '60日涨跌幅',
            'ChangePercent360Day': '年初至今涨跌幅',
            'Speed': '涨速',
            'FiveMinuteChangePercent': '5分钟涨跌',
            'VolumeRate': '量比'
        }
        for(var i=0;i< that.tableHead.length; i++) {
            var title =  that.tableHead[i].title;
            //先全部置为false
            if(title == '市净率' || title == '总市值' || title == '流通市值' || title == '60日涨跌幅' || title == '年初至今涨跌幅' || title == '涨速' || title == '5分钟涨跌'|| title == '量比' || title=="净利润") {
                that.tableHead[i].show = false;
            }
            if(title == arr[p2]) {
                that.tableHead[i].show = true;
                that.config.selectVal = p2;
            }
        }


        //重新渲染表格
        that.createHead(content, fs);
        that.createBody(content, fs);


    });



}


bankuai.prototype.setBody = function (content, list, codes) {
    var that = this;
    that.body = list;  //纯列表的数据  没有加自选的选项


    if (that.ops.zixuan == true) {
        // console.log('获取加自选的数据');
        // window._myFavor_list

        //若传入第三个参数的话  就表示之前请求过自选List ==codes  不用再请求
        if(codes) {
            ShowZixuan(codes);

        }else {
            var data1 = favstock.getDefaultStocks();
            data1.then(function (res) {
                ShowZixuan(res);

            });

        }



        function ShowZixuan(res) {
            if(res) {

                that.zixuanList = res.split(',');

                //遍历之前的数据 将加自选的数据 添加上去
                for(var i = 0; i < that.body.length; i++) {
                    var item = that.body[i];
                    var makScode = item.f13 + '.' + item.f12;
                    if(item.f13 == "128"){
                        makScode = '116.'+ item.f12;
                    }
                    var isZisuan = false;

                    if(that.in_array(makScode, that.zixuanList)) {
                        isZisuan = true;
                    } else {
                        isZisuan = false;
                    }
                    item.isZisuan = isZisuan;
                }

                // console.log(that.body);
                that.createBody(content);

            }

        }


    }


    that.createBody(content);
}


//加自选
bankuai.prototype.add = function(content) {
    var tabcontent = content+ '-table';

    $(tabcontent).off('click', '.addzx')

    $(tabcontent).on('click', '.addzx', function() {
        console.log('add')
        var _that = $(this);
        var myscode = $(this).attr("data-myscode");
        // console.log('myscode', myscode)
        var data = favstock.add(myscode);
        data.then(function(res) {
            // console.log('add: ' + res)
            if(res == true) {
                _that.addClass('hide');
                _that.removeClass('show');
                _that.siblings('.delzx').addClass('show');
                _that.siblings('.delzx').removeClass('hide');

            }
        })
    });


    //增加首页的加自选功能
    $("#optional-blocks-wrapper").off();
    $("#optional-blocks-wrapper").on('click', '.addzx', function(e) {
        var _that = $(this);
        var myscode = $(this).attr("data-myscode");
        // console.log('myscode', myscode)
        var data = favstock.add(myscode);
        data.then(function(res) {
            // console.log('add: ' + res)
            if(res == true) {
                _that.addClass('hide');
                _that.removeClass('show');
                _that.siblings('.delzx').addClass('show');
                _that.siblings('.delzx').removeClass('hide');

            }
        })

        e.stopPropagation();//停止事件冒泡


    });

}


//删自选
bankuai.prototype.del =  function(content) {
    var tabcontent = content+ '-table'
    $(tabcontent).on('click', '.delzx', function() {
        // console.log('del')   #table_wrapper-table
        var _that = $(this);
        var myscode = $(this).attr("data-myscode");
        var data = favstock.del(myscode);
        data.then(function(res) {
            _that.addClass('hide');
            _that.removeClass('show');
            _that.siblings('.addzx').addClass('show');
            _that.siblings('.addzx').removeClass('hide');
        })
    });

    //增加首页的删自选
    $("#optional-blocks-wrapper").on('click', '.delzx', function() {
        // console.log('del')   #table_wrapper-table
        var _that = $(this);
        var myscode = $(this).attr("data-myscode");
        var data = favstock.del(myscode);
        data.then(function(res) {
            _that.addClass('hide');
            _that.removeClass('show');
            _that.siblings('.addzx').addClass('show');
            _that.siblings('.addzx').removeClass('hide');
        })
    })

}



//科创板行情数据---加自选 数据
bankuai.prototype.getKcbHQData = function (secides) {

    var url = "//push2.eastmoney.com/api/qt/ulist/get?";

    var pars = {
        secids: secides,
        pz: 20,
        pi: 0,
        ut: 'bd1d9ddb04089700cf9c27f6f7426281',
        po: 1,
        fields: 'f2,f3,f4,f5,f6,f12',
        fltt: 2,
        invt: 2,
        np: 1
    }

    return $.ajax({
        type: "get",
        data: pars,
        url: url,
        dataType: "jsonp",
        jsonp: "cb"

    });

}


//获取url上面的参数
bankuai.prototype.getParam = function (name) {
    var urlpara = location.search;
    var par = {};
    if (urlpara != "") {
        urlpara = urlpara.substring(1, urlpara.length);
        var para = urlpara.split("&");
        var parname;
        var parvalue;
        for (var i = 0; i < para.length; i++) {
            parname = para[i].substring(0, para[i].indexOf("="));
            parvalue = para[i].substring(para[i].indexOf("=") + 1, para[i].length);
            par[parname] = parvalue;
        }
    }
    if (typeof (par[name]) != "undefined") {
        return par[name];
    } else {
        return null;
    }
}


bankuai.prototype.formatData = function () {
    var list = this.body;

    // 这些字段会根据f1 进行缩放
    var fks = ["f2", "f4", "f15", "f16", "f17", "f18", "f28", "f31", "f32"];
    // 这些字段会固定放大100倍
    var fk100 = ["f3", "f7", "f8", "f9", "f10", "f11", "f22", "f23", "f24", "f25", "f33"];
    // 这些字段会根据f152 进行缩放
    var fk152 = ["f115"];

    var fksstr = fks.join(",") + ",";
    var fk100str = fk100.join(",") + ",";
    var fk152str = fk152.join(",") + ",";

    for (var i = 0, len = list.length; i < len; i++) {
        var item = list[i];
        var f1 = Math.pow(10, item.f1);
        for (var key in item) {
            if (fksstr.indexOf(key + ",") > -1) {
                item[key] = (item[key] / f1).toFixed(item.f1);
            }
            if (fk100str.indexOf(key + ",") > -1) {
                item[key] = (item[key] / 100).toFixed(2);
            }
            if (fk152str.indexOf(key + ",") > -1) {
                var sf = Math.pow(10, item.f152)
                item[key] = (item[key] / sf).toFixed(item.f152);
            }
        }
    }

}


bankuai.prototype.createBody = function (content) {
    var that = this;
    var cont = content + '-table';
    var contbody = $(cont).find("tbody");

    //分两种情况 可传table外面的div id  但要求tableid = div id + '-table'   第二种情况可直接传table的id
    if(contbody.length == 0) {
        contbody = $(content).find("tbody");
    }
    if(that.config.selectVal && $("#custom-fields").length){
        $("#custom-fields").val(that.config.selectVal)
    }

    var body = $(contbody);

    body.html("");
    var list = this.body;
    var head = this.tableHead;

    for (var i = 0; i < list.length; i++) {
        var item = list[i];

        var tr = $("<tr></tr>");
        if (i % 2 == 0) {
            tr.addClass("odd")
        } else {
            tr.addClass("even")
        }

        for (var j = 0; j < head.length; j++) {
            var row = head[j];
            // console.log(row)

            if(row) {

                if(row.show == true) {
                    var sp = "";
                    var td = $("<td></td>");
                    if(row.title == '名称' || row.title == '领涨股' || row.title == '领跌股' || row.title == '主力流入最大股') {
                        var td = $("<td class='mywidth'></td>");
                    }
                    if(row.title == '板块名称' || row.title == '领涨股票' || row.title == '领跌股票') {
                        var td = $("<td class='mywidth3'></td>");

                    }
                    if(row.title == '名称' && row.name == 'usindex_name') {
                        if(item.f107 == 5) {
                            var td = $("<td class='mywidth' style='text-align:left;padding-left:5px;'><em class='circle' title='已收盘'>●</em></td>");
                        }else if(item.f107 == 3) {
                            var td = $("<td class='mywidth' style='text-align:left;padding-left:5px;'><em class='circle' title='盘中休息'>●</em></td>");
                        }
                        else {
                            var td = $("<td class='mywidth' style='text-align:left;padding-left:5px;'><em class='trading' title='交易中'>●</em></td>");
                        }

                    }
                    if(row.title == '最新价' || row.title == '涨跌幅') {
                        var td = $("<td class='mywidth2'></td>");
                    }
                    if(row.title == '相关链接' && row.name == 'Links') {
                        var td = $('<td class=" listview-col-Links"><a href="http://guba.eastmoney.com/list,'+ item.f12 +'.html">股吧</a>&nbsp;<a href="http://data.eastmoney.com/zjlx/'+ item.f12 +'.html">资金流</a>&nbsp;<a href="http://data.eastmoney.com/stockdata/'+ item.f12 +'.html">数据</a></td>');
                    }
                    //abgu
                    if(row.title == '相关链接' && row.name == 'Links_abgu') {
                        var td = $('<td class=" listview-col-Links"><a href="http://guba.eastmoney.com/list,'+ item.f201 +'.html">股吧</a>&nbsp;<a href="http://data.eastmoney.com/zjlx/'+ item.f201 +'.html">资金流</a>&nbsp;<a href="http://data.eastmoney.com/stockdata/'+ item.f201 +'.html">数据</a></td>');
                    }

                    if(row.title == '相关链接' && row.name == 'neeq_stocks') {
                        var td = $('<td class=" listview-col-neeq_stocks"><a href="http://guba.eastmoney.com/list,'+ item.f12 +'.html">股吧</a>&nbsp;<a href="http://so.eastmoney.com/Web/s?keyword='+ item.f14 +'">资讯</a></td>');
                    }

                    if(row.title == '相关链接' && row.name == 'hk_stocks') {
                        if((item.f19 == 3 || item.f19 == 4)) {
                            var td = $('<td class=" listview-col-Links"><a href="http://guba.eastmoney.com/list,hk'+ item.f12 +'.html">股吧</a>&nbsp;<a href="http://so.eastmoney.com/Web/s?keyword='+ item.f14 +'">资讯</a>&nbsp;<a href="http://emweb.securities.eastmoney.com/PC_HKF10/CoreReading/index?type=web&code='+ item.f12 +'&color=b">档案</a></td>');
                        }else {
                            var td = $('<td class=" listview-col-Links">&nbsp;<a href="http://so.eastmoney.com/Web/s?keyword='+ item.f14 +'">资讯</a>&nbsp;</td>');
                        }
                    }
                    if(row.title == '相关链接' && row.name == 'concept_board') {
                        var td = $('<td class=" listview-col-Links"><a href="http://guba.eastmoney.com/list,'+ item.f12 +'.html">股吧</a>&nbsp;<a href="http://data.eastmoney.com/bkzj/'+ item.f12 +'.html">资金流</a>&nbsp;<a href="http://data.eastmoney.com/report/'+ (item.f12).replace('BK','') +'yb.html">研报</a></td>');
                    }


                    if(row.title == '相关链接' && row.name == 'fullscreen_Links') {
                        var td = $('<td class=" listview-col-Links"><a href="http://guba.eastmoney.com/list,'+ (item.f13 == '0'? 'sz' : 'sh') + item.f12 +'.html">股吧</a>&nbsp;<a href="http://data.eastmoney.com/kzz/detail/'+ item.f12 +'.html">详细</a>&nbsp;</td>');
                    }

                    if(row.title == '相关链接' && row.name == 'fundcloseend_Links') {
                        var td = $('<td class=" listview-col-Links"><a href="http://fund.eastmoney.com/'+ item.f12 +'.html">估值图</a>&nbsp;<a href="http://guba.eastmoney.com/list,of'+ item.f12 +'.html">基金吧</a>&nbsp;<a href="http://fund.eastmoney.com/f10/'+ (item.f12) +'.html">档案</a></td>');
                    }
                    if(row.title == '涨跌家数' && row.name == 'zhangdiejia') {
                        var td = $('<td><span style="color: red;">'+item['f104']+'</span>/<span style="color: green;">'+item['f105']+'</span></td>');
                    }

                    if(row.title == '买量' && row.name == 'buycount') {
                        var td = $('<td style="color: red;"></td>');
                    }
                    if(row.title == '上涨家数') {
                        var td = $('<td style="color: red;"></td>');
                    }
                    if(row.title == '下跌家数') {
                        var td = $('<td style="color: green;"></td>');
                    }
                    if(row.title == '卖量' && row.name == 'sellcount') {
                        var td = $('<td style="color: green;"></td>');
                    }

                    if(row.title == '港股吧') {
                        var td = $('<td class=" listview-col-Links"><a href="http://guba.eastmoney.com/list,hk'+ item.f12 +'.html">港股吧</a></td>');
                    }

                    if(row.title == 'A股吧') {
                        var td = $('<td class=" listview-col-Links"><a href="http://guba.eastmoney.com/topic,'+ item.f191 +'.html">A股吧</a></td>');
                    }


                    if(row.title == '名称' && row.name == 'mgsc_name') {
                        var td = $("<td class='text_overflow' title='"+item.f14+"'></td>");
                    }

                    var mycode1 = item.f13 + '.' + item.f12;
                    // 128市场不支持加自选
                    if(item.f13 == "128"){
                        mycode1 = '116.'+ item.f12;
                    }
                    if(row.title == '加自选') {
                        if(item.isZisuan == false) {
                            var td = $('<td class=" listview-col-add"><a class="addzx show" target="_self" onclick="return false;" href="javascript:void(0);" data-myscode='+ mycode1 +'></a><a class="delzx hide" target="_self" onclick="return false;" href="javascript:void(0);" data-myscode='+ mycode1 +'></a></td>');
                        } else if(item.isZisuan == true) {
                            var td = $('<td class=" listview-col-add"><a class="addzx hide" target="_self" onclick="return false;" href="javascript:void(0);" data-myscode='+ mycode1 +'></a><a class="delzx show" target="_self" onclick="return false;" href="javascript:void(0);" data-myscode='+ mycode1 +'></a></td>');
                        } else {
                            var td = $('<td class=" listview-col-add"><a class="addzx show" target="_self" onclick="return false;" href="javascript:void(0);" data-myscode='+ mycode1 +'></a><a class="delzx hide" target="_self" onclick="return false;" href="javascript:void(0);" data-myscode='+ mycode1 +'></a></td>');

                        }
                    }

                    // 新三板添加市场层级和定价方式 标识
                    if(row.title === "名称" && row.signIcon === "sanban"){
                        var signIcon = "";

                        if (item.f111 & 256) {
                            // 基础层
                            signIcon += '<i class="icon_sb jc"></i>'
                        } else if (item.f111 & 512) {
                            //  是创新层
                            signIcon+= '<i class="icon_sb chuang"></i>'
                        }else if (item.f111 & 2048) {
                            // 是精选层
                            signIcon+= '<i class="icon_sb jing"></i>'
                        }


                        if (item.f111 & 32) {
                            // 是三板做市
                            signIcon+= '<i class="icon_sb shi"></i>'
                        }else if (item.f111 & 64) {
                            //  是连续竞价
                            signIcon+= '<i class="icon_sb lian"></i>'
                        }
                        if (item.f111 & 128) {
                            // 是集合竞价
                            signIcon+= '<i class="icon_sb jh"></i>'
                        }
                        var td = $('<td style="text-align:left;padding-left:6px;"><span class="signIcon">'+signIcon+'</span></td>');
                    }


                    if (row.type) {
                        if (row.type == "seq") {
                            td.text((i + 1)+ (that.ops.pagesize*(this.ops.index -1)))
                        }
                    } else {
                        var txt = "";
                        if (row.key) {
                            txt = item[row.key];
                            if(row.title == '名称'){
                                txt = tools.txtLeft(txt, 12, true)
                            }
                        }

                        if (row.cb) {
                            txt = row.cb(item[row.key], item);
                        }

                        if(row.newcb) {
                            txt = row.newcb(item[row.key], item[row.fixedkey]);
                        }

                        if (row.suffix) {
                            txt += row.suffix;
                        }

                        if (row.color !== undefined) {
                            sp = $("<span></span>");
                            var c = row.color;
                            var f1, f2;
                            if (typeof c == "number") {
                                f1 = item[row.key];
                                f2 = c;
                            } else if (c.indexOf("_") == 0) {
                                f1 = item[row.key];
                                f2 = item[c.substr(1)];
                            }
                            else {
                                f1 = item[c];
                                f2 = 0;
                            }
                            var diff = f1 - f2;
                            if (diff > 0) {
                                sp.addClass("red")
                            } else if (diff < 0) {
                                sp.addClass("green")
                            }
                            else {
                                sp.addClass("fair")
                            }
                        }

                        // //国际贵金属现货去除链接
                        // if(that.mdName === "nobalmetal_spotgoods"){
                        //     row.href = "";
                        // }

                        if (row.href) {
                            // console.info(row.href)
                            var data = row.data;
                            var href = row.href;

                            for (var ii = 0; ii < data.length; ii++) {
                                var reg = RegExp("\\{\\{" + ii + "\\}\\}");

                                var newcode = item[data[ii]];

                                //处理延时港股市场问题
                                if(newcode == '128') {
                                    newcode = '116'
                                }
                                href = href.replace(reg, newcode);


                            }


                            sp = $(href);
                        }

                        if (sp) {
                            sp.html(txt)
                            td.append(sp);

                            //给欧洲斯托克50
                            if(row.wenhaoFlag && item[row.key] == '欧洲斯托克50') {
                                td.append($(row.wenhaoFlag));

                            }
                        } else {
                            td.html(txt);
                        }
                    }
                    tr.append(td);

                }

            }

        }
        body.append(tr);
    }


}


bankuai.prototype.in_array = function(stringToSearch, arrayToSearch) {
    for (s = 0; s < arrayToSearch.length; s++) {
        thisEntry = arrayToSearch[s].toString();
        if (thisEntry == stringToSearch) {
            return true;
        }
    }
    return false;
}


module.exports = bankuai;