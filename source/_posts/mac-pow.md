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
<!--more-->

## [Serving Static Files](http://pow.cx/manual.html#section_2.4)

Pow automatically serves static files in the public directory of your application. It's possible to serve a completely static site without a config.ru file as long as it has a public directory. If you have a static site and want to keep your files in the root of your project (i.e. not in a public directory), you can do the following:

```
$ cd ~/.pow
$ mkdir your-app-domain
$ cd !$
$ ln -s ~/Projects/your-app public
```

## [Accessing Virtual Hosts from Other Computers](http://pow.cx/manual.html#section_2.1)

Sometimes you need to access your Pow virtual hosts from another computer on your local network — for example, when testing your application on a mobile device or from a Windows or Linux VM.

The .dev domain will only work on your development computer. However, you can use the special .xip.io domain to remotely access your Pow virtual hosts.

Construct your xip.io domain by appending your application's name to your LAN IP address followed by .xip.io. For example, if your development computer's LAN IP address is 10.0.1.43, you can visit myapp.dev from another computer on your local network using the URL http://myapp.10.0.1.43.xip.io/.

## [Port Proxying](http://pow.cx/manual.html#section_2.1.4)

Pow's port proxying feature lets you route all web traffic on a particular hostname to another port or IP address. To use it, just create a file in `~/.pow` (instead of a symlink) with the destination port number as its contents.

For example, to forward all traffic for `http://proxiedapp.dev/` to port 8080 on your localhost:

```
echo http://1.2.3.4:8080 > ~/.pow/proxiedapp
```

You can also use port proxying to access web apps written for other runtimes such as Python or Node.js. Remember that services behind the proxy won't automatically be started or stopped like Rack apps.


## [Subdomains](http://pow.cx/manual.html#section_3.3)

Once a virtual host is installed, it's also automatically accessible from all subdomains of the named host. For example, the `myapp` virtual host described above could also be accessed at `http://www.myapp.dev/` and `http://assets.www.myapp.dev/`. You can override this behavior to, say, point `www.myapp.dev` to a different application — just create another virtual host symlink named `www.myapp` for the application you want.

## start or stop pow

1. command line:

stop Pow:
```
launchctl unload ~/Library/LaunchAgents/cx.pow.powd.plist
sudo launchctl unload ~/Library/LaunchDaemons/cx.pow.firewall.plist
```

start Pow:
```
launchctl load ~/Library/LaunchAgents/cx.pow.powd.plist
sudo launchctl load ~/Library/LaunchDaemons/cx.pow.firewall.plist
```
2. It's a lot easier, though, to use third-party tools like [powder](https://github.com/rodreegez/powder) or [powify](https://github.com/sethvargo/powify).

Powder:
```
# Stop
powder down #or
powder stop

# Start
powder up #or
powder start
 ```

Powify:
```
# Stop
powify server stop

# Start
powify server start
```

## [Viewing Log Files](http://pow.cx/manual.html#section_2.6)

Pow stores log files in the `~/Library/Logs/Pow directory` so they can be viewed easily with OS X's Console application. Each incoming request URL is logged, along with its hostname and HTTP method, in the `access.log` file. The stdout and stderr streams for each worker process are captured and logged to the `apps` directory in a file matching the name of the application.

Note: Rails logger output does not appear in Pow's logs. You'll want to tail -f `log/development.log` to see those entries.




#### [pow docs](http://pow.cx/manual.html) : http://pow.cx/manual.html

**PS: Pow changed some file in /etc/ on installation. when php application occure 404 , should uninstalled this.**