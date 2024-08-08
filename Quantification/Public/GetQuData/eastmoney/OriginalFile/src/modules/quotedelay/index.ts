/**
 * 行情延迟参数
 */


// wbp2u=UID|用户组织类型|通行证类型|用户交易类型|终端名称（app包名）

// 参数说明：

// 1. 用户UID：登陆用户必须传该数据，未登录则留空
// 2. 用户组织类型是数字：0表示未知（默认），1表示个人用户，2表示机构用户
// 3. 通行证类型是数字：0表示未知（默认），1表示通行证手机号在中国大陆地区，2表示通行证手机号在中国大陆以外地区（包括中国港澳台），3表示通行证没有手机号
// 4. 用户交易类型是数字：0表示未知（默认），1表示非交易用户，2表示交易用户（未登录的交易用户，该数据也必须填2）
// 5. 终端名称（app包名）是字符串：网站填web，wap站填wap，天天基金填ttjj，哈富分享页填hafoo.share，app填包名，其他终端的参数内容可以咨询服务端开发人员

// 注意事项：

// 1. 服务端实现时应当支持后续新参数扩展，每次新增参数都会在结尾用|分隔后新增

import cookie from "../cookie";

var delayparams = 'UID|0|MOBILE|0|web'

if(cookie.get('uidal')){
    delayparams = delayparams.replace('UID', cookie.get('uidal')!.substring(0, 16))
}
else{
    delayparams = delayparams.replace('UID', '')
}

if(cookie.get('mtp') != null){
    if(cookie.get('mtp') == '0'){
        delayparams = delayparams.replace('MOBILE', '3')
    }
    else{
        delayparams = delayparams.replace('MOBILE', cookie.get('mtp')!)
    }
}
else{
    delayparams = delayparams.replace('MOBILE', '0')
}

module.exports = delayparams