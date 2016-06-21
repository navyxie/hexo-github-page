---
title: sails-orm-bug
categories:
  - framework
  - sails
  - nodejs
  - mvc
date: 2016-06-20 19:38:39
tags: ['sails','orm','bug']
photos:
description: "salis orm bug TypeError: Cannot read property 'config' of undefined"
---

when your sails version >=  0.12.2 ,and your config/connection.js  adapter key is module ,such as : 

```
devMongodb: {
    module: 'sails-mongo',
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT || 57017,
    user: process.env.MONGO_USER || '',
    password: process.env.MONGO_PASS || '',
    database: process.env.MONGO_DBNAME || 'koala'
  }
```

it will appear this error "Cannot read property 'config' of undefined". Beacause sails version >= 0.12.2 orm is Separated into independent modules "sails-hook-orm" , this module don't support 'module' key as adapter.

you can solve it by two way:

> - change adapter  key 'module' to 'adapter'
> - rockback sails to lower version (<=0.12.1) , and delete module "sails-hook-orm"

<!--more-->

when you config multi adapter and the adapter key is 'adapter' , sails <= 0.12.1 with orm haved bug : 

[origin code : https://github.com/balderdashy/sails/blob/v0.12.1/lib/hooks/orm/build-orm.js#L26](https://github.com/balderdashy/sails/blob/v0.12.1/lib/hooks/orm/build-orm.js#L26) 

```
sails.log.verbose('Starting ORM...');
    var waterline = new Waterline();
    _.each(modelDefs, function loadModelsIntoWaterline(modelDef, modelID) {
      sails.log.silly('Registering model `' + modelID + '` in Waterline (ORM)');
      waterline.loadCollection(Waterline.Collection.extend(modelDef));
    });

    // Find all the connections used
    var connections = _.reduce(sails.adapters, function getConnectionsInPlay(connections, adapter, adapterKey) {
      _.each(sails.config.connections, function(connection, connectionKey) {
        if (adapterKey === connection.adapter) {
          connections[connectionKey] = connection;
        }
      });
      return connections;
    }, {});
```

fix this bug : 

```
  sails.log.verbose('Starting ORM...');
  var connectionsNameList = [];
  var waterline = new Waterline();
  _.each(modelDefs, function loadModelsIntoWaterline(modelDef, modelID) {
      sails.log.silly('Registering model `' + modelID + '` in Waterline (ORM)');
      connectionsNameList = connectionsNameList.concat(modelDef.connection);
      waterline.loadCollection(Waterline.Collection.extend(modelDef));
  });
  connectionsNameList = _.uniq(connectionsNameList);
  // Find all the connections used
  var connections = _.reduce(sails.adapters, function getConnectionsInPlay(connections, adapter, adapterKey) {
  _.each(sails.config.connections, function(connection, connectionKey) {
      if (adapterKey === connection.adapter && _.indexOf(connectionsNameList,connectionKey) !== -1) {
          connections[connectionKey] = connection;
      }
  });
  return connections;
  }, {});
```