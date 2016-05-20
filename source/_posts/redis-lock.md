---
title: redis_lock
categories:
  - redis
  - lock
date: 2016-05-20 14:42:14
tags: ['redis','lock','nodejs']
photos:
description:
---

场景：使用node+mongo搭建web应用时，常常遇到并发问题导致创建一条数据的时候会同时创建多条。

通过redis set 方法 配合 ‘NX’ 选项即可实现锁机制。

主要的方法有三个：

[`lock(加锁)`](#lock)

[`unlock(解锁)`](#unlock)

[`extend(更改锁过期时间)`](#extend)



<a name="lock" />

```js
Redlock.prototype.lock = function(resource,ttl,callback){
  var self = this;
  var _val = _random();
  return new Promise(function(resolve, reject) {
    var lock = new Lock(self, resource, _val);
    self.client.SET(resource,_val,'EX',ttl,'NX',function(err,data){
      if(!err && data === 'OK'){
        return resolve(lock);
      }else{
        var err = err || 'resource: '+resource+' is locked.';
        self.emit('lockError', err);
        return reject(err);
      }
    })
  }).asCallback(callback);
}

```
<!--more-->

<a name="unlock" />

```js
Redlock.prototype.unlock = function(lock,callback){
  var self = this;
  return new Promise(function(resolve, reject) {
    if(typeof lock !== 'object') return reject('unlockError:lock is not object.');
    self.client.GET(lock.resource,function(err,data){
      if(!err && data === lock.value){
        self.client.DEL(lock.resource,function(err){
          if(err){
            self.emit('unlockError',err);
            return reject('unlockError:'+err);
          }else{
            return resolve(lock);
          }     
        })
      }else{
        self.emit('unlockError',err || 'resource:' + lock.resource + ' unable to unlock.')
        return reject('unlockError:' + err || ('resource:' + lock.resource + ' unable to unlock.'));
      }
    })
  }).asCallback(callback);
}
```

<a name="extend" />

```js
Redlock.prototype.extend = function(lock,ttl,callback){
  var self = this;
  return new Promise(function(resolve, reject){
    if(typeof lock !== 'object') return reject('unlockError:lock is not object.');
    self.client.GET(lock.resource,function(err,data){
      if(!err && data === lock.value){
        self.client.expire(lock.resource,ttl,function(err,data){
          if(!err && data === 1){
            return resolve(lock);
          }else{
            self.emit('extendError', err);
            return reject('extendError:'+err);
          }          
        });
      }else{
        self.emit('extendError', err);
        return reject('extendError:'+err);
      }
    })
  }).asCallback(callback);
}
```

## 用法

```js
var client = require('redis').createClient('port','host');
var redlock = new RedLock(client);
var lock;

`callback`:

//lock
redlock.lock('test-resource-lock',3,function(err,lockInstance){
  lock = lockInstance;
  done(err);
});
//unlock
redlock.unlock(lock,function(err,data){
  done(err);
});


`promise`:

redlock.lock('test-resource-lock-promise',3).done(
  function(lock){
    //todo
    redlock.unlock(lock);
  },
  function(){
  }
) 
```

PS:支持callback and promise.

实现比较简单，100行内，有兴趣的可以在 [这里https://github.com/navyxie/redlock-node](https://github.com/navyxie/redlock-node) 查看源码

