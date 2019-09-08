---
title: Полезности в linux
date: "2015-01-20 14:24:06"
---

Просмотр содержимого текущей папки

```bash
ls -l
```

Поиск по тексту в файлах (регулярка)

```
grep -iR 'hello,? world' *.txt
```

Найти файлы по маске

```bash
find . -type f -name "*.php"
find . -type f -regex '.*\.\(gif\|png\|jpg\|jpeg\)'
```

Найти и удалить файлы по маске

```bash
find . -type f -name "*.php" -print -delete
```

Найти и удалить пустые директории

```bash
find . -type d -empty -print -delete
```

Рекурсивное выставление прав доступа на файлы

```bash
find . -type f -exec chmod 644 {} \;
```

Рекурсивное выставление прав доступа на директории

```bash
find . -type d -exec chmod 755 {} \;
```

Удалить содержимое директории

```bash
rm -r ./somedir/*
```

Удалить директорию со всем содержимым

```bash
rm -r ./somedir
```

Распаковать zip архив в текущую директорию

```bash
unzip package.zip -d .
```

Распаковать gz архив в текущую директорию (архив будет удален)

```
gunzip *.gz
```

Получить размер директории

```bash
du -shm
# -s — просуммировать размеры всех файлов в директории
# -h — показать результат в человекопонятном формате
# -m — показать результат в мегабайтах
```

Запуск заданной команды каждую 1 секунду

```bash
watch -n 1 'ps aux | grep grep'
```

Аналог pause из windows ([источник](https://stackoverflow.com/questions/92802/what-is-the-linux-equivalent-to-dos-pause))

```bash
# Any key solution (with -n 1)
read -rsp $'Press any key to continue...\n' -n 1 key

# Enter solution
read -rsp $'Press enter to continue...\n'

# Escape solution (with -d $'\e')
read -rsp $'Press escape to continue...\n' -d $'\e'

# Question with preselected choice (with -ei $'Y')
read -rp $'Are you sure (Y/n): ' -ei $'Y' key;
# echo $key

# Timeout solution (with -t 5)
read -rsp $'Press any key or wait 5 seconds to continue...\n' -n 1 -t 5;
```
