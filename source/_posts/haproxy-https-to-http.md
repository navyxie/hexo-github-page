---
title: haproxy-https-to-http
categories:
  - null
date: 2016-04-29 02:20:17
tags: ['haproxy','https','http']
photos:
description:
---

## haproxy 把https转发的时候变成了http

今天接微信API的时候，发现一个很奇怪的问题，本地调试都ok,一旦部署到线上就出问题，后来经过仔细排查，发现我们网站用的是https,很奇怪，haproxy转发的时候会把https转化成http，这是bug吗？待续。

后来证实，这不是haproxy的bug.是由于我们项目使用的是[nodejs](https://nodejs.org/en/)的[sails](http://sailsjs.org/)框架导致的。