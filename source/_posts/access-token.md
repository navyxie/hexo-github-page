---
title: access-token
categories:
  - 安全
  - api
  - Token
  - access 
date: 2016-06-04 14:50:42
tags: ['安全','Toekn','api']
photos:
description: a simple api access token support count and ttl,which base on nodejs.
---

WEB应用是开放的，WEB前端代码也是公开的，和后端交互的接口如果没有经过特殊处理（加密/token），那么就是裸露的，只要知道api地址，那么就能随便获取应用数据。这样应用数据就很容易被人爬取或者恶意盗刷，典型的短信被恶意盗刷。

公司理财产品的短信接口就是一个裸接口，只要手机号就可以任意盗刷，当然背后有根据手机号，ip地址做了请求限制，但还是不够。后面就加了一定时间内一定请求次数的Token，后面观察，基本没有被刷的迹象，说明新的机制还是起到很大作用。当然这个机制不仅是用于防短信盗刷，可用于任意的裸接口防护。

原理很简单，就是在web页面请求的时候由后端按一定的算法注入token到页面中去，然后前端可以通过对应的规则取到token，在请求接口数据时带上去就能在后端对token进行验证，验证通过就能正常请求到数据。如果是native app ，可通过加密的方法请求接口来获取token，最简单直接的方式就是native app 客户端使用一段字符串+时间戳（从后端获取）进行加密，然后请求后端接口，接口对数据进行解密，对时间戳对比，在一段时间内认为有效（避免加密信息被拦截，所以加了时间戳校验），从而获取token。

当然web应用都是公开的，所有源码理论上都是能获取到的。那么后端向web页面注入token的方式也能被破解，所以，后端注入token的形式可定制，比如注入到请求，或者自己实现一套算法，增加被破解的难度。

把这套机制整理成一个独立的npm包[access-token-api](https://github.com/navyxie/access-token-api)，方便多项目复用。

<!--more-->

### 使用例子：

```js
npm install access-token-api

//server(nodejs)  端

var accessTokenApi = require('access-token-api');
var TokenApi = new accessTokenApi({
    webTokenVarName:'encrypt_api_tokenStr',//前端可通过webTokenVarName变量去到token值，默认encrypt_api_tokenStr
});

//web前端取token值
window[webTokenVarName] //请求接口时带上这个值就能进行token校验了
```

### 主要接口

生成token api `issue`
验证token api `verify`
token 有效次数减一 api `decline`
server 端 将token 注入到 web 前端页面 api `webInject`

### 自定义后端注入token到web前端页面的方式，可以初始化模块时自定义webInject参数(函数)

```js
var TokenApi = new accessTokenApi({
    webInject:function(html,token,callback){
    var htmlEndIndex = html.indexOf('</html>');
      var tokenScript = '<script>window.' + this.config.webTokenVarName + '=' + token + '</script>';
      var prevHtml = html.substring(0,htmlEndIndex);
      var nextHtml = html.substr(htmlEndIndex); 
      prevHtml += tokenScript;
      prevHtml += nextHtml;
      callback(null,prevHtml);
    }
});
```

**项目地址[https://github.com/navyxie/access-token-api](https://github.com/navyxie/access-token-api),里面有express和sails框架的使用例子**