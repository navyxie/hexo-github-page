---
title: haproxy-https-to-http
categories:
  - null
date: 2016-04-29 02:20:17
tags: ['haproxy','https','http','微信']
photos:
description:
---

## haproxy 把https转发的时候变成了http

今天接微信API的时候，发现一个很奇怪的问题，本地调试都ok,一旦部署到线上就出问题，后来经过仔细排查，发现我们网站用的是https,很奇怪，haproxy转发的时候会把https转化成http，这是bug吗？待续。

后来证实，这不是haproxy的bug.是由于我们项目使用的是[nodejs](https://nodejs.org/en/)的[sails](http://sailsjs.org/)框架导致的。


使用express的nodejs应用程序，需要注意，使用代理服务器转发的时候，获取请求协议的时候正确的取值方法是req.headers['x-forwarded-proto']，直接取值req.protocol取得值是http,在接入微信授权的时候，本地调试都正常，一旦部署到线上(https)，就会提示：`config: invalid signature`。所以当接入微信API，本地调试一切正常，到线上(https)部署后发现不正常，就应当检查一下授权的地址协议是否正确。

### referrer:

[https://github.com/nodejs/node-v0.x-archive/issues/6735](https://github.com/nodejs/node-v0.x-archive/issues/6735)
[https://github.com/expressjs/express/issues/1863](https://github.com/expressjs/express/issues/1863)