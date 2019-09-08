---
title: php phar архивы в ubuntu 11.04
date: "2014-01-13 23:03:05"
---

Для использования include и require комманд с phar архивами в ubuntu 11.04 сначала нужно поправить белый список в конфигурационном файле `suhosin.ini`.

```ini
suhosin.executor.include.whitelist = phar
```

После этого можно будет писать что-то типа такого:

```php
require_once __DIR__ . DIRECTORY_SEPARATOR . 'silex.phar';
```
