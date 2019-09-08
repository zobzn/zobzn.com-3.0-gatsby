---
title: Ограничение скорости отдачи в apache
date: "2014-03-05 22:52:39"
---

Модуль `mod_bw`.

Для windows можно скачать скомпилированный модуль с [apachelounge.com](http://www.apachelounge.com/download/), затем подключить его в `httpd.conf`.

```apacheconf
LoadModule bw_module modules/mod_bw.so
```

В ubuntu немного проще:

```bash
sudo apt-get install libapache2-mod-bw
sudo a2enmod bw
```

И потом в настройках виртуального хоста добавить что-нибудь типа такого.

```apacheconf
<IfModule filter_module>
    <IfModule bw_module>
        AddOutputFilterByType MOD_BW image/gif image/jpg image/jpeg image/png image/x-png
        ForceBandWidthModule On
        BandwidthModule On
        Bandwidth all 65536
    </IfModule>
</IfModule>
```
