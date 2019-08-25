---
title: Redis как сервис в windows
date: "2015-05-04 16:22:54"
---

Скачиваем сервер, например, майкрософтские [билды](https://github.com/MSOpenTech/redis/releases).  
Разархивируем в `C:\Redis`.

Создание и удаление сервиса
```dos
C:\Redis\redis-server.exe --service-install redis.windows.conf --maxhead 512M --loglevel verbose
C:\Redis\redis-server.exe --service-uninstall
```

Запуск и остановка сервиса
```dos
C:\Redis\redis-server.exe --service-start
C:\Redis\redis-server.exe --service-stop
```

Альтернативные варианты запуска и остановки сервиса
```dos
net start redis
net stop redis
```
