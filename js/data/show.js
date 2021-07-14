var url = "http://localhost/api";
$(function () {
    //ul
    var ul = document.querySelector(".listul");

    //ajax
    $.get({
        url: url+'/dlist'
    },function (data) {
        var arrList = data['data']['entity']['donateList'];
        addList(arrList);
    })

    function addList(list) {

        for (let i = 0; i < list.length; i++) {
            var lis = $("<li></li>");
            var li = lis.get(0);

            var bhs = $("<div class=\"left\"></div>");
            var bh = bhs.get(0);

            var centers = $("<div class=\"center\"></div>");
            var center = centers.get(0);

            var center_heads = $(" <div class=\"headportrait\"></div>");
            var center_head = center_heads.get(0);

            var center_head_imgs = $("<img src=\"http://api.vipblogs.cn/avatar?"+i+"\" alt=\"\">");
            var center_head_img = center_head_imgs.get(0);

            var center_decrs = $("<div class=\"decr\"></div>");
            var center_decr = center_decrs.get(0);

            var center_decr_users = $("<div class=\"user\"></div>");
            var center_decr_user = center_decr_users.get(0);

            var center_decr_times = $("<div class=\"time\"></div>");
            var center_decr_time = center_decr_times.get(0);

            var rights = $("<div class=\"right\"></div>");
            var right = rights.get(0);

            var right_moneys = $("<div class=\"money\"></div>");
            var right_money =  right_moneys.get(0);

            var right_provinces = $("<div class=\"province\"></div>");
            var right_province = right_provinces.get(0);

            bh.innerText = i+1;

            //用户名
            center_decr_user.innerText = list[i]['username'];

            //时间
            center_decr_time.innerText = list[i]['createDate'];

            //金额
            right_money.innerText = list[i]['tradeMoney'];

            //省份
            right_province.innerText = list[i]['userprovince'];

            //追加 中间
            center_head.appendChild(center_head_img);

            center_decr.appendChild(center_decr_user);
            center_decr.appendChild(center_decr_time);

            center.appendChild(center_head);
            center.appendChild(center_decr);

            //右边
            right.appendChild(right_money);
            right.appendChild(right_province);

            //总的
            li.appendChild(bh);
            li.appendChild(center);
            li.appendChild(right);

            ul.appendChild(li);
        }
    }
})