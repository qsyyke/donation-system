var url = "http://localhost/api";
$(function () {

    // 省市联动
    (function () {
        $(function () {
            $('.target').distpicker();
        });
    })();

    (function () {

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
    })();

    //用户名和地址
    (function () {
        var $email = $(".email");

        var $userDiv = $(".userdiv");

        var $userProvince = $(".userprovince");

        var userIsExists = false;
        var userExistNum = 0;

        $(".username_input").blur(function () {
            //用户名输入框失去焦点
            var userText = $(".username_input").get(0).value;

            //发送请求
            $.get({
                url: url+'/queryuser',
                data: {
                    username: userText
                },
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true
            },function (data) {
                var userDbExists = data['data']['entity']['isExists'];

                if (userExistNum != 1) {
                    if (userDbExists == 1 && userExistNum != 1) {
                        $("#but_sub").get(0).disabled = 'disabled';
                        alert("用户名已存在");
                        resetButton();
                    }
                }
            });
        });

        //邮箱获得焦点
        $email.focus(function () {
            $userDiv.slideUp();
            $(".username_input").get(0).value = "";
            $(".username_input").get(0).readOnly = false;
        });

        $email.blur(function () {
            //发送请求
            $.post({
                url: url+'/userexists',
                data: {
                    email: $email.get(0).value
                },
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true
            },function (data) {

                //根据邮箱判断用户是否错存在
                userExistNum = data['data']['entity']['exists'];

                if (data['data']['entity']['exists'] == 1) {
                    var username = data['data']['entity']['userList'][0]['username'];

                    $(".username_input").get(0).value = username;
                    $(".username_input").get(0).readOnly = "readOnly";

                    $userDiv.slideDown();
                    $userProvince.slideUp();

                    $(".uprovince").get(0).disabled = "disabled";
                    $(".ucity").get(0).disabled = "disabled";
                    $(".acrea").get(0).disabled = "disabled";

                    return;
                }else {
                    $(".uprovince").get(0).disabled = false;
                    $(".ucity").get(0).disabled = false;
                    $(".acrea").get(0).disabled = false;

                    //用户名未存在 显示用户省份
                    $userProvince.slideDown();
                    $userDiv.slideDown();
                }
            });
        });
    })();

    //表单验证 获取邮箱表单 标志点
    var emailflag = false;
    var email = document.querySelector(".email");

    //获取值
    $(email).blur(function () {
        if (email.value.search("@") == -1 || email.value.length <6) {
            alert("请正确输入邮箱号");
            emailflag = false;
        }else {
            emailflag = true;
        }
    });

    //验证码 标志点
    var codeFlag = false;
    var yzm_text = '';

    //发送邮件email
    $(".send_yzm").click(function () {
        if (!emailflag) {

            //邮箱错误
            alert("请正确填写邮箱");
            return;
        }

        //邮箱正确
        var email_text = document.querySelector(".email").value;
        $.post({
            url: url+'/sendmail',
            data: {
                email : email_text,
                donate: +new Date()
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true
        },function (data) {
            codeFlag = true;
            alert("已发送至邮箱");
            yzm_text = data['data']['verCode'];
        });
    });

    $(".money_input").click(function () {
        $(this).focus();
        this.placeholder = "";
    });

    //获取用户输入的金额
    var money_input = 0;

    $(".money_input").mousemove(function () {
        money_input = $(".money_input").get(0).value;
    });

    function resetButton() {
        setTimeout(function () {
            $("#but_sub").get(0).disabled = false;
        },1000*2);
    }

    //提交发送请求
    $("#but_sub").click(function () {

        if ($(".username_input").get(0).value == "") {
            $("#but_sub").get(0).disabled = 'disabled';
            alert("用户名不能为空");
            resetButton();
            return;
        }

        if (!codeFlag) {
            $("#but_sub").get(0).disabled = 'disabled';
            resetButton();
            alert("验证码未发送");
            return;
        }
        if (money_input <= 0 || money_input >= 1000000000) {
            $("#but_sub").get(0).disabled = 'disabled';
            resetButton();
            alert("金额有误");
            return;
        }

        //获取输入的验证码
        var verCodeText = document.querySelector(".write_yzm").value;

        if (yzm_text == verCodeText) {
            window.location.href = "http://api.vipblogs.cn/donatepay?totalAmount="+money_input+"";
            // window.location.href = "http://localhost/donatepay?totalAmount="+money_input+"";
        }else {
            $("#but_sub").get(0).disabled = 'disabled';
            resetButton();
            alert("验证码错误");
            return;
        }
    });
})