---
title: watch-ENOSPC
categories:
  - [系统]
date: 2016-04-18 16:44:36
tags: ['watch','ENOSPC']
photos:
description: 'Node.JS Error: ENOSPC'
---

## Node.JS Error: ENOSPC (ENOSPC:Error No space left on device)

### Run the below command:

```
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

*The system has a limit to how many files can be watched by a user. You can run out of watches pretty quickly if you have Grunt running with other programs like Dropbox. This command increases the maximum amount of watches a user can have.*

#### referrer

-  http://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc
-  https://wiki.archlinux.org/index.php/Sysctl