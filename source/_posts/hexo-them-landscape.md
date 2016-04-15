---
title: hexo-them-landscape
categories:
  - hexo
  - theme
  - landscape
date: 2016-04-16 06:06:28
tags: ['hexo','theme','landscape']
photos:
description: hexo landscape theme 
---

## hexo-theme-landscape  0.0.1 版本文章分页显示的bug

上一页和下一页的bug显示如下：

```html
« __('prev') __('next') »
```

解决方法(layout/_partial/archive.ejs)：

```js
<nav id="page-nav">
	<% var prev_text = "&laquo; " + __('prev');var next_text = __('next') + " &raquo;"%>
	<%- paginator({
		prev_text: "&laquo; "+__('prev'),
		next_text: __('next')+" &raquo;"
		prev_text: prev_text,
		next_text: next_text
	}) %>
</nav>
```

已向官方提交[PR](https://github.com/hexojs/hexo-theme-landscape/pull/67/files)