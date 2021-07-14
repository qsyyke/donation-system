$(function () {
    //获取所有的input
    var input = $("input");

    //为所有的input监听聚焦事件
    input.focus(function (e) {
        //通过e.target获取其兄弟节点 判断是否是单选按钮
        if (e.target.getAttribute("class") != "in_check") {
            var span = $(e.target).siblings();
            $(span[0]).animate({
                top: '5'
            });
        }
    });

    //为所有的input监听失焦事件
    input.blur(function (e) {
        //通过e.target获取其兄弟节点
        var span = $(e.target).siblings();
        $(span[0]).animate({
            top: '25'
        });
    });

    //验证码  返回来的验证码
    var isSendYZM = false;
    function sendMail() {
        var email_text = document.querySelector(".email").value;
        $.get({
            url: 'http://api.vipblogs.cn/sendmail',
            data: {
                email : email_text
            }
        },function (data) {
            isSendYZM = true;
            $(".vercode").get(0).value = "请检查邮箱";
            setTimeout(function () {
                $(".vercode").get(0).value = '';
            },1000*1.5);
            // yzm_text = data[0]['yzm'];
        });
    }

    var isEmail = true;
    $(document).mousemove(function () {
        var emailText = $(".email").get(0).value;
        if (emailText == "" || emailText.search("@") == -1 || emailText.length < 5) {
            isEmail = false;
        }else {
            isEmail = true;
        }
    });
    //发送邮件email

    $(".send_yzm").click(function () {
        if (isEmail) {
            sendMail();
        }else {
            alert("邮箱有误")
        }
    });

    var butSub = $(".but_sub");
    butSub.click(function () {
        var pwd1 = $(".newpwd").get(0).value;
        var pwd2 = $(".configpwd").get(0).value;
        var emailNeed = $(".email").get(0).value;
        var vercode = $(".vercode").get(0).value;
        //获取密码
        if (isSendYZM) {
            if (pwd1 != pwd2 || pwd1 == "" || pwd2 == "") {
                alert("请正确输入");
            }else {
                $.post({
                    url: "http://api.vipblogs.cn//forget",
                    data: {
                        password: pwd1,
                        email: emailNeed,
                        vercode: vercode
                    }
                });
            }
        }else {
            alert("请发送验证码");
        }
    });
})