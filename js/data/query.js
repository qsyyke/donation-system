var url = "http://localhost/api";
$(function () {

    var input = $("input");
    var but = $(".myself");
    input.click(function () {
        $(this).focus;
        this.placeholder = "";
    })

    $(document).keydown(function (e) {
        if (e.keyCode == 13) {
            //确定键
            var tradeNo = input.get(0).value;

            if (tradeNo.search("@") == -1) {
                //使用订单号查找
                console.log("不是邮箱")
                window.location.href = "./pershow.html?outTradeNo="+tradeNo;

                return;
            }else {
                window.location.href = "./pershow.html?email="+tradeNo;
                return;
            }
        }
    });

    //如果订单为空
    but.click(function () {
        var tradeNo = input.get(0).value;

        //确定键
        var tradeNo = input.get(0).value;

        if (tradeNo.search("@") == -1) {
            //使用订单号查找
            window.location.href = "./pershow.html?outTradeNo="+tradeNo;
            return;
        }else {
            window.location.href = "./pershow.html?email="+tradeNo;
            return;
        }
    });

})