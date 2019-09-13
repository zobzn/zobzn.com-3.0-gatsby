---
title: Полезности в git
date: "2019-08-11 06:20:22"
---

Получить рабочую копию удаленного репозитория

```bash
# вариант 1
git clone https://username@bitbucket.org/username/repository.git
# вариант 2
git init
git remote add origin https://username@bitbucket.org/username/repository.git
git pull origin master
```

<!--
git config user.email "579620+zobzn@users.noreply.github.com"
git commit --amend --reset-author
-->

Восстановить рабочую копию к последнему коммиту

```bash
git reset --hard HEAD
```

Поменять комментарий к последнему коммиту (пока он еще не был запушен)

```bash
git commit --amend
# или сразу с комментарием
git commit --amend -m "новый комментарий к коммиту"
```

Признак исполняемого файла

```bash
# удалить
git update-index --chmod=-x path/to/file
# добавить
git update-index --chmod=+x path/to/file
```

Посмотреть коммиты в ветке по сравнению с master

```bash
git cherry -v master
```

Посчитать коммиты в ветке по сравнению с master

```bash
git cherry -v master | wc -l
```

Создать локальную ветку и переключиться на нее

```bash
git branch some-branch
git checkout some-branch
# или тоже самое одной коммандой
git checkout -b some-branch
```

Удалить локальную ветку

```bash
git branch --delete feature
# или
git branch -d feature
```

Удалить родительскую ветку

```bash
git push origin --delete feature # Git version 1.7.0 or newer
# или
git push origin :feature # Git versions older than 1.7.0
```

Запушить локальную ветку в родительскую, если различаются названия локальной и родительской веток

```bash
git push -u origin local-feature:remote-feature
```

Отправить изменения из рабочей копии в центральный репозиторий

```bash
git push -u origin master   # только master ветка
git push -u origin --all    # все ветки
git push -u origin --tags   # все теги
```

Скачать к себе ветку из центрального репозитория

```bash
# закачиваем все центральные изменения
git fetch
# удаляем локальную ветку если она есть
git branch -d <local_branch>
# скачиваем ветку с центрального репозитория
git checkout -b <local_branch> origin/<remote_branch>
```

Мои настройки git в windows

```bash
git config --global credential.helper wincred
git config --global user.name me
git config --global user.email me@gmail.com
git config --global color.ui true
git config --global color.diff true
git config --global color.grep true
git config --global color.status true
git config --global core.autocrlf input
git config --global core.safecrlf false
git config --global core.quotepath false
git config --global core.editor = notepad
```
