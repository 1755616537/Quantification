module.exports = {

    objToPars: function(data){
        var arr = [];
        for (var key in data) {
            arr.push(key + "=" + data[key]);
        }
        return arr.join("&");
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