---
title: Инструментарий php разработчика под windows
date: "2014-03-12 22:41:27"
---

### apache

[apache 2.4.x Win32 VC11](http://www.apachelounge.com/download/)  
[mod_bw](http://www.apachelounge.com/download/)

### php

[php 5.5 VC11 x86 Thread Safe](http://windows.php.net/download/)  
[php_xdebug.dll](http://windows.php.net/downloads/pecl/releases/xdebug/)  
[php_imagick.dll](http://windows.php.net/downloads/pecl/releases/imagick/)  
[imagick](http://www.imagemagick.org/script/binary-releases.php#windows)  
[composer](http://getcomposer.org/)  
[phpstorm](http://www.jetbrains.com/phpstorm/) :-)

### sql

[MariaDB](https://mariadb.org/) — отличная замена для MySQL

### ssh

[Putty](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) — ssh клиент

### svn

[TortoiseSVN](http://tortoisesvn.net/downloads.html) — svn клиент

### dns

[Acrylic DNS Proxy](http://sourceforge.net/projects/acrylic/) — кэширующий dns proxy сервер, может пригодиться для настройки тестовых поддоменов

### smtp

[Тестовая заглушка sendmail для php](/notes/testovaya-zaglushka-sendmail-dlya-php/)  
[Test Mail Server Tool](http://www.toolheap.com/test-mail-server-tool/) — smtp сервер для тестов

### cmd, powershell

[ansicon](https://github.com/adoxa/ansicon/downloads) — подсветка в консоли

### nodejs

Много полезного можно почерпнуть из мира js

[node.js](https://nodejs.org/)  
[gulp](http://gulpjs.com/)  
[grunt](http://gruntjs.com/)  
[bower](http://bower.io/)

### Пример простой настройки apache (`httpd.conf`)

```apache
#
# заменить пути, например:
# c:/apache24 => /bin/apache24
#
# и потом внести правки, типа таких...
#

LoadModule headers_module modules/mod_headers.so
LoadModule filter_module modules/mod_filter.so
LoadModule rewrite_module modules/mod_rewrite.so
LoadModule vhost_alias_module modules/mod_vhost_alias.so
LoadModule php5_module "/bin/php55/php5apache2_4.dll"
PHPIniDir "/bin/php55"

# ускоряем Apache 2.4 в Windows
AcceptFilter http none
AcceptFilter https none
EnableSendfile off
EnableMMAP off

<IfModule log_config_module>
    LogFormat "%t %h %l %u %V \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\"" combined
    LogFormat "%t %h %l %u %V \"%r\" %>s %b" common
    CustomLog "logs/access.log" common
</IfModule>

<FilesMatch \.php$>
    SetHandler application/x-httpd-php
</FilesMatch>

<IfModule mime_module>
    AddType text/x-component .htc
</IfModule>

<IfModule dir_module>
    DirectoryIndex index.php index.htm index.html
</IfModule>

<Directory "/var/www">
    Options Indexes FollowSymLinks
    Require all granted
    AllowOverride All
</Directory>

UseCanonicalName Off
ServerName localhost
Listen 80

DocumentRoot "/var/www/localhost"

<VirtualHost *:*>
    ServerName localhost
    ServerAlias *.localhost
    DocumentRoot /var/www/localhost/www
</VirtualHost>
```

### Пример простой настройки php (`php.ini`)

```ini
display_errors = On
display_startup_errors = On
error_reporting = E_ALL
html_errors = On

date.timezone = Europe/Kiev

upload_max_filesize = 20M
post_max_size = 20M
memory_limit = 512M
phar.readonly = 0

extension_dir = "D:/bin/php55/ext"

zend_extension = php_opcache.dll
; zend_extension = php_xdebug.dll

extension = php_curl.dll
extension = php_exif.dll
extension = php_fileinfo.dll
extension = php_gd2.dll
extension = php_imagick.dll
extension = php_mbstring.dll
extension = php_mysqli.dll
extension = php_openssl.dll
extension = php_pdo_mysql.dll
extension = php_pdo_sqlite.dll
extension = php_sqlite3.dll
```
