---
title: web-security
categories:
  - 安全
  - 验证
date: 2016-04-19 05:18:50
tags: ['web','security','api','盗刷','验证码','加密','解密']
photos:
description: 不用验证码的防盗刷方式
---

## 随机token

整个处理流程：

1. 在需要处理盗刷的接口添加token参数校验
2. web端在需要处理盗刷页面注入token
3. Native(IOS,android)通过API形式请求token，在相应的接口请求时带上


### 服务端生成token

使用redis管理token

```
//生成token
Redis.SETEX(token,ttl, 1,cb);
//验证token
Redis.GET(token,function (err, data) {
    if(data && data < 4){
      //每个token在ttl时间间隔内只能使用3次
      self.incrToken(token,tokenPre,cb);
    }else{
      self.removeToken(token,tokenPre,function(err,data){
        cb(null,false);
      });
    }
  });
}
```

<!--more-->

### web端在render前注入token以及script脚本以便获取token值

token值切分成每个字符插入到HTML dom 中

···
var bodyEndStr = '</body>';
var bodyStartStr = '<body';
var token = '后端生成的token';
var tokenId = '_' + FN_UTIL.generateSalt(Math.ceil(Math.random()*10));//随机生成字符数字字符串作为dom id，为了避免第一个字符是数字，所以添加了前缀_
var bodyStarIndex = html.indexOf(bodyStartStr);//body标签开启位置
var bodyEndIndex = html.indexOf(bodyEndStr);//body标签结束位置
var htmlTagLastIndexs = FN_UTIL.matchHtmlTags(html.substring(bodyStarIndex,bodyEndIndex+1));
var htmlTagLen = htmlTagLastIndexs.length;
var tokenLen = token.length;
var times = Math.floor(htmlTagLen/tokenLen);
var randomIndex = 0;
var addLen = 0;
var scriptStr = 'var r="";function g(id){return document.getElementById(id).innerHTML}';
for(var i = 0 ; i < tokenLen ; i++){
  var htmlTag = FN_UTIL.makeHtmlTag(tokenId+i,token[i]);
  randomIndex += Math.floor(Math.random()*times);
  if(!htmlTagLastIndexs[randomIndex]){
    randomIndex = htmlTagLen - 1;
  }
  var curIndex = bodyStarIndex+htmlTagLastIndexs[randomIndex]+addLen;
  var prevHtml = html.substring(0,curIndex);
  var nextHtml = html.substr(curIndex); 
  scriptStr += 'r += g("'+(tokenId+i)+'");w.kklc_tokenStr=r;';
  if(i === tokenLen-1){
    scriptStr += '';
    html = prevHtml.concat(htmlTag,'<script>(function(w){'+scriptStr+'})(window)</script>',nextHtml);//执行js获取token值
  }else{
    html = prevHtml.concat(htmlTag,nextHtml);
  }
  addLen += htmlTag.length;
}
···

FN_UTIL 的代码：

···
var SALTCHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
var htmlTags = ['div','p','span','strong','h1','h2','h3','h4','h5','h6','i','b'];
module.exports = {
  generateSalt:function(length){
    var i, r = [];
    for (i = 0; i < length; ++i) {
      r.push(SALTCHARS[Math.floor(Math.random() * SALTCHARS.length)]);
    }
    return r.join('');
  },
  matchHtmlTags:function(html){
    var reg = new RegExp(/<\/[^>]+>/gim);
    var lastIndexs = [];
    var result;
    while((result = reg.exec(html)) != null){
      lastIndexs.push(reg.lastIndex);
    }
    return lastIndexs;
  },
  makeHtmlTag:function(id,val){
    var tag = this.randomHtmlTagName();
    return '<'+tag+' id="'+id+'" style="display:none;">' + val + '</'+tag+'>';
  },
  randomHtmlTagName:function(){
    return htmlTags[Math.floor(Math.random()*htmlTags.length)];
  }
}
···

### Native(IOS,Android)端

```
//获取服务器端的时间戳
var serverTime = getServerTime();
//使用对称加密算法加密特定字符串和时间戳
var encodeData = crypto.encode('xxxx_time');
//服务器端解密加密数据，提取时间戳，与server时间戳对比，在一定差值(10s)内允许生成token，客户端通过token，执行后续操作

```

#### 优点

- 整个防盗流程都是技术手段在处理，对用户透明，既起到一定的安全防护又不失用户体验
- Native端通过加密获取token，即使获取token的接口被监听，有时间戳校验，也是在很大程度上防止盗刷
