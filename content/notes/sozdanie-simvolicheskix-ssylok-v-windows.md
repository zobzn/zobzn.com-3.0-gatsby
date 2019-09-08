---
title: Создание символических ссылок в windows
date: "2014-01-13 23:01:38"
---

Начиная с Windows Vista можно использовать встроенную комманду `mklink`.  
Примеры  
`mklink /J res src` — будет создана папка res, ссылающаяся на папку src (символическая ссылка).  
`mklink /H res.text src.txt` — будет создан файл res.txt, ссылающийся на файл src.txt (жесткая ссылка).

Для более старых версий windows можно использовать утилиты [linkd](/download/bin/linkd.zip) и [ln](/download/bin/ln.zip).
