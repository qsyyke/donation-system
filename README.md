# 简介
本部分页面是前端部分，该系统是一个疫情捐款系统，采用前后端分离的方式，前端使用echarts作为数据展示，能够实时显示疫情数据，用户捐款数据、
已经接入支付宝支付功能，并且在后台能够进行订单查询，退款等操作
后台操作有：
- 用户管理
- 订单管理
- 文件上传管理
- 评论管理
- 留言管理
- 新闻管理
- 抗疫人物管理

前端展示有：
- 首页图表展示
- 捐款页面表单提交
- 用户订单查询
- 用户信息修改
- 评论，留言，疫情最新新闻
- 抗疫英雄人物展示

该项目也部署到服务器，如果感兴趣的话，可以访问下面网址进行查看
- 后台管理<a href="http://admin.vipblogs.cn/index.html">点击访问</a>
- 前台页面<a href="http://yq.vipblogs.cn/">点击访问</a>

# 使用
前端页面数据展示通过ajax向指定接口发送请求，然后动态的将数据添加到页面，所对应的js文件都放在`js/data`目录下
如需使用，请修改每一个js文件的请求接口地址

# 效果展示
## 首页
首页的设计，主要集图表为主，图表能够更直观的反应用户捐款数据，国内疫情变化情况
![](https://vipblogs.cn/wp-content/uploads/2021/07/1.png)


## 抗疫英雄留言，点赞
![](https://vipblogs.cn/wp-content/uploads/2021/07/人物英雄故事.jpg)
![](https://vipblogs.cn/wp-content/uploads/2021/07/山河无恙-幸得有你-最美逆行者-评论.png)
![](https://vipblogs.cn/wp-content/uploads/2021/07/山河无恙-幸得有你-最美逆行者.png)

## 疫情实时播报，留言
![](https://vipblogs.cn/wp-content/uploads/2021/07/留言-幸得有你-山河无恙1.png)

## 捐款字段
![](https://vipblogs.cn/wp-content/uploads/2021/07/捐款字段.png)

## 用户个人捐款页面
![](https://vipblogs.cn/wp-content/uploads/2021/07/个人展示修改.png)

## 后台首页
![](https://vipblogs.cn/wp-content/uploads/2021/07/后台.png)

## 修改抗疫英雄人物信息
![](https://vipblogs.cn/wp-content/uploads/2021/07/英雄.png)

## 用户订单页面
![](https://vipblogs.cn/wp-content/uploads/2021/07/订单.png)

# 接口

接口文档，请查看`接口.md`文件 <a href="https://github.com/qsyyke/javaweb-donation-system/blob/master/%E6%8E%A5%E5%8F%A3.md">点击查看</a>
