var url = "http://localhost/api";
$(function () {

    //根据时间或者是商户订单号获取用户数据
    (function () {

        var lengthAll = 0;

        //li节点
        var li = $("li div");
        //获取参数
        var href = window.location.href;

        var parameter = href.split("?")[1];

        if (href.split("?")[1] == undefined) {
            if (confirm("请先进行查询")) {
                window.location.href = "/query.html";
                return;
            }else {
                window.location.href = "/index.html";
                return;
            }
        }

        //添加和设置节点的innerText
        function setDate(arrList,i) {

            var nav = $("<div class='nav'></div>").get(0);
            nav.setAttribute("id","nav"+i);

            var header = $("<div class='header'></div>").get(0);
            var header_fir = $("<div class='avatar'></div>").get(0);
            var header_fir_img = $("<img src=http://api.vipblogs.cn/avatar?"+(+new Date())+"' alt='avatar'>").get(0);
            var header_two = $("<div class='wish'></div>").get(0);
            var header_two_span = $("<span></span>").get(0);
            var header_two_edit = $("<div class=\"edit\">edit</div>").get(0);

            header_fir_img.setAttribute("id","img"+i);

            var section = $("<section class=\"mainbox\"></section>").get(0);
            var section_fir = $("<div class='random'></div>").get(0);
            var section_ul = $("<ul></ul>").get(0);

            section_fir.setAttribute("id","random"+i);

            var li1 = $("<li></li>").get(0);
            var li2 = $("<li></li>").get(0);
            var li3 = $("<li></li>").get(0);
            var li4 = $("<li></li>").get(0);
            var li5 = $("<li></li>").get(0);

            var li_fir1 = $("<div></div>").get(0);
            var li_fir2 = $("<div></div>").get(0);
            var li_fir3 = $("<div class=\"email_div\"></div>").get(0);
            var li_fir4 = $("<div></div>").get(0);
            var li_fir5 = $("<div></div>").get(0);

            var section_three = $("<div class='goods'></div>").get(0);
            var section_three_fir = $("<p class=\"me\">我希望将此现金捐到</p>").get(0);
            var section_three_two = $("<p class='province'></p>").get(0);
            var section_three_three = $("<p class='make'>用于购买</p>").get(0);
            var section_three_four = $("<p class=\"make\"></p>").get(0);

            //数据才一条，就进行
            var nav_id = nav.id;

            var section_four = $("<div class='footer'></div>").get(0);

            if (nav_id == "nav0") {
                //只给nav中id为1的添加播放器
                var audio = $("<audio src=\"http://yq.vipblogs.cn/mp3/why.mp3\" preload=\"auto\" preload=\"auto\" controls autoplay loop></audio>").get(0);
                section_four.appendChild(audio);

            }

            //添加innerText
            header_two_span.innerText = arrList['name'];

            //金额
            li_fir1.innerText = "金  额: "+arrList['money'];

            //账户
            li_fir2.innerText = "账  户: "+arrList['count'];

            //邮箱
            li_fir3.innerText = "邮  箱: "+arrList['email'];

            //订单号
            li_fir4.innerText = "订  单: "+arrList['tradeNo'];

            //时间
            li_fir5.innerText = "日  期: "+arrList['date'];

            //wishGoods
            section_three_two.innerText = arrList['province'];

            section_three_four.innerText = arrList['goods'];

            //追加第一层
            header_fir.appendChild(header_fir_img);
            header_two.appendChild(header_two_span);
            header_two.appendChild(header_two_edit);

            header.appendChild(header_fir);
            header.appendChild(header_two);

            //追加第二层
            li1.appendChild(li_fir1);
            li2.appendChild(li_fir2);
            li3.appendChild(li_fir3);
            li4.appendChild(li_fir4);
            li5.appendChild(li_fir5);

            section_ul.appendChild(li1);
            section_ul.appendChild(li2);
            section_ul.appendChild(li3);
            section_ul.appendChild(li4);
            section_ul.appendChild(li5);

            section_three.appendChild(section_three_fir);
            section_three.appendChild(section_three_two);
            section_three.appendChild(section_three_three);
            section_three.appendChild(section_three_four);

            section_ul.appendChild(section_three);

            $.get("http://api.vipblogs.cn/rm",function (data) {
                section_fir.innerText = data;
            })

            section.appendChild(section_fir);
            section.appendChild(section_ul);
            section.appendChild(section_three);
            section.appendChild(section_four);

            nav.appendChild(header);
            nav.appendChild(section);

            $("body").get(0).appendChild(nav);
        }

        //绑定节点.on("点击事件名",["选择器"],function(){执行函数});
        //随机一言

        function setMessage(randomMessage) {
            $.get({
                url: 'http://api.vipblogs.cn/rm?time='+(+new Date())
            },function (data) {
                randomMessage.innerText = data;
            })
        }

        function getAvatar(img) {
            img.src = "http://api.vipblogs.cn/avatar?time"+(+new Date());
        }

        //参数正确 请求
        $.get({
            url: url+'/pershow?'+parameter,
        },function (data) {

            //获取数据
            var arrList = data['data']['tradeList'][0];

            var arr = data['data']['tradeList'];
            lengthAll = arr.length;

            for (let i = 0; i < lengthAll; i++) {
                $('body').delegate('#random' + i, 'click', function () {
                    setMessage($('#random' + i).get(0));
                });

                $(document).delegate("#nav" + i, 'click', function () {

                    getAvatar($("#img" + i).get(0));
                })
            }

            if (arr.length == 0) {
                if (confirm("您的订单未存在，请重试")) {
                    //点击是 页面定位到查询
                    window.location.href = './query.html';
                    return;
                }else {
                    //点击是否 页面回到捐款展示
                    window.location.href = './donateshow.html';
                    return;
                }
            }

            for (let i = 0; i < arr.length; i++) {
                setDate(arr[i],i);
            }
            $('audio').audioPlayer();

            //edit_div
            var edit_div = $(".edit_div");

            var edit_but = $("#edit_but");

            var edit = $(".edit");

            var userInput = $(".edit_user_input");

            var emailInput = $(".edit_email_input");

            var oldUser = $(".wish span");

            var oldEmail = $(".email_div");

            var arr = oldEmail.get(0).innerText.split(": ");

            edit.click(function () {

                edit_div.stop().slideToggle();
            });
            edit_but.click(function (e) {

                var user_text = userInput.get(0).value;
                var email_text = emailInput.get(0).value;
                if (userInput.get(0).value == "") {
                    edit_but.get(0).disabled = "disabled";
                    alert("用户名不能为空");
                    resetButton();
                    return;
                }

                if (emailInput.get(0).value != "" && emailInput.get(0).value.search("@") == -1) {
                    edit_but.get(0).disabled = "disabled";
                    alert("邮箱不合法");
                    resetButton();
                    return;
                }

                var emailFlag = "";
                if (email_text == "") {
                    emailFlag = arr[1];
                }else {
                    emailFlag = email_text;
                }

                if (confirm("将用户名修改为: '"+user_text+"' 邮箱修改为: '"+emailFlag+"'")) {
                    $.get({
                        url: url+'/upuser',
                        data: {
                            newUsername: user_text,
                            oldUsername: oldUser.get(0).innerText,
                            newEmail: emailFlag,
                            oldEmail: arr[1]
                        }

                    },function (data) {
                        var isUserEx = data['data']['entity']['userExists'];
                        var update = data['data']['entity']['update'];

                        if (isUserEx == 1) {
                            alert("该用户名已存在");
                            return;
                        }

                        if (update == 0) {
                            alert("修改失败");
                            return;
                        }else {
                            alert("修改成功");

                            for (let i = 0; i < oldUser.length; i++) {
                                oldUser.get(i).innerText = data['data']['entity']['newUsername'];
                                oldEmail.get(i).innerText = "邮  箱: "+data['data']['entity']['newEmail'];
                            }
                        }
                    });
                }
            });

            function resetButton() {
                setTimeout(function () {
                    edit_but.get(0).disabled = false;
                },1000*3)
            }
        })
    })();
});