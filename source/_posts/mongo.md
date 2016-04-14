---
title: mongo
categories:
  - 数据库
  - mongo
date: 2016-04-15 01:43:05
tags: ['mongo','数据库']
photos:
description: '数据库 mongo aggregate'
---


## mongodb 的 aggregate 操作

当我们对数据按日期进行分组时，经常遇到ISO日期格式比北京时间小8个小时的问题，导致数据分组时，存在跨天的问题，一组数据如下

```js
/* 1 */
{
  "amount" : 1,
  "oType" : 1,
  "status" : 1,
  "createdAt" : ISODate("2015-02-01T18:16:23.133Z"),
  "updatedAt" : ISODate("2015-02-02T10:29:01.463Z")
}

/* 2 */
{
  "amount" : 3000,
  "oType" : 1,
  "status" : 3,
  "createdAt" : ISODate("2015-02-02T03:39:48.580Z"),
  "updatedAt" : ISODate("2015-02-02T10:29:01.463Z")
}
```

aggregate 操作

```js
var orders = db.getCollection('order').aggregate(
  [
    {
      $match:{oType:{$in:[1,10]}}
    },
    {
      $project:{amount:1,createdAt:1,status:1,dateAdd8:{ $add: [ "$createdAt", 8*60*60*1000 ] }}
    },
    {
      $group:{
        _id:{month:{$month:"$dateAdd8"},day:{$dayOfMonth:"$dateAdd8"},year:{$year:"$dateAdd8"}},
        totalAmount:{$sum:"$amount"},
        count:{ $sum: 1 },
        items:{$push:{amount:"$amount",status:"$status"}}
      }
    }
  ]
).toArray();
```

这样就可以解决ISO日期格式时间比北京时间小8个钟导致按日期分组时出现跨天的问题