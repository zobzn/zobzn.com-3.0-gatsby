---
title: Nginx как сервис в windows
date: "2015-05-12 22:33:05"
---

Используем обертку [Windows Service Wrapper](https://kenai.com/projects/winsw/pages/Home),
с помощью которой можно создавать сервис для консольных программ.

Копируем `winsw.exe` в папку с nginx и переименовываем в `nginx-service.exe`.
Рядом создаем файл `nginx-service.xml` с таким содержимым (предполагается, что nginx установлен в папке `c:\nginx`).

```xml
<service>
    <id>Nginx</id>
    <name>Nginx</name>
    <description>Nginx</description>
    <executable>C:\nginx\nginx.exe</executable>
    <startargument>-p C:\nginx</startargument>
    <stopexecutable>C:\nginx\nginx.exe</stopexecutable>
    <stopargument>-p C:\nginx -s stop</stopargument>
    <logpath>C:\nginx\logs\</logpath>
    <logmode>roll</logmode>
    <depend></depend>
</service>
```

После этого выполняем непосредственную установку и запуск сервиса.

```dos
nginx-service.exe install
nginx-service.exe start
```
