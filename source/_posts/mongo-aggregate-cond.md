---
title: mongo_aggregate_cond
categories:
  - 数据库
  - mongo
date: 2016-04-16 02:24:19
tags: ['mongo','数据库','aggregate']
photos:
description: mongo aggregate cond
---

## mongo按条件返回字段值

假设数据库表inventory中的数据如下：

```js
{ "_id" : 1, "item" : "abc1", "discount" : 30 }
{ "_id" : 2, "item" : "abc2", "discount" : 20 }
{ "_id" : 3, "item" : "xyz1", "discount" : 30 }
```

执行aggregate操作：

```js
db.inventory.aggregate(
   [
      {
         $project:
           {
             item: 1,
             discount:
               {
                 $cond: { if: { $gte: [ "$qty", 250 ] }, then: 30, else: 20 }
               }
           }
      }
   ]
)
```

或者

```js
db.inventory.aggregate(
   [
      {
         $project:
           {
             item: 1,
             discount:
               {
                 $cond: [ { $gte: [ "$qty", 250 ] }, 30, 20 ]
               }
           }
      }
   ]
)
```

返回结果：

{ "_id" : 1, "item" : "abc1", "discount" : 30 }
{ "_id" : 2, "item" : "abc2", "discount" : 20 }
{ "_id" : 3, "item" : "xyz1", "discount" : 30 }