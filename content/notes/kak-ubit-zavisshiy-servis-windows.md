---
title: Как убить зависший сервис windows
date: "2016-06-20 19:43:40"
---

Сначала узнаем его PID

```batch
sc queryex НАЗВАНИЕ-СЕРВИСА
```

потом убиваем

```batch
taskkill /f /pid PID-СЕРВИСА
```
