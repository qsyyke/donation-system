$(function () {

    function disabled_button() {
        $("#but_sub").get(0).disabled = "disabled";
        setTimeout(function () {
            $("#but_sub").get(0).disabled = false;
        },1000*2)
    }

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

    //表单验证
    var emailFlag = true;

    //是否发送了验证码
    var isSendYZM = false;

    //获取邮箱表单
    var email = document.querySelector(".email");

    //获取值
    $(document).mousemove(function () {
        if (email.value.search("@") == -1) {
            emailFlag = false;
            return

        }else {
            emailFlag = true;
            return;
        }
    });

    $(email).focus(function () {
        this.value = "";
        emailFlag = false;
    });

    //验证码  返回来的验证码
    function sendMail() {
        var email_text = document.querySelector(".email").value;

        $.get({
            url: 'http://api.vipblogs.cn/sendmail',
            data: {
                email : email_text
            }
        },function (data) {
            isSendYZM = true;
            alert("请检查邮箱");
        });
    }

    //发送邮件email
    $(".send_yzm").click(function () {
        if (emailFlag) {
            sendMail();
        }
    });

    function formSend(url,getName,getEmail,getYZM,getPWD) {
        $.post({
            url: url,
            data: {
                username: getName,
                email: getEmail,
                verCode: getYZM,
                password: getPWD,
            }
        });
    }

    function alert_mu(ms) {
        alert(ms);
    }

    $("#but_sub").mousemove(function () {

        if (!emailFlag) {
            //邮箱不正确
            alert_mu("请正确填写邮箱");
            disabled_button();
            return;
        }

        if (!isSendYZM) {
            alert_mu("请发送验证码");
            disabled_button();
            return;
        }
    });

    //提交发送请求
    $("#but_sub").click(function () {

        //获取用户名
        var getName = $(".username").get(0).value;

        //获取邮箱
        var getEmail = $(".email").get(0).value;

        //获取密码
        var getPWD= $(".mm").get(0).value;

        //获取yzm
        var getYZM= $(".write_yzm").get(0).value;

        var innerHtml = $("#but_sub").get(0).innerHTML;

        //注&nbsp;&nbsp;&nbsp;册 登&nbsp;&nbsp;&nbsp;录
        if (innerHtml == "登&nbsp;&nbsp;&nbsp;录") {
            //登录
            formSend("http://api.vipblogs.cn/clogin",getName,getEmail,getYZM,getPWD);
        }
    });

    //小眼睛部分 点击显示 
    var yj = $(".yj_pwd"); 

    //设置一个标志点  true为显示 false为隐藏
    var flag_yj = true;

    yj.click(function(){

        //判断标志点
        if(flag_yj) {

            //当前为隐藏 需要显示  更改样式
            $("input").get(1).type = 'text';
            yj.get(0).style.backgroundPosition = '0px -423px';

            //更改标志点
            flag_yj = false;
        }else {
            //当前为显示 需要隐藏  更改样式
            $("input").get(1).type = 'password';
            yj.get(0).style.backgroundPosition = '0px -445px';

            //更改标志点
            flag_yj = true;
        }
    });

    // 忘记密码部分
    var forget = document.querySelector(".forget");

    forget.onclick = function(){
        window.location.href = "../../login/forget.html"
    }

    // 点击注册部分
    var but_register = document.querySelector(".but_register");

    but_register.onclick = function(){
        emailFlag = false;
        isSendYZM = false;

        // 显示邮箱
        $(".yx").slideDown();

        // 更改按钮
        $("#but_sub").get(0).innerHTML = "注&nbsp;&nbsp;&nbsp;册";

        // 更改点击注册 显示点击登录
        $(".but_log_f").show();
        $(".but_register").hide();
    }

    // 点击登录
    $(".but_log_f").click(function(){
        emailFlag = false;

        // 隐藏邮箱
        $(".yx").slideUp();

        // 显示密码框
        $(".mm_div").slideDown();
        $("#but_sub").get(0).innerHTML = "登&nbsp;&nbsp;&nbsp;录";

        // 隐藏点击登录
        $(this).hide();
        
        //显示点击注册
        $(".but_register").show();
    });
})