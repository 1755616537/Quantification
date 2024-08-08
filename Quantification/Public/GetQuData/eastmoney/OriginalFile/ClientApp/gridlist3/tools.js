module.exports = {

    formatNumber: function (num) {
        if (num == 0) {
            return '0.00'
        }

        var res = "";
        try {
            var n = Math.abs(num / 1);
            if (typeof n == "number") {
                if (n > 10000 && n < 100000000) {
                    res = (num / 10000).toFixed(2) + "万";
                } else if (n > 100000000) {
                    res = (num / 100000000).toFixed(2) + "亿";
                } else if (n == 0) {
                    res = '-';
                } else {
                    res = num.toFixed(0);
                }
            }
        } catch (error) {
            res = "-"
        }

        return res;
    },

    //沪深个股 保留两位小数
    formatNumberHSGGLB: function (num) {
        if (num == 0) {
            return '0.00'
        }

        try {
            return num.toFixed(2);
        } catch (error) {
            return "-"
        }


    },

    //主力净流入  新 首页保留2位小数
    formatNumberIndex: function (item) {
        if (item == '-') {
            return '-';

        }

        if (item == 0) {
            return '0.00'
        }

        var res = "";
        try {
            var fixed = typeof fixed === "number" && fixed >= 0 ? fixed : NaN;
            try {
                var n = Math.abs(item / 1);
                if (typeof item == "number") {

                    if ((n >= 0 && n < 1)) {
                        return item.toFixed(2);
                    } else if ((n >= 1 && n < 1e2)) {
                        return item.toFixed(2);
                    } else if ((n >= 1e2 && n < 1e3)) {
                        return item.toFixed(1);
                    } else if ((n >= 1e3 && n < 1e4) ) {
                        return item.toFixed(0);
                    } else if ((n >= 1e4 && n < 1e6) ) {
                        item = item / 10000;
                        return item.toFixed(fixed || 2) + "万";
                    } else if ((n >= 1e6 && n < 1e7) ) {
                        item = item / 10000;
                        return item.toFixed(fixed || 1) + "万";
                    } else if ((n >= 1e7 && n < 1e8) ) {
                        item = item / 10000;
                        return item.toFixed(fixed || 0) + "万";
                    } else if ((n >= 1e8 && n < 1e10) ) {
                        item = item / 1e8;
                        return item.toFixed(fixed || 2) + "亿";
                    } else if ((n >= 1e10 && n < 1e11) ) {
                        item = item / 1e8;
                        return item.toFixed(fixed || 1) + "亿";
                    } else if ((n >= 1e11 && n < 1e12) ) {
                        item = item / 1e8;
                        return item.toFixed(fixed || 0) + "亿";
                    } else if ((n >= 1e12 && n < 1e13) ) {
                        item = item / 1e12;
                        return item.toFixed(fixed || 1) + "万亿";
                    } else if ((n >= 1e13) || (n < 0 && n > -1e16)) {
                        item = item / 1e12;
                        return item.toFixed(fixed || 0) + "万亿";
                    } else {
                        return item.toFixed(0);
                    }
                }
            } catch (error) {
                item = "-"
            }

            return item;

        } catch (error) {
            return "-"
        }


    },

    //科创板全屏 成交量new
    kcbMyformatNum: function (num) {
        if (num == '-') {
            return '-';
        }

        if (num == undefined || num == '' || isNaN(num) || num == '-') {
            return '';
        }


        var hz = '';
        var num2 = '';
        try {
            if (num >= 0 && num <= 99.999999999) {
                num2 = parseFloat(num).toFixed(2);
            } else if (num >= 100 && num <= 999) {
                num2 = parseFloat(num).toFixed(1);
            } else if (num >= 1000) {
                // num2 = parseFloat(num).toFixed(0);
                if (num > 10000 && num < 100000000) {
                    num2 = (num / 10000).toFixed(2) + "万";
                } else if (num > 100000000) {
                    num2 = (num / 100000000).toFixed(2) + "亿";
                } else if (num == 0) {
                    num2 = '-';
                } else {
                    num2 = num.toFixed(0);
                }
            }


            //处理小于0
            if (num < 0) {
                num = Math.abs(num);

                if (num >= 0 && num <= 99) {
                    num2 = parseFloat(num).toFixed(2);
                } else if (num >= 100 && num <= 999) {
                    num2 = parseFloat(num).toFixed(1);
                } else if (num >= 1000) {
                    num2 = parseFloat(num).toFixed(0);
                }

                num2 = '-' + num2;

            }

            return num2.toString() + hz;

        } catch (error) {
            return '-';
        }


    },

    formatNumber_0: function (num) {
        var res = "";
        try {
            var n = Math.abs(num / 1);
            if (typeof n == "number") {
                if (n > 10000 && n < 100000000) {
                    res = (num / 10000).toFixed(0) + "万";
                } else if (n > 100000000) {
                    res = (num / 100000000).toFixed(2) + "亿";
                } else {
                    res = num;
                }
            }
        } catch (error) {
            res = "-"
        }

        return res;
    },

    //振幅
    formatNumber2: function (num) {
        var res = "";
        try {
            var n = Math.abs(num / 1);
            if (typeof n == "number") {
                res = n.toFixed(2)
            }
        } catch (error) {
            res = "-"
        }

        if (num >= 0) {
            return res + '%';
        } else {
            return '-';
        }


    },

    //净占比
    formatNumberJZB: function (num) {
        var res = "";
        try {
            var n = Math.abs(num / 1);
            if (typeof n == "number") {
                res = n.toFixed(2)
            }
        } catch (error) {
            res = "-"
        }

        if (num >= 0) {
            return res + '%';
        } else if (num < 0) {

            return '-' + res + '%';


        } else {
            return '-';
        }


    },

    //增仓占比
    formatNumberZCZB: function (num) {
        var res = "";
        try {
            var n = Math.abs(num / 1);
            if (typeof n == "number") {
                res = n.toFixed(2)
            }
        } catch (error) {
            res = "-"
        }

        if (num >= 0) {
            return res + '%';
        } else if (num < 0) {
            return '-' + res + '%';;
        } else {
            return '-'
        }


    },

    //市盈率
    formatNumberSyl: function (num) {

        if (num > 0) {
            return num.toFixed(2);
        } else if (num < 0) {
            return num.toFixed(2);
        } else {
            return '-'
        }


    },


    //转股价值
    formatNumberJiaZ: function (num, number) {

        if (num > 0) {
            return num.toFixed(number);
        } else if (num < 0) {
            return num.toFixed(number);
        } else {
            return '-'
        }


    },

    formatNumber3: function (num) {
        var str = num;
        if (typeof str == "number") {
            return str.toString().substr(0, 4) + '-' + str.toString().substr(4, 2) + '-' + str.toString().substr(6, 2);
        } else if (typeof str == "string") {
            return str
        } else {
            return '-'
        }


    },

    //涨跌额 最新价 2位小数
    formatNumber4: function (num) {
        var res = "";
        try {
            var n = Math.abs(num / 1);
            if (typeof n == "number") {
                res = n.toFixed(2)
            }
        } catch (error) {
            res = "-"
        }

        if (num > 0) {
            return res;
        } else if (num < 0) {
            return '-' + res;
        } else if (num == 0) {
            return '0.00';
        } else {
            return '-'
        }


    },



    formatNumberTime: function (shijianchuo) {
        var time = new Date(shijianchuo * 1000);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);


        function add0(m) {
            return m < 10 ? '0' + m : m
        }
    },


    //港股 涨跌额  2位
    formatNumberZde: function (num) {
        var res = "";
        try {
            var n = Math.abs(num / 1);
            if (typeof n == "number") {
                res = n.toFixed(2)
            }
        } catch (error) {
            res = "-"
        }

        if (num > 0) {
            return res;
        } else if (num < 0) {
            return '-' + res;
        } else if (num == 0) {
            return '0.00';
        } else {
            return '-'
        }


    },

    //排名
    formatPaiming: function (num) {
        if (num == 0) {
            return '-'
        }

        var res = "";
        try {
            var n = Math.abs(num / 1);
            if (typeof n == "number") {
                if (n > 10000 && n < 100000000) {
                    res = (num / 10000).toFixed(2) + "万";
                } else if (n > 100000000) {
                    res = (num / 100000000).toFixed(2) + "亿";
                } else if (n == 0) {
                    res = '-';
                } else {
                    res = num.toFixed(0);
                }
            }
        } catch (error) {
            res = "-"
        }

        if (res > 0) {
            res = "+" + res;
        }

        return res;
    },


    //根据参数 f1 f152 进行保留小数位数  最新价 涨跌额
    formatNumberFlag: function (value, fixednum) {
        // console.log(value)
        // console.log(fixednum)
        var res = "";
        try {
            var n = Math.abs(value / 1);
            if (typeof n == "number") {
                res = n.toFixed(fixednum)
            }
        } catch (error) {
            res = "-"
        }

        if (value > 0) {
            return res;
        } else if (value < 0) {
            return '-' + res;
        } else if (value == 0) {
            return (0).toFixed(fixednum);
        } else {
            return '-'
        }


    },


    //委比
    formatNumberFlag2: function (value, fixednum) {
        // console.log(value)
        // console.log(fixednum)
        var res = "";
        try {
            var n = Math.abs(value / 1);
            if (typeof n == "number") {
                res = n.toFixed(fixednum)
            }
        } catch (error) {
            res = "-"
        }

        if (value > 0) {
            return res + '%';
        } else if (value < 0) {
            return '-' + res + '%';
        } else if (value == 0) {
            return '-';
        } else {
            return '-'
        }


    },


    //首页 流通市值 涨跌幅 涨跌幅为0  显示0.00%
    formatNumberIndexZdf: function (value, fixednum) {
        // console.log(value)
        // console.log(fixednum)
        var res = "";
        try {
            var n = Math.abs(value / 1);
            if (typeof n == "number") {
                res = n.toFixed(fixednum)
            }
        } catch (error) {
            res = "-"
        }

        if (value > 0) {
            return res + '%';
        } else if (value < 0) {
            return '-' + res + '%';
        } else if (value == 0) {
            return '0.00%';
        } else {
            return '-'
        }


    },

    txtPoint: function (value) {
        var len = value.length,
            charCode = -1,
            realLength = 0
        strChar=[];
        for (var i = 0; i < len; i++) {
            charCode = value.charCodeAt(i);
            strChar[realLength]=value.charAt(i);
            if (charCode >= 0 && charCode <= 128)
            {
                realLength += 1; // 英文
            }
            else{
                strChar[realLength+1]="";
                realLength += 2; // 中文
            }
        }
        if (realLength > 8) {
            value = strChar.slice(0,6).join("")+ '..';
        }

        return value
    },

    formatNumberQhsc: function (value) {
        var obj = {
            '1': '上交所',
            '8': '中金所',
            '220': '中金所',
            '113': '上期所',
            '114': '大商所',
            '115': '郑商所',
            '116': '港交所',
            '142': '上期能源'
        }

        var markentname = '';
        if (value) {
            if (obj[value]) {
                markentname = obj[value];
            } else {
                markentname = '国际期货';
            }
        }

        return markentname;

    },
    /**
     * 用于对比判断色值
     *
     * @param {Number} one 数值1
     * @param {Number} two 数值2
     * @param {String[]} arr 颜色数组
     */
    getColor:function(one,two,arr){
        if(!arr){
            arr = ["red","green"]
        }
        var diff = !!two ? parseFloat(one) - parseFloat(two) : parseFloat(one);
        return !!diff ? (diff == 0 ? '' : diff > 0 ? arr[0] : arr[1]) : '';
    },


    quoteLink: function (code, market) {
        return 'http://quote.eastmoney.com/unify/r/' + market + '.' + code;
    },
    toFixed: function (data, num) {
        if (data === '' || data === undefined || data === null || data === '-' || isNaN(data)) {
            return '-';
        }
        num = isNaN(parseInt(num)) ? 2 : parseInt(num);
        return parseFloat(data).toFixed(num);
    },
    toPercent: function (data,num) {
        if (data === '' || data === undefined || data === null || data === '-' || isNaN(data)) {
            return '-';
        }
        num = isNaN(parseInt(num)) ? 2 : parseInt(num);
        return !isNaN(parseFloat(data)) ? parseFloat(data).toFixed(num) + '%' : '-';
    },
    /**
     * 字符串截取
     *
     * @param {string} txt 输入文本
     * @param {int} n 截取多少个字 一个汉字算2个
     * @param {boolean} needtip 是否需要全文提示
     * @returns
     */
    txtLeft: function (txt, n, needtip) {
        if( txt == null || txt == "" ){
            return "";
        }
        var thislength = 0;
        for (var i = 0; i < txt.length; i++) {
            if (txt.charCodeAt(i) > 255) {
                thislength += 2;
            }
            else {
                thislength++;
            }
            if (thislength > n + 3) {
                if(needtip){
                    return '<span title="' + txt + '">' + txt.substring(0, i) + "...</span>";
                }
                else{
                    return txt.substring(0, i) + "...";
                }
                break;
            }
        }
        return txt;
    }
};