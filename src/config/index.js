// 对Date的扩展 将 Date 转化为指定格式的String
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
// 接口地址
var root = 'http://192.168.0.100:8080/mdoa'
//全局的方法
export default {
    //登录后的请求公用方法
    ajax: function (el, url, params, succeed, failure){
        var data = params || {};
        data.sessionId = localStorage.getItem('sessionId') || null;
        $.ajax({
            url: root + url,
            data:data,
            type:"post",
            dataType:"json",
            success:function(data){
                if(data.sessionId){
                    // 若有sessionId，则存于localStorage中
                    localStorage.setItem('sessionId',data.sessionId);
                }
                if(data.success){
                    if(data.returnObj){
                        succeed(data.returnObj)
                    }
                }else{
                    localStorage.removeItem('userName');
                    localStorage.removeItem('password');
                    alert(data.message);
                    el.$router.push({path:'/'});
                }
            }

        })
    }

}