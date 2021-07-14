//此文件用于echarts之外的元素修改
var url = "http://localhost/";
$(function () {
    //手机访问
    (function () {
        let width = window.screen.width;
        if (width< 1000) {
            if (confirm("为了您更好的体验，请使用PC端进行访问")){
                window.location.href = "./donateshow.html";
            }
        }
    })();

    // 时间更新
    (function () {

        // 格式： 当前时间：2020年3月17-0时54分14秒
        var t = null;
        t = setTimeout(time, 1000);//开始运行

        function time() {
            clearTimeout(t);//清除定时器
            dt = new Date();
            var y = dt.getFullYear();
            var mt = dt.getMonth() + 1;
            var day = dt.getDate();
            var h = dt.getHours();//获取时
            var m = dt.getMinutes();//获取分
            var s = dt.getSeconds();//获取秒
            document.querySelector(".showTime").innerHTML = '当前时间：' + y + "年" + mt + "月" + day + "-" + h + "时" + m + "分" + s + "秒";
            t = setTimeout(time, 1000); //设定定时器，循环运行
        }
    })();

    (function () {
        //修改国内疫情数据 获取累计确诊节点
        var totalConfirmed_p = $(".confirmed");
        var totalCured_p = $(".cured");

        //定时器没开启 先向后台请求数据
        function getData() {
            $.get({
                url: url+"/yq_json"
            },function (data) {

                //获取数据 总确诊人数
                var totalConfirmed = data['country']['totalConfirmed'];

                //总治愈人数
                var totalCured = data['country']['totalCured'];

                //修改数据
                totalConfirmed_p.get(0).innerText = totalConfirmed;
                totalCured_p.get(0).innerText = totalCured;
            });
        }

        getData();

        //定时器，每两小时请求一次
        setInterval(function () {
            $.get({
                url: url+"/yq_json"
            },function (data) {
                //获取数据 总确诊人数
                var totalConfirmed = data['country']['totalConfirmed'];

                //总治愈人数
                var totalCured = data['country']['totalCured'];

                //修改数据
                totalConfirmed_p.get(0).innerText = totalConfirmed;
                totalCured_p.get(0).innerText = totalCured;
            });
        },1000*60);
    })();

    //总捐款人数
    (function () {
        var totalMoney = $(".totalMoney").get(0);
        var totalPeople= $(".totalPeople").get(0);

        function getData() {
            $.get({
                url: url+'/donatecount'
            },function (data) {

                totalPeople.innerText = data['data']['entity']['donateList'].length;
                totalMoney.innerText = data['data']['totalMoney'];
            })
        }

        getData();

        //每隔3秒请求一次
        setInterval(function () {
            getData();
        },1000*60)
    })();
})



