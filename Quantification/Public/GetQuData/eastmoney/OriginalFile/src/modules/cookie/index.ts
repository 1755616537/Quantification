/**
 * 浏览器操作cookie
 */

export default {
    /**
     * 获取cookie
     * @param name cookie名称
     */
    get(name:string) {
        var xarr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (xarr != null)
            return decodeURIComponent(xarr[2]);
        return null;
    },
    /**
     * 设置cookie
     * @param key cookie名称
     * @param value cookie的值
     * @param expiredays 过期时间（天）
     * @param domain cookie的domain
     */
    set(key:string,value:string,expiredays?:number,domain?:string){
        var cookiestr = key + "=" + escape(value)

        if (expiredays != undefined) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + expiredays);
            cookiestr += ";expires=" + exdate.toUTCString()
        }
        if (domain != undefined) {
            cookiestr += ";domain=" + domain
        }
        cookiestr += ';path=/'
        document.cookie = cookiestr

    },
    /**
     * 删除cookie
     * @param key cookie名称
     * @param domain cookie的domain
     */
    del(key:string, domain?:string) {
        var exdate = new Date((new Date).getTime() - 1);
        if (domain) {
            document.cookie = key + '=;path=/;expires=' + exdate.toUTCString() + ';domain=' + domain;
        }
        else{
            document.cookie = key + '=;path=/;expires=' + exdate.toUTCString();
        }

    }
}