var utils = require('./modules/utils');

/**
 * 获取url参数
 * @param {string} variable 参数名
 */
function getQueryString(variable) {
    try {
        var query = window.location.search.substring(1);
        // var query = window.location.url
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return false;
    } catch (error) {
        return false;
    }
}


module.exports = {
    "development":{
        commonApi:"//push2.eastmoney.com/",
        tsApi:"//"+(Math.floor(Math.random() * 99) + 1)+".push2.eastmoney.com/"
    },
    "production":{
        commonApi:"//push2.eastmoney.com/",
        tsApi:"//"+(Math.floor(Math.random() * 99) + 1)+".push2.eastmoney.com/"
    },
    "test":{
        // commonApi:"http://61.129.249.233:18665/",
        // tsApi:"http://61.129.249.233:18665/"
        commonApi:"//push2test.eastmoney.com/",
        tsApi:"//push2test.eastmoney.com/"
    },
    getEnvPath:function(name,value){

        //特殊情况设置默认值
        if(!!value){
            return value;
        }
        //防止名称误传
        if(!this.production[name]){
            return this.production.commonApi
        }
        //根据参数hq-env值，来区分环境
        var env = getQueryString("hq-env");
        // console.log("env:"+env)
        if(!env){
            return this.production[name] || "";
        }
        if(env === "development" || env === "production" || env === "test" ){
            return this[env][name]
        }else{
            return  this.production[name] || "";
        }
    }
}