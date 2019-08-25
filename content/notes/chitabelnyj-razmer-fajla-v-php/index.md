---
title: Читабельный размер файла в php
date: "2015-07-02 19:56:52"
---

Простая функция, чтобы получить читабельный размер файла в PHP.

```php
function format_filesize($bytes, $decimals = 2)
{
    $size   = array('B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB');
    $factor = (int) floor((strlen($bytes) - 1) / 3);

    return sprintf("%.{$decimals}f", $bytes / pow(1024, $factor)) . ' ' . @$size[$factor];
}
```

Пример использования.

```php
echo format_filesize(filesize('some-file.zip'));
// например, 223894 превратится в 218.65 KB
```
