---
title: Тестовая заглушка sendmail для php
date: "2014-08-16 00:45:23"
---

Для тестирования отправки писем может очень пригодиться простая заглушка, которая просто складывает письма в какую-нибудь папку. Например, такая.

Создаем файлик sendmail.php.

```php
#!/usr/bin/php
<?php

$filedata = file_get_contents('php://stdin');
$filename = __DIR__ . '/mail/' . date('Y-m-d-H-i-s') . '-' . md5($filedata) . '.eml';

if (!is_dir(dirname($filename)))
{
    @mkdir(dirname($filename), 0777, true);
}

if (is_dir(dirname($filename)) &amp;&amp; is_writable(dirname($filename)))
{
    @file_put_contents($filename, $filedata);
}
```

Указываем путь к нему в php.ini.

```ini
sendmail_path = '/var/www/sendmail.php -t';
```

И пользуемся…

```php
mail('debug@example.com', 'тема', 'сообщение');
```
