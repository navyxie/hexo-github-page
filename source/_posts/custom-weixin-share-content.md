---
title: custom_weixin_share_content
categories:
  - null
date: 2016-05-31 15:35:05
tags:
photos:
description: 自定义微信分享内容
---

## 如何在不接入微信API的情况下自定义分享内容（图片、链接、标题）

1 设置分享title:动态改变document.title值即可:

```js
document.title = 'test'
```

2 设置分享图片：在页面隐藏一张尺寸大于290*290的图（图片需要容器包裹，设置容器css属性display:none即可）:

```js
<div style="display:none"><img src="share.jpg" /></div>
```

3 设置分享的链接：动态修改document.documentURI的值即可（safari下，document.documentURI为只读属性，可借助history.pushState ）

```js
//android:
document.documentURI = "http://www.navyxie.com"；//经测试wechat6.3.13版本下此方法已失效，可使用同下IOS的方法自定义。
//ios:
window.history.pushState("weixin-share-url", "weixinshare", "http://www.navyxie.com");//只可设置同域链接
```

**具体的运行原理可以看 [微信Android SDK 中的 js](https://github.com/navyxie/weixin_js) 源码分析。**