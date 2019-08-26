---
title: Полезности в Ubuntu 10.10
date: "2014-03-05 23:08:13"
---

## Установка полезностей

Google Chromium

```bash
sudo add-apt-repository ppa:chromium-daily/stable
sudo apt-get update
sudo apt-get install chromium-browser
```

Mozilla Firefox 4

```bash
sudo add-apt-repository ppa:mozillateam/firefox-stable
sudo apt-get update
sudo apt-get install firefox
```

LibreOffice

```bash
sudo add-apt-repository ppa:libreoffice/ppa
sudo apt-get update
sudo apt-get install libreoffice
sudo apt-get install libreoffice-gnome
sudo apt-get install libreoffice-l10n-ru
sudo apt-get install libreoffice-help-ru
```

Фишки для наутилуса (открыть терминал и открыть как администратор)

```bash
sudo apt-get install nautilus-open-terminal
sudo apt-get install nautilus-gksu
```

Compiz

```bash
sudo apt-get install compizconfig-settings-manager
sudo apt-get install compiz-fusion-plugins-main
sudo apt-get install compiz-fusion-plugins-extra
```

WINE

```bash
sudo add-apt-repository ppa:ubuntu-wine/ppa
sudo apt-get update
sudo apt-get install wine1.3
```

Netbeans

```bash
sudo apt-get install sun-java6-jdk
sudo apt-get install netbeans
```

RabbitVCS (SVN + Thunar)

```bash
sudo add-apt-repository ppa:rabbitvcs/ppa
sudo apt-get update
sudo apt-get install thunar rabbitvcs-thunar
```

LAMP + Parser

```bash
sudo apt-get install apache2 apache2-mpm-itk
sudo apt-get install mysql-server mysql-admin
sudo apt-get install php5 php5-suhosin php5-xdebug php-apc php5-mysql php5-curl php5-gd php5-imagick
sudo apt-get install parser3 parser3-mysql
```

Node.JS

```bash
sudo add-apt-repository ppa:jerome-etienne/neoip
sudo apt-get update
sudo apt-get install nodejs
```

Google Closure Compiler

```bash
mkdir ~/bin
cd ~/bin
wget -c http://closure-compiler.googlecode.com/files/compiler-latest.zip
unzip -f compiler-latest.zip -d closure-compiler
unlink compiler-latest.zip
touch closure
echo \\#\\!/bin/sh &gt; closure
echo exec java -jar ~/bin/closure-compiler/compiler.jar \\$* &gt;&gt; closure
chmod +x closure
```

Google Closure Library

```bash
svn export http://closure-library.googlecode.com/svn/trunk/ closure-library
```

## Настройка

Виртуальный хост под своим пользователем

```apacheconf
<VirtualHost *:80>
    <IfModule mpm_itk_module>
        AssignUserId user group
    </IfModule>

    ServerName localhost
    ServerAdmin admin@localhost

    DocumentRoot /home/user/vhosts/localhost/www
</VirtualHost>
```
