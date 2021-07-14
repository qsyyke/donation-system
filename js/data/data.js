//此文件用于展示数据

var url = "http://localhost/";
$(function () {
    (function () {

        //ajax请求数据
        function getData() {

            $.get({
                url: url+'/goods'
            },function (data) {
                var goods = ["现金","防护服","医用口罩","护目镜","隔离衣","喷雾器","红外线体温仪"];
                var list = data['data']['goodsList'];
                var arrList = [];

                for (let i = 0; i < list.length; i++) {
                    arrList.push(list[i][goods[i]]);
                }
                setData(arrList);
            });
        }

        getData();

        setInterval(function () {
            getData();
        },1000*60);

        function setData(arr) {
            //捐款物资展示 获取容器
            var myChart = echarts.init(document.querySelector(".t3"));

            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    top: '10%',
                    right: '3%',
                    left: '15%',
                    bottom: '15%'
                },
                // 一次性医用帽子'
                xAxis: {
                    type: 'category',
                    data: ['现金','防护服','医用口罩','护目镜', '隔离衣','喷雾器','红外线体温仪'],
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,0.12)'
                        }
                    },
                    axisLabel: {
                        color: '#4c9bfd',

                        //更改间距
                        interval: 0,
                        rotate: -40,
                        textStyle: {
                            fontSize: 10
                        },
                    },
                },
                yAxis: {
                    axisLabel: {
                        formatter: '{value}',
                        color: '#4c9bfd',
                    },
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                },
                series: {
                    type: 'bar',
                    data: arr,
                    barWidth: '15',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                // 0% 处的颜色
                                color: 'rgba(0,244,255,1)' 
                            }, {
                                offset: 1,
                                // 100% 处的颜色
                                color: 'rgba(0,77,167,1)' 
                            }], false),
                            barBorderRadius: [30, 30, 30, 30],
                            shadowColor: 'rgba(0,160,221,1)',
                            shadowBlur: 4,
                        }
                    },
                    label: {
                        show: false
                    }
                }
            };
            myChart.setOption(option);
            window.addEventListener("resize",function () {
                myChart.resize();
            })
        }
    })();

    //国内近5天数据速览 获取请求数据
    function get_home_data() {

        //保存日期数组
        var arr_days = [];

        //保存确诊数组
        var arr_sure_cnt = [];

        //保存治愈数组
        var arr_cure = [];

        $.get({
            url: url+'/yq_json'
        },function (data) {

            //这是很多天的数据集合
            var trends = data['trend'];

            //获取最后五6天
            for (let i = trends.length; i >trends.length-6 ; i--) {

                //累计治愈
                var cure_cnt = trends[i-1]['cure_cnt'];

                //日期
                var day = trends[i-1]['day'];

                //确诊
                var sure_cnt = trends[i-1]['sure_cnt'];

                //当前获取前一天数据 累计治愈
                var cure_cnt_pr = trends[i-2]['cure_cnt'];

                //日期
                var day_pr = trends[i-2]['day'];

                //确诊
                var sure_cnt_pr = trends[i-2]['sure_cnt'];

                //计算差值
                var gap_cure = cure_cnt-cure_cnt_pr;
                var gap_sure = sure_cnt-sure_cnt_pr;

                //将数据放入数组中
                arr_days.push(day);
                arr_cure.push(gap_cure);
                arr_sure_cnt.push(gap_sure);
            }
            set_home_data(arr_days,arr_cure,arr_sure_cnt);
        });
    }

    get_home_data();
    function set_home_data(days,cures,sures) {
        var myChart = echarts.init(document.querySelector(".t4"));
        var option = {
            tooltip: {
                trigger: 'axis',
                showContent: true
            },
            grid: {
                left: '22%',
                right: '5%',
                bottom: '12%',
                height: '90%'
            },
            xAxis: {
                type: 'category',
                axisLine: {
                    show: true
                },
                axisLabel: {
                    color: '#4c9bfd'
                },
                splitLine: {
                    //分割线颜色
                    show: false
                },
                axisLine: {
                    //设置坐标轴颜色
                    lineStyle: {
                        color: 'rgba(255,255,255,.6)'
                    }
                },
                boundaryGap: false,
                data: days,
            },

            yAxis: {
                type: 'value',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    color: '#4c9bfd'
                },
                axisTick: {
                    show: false,
                }
            },
            series: [{
                name: '新增治愈',
                type: 'line',
                //是否平滑
                smooth: true, 
                showAllSymbol: true,
                symbol: 'circle',
                symbolSize: 5,
                lineStyle: {
                    //设置线条颜色
                    normal: {
                        color: "#00b3f4"
                    },
                },
                label: {
                    show: false,
                    position: 'top',
                    textStyle: {
                        color: '#00b3f4',
                    }
                },
                itemStyle: {
                    color: "#00b3f4",
                },
                tooltip: {
                    show: true
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(0,179,244,0.3)'
                        },
                            {
                                offset: 1,
                                color: 'rgba(0,179,244,0)'
                            }
                        ], false),
                        shadowColor: 'rgba(0,179,244, 0.9)',
                        shadowBlur: 20
                    }
                },
                data: cures
            },
                {
                    name: '新增确诊',
                    type: 'line',
                    //是否平滑
                    smooth: true, 
                    showAllSymbol: true,
                    symbol: 'circle',
                    symbolSize: 5,
                    lineStyle: {
                        normal: {
                            color: "#00ca95"
                        },
                    },
                    label: {
                        show: false,
                        position: 'top',
                        textStyle: {
                            color: '#00ca95',
                        }
                    },

                    itemStyle: {
                        color: "#00ca95"
                    },
                    tooltip: {
                        show: true
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0,202,149,0.3)'
                            },
                                {
                                    offset: 1,
                                    color: 'rgba(0,202,149,0)'
                                }
                            ], false),
                            shadowColor: 'rgba(0,202,149, 0.9)',
                            shadowBlur: 20
                        }
                    },
                    data: sures,
                },
            ]
        };

        myChart.setOption(option);
        window.addEventListener("resize",function () {
            myChart.resize();
        })
    };
    
    //获取用户的定位省份信息
    function getProvince() {

        //获取IP接口
        var setUrl = "https://restapi.amap.com/v3/ip?output=json&key=e96cc3c79090373d47f28e19c49edc9d";
        
        //城市名
        var ip_city = "";

        //省份名
        var ip_province = "";

        //状态码
        var ip_status = 2;

        //保存省份城市名
        var arr_city = [];

        //保存城市确诊人数
        var arr_confirmed = [];

        //调用异步请求
        $.get({
            url: setUrl
        },function (data) {

            //获取城市名
            ip_city = data['city'];

            //获取省份名
            ip_province = data['province'];

            //获取请求状态 1表示成功
            ip_status = data['status'];

            //判断是否请求成功
            if (ip_status == 1) {

                //请求成功 根据省份获取城市数组  异步请求
                $.get({
                    //获取json接口
                    url: url+'/yq_json'
                },function (data,f) {

                    for (var i = 0; i < data['provinceArray'].length; i++) {
                        var provinceArray = data['provinceArray'];

                        //data['provinceArray']是一个省份数组 获取省份名
                        var childStatistic = provinceArray[i]['childStatistic'];

                        //通过IP获取的省份名进行匹配 省份相同 才将城市加入到数组中
                        if (ip_province == childStatistic) {

                            /*
                            省份相同
                            获取每个省份的城市信息，返回的也是一个数组
                            data['provinceArray'][i]['cityArray']是一个省份的所有城市信息
                            */
                            var cityArray = data['provinceArray'][i]['cityArray'];
                            for (var j = 0; j < cityArray.length; j++) {

                                //循环遍历每个省份的感染信息 获取城市名
                                var city_childStatistic= cityArray[j]['childStatistic'];

                                //将城市不是境外输入 都放入数组
                                if (city_childStatistic == "境外输入") {
                                    continue;
                                }

                                //将城市名放入数组中
                                arr_city.push(city_childStatistic);

                                //获取总确诊人数
                                var city_totalConfirmed = cityArray[j]['totalConfirmed'];

                                //将确证人数放入数组中
                                arr_confirmed.push(city_totalConfirmed);
                            }
                        }
                    }
                    setProvinceData(arr_city,arr_confirmed);
                });
            }
        });
    }
    getProvince();

    // 每个省份疫情数据设置
    function setProvinceData(citys,datas) {

        console.log(citys)

        //打乱数组中的顺序
        for (let i = 0; i < citys.length; i++) {
            if (i == 0) {

                //最后第二个等于第一个 倒数第二个值
                var city_last_two = citys[citys.length -2];
                citys[citys.length -2] = citys[i];
                citys[i] = city_last_two;

                //更改数据 最后第二个等于第一个
                var data_last_two = datas[datas.length -2];//倒数第二个值

                //第一个值为倒数第二个的值
                datas[datas.length -2] = datas[i];
                datas[i] = data_last_two;
            }

            if (i == 3) {
                //最后第5个等于第3个
                var city_last_two = citys[citys.length -5];//倒数第5个值
                citys[citys.length -5] = citys[i];
                citys[i] = city_last_two;

                //更改数据
                //最后第5个等于第3个
                var data_last_two = datas[datas.length -5];//倒数第二个值
                //第一个值为倒数第二个的值
                datas[datas.length -5] = datas[i];
                datas[i] = data_last_two;
            }
        }

        //使用ajax获取每个省份的人数
        var myChart = echarts.init(document.querySelector(".t7"));
        var option = {
            color: ['#00f2f1', '#ed3f35'],
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['确诊人数'],
                show: false,
                textStyle: {
                    color: '#4c9bfd'
                },
                right: '10%'
            },
            grid: {
                left: '3%',
                height: '75%',
                // right: '4%',
                bottom: '20%',
                show: true,// 显示边框
                borderColor: '#012f4a',// 边框颜色
                // borderColor: 'red',// 边框颜色
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: citys,
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: '#4c9bfd',
                    interval: 0,//更改间距
                    inside: false,//标签是否朝内
                    rotate: -35
                },
                axisLine: {
                    show: false,//不显示轴线
                },
                boundaryGap: true  // 去除轴内间距
            },
            yAxis: {
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: '#4c9bfd'
                },
                splitNumber: 15,//坐标轴的分隔段数，根据省份城市个数获得
                minInterval: 2,
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: '#4c9bfd'
                    }
                },
                axisLine: {
                    show: false
                }
            },
            series: [
                {
                    name:'确诊人数',
                    data:  datas,
                    type: 'line',
                    // 折线修饰为圆滑
                    smooth: true,
                }
            ]
        };

        myChart.setOption(option);
        window.addEventListener("resize",function () {
            myChart.resize();
        })
    }
})
