---
title: hexo-theme-landscape-swiftype
categories:
  - hexo
  - theme
  - landscape
date: 2016-04-16 06:16:04
tags: ['hexo','theme','landscape','swiftype']
photos:
description: hexo theme landscape add swiftype
---

## hexo站内搜索功能 —— swiftype

hexo 默认自带的搜索引擎是google,我们接下来是讲解如何用swiftype实现站内搜索

1. 去[swiftype](https://swiftype.com)官网注册一个账号，按步骤同步站点内容，然后复制代码，代码如下：

```js
<script type="text/javascript">
  (function(w,d,t,u,n,s,e){w['SwiftypeObject']=n;w[n]=w[n]||function(){
  (w[n].q=w[n].q||[]).push(arguments);};s=d.createElement(t);
  e=d.getElementsByTagName(t)[0];s.async=1;s.src=u;e.parentNode.insertBefore(s,e);
  })(window,document,'script','//s.swiftypecdn.com/install/v2/st.js','_st');
  _st('install','kWSKry9NQXF2ddPp_Lay','2.0.0');
</script>
//请更换自己的kWSKry9NQXF2ddPp_Lay
```
<!--more-->
2. 搜索主题的search_form方法，不同主题可能位置不一样，但是landscape主题是在layout/_partial/header.ejs文件中，替换掉search_form方法，如下：

```js
<div id="search-form-wrap">
  <input type="text" class="st-default-search-input search-form-input" style="outline: none;width: 110px;">
</div>
<script type="text/javascript">
  (function(w,d,t,u,n,s,e){w['SwiftypeObject']=n;w[n]=w[n]||function(){
  (w[n].q=w[n].q||[]).push(arguments);};s=d.createElement(t);
  e=d.getElementsByTagName(t)[0];s.async=1;s.src=u;e.parentNode.insertBefore(s,e);
  })(window,document,'script','//s.swiftypecdn.com/install/v2/st.js','_st');
  _st('install','kWSKry9NQXF2ddPp_Lay','2.0.0');
</script>
```

**可参照本博客[源码](https://github.com/navyxie/hexo-github-page)**
