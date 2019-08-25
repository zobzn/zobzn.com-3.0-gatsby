---
title: Полезности в Ubuntu 10.10
date: "2014-03-05 23:08:13"
---

## Установка полезностей

<dl>
	<dt>Google Chromium</dt>
	<dd>
	<pre><code class="language-bash">sudo add-apt-repository ppa:chromium-daily/stable
sudo apt-get update
sudo apt-get install chromium-browser
</code></pre>
	</dd>
	<dt>Mozilla Firefox 4</dt>
	<dd>
	<pre><code class="language-bash">sudo add-apt-repository ppa:mozillateam/firefox-stable
sudo apt-get update
sudo apt-get install firefox
</code></pre>
	</dd>
	<dt>LibreOffice</dt>
	<dd>
	<pre><code class="language-bash">sudo add-apt-repository ppa:libreoffice/ppa
sudo apt-get update
sudo apt-get install libreoffice
sudo apt-get install libreoffice-gnome
sudo apt-get install libreoffice-l10n-ru
sudo apt-get install libreoffice-help-ru</code></pre>
	</dd>
	<dt>Фишки для наутилуса (открыть терминал и открыть как администратор)</dt>
	<dd>
	<pre><code class="language-bash">sudo apt-get install nautilus-open-terminal
sudo apt-get install nautilus-gksu</code></pre>
	</dd>
	<dt>Compiz</dt>
	<dd>
	<pre><code class="language-bash">sudo apt-get install compizconfig-settings-manager
sudo apt-get install compiz-fusion-plugins-main
sudo apt-get install compiz-fusion-plugins-extra</code></pre>
	</dd>
	<dt>WINE</dt>
	<dd>
	<pre><code class="language-bash">sudo add-apt-repository ppa:ubuntu-wine/ppa
sudo apt-get update
sudo apt-get install wine1.3
</code></pre>
	</dd>
	<dt>Netbeans</dt>
	<dd>
	<pre><code class="language-bash">sudo apt-get install sun-java6-jdk
sudo apt-get install netbeans</code></pre>
	</dd>
	<dt>RabbitVCS (SVN + Thunar)</dt>
	<dd>
	<pre><code class="language-bash">sudo add-apt-repository ppa:rabbitvcs/ppa
sudo apt-get update
sudo apt-get install thunar rabbitvcs-thunar</code></pre>
	</dd>
	<dt>LAMP + Parser</dt>
	<dd>
	<pre><code class="language-bash">sudo apt-get install apache2 apache2-mpm-itk
sudo apt-get install mysql-server mysql-admin
sudo apt-get install php5 php5-suhosin php5-xdebug php-apc php5-mysql php5-curl php5-gd php5-imagick
sudo apt-get install parser3 parser3-mysql</code></pre>
	</dd>
	<dt>Node.JS</dt>
	<dd>
	<pre><code class="language-bash">sudo add-apt-repository ppa:jerome-etienne/neoip
sudo apt-get update
sudo apt-get install nodejs</code></pre>
	</dd>
	<dt>Google Closure Compiler</dt>
	<dd>
	<pre><code class="language-bash">mkdir ~/bin
cd ~/bin
wget -c http://closure-compiler.googlecode.com/files/compiler-latest.zip
unzip -f compiler-latest.zip -d closure-compiler
unlink compiler-latest.zip
touch closure
echo \\#\\!/bin/sh &gt; closure
echo exec java -jar ~/bin/closure-compiler/compiler.jar \\$* &gt;&gt; closure
chmod +x closure
</code></pre>
	</dd>
	<dt>Google Closure Library</dt>
	<dd>
	<pre><code class="language-bash">svn export http://closure-library.googlecode.com/svn/trunk/ closure-library</code></pre>
	</dd>
</dl>

## Настройка

Виртуальный хост под своим пользователем

```apache
<VirtualHost *:80>
  <IfModule mpm_itk_module>
    AssignUserId user group
  </IfModule>

  ServerName localhost
  ServerAdmin admin@localhost

  DocumentRoot /home/user/vhosts/localhost/www
</VirtualHost>
```
