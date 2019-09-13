---
title: Контрибьютинг в github проекты
date: "2017-01-25 21:40:15"
---

1. Форкаем репозиторий `github.com/user/project`, получаем `github.com/you/project`

2. Сливаем форкнутый репозиторий к себе:

   ```bash
   git init
   git remote add origin https://github.com/you/project
   ```

   либо

   ```bash
   git clone https://github.com/you/project .
   ```

3. Создаем отсылку на исходный репозиторий (например, upstream)

   ```bash
   git remote add upstream https://github.com/user/project
   ```

4. Можем проверить ссылки на удаленные репозитории

   ```bash
   git remote -v
   ```

   увидим

   ```bash
   origin https://github.com/you/project
   upstream https://github.com/user/project
   ```

5. Сливаем к себе изменения

   ```bash
   git pull origin master
   git pull upstream master
   ```

6. Если в upstream были изменения, которых еще нет в origin, то можем их запушить в origin

   ```bash
   git push origin master
   ```

7. Создаем новую ветку и сразу переключаемся в нее

   ```bash
   git branch feature
   git checkout feature
   # или тоже самое одной коммандой
   git checkout -b feature
   ```

8. Работаем, делаем коммиты…

9. Периодически отслеживаем изменения в «в родителях» и сливаем изменения с них

   ```bash
   git checkout master
   git pull origin master
   git pull upstream master
   git push origin master
   ```

   и вливаем в свою ветку таким образом:

   ```bash
   git checkout feature
   git rebase master
   # или
   # git checkout feature
   # git merge master
   ```

10. При желании/необходимости, склеиваем все коммиты в ветке в один коммит общий коммит.  
    Для этого узнаем сколько у нас коммитов после master

    ```bash
    # смотрим какие коммиты были
    git cherry -v master
    # или сразу узнаем количество коммитов
    git cherry -v master | wc -l
    ```

    Например, получилось 3 коммита. Склеиваем эти 3 коммита в 1

    ```bash
    git reset --soft HEAD~3
    git commit -m "New message for the combined commit"
    ```

11. Когда работу сделали, заливаем изменения в свой github-репозиторий в свою ветку

    ```bash
    git push origin feature
    ```

12. Идем в исходный репозиторий на github (`github.com/user/project`)  
    Узнаем в какую ветку необходимо вливать изменения  
    Обычно это `project/master`, но в `README` или в `CONTRIBUTING` может быть указано другое

13. Идем в свой форкнутый репозиторий на github (`github.com/you/project`)  
    Создаем Pull Request, для этого жмем кнопку «New Pull Request»  
    Слева выбираем в какую ветку будут вливаться изменения в исходном репозитории, справа — какие изменения будут браться с вашего репозитория.  
    Например, слева project/feature, справа project/master.  
    Заполняем название и описание (название потом попадет в описание мерж-коммита и станет достоянием общественности, учтите это).  
    Нажимаем «Send Pull Request».

14. Вуаля, pull request отправлен.  
    Владелец рассмотрит изменения и, возможно, их примет и вольет к себе.  
    На практике, лучше перед посылкой пулл-реквестов, вручную синхронизироваться с веткой, в которую будем посылать изменения, чтобы у владельца merge прошел гладко (больше шансов, что пулл примут ;-))  
    Не забываем потом сделать git pull upstream master, чтобы увидеть изменения у себя.

15. Напоследок, когда pull request уже приняли, можно удалить свою ветку и локально и из своего форкнутого репозитория.

    ```bash
    # удаляем локальную ветку
    git branch -d feature               # сокращенный вариант команды
    git branch --delete feature         # полный вариант команды

    # удаляем ветку в своем репозитории
    git push origin -d feature          # сокращенный вариант команды
    git push origin --delete feature    # полный вариант команды
    ```
