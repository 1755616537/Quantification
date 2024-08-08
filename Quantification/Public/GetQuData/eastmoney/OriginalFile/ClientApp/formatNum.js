module.exports = function formatNum(num) {
    if (num == 0) {
        return num
    }
    if (num == undefined || num == '' || isNaN(num)) {
        return '';
    }

    var hz = '';
    if (num >= 100000000 || num <= -100000000) {
        num = num / 100000000;
        hz = '亿';
    } else if (num >= 10000 || num <= -10000) {
        num = num / 10000;
        hz = '万';
    } else {
        return num;
    }

    var num2 = num.toFixed(2);

    // if(parseInt(num) >= 1000){ //整数部分超过4位
    //   num2 = num.toFixed(1);
    // }

    return num2.toString() + hz;
}