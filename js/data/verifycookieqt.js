var url = "http://localhost/api";
$(function () {
    //发送请求，添加admincookie 这个是后台文件
    function addcookie() {
        $.get({
            url: url+'/addcookie',
            data: {
                admin: 0
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true
        },function (data) {
        })
    }
    addcookie();
})