---
title: Полезности в svn
date: "2014-07-25 12:16:25"
---

Получить рабочую копию удаленного репозитория

```bash
svn checkout svn://example.org/repository/trunk
```

Восстановить рабочую копию к последнему коммиту

```bash
svn revert --recursive .
```

Исправление конфликтов после мержа (в пользу накладываемой ветки):

```bash
svn resolve --accept working -R .
```

Пометить файлы исполняемыми

```bash
svn propset svn:executable on ./vendor/bin/*
svn propdel svn:executable ./vendor/bin/*.bat
```
