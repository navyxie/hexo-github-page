---
title: mac-pow
categories:
  - software
date: 2016-04-17 05:37:11
tags: ['mac','pow']
photos:
description:
---

[pow is a zero-config Rack server for Mac OS X](http://pow.cx/)

## install

### curl get.pow.cx | sh

*install log info:*
```
% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  9039  100  9039    0     0   3396      0  0:00:02  0:00:02 --:--:--  3395
*** Installing Pow 0.5.0...
*** Installing local configuration files...
/Users/Navy/Library/LaunchAgents/cx.pow.powd.plist
*** Installing system configuration files as root...
Password:
/etc/resolver/dev
/Library/LaunchDaemons/cx.pow.firewall.plist
*** Starting the Pow server...
*** Performing self-test...
*** Installed

For troubleshooting instructions, please see the Pow wiki:
https://github.com/basecamp/pow/wiki/Troubleshooting

To uninstall Pow, `curl get.pow.cx/uninstall.sh | sh`
```


**PS: Pow changed some file in /etc/ on installation. when php application occure 404 , should uninstalled this.**