---
title: write-sails-hook
categories:
  - hook
  - sails
  - module
date: 2016-06-21 18:03:05
tags: ['sails','hook']
photos:
description: 'how to write sails hook'
---

## how to write one sails-hook

- you module package.json must have key 'sails' , it's a object, with contain key `isHook`, if want to replace default hook, you can add key `hookName`, eg: sails:{isHook:true,hookName:'orm'}
- export a function and return object, the first param is sails

## sails hook how to load?

> load hook principle : [https://github.com/balderdashy/sails/blob/v0.12.3/lib/hooks/moduleloader/index.js#L507](https://github.com/balderdashy/sails/blob/v0.12.3/lib/hooks/moduleloader/index.js#L507)

> replace default hook : [https://github.com/balderdashy/sails/blob/v0.12.3/lib/hooks/moduleloader/index.js#L513](https://github.com/balderdashy/sails/blob/v0.12.3/lib/hooks/moduleloader/index.js#L513)

<!--more-->

## example

package.json

```
{
  "version":"0.0.1",
  "sails": {
    "isHook": true,
    "hookName": "test"
  }
}
```

index.js(export)

```
module.exports = function(sails){
  console.log('010101010101010101')
  return {
    
  }
}

```