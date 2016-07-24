---
title: nodejs-path
categories:
  - nodejs
  - path
date: 2016-07-24 11:28:13
tags: ['nodejs', 'path']
photos:
description:
---

## nodejs 关于路径处理的相关问题

### 路劲分类

- 相对路径
  - ../xxx/a.jpg
  - ./xxx/a.jpg
  - xxx/a.jpg
- 相对于网站的根目录
  - /xxx/a.jpg
- 绝对路径(一般都不会用)
  - /Users/Navy/Desktop/code/demo/xxx/a.jpg

在web项目的前端发布构建过程中，经常需要处理css中的图片路径，清理图片缓存，上传图片到CDN等，所以一定会面临路径问题，而前端构建发布过程中经常借助nodejs。css中的图片使用最多的就是相对路径，以及相对于网站站点的根目录。

#### 对于相对目录比较好处理，根据css当前路径和图片的相对路径，使用nodejs的path.resolve函数即可获取到图片的绝对路径。
#### 相对于网站的根目录就稍微有点麻烦，因为当前css的路径是没啥作用，需要根据网站设置的静态文件目录处理，一般静态文件目录是public,static,assets等，那么根据静态文件目录和图片的路径及应用程序的根目录，通过nodejs的path.join函数也能比较好的处理这个路径问题。 

## nodejs 处理路径常用的函数

<!-- more -->

- 文件路径处理：path.normalize(p)
  path模块中的normalize()方法用来规范化路径字符串。可用于处理路径中的"//"、".."、"."等字符。例如：
  ```
  var path = require('path');
  path.normalize('/foo/bar//baz/asdf/quux/..');
  // 处理后
  '/foo/bar/baz/asdf'
  ```
- 连接路径：path.join([path1][, path2][, ...])
  path.join()方法可以连接任意多个路径字符串。要连接的多个路径可做为参数传入。path.join()方法在接边路径的同时也会对路径进行规范化。例如：
  ```
  var path = require('path');
  //合法的字符串连接
  path.join('/foo', 'bar', 'baz/asdf', 'quux', '..')
  // 连接后
  '/foo/bar/baz/asdf'
  ```
- 路径解析：path.resolve([from ...], to)
  path.resolve()方法可以将多个路径解析为一个规范化的绝对路径。其处理方式类似于对这些路径逐一进行cd操作，与cd操作不同的是，这引起路径可以是文件，并且可不必实际存在（resolve()方法不会利用底层的文件系统判断路径是否存在，而只是进行路径字符串操作）。例如：
  ```
  path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile')
  // /tmp/subfile
  ```
  其处理方式类型于
  ```
  cd foo/bar
  cd /tmp/file/
  cd ..
  cd a/../subfile
  pwd
  ```
  如果解析的不是绝对路径，path.resolve()会将当前工作目录加到解析结果的前面。例如：
  ```
  path.resolve('/foo/bar', './baz')
  // 输出结果为
  '/foo/bar/baz'

  path.resolve('/foo/bar', '/tmp/file/')
  // 输出结果为
  '/tmp/file'

  path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif')
  // 当前的工作路径是 /Users/Navy/Desktop/code/demo/node_modules/gulp-custom-css-urls，则输出结果为
  '/home/itbilu/node/wwwroot/static_files/gif/image.gif'
  ```
  从上面的例子可以看出,resolve函数处理的原则是，当路径有含有多个绝对路径时（以/开头的路径）,只会处理最后一个绝对路径（以最后一个绝对路径为起始路径），忽略之前所有的路径，当所有路径都没有绝对路劲时，最后会把当前工作路径（process.cwd()）添加到开头。

- 查找两个绝对路径的相对关系：path.relative(from, to)
  path.relative()方法可以找出一个绝对路径到另一个绝对路径的相对关系（前面一个路径相对后面的路径）。例如：
  ```
  var path = require('path');
  path.relative('/Users/liuht/code/itbilu/demo', '/Users/liuht/code/zszsgc/lib');
  // 结果
  '../../zszsgc/lib'
  ```
- 提取路径的组成部分：path.dirname(p) 、path.basename(p[, ext]) 、path.extname(p)
  path.dirname()方法可以提取出一个文件路径中的目录的部分。path.basename()方法可以提取出一个文件路径中的文件的部分。path.extname()方法可以提取文件的扩展名。例如：
  ```
  var path = require('path');
  path.dirname('/Users/liuht/code/itbilu/demo/path.js')
  // 结果
  '/Users/liuht/code/itbilu/demo'

  path.basename('/Users/liuht/code/itbilu/demo/path.js')
  // 结果
  'path.js'

  path.extname('/Users/liuht/code/itbilu/demo/path.js')
  // 结果
  '.js'
  ```
  path.basename()方法还可以指定第二个参数：文件的扩展名，指定后可以提取文件名。指定扩展名不合法时将返回文件全名。例如：
  ```
  var path = require('path');

  path.basename('/Users/liuht/code/itbilu/demo/path.js', '.js')
  // 结果
  'path'

  path.basename('/Users/liuht/code/itbilu/demo/path.js', '.html')
  // 结果
  'path.js'
  ```

**在早期的Node.js版本中path模块还有个path.exists()方法，用于判断文件是否存在，但已被fs模块中的fs.exists()代替。**