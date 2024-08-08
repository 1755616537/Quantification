
/**
 *
 * {
 *      title: {String} 显示的表头名称
 *      type: {String} 特殊类型，当前只有一个序列
 *      key: {string} 接口返回的字段名称
 *      order: {Boolean} 字段是否可排序
 *      color: {int | String} 字段时候标记颜色， int表示个当前的数值比较，字符串表示用指定的Key和0比较，_开头的字段表示当前字段减去_key这个字段在比较
 *      suffix: {String} 单位
 *      href: {String} 跳转链接。需要和data一起使用，href中 使用 {{index}} 使用data中的数据
 *      data：{Array} href中要使用的数据
 * }
 *
 */


var tools = require("./tools");


module.exports = {

    //首页板块
    bankuai: {
        fields: "f1,f2,f3,f14,f12,f13,f62,f128,f136,f152",
        head: [
            {
                title: "名称",
                key: "f14",
                order: false,
                href: "<a href='/center/boardlist.html#boards2-{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f13", "f12","f14"],
                show: true,
                newcb: function(value){
                    return tools.txtPoint(value);
                }

            },
            {
                title: "涨跌幅",
                key: "f3",
                // suffix: "%",
                color: "f3",
                order: false,
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                show: true
            },
            {
                title: "主力净流入",
                key: "f62",
                color: "f62",
                order: false,
                cb: function(that, row){
                    return tools.formatNumberIndex(that);
                },
                show: true
            },
            {
                title: "领涨股",
                key: "f128",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f141","f140","f128"],
                show: true,
                // cb: function(that, row){
                //     return tools.formatNumber3(that);
                // }
                newcb:  function(value){
                    return tools.txtPoint(value);
                }
            },
            {
                title: "涨跌幅",
                key: "f136",
                // suffix: "%",
                color: "f136",
                order: false,
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                show: true
            },
        ],
        sumcount: 5

    },


    //首页资金流
    zijinliu: {
        fields: "f1,f2,f3,f14,f12,f13,f62,f128,f136,f152,f184",
        head: [
            {
                title: "名称",
                key: "f14",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f13","f12","f14"],
                show: true,
                newcb:  function(value){
                    return tools.txtPoint(value);
                }
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "f3",
                order: false,
                show: true
            },
            {
                title: "涨跌幅",
                key: "f3",
                // suffix: "%",
                color: "f3",
                order: false,
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                show: true
            },
            {
                title: "主力净流入",
                key: "f62",
                color: "f62",
                order: false,
                cb: function(that, row){
                    return tools.formatNumberIndex(that);
                },
                show: true
            },
            //净占比 字段需要修改
            {
                title: "主力净占比",
                key: "f184",
                color: "f184",
                order: false,
                cb: function(that, row){
                    return tools.formatNumber4(that);
                },
                show: true
            }
        ],
        sumcount: 5

    },

    //沪深A股
    hushenAStock: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "代码",
                key: "f12",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Name'
            },
            {
                title: "相关链接",
                key: "",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Links'
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                color: "f4",
                order: true,
                show: true,
                name: 'Change',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                }
            },
            {
                title: "成交量(手)",
                key: "f5",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Volume'
            },
            {
                title: "成交额",
                key: "f6",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Amount'
            },
            {
                title: "振幅",
                key: "f7",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber2(that);
                },
                show: true,
                name: 'Amplitude'
            },
            {
                title: "最高",
                key: "f15",
                fixedkey: 'f1',
                color: "_f18",
                order: true,
                // cb: function(that, row){
                //     return tools.formatNumber4(that);
                // },
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                show: true,
                name: 'Hign'
            },
            {
                title: "最低",
                key: "f16",
                fixedkey: 'f1',
                color: "_f18",
                order: true,
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                show: true,
                name: 'Low'
            },
            {
                title: "今开",
                key: "f17",
                fixedkey: 'f1',
                color: "_f18",
                order: true,
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                show: true,
                name: 'Open'
            },
            {
                title: "昨收",
                key: "f18",
                fixedkey: 'f1',
                order: true,
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                show: true,
                name: 'PreviousClose'
            },
            {
                title: "量比",
                key: "f10",
                order: true,
                cb: function(that, row){
                    return tools.formatNumberHSGGLB(that);
                },
                show: true,
                name: 'VolumeRate'
            },
            {
                title: "换手率",
                key: "f8",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber2(that);
                },
                show: true,
                name: 'TurnoverRate'
            },
            {
                title: "市盈率(动态)",
                key: "f9",
                order: true,
                show: true,
                cb: function(that, row){
                    return tools.formatNumberSyl(that);
                },
                name: 'PERation'
            },
            {
                title: "市净率",
                key: "f23",
                order: true,
                show: true,
                cb: function(that, row){
                    return tools.formatNumberSyl(that);
                },
                name: 'PB'
            },
            {
                title: "总市值",
                key: "f20",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: false
            },
            {
                title: "流通市值",
                key: "f21",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: false
            },
            {
                title: "60日涨跌幅",
                key: "f24",
                order: true,
                // suffix: "%",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                color: "f24",
                show: false
            },
            {
                title: "年初至今涨跌幅",
                key: "f25",
                // suffix: "%",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                color: "f25",
                order: true,
                show: false
            },
            {
                title: "涨速",
                key: "f22",
                // suffix: "%",
                color: "f22",
                order: true,
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                show: false
            },
            {
                title: "5分钟涨跌",
                key: "f11",
                color: "f11",
                order: true,
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                show: false
            },
            {
                title: "加自选",
                key: "addzixuan",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Links'
            }
        ],
        sumcount: 20


    },


    //沪深个股---科创板
    hushenStockKcb: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "代码",
                key: "f12",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Name'
            },
            {
                title: "相关链接",
                key: "",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Links'
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                color: "f4",
                order: true,
                show: true,
                name: 'Change',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                }
            },
            {
                title: "成交量(手)",
                key: "f5",
                order: true,
                cb: function(that, row){
                    return tools.kcbMyformatNum(that);
                },
                show: true,
                name: 'Volume'
            },
            {
                title: "成交额",
                key: "f6",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Amount'
            },
            {
                title: "振幅",
                key: "f7",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber2(that);
                },
                show: true,
                name: 'Amplitude'
            },
            {
                title: "最高",
                key: "f15",
                fixedkey: 'f1',
                color: "_f18",
                order: true,
                // cb: function(that, row){
                //     return tools.formatNumber4(that);
                // },
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                show: true,
                name: 'Hign'
            },
            {
                title: "最低",
                key: "f16",
                fixedkey: 'f1',
                color: "_f18",
                order: true,
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                show: true,
                name: 'Low'
            },
            {
                title: "今开",
                key: "f17",
                fixedkey: 'f1',
                color: "_f18",
                order: true,
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                show: true,
                name: 'Open'
            },
            {
                title: "昨收",
                key: "f18",
                fixedkey: 'f1',
                order: true,
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                show: true,
                name: 'PreviousClose'
            },
            {
                title: "量比",
                key: "f10",
                order: true,
                cb: function(that, row){
                    return tools.formatNumberHSGGLB(that);
                },
                show: true,
                name: 'VolumeRate'
            },
            {
                title: "换手率",
                key: "f8",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber2(that);
                },
                show: true,
                name: 'TurnoverRate'
            },
            {
                title: "市盈率(动态)",
                key: "f9",
                order: true,
                show: true,
                cb: function(that, row){
                    return tools.formatNumberSyl(that);
                },
                name: 'PERation'
            },
            {
                title: "市净率",
                key: "f23",
                order: true,
                show: true,
                cb: function(that, row){
                    return tools.formatNumberSyl(that);
                },
                name: 'PB'
            },
            {
                title: "总市值",
                key: "f20",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: false
            },
            {
                title: "流通市值",
                key: "f21",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: false
            },
            {
                title: "60日涨跌幅",
                key: "f24",
                order: true,
                // suffix: "%",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                color: "f24",
                show: false
            },
            {
                title: "年初至今涨跌幅",
                key: "f25",
                // suffix: "%",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                color: "f25",
                order: true,
                show: false
            },
            {
                title: "涨速",
                key: "f22",
                // suffix: "%",
                color: "f22",
                order: true,
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                show: false
            },
            {
                title: "5分钟涨跌",
                key: "f11",
                color: "f11",
                order: true,
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                show: false
            },
            {
                title: "加自选",
                key: "addzixuan",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Links'
            }
        ],
        sumcount: 20


    },


    //沪深个股 --新股
    opsnewgu: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f11,f62,f128,f136,f115,f152",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "代码",
                key: "f12",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Name'
            },
            {
                title: "相关链接",
                key: "",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Links'
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                color: "f4",
                order: true,
                show: true,
                name: 'Change',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                }
            },
            {
                title: "成交量(手)",
                key: "f5",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Volume'
            },
            {
                title: "成交额",
                key: "f6",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Amount'
            },
            {
                title: "振幅",
                key: "f7",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber2(that);
                },
                show: true,
                name: 'Amplitude'
            },
            {
                title: "最高",
                key: "f15",
                fixedkey: 'f1',
                color: "_f18",
                order: true,
                // cb: function(that, row){
                //     return tools.formatNumber4(that);
                // },
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                show: true,
                name: 'Hign'
            },
            {
                title: "最低",
                key: "f16",
                fixedkey: 'f1',
                color: "_f18",
                order: true,
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                show: true,
                name: 'Low'
            },
            {
                title: "今开",
                key: "f17",
                fixedkey: 'f1',
                color: "_f18",
                order: true,
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                show: true,
                name: 'Open'
            },
            {
                title: "昨收",
                key: "f18",
                fixedkey: 'f1',
                order: true,
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                show: true,
                name: 'PreviousClose'
            },
            {
                title: "换手率",
                key: "f8",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber2(that);
                },
                show: true,
                name: 'TurnoverRate'
            },
            {
                title: "市盈率(动态)",
                key: "f9",
                order: true,
                show: true,
                cb: function(that, row){
                    return tools.formatNumberSyl(that);
                },
                name: 'PERation'
            },
            {
                title: "市净率",
                key: "f23",
                order: true,
                show: true,
                cb: function(that, row){
                    return tools.formatNumberSyl(that);
                },
                name: 'PB'
            },
            {
                title: "上市时间",
                key: "f26",
                order: true,
                show: true,
                name: 'shtime',
                cb: function(that, row){
                    return tools.formatNumber3(that);
                }
            },
            {
                title: "总市值",
                key: "f20",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: false
            },
            {
                title: "流通市值",
                key: "f21",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: false
            },
            {
                title: "60日涨跌幅",
                key: "f24",
                order: true,
                // suffix: "%",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                color: "f24",
                show: false
            },
            {
                title: "年初至今涨跌幅",
                key: "f25",
                // suffix: "%",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                color: "f25",
                order: true,
                show: false
            },
            {
                title: "涨速",
                key: "f22",
                // suffix: "%",
                color: "f22",
                order: true,
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                show: false
            },
            {
                title: "5分钟涨跌",
                key: "f11",
                color: "f11",
                order: true,
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                show: false
            },
            {
                title: "量比",
                key: "f10",
                order: true,
                cb: function(that, row){
                    return tools.formatNumberHSGGLB(that);
                },
                show: false,
                name: 'VolumeRate'
            },
            {
                title: "加自选",
                key: "addzixuan",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Links'
            }
        ],
        sumcount: 20


    },

    //AB股比价
    abgu: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152,f201,f202,f203,f196,f197,f199,f195,f200",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "B股代码",
                key: "f201",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f202","f201"],
                show: true,
                name: 'Code'
            },
            {
                title: "名称",
                key: "f203",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f202","f201"],
                show: true,
                name: 'Name'
            },
            {
                title: "相关链接",
                key: "",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f202","f201"],
                show: true,
                name: 'Links_abgu'
            },
            {
                title: "最新价",
                key: "f196",
                fixedkey: 'f200',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f195",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌幅",
                key: "f197",
                color: "f197",
                order: true,
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "A股代码",
                key: "f12",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Name'
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                color: "f3",
                order: true,
                // cb: function(that, row){
                //     return tools.formatNumber2(that);
                // },
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "比价（A/B）",
                key: "f199",
                // suffix: "%",
                color: "",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber4(that);
                },
                show: true,
                name: 'ChangePercent'
            }

        ],
        sumcount: 20


    },

    //港股市场---Ah股比价
    ahgu: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152,f191,f192,f193,f186,f185,f187,f189,f188",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "名称",
                key: "f193",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f192","f191"],
                show: true,
                name: 'Name'
            },
            {
                title: "H股代码",
                key: "f12",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "最新价(HKD)",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: false,
                show: true,
                // cb: function(that, row){
                //     return tools.formatNumberNewPri(that);
                // },
                name: 'Close'
            },
            {
                title: "涨跌幅",
                key: "f3",
                // suffix: "%",
                color: "f3",
                order: false,
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "港股吧",
                key: "",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'>A股吧</a>",
                data: ["f13","f12"],
                show: true,
                name: ''
            },
            {
                title: "A股代码",
                key: "f191",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f192","f191"],
                show: true,
                name: 'Code'
            },
            {
                title: "最新价(RMB)",
                key: "f186",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f185",
                order: false,
                show: true,
                // cb: function(that, row){
                //     return tools.formatNumberNewPri(that);
                // },
                name: 'Close'
            },
            {
                title: "涨跌幅",
                key: "f187",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f187",
                order: false,
                // cb: function(that, row){
                //     return tools.formatNumber2(that);
                // },
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "A股吧",
                key: "",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'>A股吧</a>",
                data: ["f192","f191"],
                show: true,
                name: 'gangguba'
            },

            {
                title: "比价（A/H）",
                key: "f189",
                // suffix: "%",
                color: "",
                order: false,
                cb: function(that, row){
                    return tools.formatNumber4(that);
                },
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "溢价（A/H）%",
                key: "f188",
                // suffix: "%",
                color: "",
                order: false,
                cb: function(that, row){
                    return tools.formatNumber4(that);
                },
                show: true,
                name: 'ChangePercent'
            }

        ],
        sumcount: 5


    },

    //沪深港通---AH股比价
    ahgu2: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152,f191,f192,f193,f186,f185,f187,f189,f188",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "名称",
                key: "f193",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f192","f191"],
                show: true,
                name: 'Name'
            },
            {
                title: "H股代码",
                key: "f12",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "最新价(HKD)",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                // cb: function(that, row){
                //     return tools.formatNumberNewPri(that);
                // },
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "港股吧",
                key: "",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'>A股吧</a>",
                data: ["f13","f12"],
                show: true,
                name: ''
            },
            {
                title: "A股代码",
                key: "f191",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f192","f191"],
                show: true,
                name: 'Code'
            },
            {
                title: "最新价(RMB)",
                key: "f186",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f185",
                order: true,
                show: true,
                // cb: function(that, row){
                //     return tools.formatNumberNewPri(that);
                // },
                name: 'Close'
            },
            {
                title: "涨跌幅",
                key: "f187",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f187",
                order: true,
                // cb: function(that, row){
                //     return tools.formatNumber2(that);
                // },
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "A股吧",
                key: "",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'>A股吧</a>",
                data: ["f192","f191"],
                show: true,
                name: 'gangguba'
            },

            {
                title: "比价（A/H）",
                key: "f189",
                // suffix: "%",
                color: "",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber4(that);
                },
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "溢价（A/H）%",
                key: "f188",
                // suffix: "%",
                color: "f188",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber4(that);
                },
                show: true,
                name: 'ChangePercent'
            }

        ],
        sumcount: 20


    },

    //沪深港通---AH股比价  centerv2 小标签
    ahgu3: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152,f191,f192,f193,f186,f185,f187,f189,f188",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "名称",
                key: "f193",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f192","f191"],
                show: true,
                name: 'Name'
            },
            {
                title: "H股代码",
                key: "f12",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "最新价(HKD)",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: false,
                show: true,
                // cb: function(that, row){
                //     return tools.formatNumberNewPri(that);
                // },
                name: 'Close'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: false,
                // cb: function(that, row){
                //     return tools.formatNumber2(that);
                // },
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "港股吧",
                key: "",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'>A股吧</a>",
                data: ["f13","f12"],
                show: true,
                name: ''
            },
            {
                title: "A股代码",
                key: "f191",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f192","f191"],
                show: true,
                name: 'Code'
            },
            {
                title: "最新价(RMB)",
                key: "f186",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f185",
                order: false,
                show: true,
                // cb: function(that, row){
                //     return tools.formatNumberNewPri(that);
                // },
                name: 'Close'
            },
            {
                title: "涨跌幅",
                key: "f187",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f187",
                order: false,
                // cb: function(that, row){
                //     return tools.formatNumber2(that);
                // },
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "A股吧",
                key: "",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'>A股吧</a>",
                data: ["f192","f191"],
                show: true,
                name: 'gangguba'
            },
            {
                title: "比价（A/H）",
                key: "f189",
                // suffix: "%",
                color: "",
                order: false,
                cb: function(that, row){
                    return tools.formatNumber4(that);
                },
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "溢价（A/H）%",
                key: "f188",
                // suffix: "%",
                color: "",
                order: false,
                cb: function(that, row){
                    return tools.formatNumber4(that);
                },
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "加自选",
                key: "addzixuan",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Links'
            }

        ],
        sumcount: 5


    },


    //沪股通  深股通
    shhkBoard: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f11,f62,f128,f136,f115,f152",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "代码",
                key: "f12",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Name'
            },
            {
                title: "相关链接",
                key: "",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Links'
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: true,
                show: true,
                name: 'Change'
            },
            {
                title: "成交量(手)",
                key: "f5",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Volume'
            },
            {
                title: "成交额",
                key: "f6",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Amount'
            },
            {
                title: "振幅",
                key: "f7",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber2(that);
                },
                show: true,
                name: 'Amplitude'
            },
            {
                title: "最高",
                key: "f15",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                // cb: function(that, row){
                //     return tools.formatNumber4(that);
                // },
                show: true,
                name: 'Hign'
            },
            {
                title: "最低",
                key: "f16",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                // cb: function(that, row){
                //     return tools.formatNumber4(that);
                // },
                show: true,
                name: 'Low'
            },
            {
                title: "今开",
                key: "f17",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                // cb: function(that, row){
                //     return tools.formatNumber4(that);
                // },
                show: true,
                name: 'Open'
            },
            {
                title: "昨收",
                key: "f18",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                order: true,
                // cb: function(that, row){
                //     return tools.formatNumber4(that);
                // },
                show: true,
                name: 'PreviousClose'
            },
            {
                title: "换手率",
                key: "f8",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber2(that);
                },
                show: true,
                name: 'TurnoverRate'
            },
            {
                title: "市盈率(动态)",
                key: "f9",
                order: true,
                show: true,
                cb: function(that, row){
                    return tools.formatNumberSyl(that);
                },
                name: 'PERation'
            },
            {
                title: "市净率",
                key: "f23",
                order: true,
                show: true,
                cb: function(that, row){
                    return tools.formatNumberSyl(that);
                },
                name: 'PB'
            },
            {
                title: "上市时间",
                key: "f26",
                order: true,
                show: true,
                name: 'shtime',
                cb: function(that, row){
                    return tools.formatNumber3(that);
                }
            },
            {
                title: "总市值",
                key: "f20",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: false
            },
            {
                title: "流通市值",
                key: "f21",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: false
            },
            {
                title: "60日涨跌幅",
                key: "f24",
                order: true,
                // suffix: "%",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                color: "f4",
                show: false
            },
            {
                title: "年初至今涨跌幅",
                key: "f25",
                // suffix: "%",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                color: "f4",
                order: true,
                show: false
            },
            {
                title: "涨速",
                key: "f22",
                // suffix: "%",
                color: "f22",
                order: true,
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                show: false
            },
            {
                title: "5分钟涨跌",
                key: "f11",
                color: "f11",
                order: true,
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                show: false
            },
            {
                title: "加自选",
                key: "addzixuan",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Links'
            }
        ],
        sumcount: 20


    },


    //两网及退市
    staqnetBoard: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "代码",
                key: "f12",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Name'
            },
            {
                title: "相关链接",
                key: "",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'neeq_stocks'
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: true,
                show: true,
                name: 'Change'
            },
            {
                title: "成交量(手)",
                key: "f5",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Volume'
            },
            {
                title: "成交额",
                key: "f6",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Amount'
            },
            {
                title: "昨收",
                key: "f18",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                order: true,
                show: true,
                name: 'PreviousClose'
            },
            {
                title: "今开",
                key: "f17",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Open'
            },
            {
                title: "最高",
                key: "f15",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Hign'
            },
            {
                title: "最低",
                key: "f16",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Low'
            },
            {
                title: "委比",
                key: "f33",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag2(value, fixednum);
                },
                order: true,
                show: true,
                name: 'weibi'
            }

        ],
        sumcount: 20

    },


    //沪深指数---上证系列指数   深证系列指数
    indexsh: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "代码",
                key: "f12",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Name'
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: true,
                show: true,
                name: 'Change'
            },
            {
                title: "成交量(手)",
                key: "f5",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Volume'
            },
            {
                title: "成交额",
                key: "f6",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Amount'
            },
            {
                title: "振幅",
                key: "f7",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber2(that);
                },
                show: true,
                name: 'Amplitude'
            },
            {
                title: "最高",
                key: "f15",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Hign'
            },
            {
                title: "最低",
                key: "f16",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Low'
            },
            {
                title: "今开",
                key: "f17",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Open'
            },
            {
                title: "昨收",
                key: "f18",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                order: true,
                show: true,
                name: 'PreviousClose'
            },
            {
                title: "量比",
                key: "f10",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber4(that);
                },
                show: true,
                name: 'VolumeRate'
            }

        ],
        sumcount: 20

    },


    //新三板
    neeqstocks: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152,f111",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "代码",
                key: "f12",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                signIcon:"sanban",
                show: true,
                name: 'Name'
            },
            {
                title: "相关链接",
                key: "",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'neeq_stocks'
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: true,
                show: true,
                name: 'Change'

            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "成交量",
                key: "f5",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Volume'
            },
            {
                title: "成交额",
                key: "f6",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Amount'
            },
            {
                title: "昨收",
                key: "f18",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                order: true,
                show: true,
                name: 'PreviousClose'
            },
            {
                title: "今开",
                key: "f17",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Open'
            },
            {
                title: "最高",
                key: "f15",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Hign'
            },
            {
                title: "最低",
                key: "f16",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Low'
            },
            {
                title: "委比",
                key: "f33",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag2(value, fixednum);
                },
                color: "f33",
                order: true,
                show: true,
                name: 'weibi'
            }

        ],
        sumcount: 20

    },


    //沪深港通---港股通 沪、深
    hkshstocks: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f11,f62,f128,f136,f115,f152",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "代码",
                key: "f12",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Name'
            },
            {
                title: "相关链接",
                key: "",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'hk_stocks'
            },
            {
                title: "最新价(HKD)",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: true,
                show: true,
                name: 'Change'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "今开",
                key: "f17",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Open'
            },
            {
                title: "最高",
                key: "f15",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Hign'
            },
            {
                title: "最低",
                key: "f16",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Low'
            },
            {
                title: "昨收",
                key: "f18",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                order: true,
                show: true,
                name: 'PreviousClose'
            },
            {
                title: "成交量(股)",
                key: "f5",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Volume'
            },
            {
                title: "成交额(港元)",
                key: "f6",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Amount'
            },
            {
                title: "加自选",
                key: "addzixuan",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Links'
            }
        ],
        sumcount: 20


    },


    //港股--全部
    hkstocks: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f19,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "代码",
                key: "f12",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Name'
            },
            {
                title: "相关链接",
                key: "",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'hk_stocks'
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: true,
                show: true,
                name: 'Change'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "今开",
                key: "f17",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Open'
            },
            {
                title: "最高",
                key: "f15",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Hign'
            },
            {
                title: "最低",
                key: "f16",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Low'
            },
            {
                title: "昨收",
                key: "f18",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                order: true,
                show: true,
                name: 'PreviousClose'
            },
            {
                title: "成交量(股)",
                key: "f5",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Volume'
            },
            {
                title: "成交额",
                key: "f6",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Amount'
            },
            {
                title: "加自选",
                key: "addzixuan",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Links'
            }

        ],
        sumcount: 20

    },


    //港股--人民币计价
    hkstocks_rmb: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f19,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "代码",
                key: "f12",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Name'
            },
            {
                title: "相关链接",
                key: "",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'hk_stocks'
            },
            {
                title: "最新价(RMB)",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: true,
                show: true,
                name: 'Change'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "今开",
                key: "f17",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Open'
            },
            {
                title: "最高",
                key: "f15",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Hign'
            },
            {
                title: "最低",
                key: "f16",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Low'
            },
            {
                title: "昨收",
                key: "f18",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                order: true,
                show: true,
                name: 'PreviousClose'
            },
            {
                title: "成交量(股)",
                key: "f5",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Volume'
            },
            {
                title: "成交额(人民币)",
                key: "f6",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Amount'
            },
            {
                title: "加自选",
                key: "addzixuan",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Links'
            }

        ],
        sumcount: 20

    },

    //港股 --香港指数
    hkindex: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "代码",
                key: "f12",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Name'
            },
            {
                title: "最新价(HKD)",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: true,
                show: true,
                name: 'Close'
            },

            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: true,
                show: true,
                name: 'Change'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "今开",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                key: "f17",
                color: "_f18",
                order: true,
                show: true,
                name: 'Open'
            },
            {
                title: "最高",
                key: "f15",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Hign'
            },
            {
                title: "最低",
                key: "f16",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Low'
            },
            {
                title: "昨收",
                key: "f18",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                order: true,
                show: true,
                name: 'PreviousClose'
            },
            {
                title: "成交量(股)",
                key: "f5",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Volume'
            },
            {
                title: "成交额(港元)",
                key: "f6",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Amount'
            }

        ],
        sumcount: 20

    },

    //美股
    usstocks:  {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Name'
            },
            {
                title: "最新价(美元)",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: true,
                show: true,
                name: 'Change'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "开盘价",
                key: "f17",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Open'
            },
            {
                title: "最高价",
                key: "f15",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Hign'
            },
            {
                title: "最低价",
                key: "f16",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Low'
            },
            {
                title: "昨收价",
                key: "f18",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                order: true,
                show: true,
                name: 'PreviousClose'
            },
            {
                title: "总市值(美元)",
                key: "f20",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true
            },
            {
                title: "市盈率",
                key: "f115",
                order: true,
                cb: function(that, row){
                    return tools.formatNumberSyl(that);
                },
                show: true
            }


        ],
        sumcount: 20

    },


    //美股指数
    usindex:  {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152,f124,f107",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型 <em class="circle " title="已收盘">●</em>
                show: true,
                name: 'number'

            },
            {
                title: "名称",
                key: "f14",
                order: true,
                href: '<a href="//quote.eastmoney.com/unify/r/{{0}}.{{1}}"></a>',
                data: ["f13","f12"],
                show: true,
                name: 'usindex_name'
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: true,
                show: true,
                name: 'Change'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "开盘价",
                key: "f17",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Open'
            },
            {
                title: "最高价",
                key: "f15",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Hign'
            },
            {
                title: "最低价",
                key: "f16",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Low'
            },
            {
                title: "昨收价",
                key: "f18",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                order: true,
                show: true,
                name: 'PreviousClose'
            },
            {
                title: "振幅",
                key: "f7",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber2(that);
                },
                show: true,
                name: 'zhenfu'
            },
            {
                title: "最新行情时间",
                key: "f124",
                order: true,
                show: true,
                cb: function(that, row){
                    return tools.formatNumberTime(that);
                },
                name: 'newtime'
            }

        ],
        sumcount: 20

    },

    //全球股市
    globalamerica: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152,f124,f107",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型 <em class="circle " title="已收盘">●</em>
                show: true,
                name: 'number'

            },
            {
                title: "名称",
                key: "f14",
                order: true,
                href: '<a href="//quote.eastmoney.com/unify/r/{{0}}.{{1}}"></a>',
                data: ["f13","f12"],
                show: true,
                name: 'usindex_name'
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: true,
                show: true,
                name: 'Change'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "开盘价",
                key: "f17",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Open'
            },
            {
                title: "最高价",
                key: "f15",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Hign'
            },
            {
                title: "最低价",
                key: "f16",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Low'
            },
            {
                title: "昨收价",
                key: "f18",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                order: true,
                show: true,
                name: 'PreviousClose'
            },
            {
                title: "振幅",
                key: "f7",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber2(that);
                },
                show: true,
                name: 'zhenfu'
            },
            {
                title: "最新行情时间",
                key: "f124",
                order: true,
                show: true,
                cb: function(that, row){
                    return tools.formatNumberTime(that);
                },
                name: 'newtime'
            }

        ],
        sumcount: 20

    },

    //全球股市  centerv2
    globalamerica2: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152,f124,f107",
        head: [
            {
                title: "名称",
                key: "f14",
                order: false,
                href: '<a href="//quote.eastmoney.com/unify/r/{{0}}.{{1}}"></a>',
                data: ["f13","f12"],
                show: true,
                name: 'usindex_name'
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: false,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: false,
                show: true,
                name: 'Change'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: false,
                show: true,
                name: 'ChangePercent'
            }

        ],
        sumcount: 21

    },


    globalamericaOz: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152,f124,f107",
        head: [
            {
                title: "名称",
                key: "f14",
                order: false,
                href: '<a href="//quote.eastmoney.com/unify/r/{{0}}.{{1}}"></a>',
                data: ["f13","f12"],
                show: true,
                name: 'usindex_name',
                wenhaoFlag:'<span id="GDR_title3" style="background: url(/center/images/ying_wen.png) no-repeat;display:inline-block;width:15px;height:14px;position:relative;top:2px;left: 4px;" title="" class="tooltip-f"></span>'
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: false,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: false,
                show: true,
                name: 'Change'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: false,
                show: true,
                name: 'ChangePercent'
            }

        ],
        sumcount: 23

    },


    globalamerica3: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152,f124,f107",
        head: [
            {
                title: "名称",
                key: "f14",
                order: false,
                href: '<a href="//quote.eastmoney.com/unify/r/{{0}}.{{1}}"></a>',
                data: ["f13","f12"],
                show: true,
                name: 'usindex_name'
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: false,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: false,
                show: true,
                name: 'Change'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },

                // suffix: "%",
                color: "f3",
                order: false,
                show: true,
                name: 'ChangePercent'
            }

        ],
        sumcount: 6

    },

    globalamerica4: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152,f124,f107",
        head: [
            {
                title: "名称",
                key: "f14",
                order: false,
                href: '<a href="//quote.eastmoney.com/unify/r/{{0}}.{{1}}"></a>',
                data: ["f13","f12"],
                show: true,
                name: 'usindex_name'
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: false,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: false,
                show: true,
                name: 'Change'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },

                // suffix: "%",
                color: "f3",
                order: false,
                show: true,
                name: 'ChangePercent'
            }

        ],
        sumcount: 3

    },



    //沪深板块
    conceptboard : {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152,f124,f107,f104,f105,f140,f141,f207,f208,f209,f222",
        head: [
            {
                title: "排名",
                type: "seq",    // type 表示特殊类型 <em class="circle " title="已收盘">●</em>
                show: true,
                name: 'number'

            },
            {
                title: "板块名称",
                key: "f14",
                order: true,
                href: '<a href="//quote.eastmoney.com/unify/r/{{0}}.{{1}}"></a>',
                data: ["f13","f12"],
                show: true,
                name: 'name'
            },
            {
                title: "相关链接",
                key: "",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'concept_board'
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: true,
                show: true,
                name: 'Change'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "总市值",
                key: "f20",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true
            },
            {
                title: "换手率",
                key: "f8",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber2(that);
                },
                show: true
            },
            {
                title: "上涨家数",
                key: "f104",
                color: 'red',
                order: true,
                show: true
            },
            {
                title: "下跌家数",
                key: "f105",
                color: 'green',
                order: true,
                show: true
            },
            {
                title: "领涨股票",
                key: "f128",
                order: false,
                href: '<a href="//quote.eastmoney.com/unify/r/{{0}}.{{1}}"></a>',
                data: ["f141","f140"],
                show: true,
                name: 'name',
                cb: function(that, row){
                    return tools.formatNumber3(that);
                }
            },
            {
                title: "涨跌幅",
                key: "f136",
                // suffix: "%",
                color: "f136",
                order: false,
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                show: true,
                name: 'ChangePercent'
            },


        ],
        sumcount: 20

    },


    //沪深板块--里面小标签
    conceptboardDatil: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152,f45",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "代码",
                key: "f12",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Name'
            },
            {
                title: "相关链接",
                key: "",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Links'
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: true,
                show: true,
                name: 'Change'
            },
            {
                title: "成交量(手)",
                key: "f5",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Volume'
            },
            {
                title: "成交额",
                key: "f6",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Amount'
            },
            {
                title: "振幅",
                key: "f7",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber2(that);
                },
                show: true,
                name: 'Amplitude'
            },
            {
                title: "最高",
                key: "f15",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Hign'
            },
            {
                title: "最低",
                key: "f16",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Low'
            },
            {
                title: "今开",
                key: "f17",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Open'
            },
            {
                title: "昨收",
                key: "f18",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                order: true,
                show: true,
                name: 'PreviousClose'
            },
            {
                title: "量比",
                key: "f10",
                order: true,
                cb: function(that, row){
                    return tools.formatNumberHSGGLB(that);
                },
                show: true,
                name: 'VolumeRate'
            },
            {
                title: "换手率",
                key: "f8",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber2(that);
                },
                show: true,
                name: 'TurnoverRate'
            },
            {
                title: "市盈率(动态)",
                key: "f9",
                order: true,
                show: true,
                cb: function(that, row){
                    return tools.formatNumberSyl(that);
                },
                name: 'PERation'
            },
            {
                title: "市净率",
                key: "f23",
                order: true,
                show: true,
                cb: function(that, row){
                    return tools.formatNumberSyl(that);
                },
                name: 'PB'
            },
            {
                title: "净利润",
                key: "f45",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: false
            },
            {
                title: "总市值",
                key: "f20",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: false
            },
            {
                title: "流通市值",
                key: "f21",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: false
            },
            {
                title: "60日涨跌幅",
                key: "f24",
                order: true,
                // suffix: "%",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                color: "f24",
                show: false
            },
            {
                title: "年初至今涨跌幅",
                key: "f25",
                // suffix: "%",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                color: "f25",
                order: true,
                show: false
            },
            {
                title: "涨速",
                key: "f22",
                // suffix: "%",
                color: "f22",
                order: true,
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                show: false
            },
            {
                title: "5分钟涨跌",
                key: "f11",
                color: "f11",
                order: true,
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                show: false
            },
            {
                title: "加自选",
                key: "addzixuan",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Links'
            }
        ],
        sumcount: 20


    },


    //沪深港通
    hsgt:  {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "代码",
                key: "f12",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "名称",
                key: "f14",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: false,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: false,
                show: true,
                name: 'Change'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: false,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "成交量(手)",
                key: "f5",
                order: false,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Volume'
            },
            {
                title: "加自选",
                key: "addzixuan",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Links'
            }

        ],
        sumcount: 5

    },

    //期货市场---金融期货--能源化工
    qhsc_jq:  {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "代码",
                key: "f12",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "名称",
                key: "f14",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: false,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: false,
                show: true,
                name: 'Change'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: false,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "所属交易所",
                key: "f13",
                order: false,
                data: ["f13"],
                newcb: function(value){
                    return tools.formatNumberQhsc(value);
                },
                show: true
            }


        ],
        sumcount: 5

    },

    //港股市场 centerv2
    //沪深港通
    ggsc:  {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "代码",
                key: "f12",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "名称",
                key: "f14",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: false,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: false,
                show: true,
                name: 'Change'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: false,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "成交量(手)",
                key: "f5",
                order: false,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Volume'
            },
            {
                title: "加自选",
                key: "addzixuan",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Links'
            }

        ],
        sumcount: 5

    },

    //港股市场--adr
    hkadr :  {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152,f213,f214,f220,f219,f217,f218",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'
            },
            {
                title: "港股名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true
            },
            {
                title: "港股代码",
                key: "f12",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "ADR代码",
                key: "f213",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f214","f213"],
                show: true,
                name: 'Code'
            },
            {
                title: "ADR收市价(USD)",
                key: "f219",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f217",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌额",
                key: "f217",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f217",
                order: true,
                show: true,
                name: 'Change'
            },
            {
                title: "涨跌幅",
                key: "f218",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f218",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "折合每股港元",
                key: "f220",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                order: true,
                show: true,
                name: 'Close'
            },

        ],
        sumcount: 20

    },


    //基金市场
    fundcloseend: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "代码",
                key: "f12",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true
            },
            {
                title: "相关链接",
                key: "",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'fundcloseend_Links'
            },
            {
                title: "最新价",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                key: "f2",
                // suffix: "%",
                color: "_f18",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: true,
                show: true,
                name: 'Change'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "成交量",
                key: "f5",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Volume'
            },
            {
                title: "成交额",
                key: "f6",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Amount'
            },
            {
                title: "开盘价",
                key: "f17",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Open'
            },
            {
                title: "最高价",
                key: "f15",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Hign'
            },
            {
                title: "最低价",
                key: "f16",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Low'
            },
            {
                title: "昨收",
                key: "f18",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                order: true,
                show: true,
                name: 'PreviousClose'
            }
        ],
        sumcount: 20

    },

    //基金市场-reits
    fundcloseend_reits: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "代码",
                key: "f12",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true
            },
            // {
            //     title: "相关链接",
            //     key: "",
            //     order: false,
            //     href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
            //     data: ["f13","f12"],
            //     show: true,
            //     name: 'fundcloseend_Links'
            // },
            {
                title: "最新价",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                key: "f2",
                // suffix: "%",
                color: "_f18",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: true,
                show: true,
                name: 'Change'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "成交量",
                key: "f5",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Volume'
            },
            {
                title: "成交额",
                key: "f6",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Amount'
            },
            {
                title: "开盘价",
                key: "f17",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Open'
            },
            {
                title: "最高价",
                key: "f15",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Hign'
            },
            {
                title: "最低价",
                key: "f16",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Low'
            },
            {
                title: "昨收",
                key: "f18",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                order: true,
                show: true,
                name: 'PreviousClose'
            }
        ],
        sumcount: 20

    },

    //基金市场  内部 小标签
    fundcloseend2: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "代码",
                key: "f12",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "名称",
                key: "f14",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true
            },
            {
                title: "相关链接",
                key: "",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'fundcloseend_Links'
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: false,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: false,
                show: true,
                name: 'Change'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: false,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "成交量",
                key: "f5",
                order: false,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Volume'
            },
            {
                title: "成交额",
                key: "f6",
                order: false,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Amount'
            },
            {
                title: "开盘价",
                key: "f17",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: false,
                show: true,
                name: 'Open'
            },
            {
                title: "最高价",
                key: "f15",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: false,
                show: true,
                name: 'Hign'
            },
            {
                title: "最低价",
                key: "f16",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: false,
                show: true,
                name: 'Low'
            },
            {
                title: "昨收",
                key: "f18",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                order: false,
                show: true,
                name: 'PreviousClose'
            }
        ],
        sumcount: 5

    },

    //债券市场-centerv2-债券指数
    Zqzqzs: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "代码",
                key: "f12",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "名称",
                key: "f14",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true
            },
            {
                title: "最新",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: false,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: false,
                show: true,
                name: 'Change'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: false,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "今开",
                key: "f17",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: false,
                show: true,
                name: 'Open'
            },
            {
                title: "最高",
                key: "f15",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: false,
                show: true,
                name: 'Hign'
            },
            {
                title: "最低",
                key: "f16",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: false,
                show: true,
                name: 'Low'
            },
            {
                title: "昨收",
                key: "f18",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                order: false,
                show: true,
                name: 'PreviousClose'
            },
            {
                title: "成交量",
                key: "f5",
                order: false,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Volume'
            },
            {
                title: "成交额",
                key: "f6",
                order: false,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Amount'
            }
        ],
        sumcount: 5

    },


    //债券市场
    bond: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "代码",
                key: "f12",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Name'
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: true,
                show: true,
                name: 'Change'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "今开",
                key: "f17",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Open'
            },
            {
                title: "最高",
                key: "f15",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Hign'
            },
            {
                title: "最低",
                key: "f16",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Low'
            },
            {
                title: "昨收",
                key: "f18",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                order: true,
                show: true,
                name: 'PreviousClose'
            },
            {
                title: "成交量(手)",
                key: "f5",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Volume'
            },
            {
                title: "成交额",
                key: "f6",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Amount'
            }

        ],
        sumcount: 20

    },

    //债券市场  按市场额度 排序
    bondnew: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "代码",
                key: "f12",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Name'
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: true,
                show: true,
                name: 'Change'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "今开",
                key: "f17",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Open'
            },
            {
                title: "最高",
                key: "f15",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Hign'
            },
            {
                title: "最低",
                key: "f16",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Low'
            },
            {
                title: "昨收",
                key: "f18",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                order: true,
                show: true,
                name: 'PreviousClose'
            },
            {
                title: "成交量(手)",
                key: "f5",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Volume'
            },
            {
                title: "成交额",
                key: "f6",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Amount'
            }

        ],
        sumcount: 20

    },


    //债券市场 centerv2
    bondmine: {
        fields: "f1,f2,f3,f4,f14,f12,f13,f62,f128,f136,f152,f184",
        head: [
            {
                title: "名称",
                key: "f14",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: false,
                show: true
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: false,
                show: true,
                name: 'Change'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: false,
                show: true,
                name: 'ChangePercent'
            }
        ],
        sumcount: 5

    },


    //外汇市场
    forex: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "代码",
                key: "f12",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: true,
                show: true,
                name: 'Change'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "今开",
                key: "f17",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Open'
            },
            {
                title: "最高",
                key: "f15",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Hign'
            },
            {
                title: "最低",
                key: "f16",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Low'
            },
            {
                title: "昨收",
                key: "f18",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                order: true,
                show: true,
                name: 'PreviousClose'
            }
        ],
        sumcount: 20

    },

    //外汇市场--外汇牌价
    whpj: {
        fields: "f1,f12,f13,f14,f31,f32,f142,f143,f124",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "代码",
                key: "f12",
                order: true,
                show: true,
                name: 'Code'
            },
            {
                title: "名称",
                key: "f14",
                order: true,
                show: true
            },
            {
                title: "现汇买入价",
                key: "f31",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "现钞买入价",
                key: "f142",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "现汇卖出价",
                key: "f32",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "现钞卖出价",
                key: "f143",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "更新时间",
                key: "f124",
                order: true,
                cb: function(that, row){
                    return tools.formatNumberTime(that);
                },
                show: true,
                name: 'PreviousClose'
            }

        ],
        sumcount: 20

    },

    //外汇市场  centerv2
    forex2: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152",
        head: [
            {
                title: "代码",
                key: "f12",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "名称",
                key: "f14",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: false,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: false,
                show: true,
                name: 'Change'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: false,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "开盘",
                key: "f17",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: false,
                show: true,
                name: 'Open'
            },
            {
                title: "最高",
                key: "f15",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: false,
                show: true,
                name: 'Hign'
            },
            {
                title: "最低",
                key: "f16",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: false,
                show: true,
                name: 'Low'
            },
            {
                title: "昨收",
                key: "f18",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                order: false,
                show: true,
                name: 'PreviousClose'
            }
        ],
        sumcount: 5

    },




    //期权市场
    qqsc: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f28,f11,f62,f128,f136,f115,f152,f133,f108,f163,f161,f162",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "代码",
                key: "f12",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f28",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: true,
                show: true,
                name: 'Change'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "成交量",
                key: "f5",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Volume'
            },
            {
                title: "成交额",
                key: "f6",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Amount'
            },
            {
                title: "持仓量",
                key: "f108",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Amount'
            },
            {
                title: "行权价",
                key: "f161",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber4(that);
                },
                show: true,
                name: 'Amount'
            },
            {
                title: "剩余日",
                key: "f162",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Amount'
            },
            {
                title: "日增",
                key: "f163",
                order: true,
                color: "f163",
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Amount'
            },
            {
                title: "昨结",
                key: "f28",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                order: true,
                show: true,
                name: 'PreviousClose'
            },
            {
                title: "今开",
                key: "f17",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f28",
                order: true,
                show: true,
                name: 'Open'
            }
        ],
        sumcount: 20

    },


    //黄金市场
    gold: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f28,f11,f62,f128,f136,f115,f152,f133,f124",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "代码",
                key: "f12",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "品种",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f28",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: true,
                show: true,
                name: 'Change'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "今开",
                key: "f17",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f28",
                order: true,
                show: true,
                name: 'Open'
            },
            {
                title: "最高",
                key: "f15",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f28",
                order: true,
                show: true,
                name: 'Hign'
            },
            {
                title: "最低",
                key: "f16",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f28",
                order: true,
                show: true,
                name: 'Low'
            },
            {
                title: "昨结",
                key: "f28",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                order: true,
                show: true,
                name: 'PreviousClose'
            },
            {
                title: "更新时间",
                key: "f124",
                order: true,
                cb: function(that, row){
                    return tools.formatNumberTime(that);
                },
                show: true,
                name: 'PreviousClose'
            }

        ],
        sumcount: 20

    },


    //黄金市场--centerv2
    gold2: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f28,f11,f62,f128,f136,f115,f152,f133,f124",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "代码",
                key: "f12",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "品种",
                key: "f14",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: false,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: false,
                show: true,
                name: 'Change'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: false,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "今开",
                key: "f17",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f28",
                order: false,
                show: true,
                name: 'Open'
            },
            {
                title: "最高",
                key: "f15",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f28",
                order: false,
                show: true,
                name: 'Hign'
            },
            {
                title: "最低",
                key: "f16",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f28",
                order: false,
                show: true,
                name: 'Low'
            },
            {
                title: "昨结",
                key: "f28",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                order: false,
                show: true,
                name: 'PreviousClose'
            },
            {
                title: "更新时间",
                key: "f124",
                order: false,
                cb: function(that, row){
                    return tools.formatNumberTime(that);
                },
                show: true,
                name: 'PreviousClose'
            }

        ],
        sumcount: 5

    },


    //沪深板块
    hsbk: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152,f133,f104,f105",
        head: [
            {
                title: "排名",
                type: "seq",    // type 表示特殊类型
                show: true,
                order: false,
                name: 'number'

            },
            {
                title: "板块名称",
                key: "f14",
                order: false,
                href: '<a href="//quote.eastmoney.com/unify/r/{{0}}.{{1}}" title="{{2}}"></a>',
                data: ["f13","f12","f14"],
                show: true,
                name: 'name'
            },
            {
                title: "相关链接",
                key: "",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'concept_board'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: false,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "换手率",
                key: "f8",
                order: false,
                cb: function(that, row){
                    return tools.formatNumber2(that);
                },
                show: true,
                name: 'TurnoverRate'
            },
            {
                title: "涨跌家数",
                key: "",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'zhangdiejia'
            },
            {
                title: "领涨股票",
                key: "f128",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f141","f140","f128"],
                show: true,
                cb: function(that, row){
                    return tools.formatNumber3(that);
                }
            },
            {
                title: "涨跌幅",
                key: "f136",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f136",
                order: false,
                show: true
            }



        ],
        sumcount: 10

    },

    //沪深板块 跌幅榜
    hsbkd: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152,f133,f104,f105,f128,f136,f207,f208,f209,f222",
        head: [
            {
                title: "排名",
                type: "seq",    // type 表示特殊类型
                show: true,
                order: false,
                name: 'number'

            },
            {
                title: "板块名称",
                key: "f14",
                order: false,
                href: '<a href="//quote.eastmoney.com/unify/r/{{0}}.{{1}}" title="{{2}}"></a>',
                data: ["f13","f12","f14"],
                show: true,
                name: 'name'
            },
            {
                title: "相关链接",
                key: "",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'concept_board'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: false,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "换手率",
                key: "f8",
                order: false,
                cb: function(that, row){
                    return tools.formatNumber2(that);
                },
                show: true,
                name: 'TurnoverRate'
            },
            {
                title: "涨跌家数",
                key: "",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'zhangdiejia'
            },
            {
                title: "领跌股票",
                key: "f207",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f209","f208","f207"],
                show: true,
                cb: function(that, row){
                    return tools.formatNumber3(that);
                }
            },
            {
                title: "涨跌幅",
                key: "f222",
                // suffix: "%",
                color: "f222",
                order: false,
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                show: true
            },



        ],
        sumcount: 10

    },

    hsbklz: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152,f133,f104,f105",
        head: [
            {
                title: "板块名称",
                key: "f14",
                order: false,
                href: "<a href='/center/boardlist.html#boards2-{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f13", "f12","f14"],
                show: true
            },
            {
                title: "涨跌幅",
                key: "f3",
                // suffix: "%",
                color: "f3",
                order: false,
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                show: true
            },
            {
                title: "领涨股票",
                key: "f128",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f141","f140","f128"],
                show: true,
                cb: function(that, row){
                    return tools.formatNumber3(that);
                }
            },
            {
                title: "涨跌幅",
                key: "f136",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f136",
                order: false,
                show: true
            },
        ],
        sumcount: 5

    },


    //沪深指数 --上证系列  深圳系列
    hszs: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f11,f62,f128,f136,f115,f152",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "代码",
                key: "f12",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "名称",
                key: "f14",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Name'
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: false,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: false,
                show: true,
                name: 'Change'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: false,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "成交量",
                key: "f5",
                order: false,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Volume'
            },
            {
                title: "成交额",
                key: "f6",
                order: false,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Amount'
            },
            {
                title: "昨收",
                key: "f18",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                order: false,
                show: true,
                name: 'PreviousClose'
            },
            {
                title: "今开",
                key: "f17",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: false,
                show: true,
                name: 'Open'
            },
            {
                title: "最高",
                key: "f15",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: false,
                show: true,
                name: 'Hign'
            },
            {
                title: "最低",
                key: "f16",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: false,
                show: true,
                name: 'Low'
            }

        ],
        sumcount: 5


    },

    //沪深指数 --沪深重要指数
    hszs2: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f11,f62,f128,f136,f115,f152",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "代码",
                key: "f12",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "名称",
                key: "f14",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Name'
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: false,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: false,
                show: true,
                name: 'Change'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: false,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "成交量",
                key: "f5",
                order: false,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Volume'
            },
            {
                title: "成交额",
                key: "f6",
                order: false,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Amount'
            },
            {
                title: "昨收",
                key: "f18",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                order: false,
                show: true,
                name: 'PreviousClose'
            },
            {
                title: "今开",
                key: "f17",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: false,
                show: true,
                name: 'Open'
            },
            {
                title: "最高",
                key: "f15",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: false,
                show: true,
                name: 'Hign'
            },
            {
                title: "最低",
                key: "f16",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: false,
                show: true,
                name: 'Low'
            }

        ],
        sumcount: 50


    },



    //美股市场
    mgsc: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f11,f62,f128,f136,f115,f152",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "代码",
                key: "f12",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "名称",
                key: "f14",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'mgsc_name'
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: false,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: false,
                show: true,
                name: 'Change'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: false,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "成交量",
                key: "f5",
                order: false,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Volume'
            }

        ],
        sumcount: 5


    },


    mgsc3: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f11,f62,f128,f136,f115,f152",
        head: [
            {
                title: "名称",
                key: "f14",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'mgsc_name'
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: false,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: false,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: false,
                show: true,
                name: 'Change'
            }



        ],
        sumcount: 5


    },


    //期货市场--港交所--股票期货
    indexqh :{
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f31,f32,f108,f163,f211,f212,f5,f30",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "代码",
                key: "f12",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f28",
                order: true,
                show: true
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: true,
                show: true,
                name: 'Change'
            },
            {
                title: "买入价",
                key: "f31",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f28",
                order: true,
                show: true,
                name: 'Change'
            },
            {
                title: "卖出价",
                key: "f32",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f28",
                order: true,
                show: true,
                name: 'Change'
            },
            {
                title: "买量",
                key: "f211",
                // suffix: "%",
                color: "red",
                order: true,
                show: true,
                name: 'buycount',
                cb: function(that, row){
                    return tools.formatNumber(that);
                }
            },
            {
                title: "卖量",
                key: "f212",
                // suffix: "%",
                color: "green",
                order: true,
                show: true,
                name: 'sellcount',
                cb: function(that, row){
                    return tools.formatNumber(that);
                }
            },
            {
                title: "总量",
                key: "f5",
                // suffix: "%",
                color: "",
                order: true,
                show: true,
                name: 'Change',
                cb: function(that, row){
                    return tools.formatNumber(that);
                }
            },
            {
                title: "现量",
                key: "f30",
                // suffix: "%",
                color: "",
                order: true,
                show: true,
                name: 'Change',
                cb: function(that, row){
                    return tools.formatNumber(that);
                }
            },
            {
                title: "持仓量",
                key: "f108",
                show:true,
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                }
            },
            {
                title: "日增",
                key: "f163",
                order: true,
                color: "f163",
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Amount'
            },
            {
                title: "昨结算",
                key: "f28",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                order: true,
                show: true,
                name: 'PreviousClose'
            }
        ],
        sumcount: 20

    },


    //期货市场--港交所--除了 股票期货  的其他期货
    indexqhNew :{
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f31,f32,f108,f163,f211,f212,f5,f30",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "代码",
                key: "f12",
                order: true,
                // href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                // data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "名称",
                key: "f14",
                order: true,
                // href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                // data: ["f13","f12"],
                show: true
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f28",
                order: true,
                show: true
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: true,
                show: true,
                name: 'Change'
            },
            {
                title: "买入价",
                key: "f31",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f28",
                order: true,
                show: true,
                name: 'Change'
            },
            {
                title: "卖出价",
                key: "f32",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f28",
                order: true,
                show: true,
                name: 'Change'
            },
            {
                title: "买量",
                key: "f211",
                // suffix: "%",
                color: "red",
                order: true,
                show: true,
                name: 'buycount',
                cb: function(that, row){
                    return tools.formatNumber(that);
                }
            },
            {
                title: "卖量",
                key: "f212",
                // suffix: "%",
                color: "green",
                order: true,
                show: true,
                name: 'sellcount',
                cb: function(that, row){
                    return tools.formatNumber(that);
                }
            },
            {
                title: "总量",
                key: "f5",
                // suffix: "%",
                color: "",
                order: true,
                show: true,
                name: 'Change',
                cb: function(that, row){
                    return tools.formatNumber(that);
                }
            },
            {
                title: "现量",
                key: "f30",
                // suffix: "%",
                color: "",
                order: true,
                show: true,
                name: 'Change',
                cb: function(that, row){
                    return tools.formatNumber(that);
                }
            },
            {
                title: "持仓量",
                key: "f108",
                show:true,
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                }
            },
            {
                title: "日增",
                key: "f163",
                order: true,
                color: "f163",
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Amount'
            },
            {
                title: "昨结算",
                key: "f28",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                order: true,
                show: true,
                name: 'PreviousClose'
            }
        ],
        sumcount: 20

    },



    //中金所
    zjs: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f28,f22,f11,f62,f128,f136,f115,f152,f34,f35,f108",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "代码",
                key: "f12",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Name'
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f28",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: true,
                show: true,
                name: 'Change'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "今开",
                key: "f17",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f28",
                order: true,
                show: true,
                name: 'Open'
            },
            {
                title: "最高",
                key: "f15",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f28",
                order: true,
                show: true,
                name: 'Hign'
            },
            {
                title: "最低",
                key: "f16",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f28",
                order: true,
                show: true,
                name: 'Low'
            },
            {
                title: "昨结",
                key: "f28",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                order: true,
                show: true,
                name: 'PreviousClose'
            },
            {
                title: "成交量",
                key: "f5",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Volume'
            },
            {
                title: "成交额",
                key: "f6",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Amount'
            },
            {
                title: "买盘(外盘)",
                key: "f34",
                show: true,
                order: true
            },
            {
                title: "卖盘(内盘)",
                key: "f35",
                show: true,
                order: true
            },
            {
                title: "持仓量",
                key: "f108",
                show: true,
                order: true
            }


        ],
        sumcount: 20


    },


    //期货市场--国际期货
    gjqh: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f34,f35,f108",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "代码",
                key: "f12",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Name'
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: true,
                show: true,
                name: 'Change'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "今开",
                key: "f17",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Open'
            },
            {
                title: "最高",
                key: "f15",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Hign'
            },
            {
                title: "最低",
                key: "f16",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: true,
                show: true,
                name: 'Low'
            },
            {
                title: "昨结",
                key: "f28",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                order: true,
                show: true,
                name: 'PreviousClose'
            },
            {
                title: "成交量",
                key: "f5",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Volume'
            },
            {
                title: "买盘(外盘)",
                key: "f34",
                show: true,
                order: true
            },
            {
                title: "卖盘(内盘)",
                key: "f35",
                show: true,
                order: true
            },
            {
                title: "持仓量",
                key: "f108",
                show: true,
                order: true
            }


        ],
        sumcount: 20


    },


    //黄金市场--上海黄金期货
    hjqh: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f34,f35,f108,f211,f212",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "代码",
                key: "f12",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "名称",
                key: "f14",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Name'
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: false,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: false,
                show: true,
                name: 'Change'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: false,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "今开",
                key: "f17",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: false,
                show: true,
                name: 'Open'
            },
            {
                title: "最高",
                key: "f15",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: false,
                show: true,
                name: 'Hign'
            },
            {
                title: "最低",
                key: "f16",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "_f18",
                order: false,
                show: true,
                name: 'Low'
            },
            {
                title: "昨结",
                key: "f28",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                order: false,
                show: true,
                name: 'PreviousClose'
            },
            {
                title: "成交量(手)",
                key: "f5",
                order: false,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Volume'
            },
            {
                title: "买量(手)",
                key: "f211",
                // suffix: "%",
                color: "red",
                order: false,
                show: true,
                name: 'buycount',
                cb: function(that, row){
                    return tools.formatNumber(that);
                }
            },
            {
                title: "卖量(手)",
                key: "f212",
                // suffix: "%",
                color: "green",
                order: false,
                show: true,
                name: 'sellcount',
                cb: function(that, row){
                    return tools.formatNumber(that);
                }
            },
            {
                title: "持仓(手)",
                key: "f108",
                show: true,
                order: false
            }


        ],
        sumcount: 5


    },



    //开始首页的自选指标  模块
    //全部港股跌幅
    hkstocks_cp_asc: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f34,f35,f108",
        head: [
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f13","f12","f14"],
                show: true,
                name: 'Name',
                newcb: function(value){
                    return tools.txtPoint(value);
                }

            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: true,
                show: true,
                name: 'Change'
            }

        ],
        sumcount: 5

    },


    //全部港股  成交量
    CommonVolume: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f34,f35,f108",
        head: [
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f13","f12","f14"],
                show: true,
                name: 'Name',
                newcb: function(value){
                    return tools.txtPoint(value);
                }
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "成交量",
                key: "f5",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Volume'
            }
        ],
        sumcount: 5

    },

    // 成交额
    CommonAmount: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f34,f35,f108",
        head: [
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f13","f12","f14"],
                show: true,
                name: 'Name',
                newcb: function(value){
                    return tools.txtPoint(value);
                }
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "成交额",
                key: "f6",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Amount'
            }
        ],
        sumcount: 5

    },


    //沪A涨幅
    sh_a_cp_desc: {
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f34,f35,f108",
        head: [
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f13","f12","f14"],
                show: true,
                name: 'Name',
                newcb: function(value){
                    return tools.txtPoint(value);
                }
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "涨跌额",
                key: "f4",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f4",
                order: true,
                show: true,
                name: 'Change'
            },
            {
                title: "加自选",
                key: "addzixuan",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Links'
            }
        ],
        sumcount: 5

    },


    //沪5分钟涨幅
    AB5MinChangePercent :{
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f34,f35,f108",
        head: [
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f13","f12","f14"],
                show: true,
                name: 'Name',
                newcb: function(value){
                    return tools.txtPoint(value);
                }
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "五分钟涨跌幅",
                key: "f11",
                color: "f11",
                order: true,
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                show: true
            },
            {
                title: "加自选",
                key: "addzixuan",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Links'
            }
        ],
        sumcount: 5

    },


    //换手率
    ABTurnoverRate:{
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f34,f35,f108",
        head: [
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f13","f12","f14"],
                show: true,
                name: 'Name',
                newcb: function(value){
                    return tools.txtPoint(value);
                }
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "换手率",
                key: "f8",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber2(that);
                },
                show: true,
                name: 'TurnoverRate'
            },
            {
                title: "加自选",
                key: "addzixuan",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Links'
            }
        ],
        sumcount: 5

    },


    //量比
    ABVolumeRate:{
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f34,f35,f108",
        head: [
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f13","f12","f14"],
                show: true,
                name: 'Name',
                newcb: function(value){
                    return tools.txtPoint(value);
                }
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "量比",
                key: "f10",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber4(that);
                },
                show: true,
                name: 'TurnoverRate'
            },
            {
                title: "加自选",
                key: "addzixuan",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Links'
            }
        ],
        sumcount: 5

    },


    //振幅
    ABAmplitude:{
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f34,f35,f108",
        head: [
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f13","f12","f14"],
                show: true,
                name: 'Name',
                newcb: function(value){
                    return tools.txtPoint(value);
                }
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "振幅",
                key: "f7",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber2(that);
                },
                show: true,
                name: 'Amplitude'
            },
            {
                title: "加自选",
                key: "addzixuan",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Links'
            }
        ],
        sumcount: 5

    },


    //成交额
    ABAmount:{
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f34,f35,f108",
        head: [
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f13","f12","f14"],
                show: true,
                name: 'Name',
                newcb: function(value){
                    return tools.txtPoint(value);
                }
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "成交额",
                key: "f6",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Amount'
            },
            {
                title: "加自选",
                key: "addzixuan",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Links'
            }
        ],
        sumcount: 5

    },


    //市盈率
    ABPE:{
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f34,f35,f108",
        head: [
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f13","f12","f14"],
                show: true,
                name: 'Name',
                newcb: function(value){
                    return tools.txtPoint(value);
                }
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "市盈率",
                key: "f9",
                order: true,
                show: true,
                cb: function(that, row){
                    return tools.formatNumberSyl(that);
                },
                name: 'PERation'
            },
            {
                title: "加自选",
                key: "addzixuan",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Links'
            }
        ],
        sumcount: 5

    },


    //市净率
    ABPB:{
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f34,f35,f108",
        head: [
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f13","f12","f14"],
                show: true,
                name: 'Name',
                newcb: function(value){
                    return tools.txtPoint(value);
                }
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "市净率",
                key: "f23",
                order: true,
                show: true,
                cb: function(that, row){
                    return tools.formatNumberSyl(that);
                },
                name: 'PB'
            },
            {
                title: "加自选",
                key: "addzixuan",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Links'
            }
        ],
        sumcount: 5

    },


    //流通市值
    ABFlowCapitalValue:{
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f34,f35,f108",
        head: [
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f13","f12","f14"],
                show: true,
                name: 'Name',
                newcb: function(value){
                    return tools.txtPoint(value);
                }
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "流通市值",
                key: "f21",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true
            },
            {
                title: "加自选",
                key: "addzixuan",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Links'
            }
        ],
        sumcount: 5

    },


    //总市值
    ABMarketValue:{
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f34,f35,f108",
        head: [
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f13","f12","f14"],
                show: true,
                name: 'Name',
                newcb: function(value){
                    return tools.txtPoint(value);
                }
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "总市值",
                key: "f20",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true
            },
            {
                title: "加自选",
                key: "addzixuan",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Links'
            }
        ],
        sumcount: 5

    },


    //60日涨跌幅
    AB60DayChangePercent:{
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f34,f35,f108",
        head: [
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f13","f12","f14"],
                show: true,
                name: 'Name',
                newcb: function(value){
                    return tools.txtPoint(value);
                }
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "60日涨跌幅",
                key: "f24",
                order: true,
                // suffix: "%",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                color: "f24",
                show: true
            },
            {
                title: "加自选",
                key: "addzixuan",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Links'
            }
        ],
        sumcount: 5

    },


    //年初至今涨跌幅
    AB360DayChangePercent:{
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f34,f35,f108",
        head: [
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f13","f12","f14"],
                show: true,
                name: 'Name',
                newcb: function(value){
                    return tools.txtPoint(value);
                }
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "年初至今涨跌幅",
                key: "f25",
                order: true,
                suffix: "%",
                color: "f25",
                show: true
            },
            {
                title: "加自选",
                key: "addzixuan",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Links'
            }
        ],
        sumcount: 5

    },


    //涨速
    ABSpeed:{
        fields: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f34,f35,f108",
        head: [
            {
                title: "名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f13","f12","f14"],
                show: true,
                name: 'Name',
                newcb: function(value){
                    return tools.txtPoint(value);
                }
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "_f18",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "涨速",
                key: "f22",
                order: true,
                suffix: "%",
                color: "f22",
                show: true
            },
            {
                title: "加自选",
                key: "addzixuan",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Links'
            }
        ],
        sumcount: 5

    },


    //行业涨跌幅  概念 地域   涨
    BoardsCPAsc:{
        fields: "f1,f2,f3,f14,f12,f13,f62,f128,f136,f152",
        head: [
            {
                title: "名称",
                key: "f14",
                order: false,
                href: "<a href='/center/boardlist.html#boards2-{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f13", "f12","f14"],
                show: true,
                newcb: function(value){
                    return tools.txtPoint(value);
                }
            },
            {
                title: "涨跌幅",
                key: "f3",
                // suffix: "%",
                color: "f3",
                order: false,
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                show: true
            },
            {
                title: "主力净流入",
                key: "f62",
                color: "f62",
                order: false,
                cb: function(that, row){
                    return tools.formatNumberIndex(that);
                },
                show: true
            },
            {
                title: "领涨股",
                key: "f128",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f141","f140","f128"],
                show: true,
                // cb: function(that, row){
                //     return tools.formatNumber3(that);
                // }
                newcb: function(value){
                    return tools.txtPoint(value);
                }
            },
            {
                title: "涨跌幅",
                key: "f136",
                // suffix: "%",
                color: "f136",
                order: false,
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                show: true
            },
        ],
        sumcount: 5

    },


    //行业涨跌幅  概念 地域   跌幅
    BoardsCPAscd:{
        fields: "f1,f2,f3,f14,f12,f13,f62,f128,f136,f152,f207,f208,f209,f222",
        head: [
            {
                title: "名称",
                key: "f14",
                order: false,
                href: "<a href='/center/boardlist.html#boards2-{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f13", "f12","f14"],
                show: true,
                newcb: function(value){
                    return tools.txtPoint(value);
                }
            },
            {
                title: "涨跌幅",
                key: "f3",
                // suffix: "%",
                color: "f3",
                order: false,
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                show: true
            },
            {
                title: "主力净流入",
                key: "f62",
                color: "f62",
                order: false,
                cb: function(that, row){
                    return tools.formatNumberIndex(that);
                },
                show: true
            },
            {
                title: "领跌股",
                key: "f207",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f209","f208","f207"],
                show: true,
                newcb: function(value){
                    return tools.txtPoint(value);
                }
            },
            {
                title: "涨跌幅",
                key: "f222",
                // suffix: "%",
                color: "f222",
                order: false,
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                show: true
            },
        ],
        sumcount: 5

    },



    //行业 概念  地域  换手率
    BoardsTurnoverRate: {
        fields: "f1,f2,f3,f8,f14,f12,f13,f62,f128,f136,f152",
        head: [
            {
                title: "名称",
                key: "f14",
                order: false,
                href: "<a href='/center/boardlist.html#boards2-{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f13", "f12","f14"],
                show: true,
                newcb: function(value){
                    return tools.txtPoint(value);
                }
            },
            {
                title: "涨跌幅",
                key: "f3",
                // suffix: "%",
                color: "f3",
                order: false,
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                show: true
            },
            {
                title: "换手率",
                key: "f8",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber2(that);
                },
                show: true,
                name: 'TurnoverRate'
            },
            {
                title: "领涨股",
                key: "f128",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f141","f140","f128"],
                show: true,
                newcb: function(value){
                    return tools.txtPoint(value);
                }
            },
            {
                title: "涨跌幅",
                key: "f136",
                // suffix: "%",
                color: "f136",
                order: false,
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                show: true
            },
        ],
        sumcount: 5

    },




    //行业 概念 地域 涨速
    BoardsSpeed: {
        fields: "f1,f2,f3,f8,f14,f12,f13,f22,f62,f128,f136,f152",
        head: [
            {
                title: "名称",
                key: "f14",
                order: false,
                href: "<a href='/center/boardlist.html#boards2-{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f13", "f12","f14"],
                show: true,
                newcb: function(value){
                    return tools.txtPoint(value);
                }
            },
            {
                title: "涨跌幅",
                key: "f3",
                // suffix: "%",
                color: "f3",
                order: false,
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                show: true
            },
            {
                title: "涨速",
                key: "f22",
                color: 'f22',
                order: true,
                cb: function(that, row){
                    return tools.formatNumber2(that);
                },
                show: true,
                name: 'TurnoverRate'
            },
            {
                title: "领涨股",
                key: "f128",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f141","f140","f128"],
                show: true,
                newcb: function(value){
                    return tools.txtPoint(value);
                }
            },
            {
                title: "涨跌幅",
                key: "f136",
                // suffix: "%",
                color: "f136",
                order: false,
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                show: true
            },
        ],
        sumcount: 6

    },


    //行业 概念 地域  成交额
    BoardsAmount: {
        fields: "f1,f2,f3,f6,f8,f14,f12,f13,f22,f62,f128,f136,f152",
        head: [
            {
                title: "名称",
                key: "f14",
                order: false,
                href: "<a href='/center/boardlist.html#boards2-{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f13", "f12","f14"],
                show: true,
                newcb: function(value){
                    return tools.txtPoint(value);
                }
            },
            {
                title: "涨跌幅",
                key: "f3",
                // suffix: "%",
                color: "f3",
                order: false,
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                show: true
            },
            {
                title: "成交额",
                key: "f6",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'Amount'
            },
            {
                title: "领涨股",
                key: "f128",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f141","f140","f128"],
                show: true,
                newcb: function(value){
                    return tools.txtPoint(value);
                }
            },
            {
                title: "涨跌幅",
                key: "f136",
                // suffix: "%",
                color: "f136",
                order: false,
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                show: true
            },
        ],
        sumcount: 6

    },


    //行业板块 增仓
    BoardsPosition: {
        fields: "f1,f2,f3,f6,f8,f14,f12,f13,f22,f62,f128,f136,f152,f184,f225,f226",
        head: [
            {
                title: "名称",
                key: "f14",
                order: false,
                href: "<a href='/center/boardlist.html#boards2-{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f13", "f12","f14"],
                show: true,
                newcb: function(value){
                    return tools.txtPoint(value);
                }
            },
            {
                title: "涨跌幅",
                key: "f3",
                // suffix: "%",
                color: "f3",
                order: false,
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                show: true
            },
            {
                title: "增仓占比",
                key: "f184",
                color: "f184",
                order: true,
                cb: function(that, row){
                    return tools.formatNumberZCZB(that);
                },
                show: true,
                name: 'zczb'
            },
            {
                title: "排名",
                key: "f225",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'paim'
            },
            {
                title: "排行变化",
                key: "f226",
                color: "f226",
                order: true,
                cb: function(that, row){
                    return tools.formatPaiming(that);
                },
                show: true,
                name: 'pmchange'
            }
        ],
        sumcount: 6

    },


    //大盘资金流向
    MainCaptialFlow: {
        fields: "f1,f2,f3,f14,f12,f13,f62,f128,f136,f152,f184",
        head: [
            {
                title: "名称",
                key: "f14",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f13","f12","f14"],
                show: true,
                newcb: function(value){
                    return tools.txtPoint(value);
                }
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "f3",
                order: false,
                show: true
            },
            {
                title: "涨跌幅",
                key: "f3",
                // suffix: "%",
                color: "f3",
                order: false,
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                show: true
            },
            {
                title: "主力净流入",
                key: "f62",
                color: "f62",
                order: false,
                cb: function(that, row){
                    return tools.formatNumberIndex(that);
                },
                show: true
            },
            //净占比 字段需要修改
            {
                title: "净占比",
                key: "f184",
                color: "f184",
                order: false,
                cb: function(that, row){
                    return tools.formatNumberJZB(that);
                },
                show: true
            }
        ],
        sumcount: 5

    },


    //主力排名
    FFRanking: {
        fields: "f1,f2,f3,f14,f12,f13,f62,f128,f136,f152,f184,f223",
        head: [
            {
                title: "名称",
                key: "f14",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f13","f12","f14"],
                show: true,
                newcb: function(value){
                    return tools.txtPoint(value);
                }
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "f3",
                order: false,
                show: true
            },
            //净占比 字段需要修改
            {
                title: "净占比",
                key: "f184",
                color: "f184",
                order: false,
                cb: function(that, row){
                    return tools.formatNumberJZB(that);
                },
                show: true
            },
            {
                title: "排名",
                key: "f223",
                order: true,
                cb: function(that, row){
                    return tools.formatNumber(that);
                },
                show: true,
                name: 'paim'
            },
            {
                title: "涨跌幅",
                key: "f3",
                // suffix: "%",
                color: "f3",
                order: false,
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                show: true
            }

        ],
        sumcount: 5

    },


    //行业资金流
    BoardsCaptialFlow: {
        fields: "f1,f2,f3,f6,f8,f14,f12,f13,f22,f62,f128,f136,f152,f204,f184",
        head: [
            {
                title: "名称",
                key: "f14",
                order: false,
                href: "<a href='/center/boardlist.html#boards2-{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f13", "f12","f14"],
                show: true,
                newcb: function(value){
                    return tools.txtPoint(value);
                }
            },
            {
                title: "涨跌幅",
                key: "f3",
                // suffix: "%",
                color: "f3",
                order: false,
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                show: true
            },
            {
                title: "主力净流入",
                key: "f62",
                color: "f62",
                order: false,
                cb: function(that, row){
                    return tools.formatNumberIndex(that);
                },
                show: true
            },
            //净占比 字段需要修改
            {
                title: "净占比",
                key: "f184",
                color: "f184",
                order: false,
                cb: function(that, row){
                    return tools.formatNumberJZB(that);
                },
                show: true
            },
            {
                title: "主力流入最大股",
                key: "f204",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f206", "f205","f204"],
                show: true,
                newcb: function(value){
                    return tools.txtPoint(value);
                }
            }
        ],
        sumcount: 5

    },


    //个股资金流 流入和流出
    zijinliuGegu: {
        fields: "f1,f2,f3,f14,f12,f13,f62,f128,f136,f152,f184",
        head: [
            {
                title: "名称",
                key: "f14",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}' title='{{2}}'></a>",
                data: ["f13","f12","f14"],
                show: true,
                newcb: function(value){
                    return tools.txtPoint(value);
                }
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                color: "f3",
                order: false,
                show: true
            },
            {
                title: "涨跌幅",
                key: "f3",
                // suffix: "%",
                color: "f3",
                order: false,
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                show: true
            },
            {
                title: "主力净流入",
                key: "f62",
                color: "f62",
                order: false,
                cb: function(that, row){
                    return tools.formatNumberIndex(that);
                },
                show: true
            },
            //净占比 字段需要修改
            {
                title: "净占比",
                key: "f184",
                color: "f184",
                order: false,
                cb: function(that, row){
                    return tools.formatNumberJZB(that);
                },
                show: true
            }
        ],
        sumcount: 5

    },




    //债券市场  可转债比价表
    fullscreenlist: {
        fields: "f1,f152,f2,f3,f12,f13,f14,f227,f228,f229,f230,f231,f232,f233,f234,f235,f236,f237,f238,f239,f240,f241,f242,f26,f243",
        head: [
            {
                title: "序号",
                type: "seq",    // type 表示特殊类型
                show: true,
                name: 'number'

            },
            {
                title: "转债代码",
                key: "f12",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Code'
            },
            {
                title: "转债名称",
                key: "f14",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'Name'
            },
            {
                title: "最新价",
                key: "f2",
                fixedkey: 'f1',
                newcb: function(value, fixednum){
                    return tools.formatNumberFlag(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌幅",
                key: "f3",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                // suffix: "%",
                color: "f3",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "相关链接",
                key: "",
                order: false,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f13","f12"],
                show: true,
                name: 'fullscreen_Links'
            },
            {
                title: "正股代码",
                key: "f232",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f233","f232"],
                show: true,
                name: 'Code'
            },
            {
                title: "正股名称",
                key: "f234",
                order: true,
                href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                data: ["f233","f232"],
                show: true,
                name: 'Name'
            },
            {
                title: "最新价",
                key: "f229",
                fixedkey: 'f1',
                cb: function(that, row){
                    return tools.formatNumberJiaZ(that, 2);
                },
                color: "f230",
                order: true,
                show: true,
                name: 'Close'
            },
            {
                title: "涨跌幅",
                key: "f230",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                color: "f230",
                order: true,
                show: true,
                name: 'ChangePercent'
            },
            {
                title: "转股价",
                key: "f235",
                order: true,
                cb: function(that, row){
                    return tools.formatNumberSyl(that);
                },
                show: true,
                name: 'Volume'
            },
            {
                title: "转股价值",
                key: "f236",
                order: true,
                cb: function(that, row){
                    return tools.formatNumberJiaZ(that, 4);
                },
                show: true,
                name: 'zgValue'
            },
            {
                title: "转股溢价率",
                key: "f237",
                order: true,
                color: "f237",
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                show: true,
                name: 'zgYjb'
            },
            {
                title: "纯债溢价率",
                key: "f238",
                color: "f238",
                order: true,
                fixedkey: 'f152',
                newcb: function(value, fixednum){
                    return tools.formatNumberIndexZdf(value, fixednum);
                },
                show: true,
                name: 'czYjl'
            },
            {
                title: "回售触发价",
                key: "f239",
                order: true,
                cb: function(that, row){
                    return tools.formatNumberSyl(that);
                },
                show: true,
                name: 'hsCfj'
            },
            {
                title: "强赎触发价",
                key: "f240",
                order: true,
                cb: function(that, row){
                    return tools.formatNumberSyl(that);
                },
                show: true,
                name: 'qsCfj'
            },
            {
                title: "到期赎回价",
                key: "f241",
                order: true,
                cb: function(that, row){
                    return tools.formatNumberSyl(that);
                },
                show: true,
                name: 'dqShj'
            },
            {
                title: "纯债价值",
                key: "f227",
                order: true,
                cb: function(that, row){
                    return tools.formatNumberSyl(that);
                },
                show: true,
                name: 'Volume'
            },
            {
                title: "开始转股日",
                key: "f242",
                order: true,
                show: true,
                name: 'shtime',
                cb: function(that, row){
                    return tools.formatNumber3(that);
                }
            },
            {
                title: "上市日期",
                key: "f26",
                order: true,
                show: true,
                name: 'shtime',
                cb: function(that, row){
                    return tools.formatNumber3(that);
                }
            },
            {
                title: "申购日期",
                key: "f243",
                order: true,
                show: true,
                name: 'shtime',
                cb: function(that, row){
                    return tools.formatNumber3(that);
                }
            },
            {
                title: "加自选",
                key: "addzixuan",
                order: false,
                // href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
                // data: ["f13","f12"],
                show: true,
                name: 'Links'
            }
        ],
        sumcount: 50


    },


    //债券市场  可转债比价表
    txbj: {
        fields: 'f1,f2,f3,f4,f5,f12,f13,f14,f108,f152,f161,f249,f250,f330,f339,f340,f341,f342,f343,f344,f345,f346,f347',
        head: [
            {
                title: "名称",
                key: "f14",
                order: false,
                name: 'gouName',
                tips:"非标准合约第一次调整，行权价增加标识A；第二次调整，行权价增加标识B"
            },
            {
                title: "最新",
                key: "f2",
                order: true,
                name: 'gouZxj'
            },
            {
                title: "涨跌幅",
                key: "f3",
                order: true,
                name: 'gouZdf'
            },
            {
                title: "涨跌额",
                key: "f4",
                order: true,
                name: 'gouZde'
            },
            {
                title: "持仓量",
                key: "f108",
                order: true,
                name: 'gouCcl'
            },
            {
                title: "成交量",
                key: "f5",
                order: true,
                name: 'gouCjl'
            },
            {
                title: "隐含波动率",
                key: "f249",
                order: true,
                name: 'gouYxbd',
                tips:"隐含波动率(Implied Volatility)是将市场上的期权或权证交易价格代入权证理论价格模型<Black-Scholes模型>，反推出来的波动率数值"
            },
            {
                title: "折溢价率",
                key: "f250",
                order: true,
                name: 'gouYxbd',
                tips:'期权到期前，标的物价格需要变动多少百分比才可让期权投资者在到期日实现损益平衡。溢价率衡量期权风险高低，该值越高，实现损益平衡越不容易，投资风险越高'
            },
            {
                title: "行权价",
                key: "f161",
                order: true,
                name: 'xqj',
                tips:"T型报价的行权价以同一行权价格为中心，左侧为认购期权的相关行情，右侧为认沽期权相关行情"
            },
            {
                title: "名称",
                key: "f340",
                order: false,
                name: 'guName',
                tips:"非标准合约第一次调整，行权价增加标识A；第二次调整，行权价增加标识B"
            },
            {
                title: "最新",
                key: "f339",
                order: true,
                name: 'guZxj'
            },
            {
                title: "涨跌幅",
                key: "f341",
                order: true,
                name: 'guZdf'
            },
            {
                title: "涨跌额",
                key: "f342",
                order: true,
                name: 'guZde'
            },
            {
                title: "持仓量",
                key: "f345",
                order: true,
                name: 'guCcl'
            },
            {
                title: "成交量",
                key: "f344",
                order: true,
                name: 'guCjl'
            },
            {
                title: "隐含波动率",
                key: "f346",
                order: true,
                name: 'guYxbd',
                tips:"隐含波动率(Implied Volatility)是将市场上的期权或权证交易价格代入权证理论价格模型<Black-Scholes模型>，反推出来的波动率数值"
            },
            {
                title: "折溢价率",
                key: "f347",
                order: true,
                name: 'guYxbd',
                tips:'期权到期前，标的物价格需要变动多少百分比才可让期权投资者在到期日实现损益平衡。溢价率衡量期权风险高低，该值越高，实现损益平衡越不容易，投资风险越高'
            },

        ],
        sumcount: 50


    }


};