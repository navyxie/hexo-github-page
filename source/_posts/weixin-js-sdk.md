---
title: weixin-js-sdk
categories:
  - null
date: 2016-05-05 13:05:45
tags: ['微信','js-sdk','工具']
photos:
description:
---

## 微信web开发者工具

在调试js-sdk api showMenuItems 时存在bug，不按预期执行（本想只显示发送给朋友和分享到朋友圈选项，结果显示所有的选项），部署到真实环境是正常的。

OS：MacBook Pro (10.11.4)
微信web开发者工具反馈:v0.5.0（升级到最新版v0.6.0同样存在这个问题）

### 附图

<!--more-->
本想只显示发送给朋友和分享到朋友圈选项，结果显示所有的选项:
![微信web开发者工具显示效果图](images/wechat-js-sdk/share_dev.jpeg)

真实环境效果：
![真实环境效果图](images/wechat-js-sdk/share_prod.jpg)

前端js调用代码：
![前端js调用代码](images/wechat-js-sdk/call_code.png)

