var url = "http://localhost/api";
$(function () {
    var isExists = false;

    //获取img src
    var img = $(".qrimg").get(0);
    var srcs = img.src.split("/");
    var time = srcs[srcs.length-1].split(".")[0];

    //每隔9秒就发送一个请求，查看用户是否付款
    setInterval(function () {
        $.post({
            url: "http://api.vipblogs.cn/mask",
            data: {
                time: time
            }
        },function (data) {
            console.log(data['data']['isExists']);
            if (data['data']['isExists'] == 1) {

                //数据库中存在
                isExists = true;
                $(".mask").addClass("qrm");
                $(".load").add("decr");

                $(".mask").slideDown();
                $(".load").slideDown();

                setInterval(function () {
                    //window.location.href = "./pershow.html?time="+time;
                    window.location.href = "./pershow.html?time="+time;
                },1000*3)
            }
        });
    },1000*2.5);
})