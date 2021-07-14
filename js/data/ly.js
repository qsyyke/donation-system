var url = "http://localhost/api";
$(function () {

    //点击发送留言块
    (function () {
        var button = $(".send_message");
        var textArea = $("textarea");
        var province = "";

        getProvince();
        function getProvince() {
            $.get({
                url: 'https://restapi.amap.com/v3/ip?output=json&key=e96cc3c79090373d47f28e19c49edc9d'
            },function (data) {
                province = data['province'];
            });
        }

        textArea.blur(function () {

            if (textArea.get(0).value == "") {
                button.get(0).disabled = 'disabled';
            }

            if (textArea.get(0).value !="") {
                button.get(0).disabled = false;
            }
        });

        button.click(function () {

            //获取文本域中的文本
            var textValue = textArea.get(0).value;

            $.post({
                // url: "http://api.vipblogs.cn/insertmessage",
                url: url+"/insertmessage",
                data: {
                    message: textValue,
                    province: province
                }
            });

            //将按钮设置为不可点击
            button.get(0).disabled = "disabled";
            textArea.get(0).value = "";
            textArea.get(0).setAttribute("placeholder","再说点什么吧`(〜￣△￣)〜`");
            
            setTimeout(function () {
                button.get(0).disabled = false;
            },1000*3)
        });
    })();

    //显示新闻模块
    (function () {

        //获取日期
        function getMonth(h) {
            var month = new Date().getMonth() +1;

            if (month<10) {
                month = "0"+month;
            }
            return month;
        }

        //昨日动态请求
        function isDayRight() {

            //判断天数是否是1
            var nowDay = new Date().getDate();
            var lastDay;

            if (nowDay == 1) {

                //构造当前日期对象
                var date = new Date();
                var year = date.getFullYear();

                //获取当前月份
                var month = date.getMonth();
                var days;

                if (month == 2) {
                    lastDay = year %4 == 0 ? 29: 28;
                }else if(month == 1 || month == 3 || month == 5 || month == 7 ||month == 8 ||month == 10 ||month == 12){
                    lastDay = 31;
                }else{
                    lastDay = 30;
                }
                return lastDay;
            }else {
                lastDay = new Date().getDate() -1;
                if (lastDay<10) {
                    lastDay = "0"+lastDay;
                }
                return lastDay;
            }
        }

        function isMonthRight() {
            var month;
            if (new Date().getDate() == 1) {
                month = new Date().getMonth();
            }else {
                month = new Date().getMonth()+1;
            }
            if (month < 10) {
                month = "0"+month;
            }
            return month;
        }

        function getThisDay() {
            var day = new Date().getDate();
            if (day<10) {
                day = "0"+day;
            }
            return day;
        }

        //获取今日动态ul
        var today_ul = $(".new1 ul");
        var yes_ul = $(".new2 ul");

        //获取查看更多节点
        var seeMore = $(".seemore");

        //保存今日li节点数组
        var nowDayNewSArr;

        //保存昨日li节点数组
        var yesDayNewsArr;

        //今日数据长度
        var nowDaySize;

        //昨日数据长度
        var yesDaySize;

        //获取新闻集合
        function getNews() {

            //今日动态请求
            $.get({
                url: url+'/news',
                /*data: {
                    day: getThisDay(),
                    year: new Date().getFullYear(),
                    month: getMonth()
                }*/
                data: {
                    /*day: isDayRight(),
                    year: new Date().getFullYear(),
                    month: isMonthRight()*/
                    day: '16',
                    year: '2021',
                    month: '04'
                }
            },function (data) {
                nowDayNewSArr = data['data']['list']['newsList'];
                nowDaySize = nowDayNewSArr.length;
                if (nowDayNewSArr.length > 5) {
                    appendNews(nowDayNewSArr,5,today_ul);
                }else {
                    appendNews(nowDayNewSArr,nowDayNewSArr.length,today_ul);
                }
            });

            //昨日动态请求
            $.get({
                url: url+'/news',
                data: {
                    /*day: isDayRight(),
                    year: new Date().getFullYear(),
                    month: isMonthRight()*/
                    day: '16',
                    year: '2021',
                    month: '04'
                }
            },function (data) {
                yesDayNewsArr =  data['data']['list']['newsList'];
                yesDaySize = yesDayNewsArr.length;
                if (yesDayNewsArr.length > 5) {
                    appendNews(yesDayNewsArr,5,yes_ul);
                }else {
                    appendNews(yesDayNewsArr,yesDayNewsArr.length,yes_ul);
                }
            });
        }
        getNews();

        //追加新闻方法
        function appendNews(newsArr,newsArrLength,parentUl) {

            //每次只能添加5条
            for (let i = 0; i < newsArrLength; i++) {
                //newsArr是一个数组集合
                var newsLi = $("<li><span></span></li>").get(0);
                var divTime = $("<div class=\"time\"></div>").get(0);
                var divTitle = $("<div class=\"title\"></div>").get(0);
                var newsA = $("<a target='_blank' href=\"javascript:;\"></a>").get(0);
                var newsP = $("<p></p>").get(0);

                //设置时间
                divTime.innerText = newsArr[i]['date'];

                //设置标题连接
                newsA.href = newsArr[i]['href'];

                //设置内容
                newsP.innerText = newsArr[i]['title'];

                //追加
                divTitle.appendChild(newsA);
                newsA.appendChild(newsP);

                newsLi.appendChild(divTime);
                newsLi.appendChild(divTitle);

                parentUl.get(0).appendChild(newsLi);
            }
        }

        //计数点击今日动态查看更多的次数
        var clickNowDayCont = 1;

        //计数点击昨日动态查看更多的次数
        var clickYesDayCont = 1;

        //为seeMore绑定事件
        seeMore.click(function () {

            //获取节点类名
            var className = this.parentElement.className;

            if (className == 'new1') {
                //点击的是今日动态
                addLi(nowDayNewSArr,clickNowDayCont,today_ul);
                clickNowDayCont = clickNowDayCont + 1;
            }else {

                //点击的是昨日动态
                addLi(yesDayNewsArr,clickYesDayCont,yes_ul);
                clickYesDayCont = clickYesDayCont + 1;
            }
        });

        //点击将li追加的方法
        function addLi(newsArr,clickCount,parentUl) {
            var moreLength;
            if (clickCount * 5+5 < newsArr.length) {
                //长度没有超过
                moreLength = clickCount *5+5;
            }else {
                //长度超过
                moreLength = newsArr.length;
            }

            //arr为保存的节点数组 每次只能添加5条
            for (let i = clickCount * 5; i < moreLength; i++) {

                //newsArr是一个数组集合
                var newsLi = $("<li><span></span></li>").get(0);
                var divTime = $("<div class=\"time\"></div>").get(0);
                var divTitle = $("<div class=\"title\"></div>").get(0);
                var newsA = $("<a target='_blank' href=\"javascript:;\"></a>").get(0);
                var newsP = $("<p></p>").get(0);

                //设置时间
                divTime.innerText = newsArr[i]['date'];

                //设置标题连接
                newsA.href = newsArr[i]['href'];

                //设置内容
                newsP.innerText = newsArr[i]['title'];

                //追加
                divTitle.appendChild(newsA);
                newsA.appendChild(newsP);

                newsLi.appendChild(divTime);
                newsLi.appendChild(divTitle);

                parentUl.get(0).appendChild(newsLi);
            }
        }
    })();

    //留言块滚动
    (function () {
        function getRandom(min, max) {
            return Math.random() * (max - min) + min;
        }

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
        }

        //定义一个颜色数组
        var yss = ['#8186d5','#83c5be','#fcd5ce','#4ecdc4','#05668d','#3d5a80',
            '#540d6e','#588b8b','#fcf6bd','#a9def9','#f0a6ca','#489fb5','#e4c1f9','#b298dc'];
        //获取ul
        var parent = $(".lylist");

        //使用ajax获取留言信息 ajax获取留言方法
        function getajax() {
            //获取响应的集合

            $.get({
                url: url+"/message"
            },function (data,isOk) {
                if (isOk == 'success') {
                    //获取每一个数组
                    addJ(data);
                }
            })
        }

        getajax();

        //创建新节点
        function addJ(datas) {
            var count = 0;
            var size = datas.length;

            setInterval(function () {
                if (count < size) {
                    cssDh(count,datas[count],size);
                }
                count = count+1;
            },800);
        }

        function cssDh(count,data,size) {
            var div = $("<div></div>");
            div.addClass("move"+count);
            div.addClass("move_div");

            div.get(0).innerText = data['message'];
            parent.get(0).appendChild(div.get(0));
            div.css({
                top: getRandom(0,240),
                right: -1100,
                fontSize: getRandom(14,55),
                color: yss[getRandomInt(0,yss.length)]
            });
            $(".move"+count).animate({
                right: 700
            },1000*10,function () {
                $(this).hide();
            });

            if (count == size-1) {
                getajax();
            }
        }
    })();

    //背景移动
    (function () {
        //获取节点
        var ul = $(".gdbj ul");

        var imgArr = [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
        var liArr = [];
        for (let i = 0; i < imgArr.length; i++) {
            var lis = $("<li><img src=\"./image/img/"+(i+2)+".jpg\" alt=\"\"></li>");
            ul.get(0).appendChild(lis.get(0));
            liArr.push(lis.get(0));
        }
        var lis = $("<li><img src=\"./img/2.jpg\" alt=\"\"></li>");
        ul.get(0).appendChild(lis.get(0));

        $(liArr[0]).addClass("first_div")

        //标志点 true代表是开头
        var flag = true;  

        //启动动画
        function imgAnimate() {

            ul.animate({
                left: -40306
            },1000*250,"linear",function () {
                ul.css({
                    left: 0
                })
            });
            imgAnimate();
        }
        imgAnimate();
    })();
})
