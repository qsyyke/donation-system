var url = "http://localhost/api";
$(function () {
    // 英雄人物页面

    // 点击查看评论
    $(document).delegate(".content_input", 'click', function () {

        $(".mscontent").get(0).innerText = "";
        var identify = this.getAttribute("data-indenify");
        $(".send").get(0).setAttribute("data-identify",identify);

        $.get({
            url: url+'/herocommentallbysql'
        },function (data) {
            var commentArr = data['data']['entity']['userList'];

            for (let i = 0; i < commentArr.length; i++) {
                if (commentArr[i]['identify'] == identify) {
                    setComment(commentArr[i]);
                }
            }
        })

        var chat = $(".chat");
        chat.stop().fadeToggle(500);
    })

    // 关闭评论板
    $(document).delegate(".off", 'click', function () {
        $("textarea").get(0).value = "";
        var chat = $(".chat");
        chat.stop().fadeToggle(500);
    })

    //点击发送评论
    $(".send").click(function(){
        
        //不含最大值，含最小值
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; 
        }

        var identify = this.getAttribute("data-identify");
        var uid = getRandomInt(10,2147483647);
        var content = $(".sendms textarea").get(0).value;

        $.get({
            url: url+'/commentinsert',
            data: {
                uid: uid,
                identify: identify,
                content: content
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true
        },function (data) {

            if(data['data']['entity']['update'] == 1) {

                //插入成功
                var commentObj = {
                    identify: identify,
                    cname: data['data']['entity']['username'],
                    ccontent: content,
                    cdate: data['data']['entity']['cdate'],
                }
                
                setComment(commentObj);
            }
        })
    })

    $(document).delegate(".name", 'click', function () {

        var targetName = this.children[0].innerText;
        var identifydiv = $(this).siblings()[2];

        var identify = identifydiv.getAttribute("data-identify");
        var describe = identifydiv.innerHTML;
        console.log(identifydiv.innerHTML);
        var honors = identifydiv.getAttribute("data-escribe");

        var honorsArr = honors.split(",");

        var honorul = $(".honorul").get(0);
        for (let i = 0; i < honorsArr.length; i++) {
            if (honorsArr[i] != "") {
                var li = $("<li>"+honorsArr[i]+"</li>").get(0);
                honorul.appendChild(li);
            }
        }

        //描述上面的头像
        var avatar = $(".avatar img").get(0);

        var a = $(this).siblings()[0].getAttribute("href");
        avatar.src = a;

        var heroname = $(".wish span").get(0);
        heroname.innerText = this.innerText;

        var discribe_html = $(".discribe").get(0);
        discribe_html.innerHTML = describe;

        $(".story").stop().fadeIn(650);
    })

    $(document).delegate(".story", 'click', function () {
        $(".story").stop().fadeOut(350);
    })

    $(document).delegate(".like", 'click', function () {
        var identDiv = $(this).parent().siblings();
        var identify = identDiv[2].getAttribute("data-identify");

        var id = this.getAttribute("id");

        for (let i = 0; i < $(".like").length; i++) {
            $($(".like")[i]).removeClass("clicking");
            if (i == $(".like").length -1) {
                $(this).addClass("clicking");
            }
        }

        var likeNum = Number($(".clicking").get(0).innerText);
        if (id == "likeactive") {

            //减赞
            $.get({
                url: url+'/likeinsert',
                data: {
                    identify: identify,
                    like: -1,
                    isLike: 0
                },
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true
            },function (data) {
                if (data['data']['entity']['update'] == 1) {
                    $(".clicking").get(0).setAttribute("id","");
                    $(".clicking span").get(0).innerText = likeNum-1;
                }
            })
        }else {
            $.get({
                url: url+'/likeinsert',
                data: {
                    identify: identify,
                    like: 1,
                    isLike: 1
                },
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true
            },function (data) {
                if (data['data']['entity']['update'] == 1) {
                    $(".clicking").get(0).setAttribute("id","likeactive");
                    $(".clicking span").get(0).innerText = likeNum+1;
                }
            })
        }
    })

    var mscontent = $(".mscontent").get(0);

    //查看用户评论
    function setComment(o) {
        var top2 = $("<div class=\"chatms\"></div>").get(0);
        var one = $("<div class=\"left\"><img src=\"http://api.vipblogs.cn/avatar?time="+(Math.random()*Math.random()*Math.random())+"\" alt=\"\"></div>").get(0);
        var two = $("<div class=\"top\"><span>"+o['cname']+"</span><span>"+o['cdate']+"</span></div>").get(0);
        var tree = $("<div class=\"botms\">"+o['ccontent']+"</div>").get(0);

        top2.appendChild(one);
        top2.appendChild(two);
        top2.appendChild(tree);
        mscontent.appendChild(top2);
    }

    //设置是否点赞
    function setLike() {

        var like = $(".like");
        console.log("=====dfg========dfg============");
        console.log(like);
        console.log("=====dfg======dfg===============");

        $.get({
            url: url+'/likeall',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true
        },function (data) {
            var commentArr = data['data']['entity']['userList'];
            console.log(commentArr);
            if(commentArr.length != 0) {
                for (let i = 0; i < like.length; i++) {
                    var identify = like[i].getAttribute("data-identify");

                    for (let j = 0; j < commentArr.length; j++) {
                        if (commentArr[j]['identify'] == identify && commentArr[j]['islike'] == 1) {
                            like[i].setAttribute("id","likeactive");
                        }
                    }
                }
            }  
        })
    }


    var nav = $(".nav");

    function setTopElement(obj) {
        var title = "";

        if (obj.length >0) {
            title = obj[0]['trade'];
        }
        var top = $("<div class=\"trade\"></div>").get(0);
        var one = $("<div class=\"head\"><h1>"+title+"</h1></div>").get(0);
        var two_ul = $("<ul class='setroll'></ul>").get(0);

        for (let i = 0; i < obj.length; i++) {
            var li = $("<li></li>").get(0);
            var name = $("<div class=\"name\"><span>"+obj[i]['heroname']+"</span></div>").get(0);

            var imgSrc = "";
            if (obj[i]['photosrc'] == "") {
                imgSrc = "http://api.vipblogs.cn:8080/image/upload/yq.jpg";
            }else {
                imgSrc = obj[i]['photosrc'];
            }

            var honors = "";
            for (let j = 0; j < 7; j++) {
                honors = honors+obj[i]['honor'+(j+1)]+",";
            }

            var likeNum = obj[i]['h_like'];
            if(likeNum == null) {
                likeNum = 0;
            }

            var img = $("<a data-fancybox=\"gallery\" href=\""+imgSrc+"\"><img src=\""+imgSrc+"\" alt=\"\"></a>").get(0);

            var dz = $("<div class=\"ms\"> <div class=\"comment\"> <input data-indenify=\""+obj[i]['identify']+"\" class=\"content_input\" placeholder=\"发布评论\" type=\"text\"></div></div>").get(0);

            var like = $("<div data-identify=\""+obj[i]['identify']+"\" class=\"like\"><span>"+likeNum+"</span></div>").get(0);

            var noneed = $("<div class=\"identify\" data-identify=\""+obj[i]['identify']+"\" data-escribe=\""+honors+"\" style=\"display: none;\">"+obj[i]['h_describe']+"</div>").get(0);
            dz.appendChild(like);

            li.appendChild(name);
            li.appendChild(img);
            li.appendChild(dz);
            li.appendChild(noneed);

            two_ul.appendChild(li);
        }

        top.appendChild(one);
        top.appendChild(two_ul);
        nav.get(0).appendChild(top);
    }

    $.get({
        url: url+"/herotypes",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true
    },function (data) {

        //栏目数组
        var typeArr = data['data']['entity']['list'];

        //请求所有人物数组
        $.get({
            url: url+"/heroallcountbysql",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true
        },function (data) {

            //保存所有英雄数组
            var heroArr = data['data']['entity']['userList'];

            for (let i = 0; i < typeArr.length; i++) {
                var queryArr = [];
                for (let j = 0; j < heroArr.length; j++) {
                    //判断编号是否相同
                    if (typeArr[i]['pno'] == heroArr[j]['ptype']) {
                        queryArr.push(heroArr[j])
                    }
                }

                //在此处调用方法
                if (queryArr.length != 0) {
                    setTopElement(queryArr)
                }
                var ul = document.getElementsByClassName("setroll");
                setScroll(ul);

                //点击点赞
                var like = document.getElementsByClassName("like");
                
            }
        })

    })

    function setScroll(note) {
        $(note).niceScroll({
            //#CC0071 光标颜色
            cursorcolor: "#ccc",

            //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
            cursoropacitymax: 0, 

            //使光标拖动滚动像在台式电脑触摸设备
            touchbehavior: false, 

            //像素光标的宽度
            cursorwidth: "5px", 

            // 	游标边框css定义
            cursorborder: "0", 

            //以像素为光标边界半径
            cursorborderradius: "5px",

            //是否隐藏滚动条
            autohidemode: false 
        });
    }

    setScroll(".story");
    setScroll(".mscontent");
    setScroll(".honors");

    //在此处调用点赞设置
    setTimeout(function (params) {
        setLike();
    },1000)

})
