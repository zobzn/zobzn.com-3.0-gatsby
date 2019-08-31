---
title: Полезности в docker
date: "2019-07-26 16:04:15"
---

Адрес хоста для обращений из контейнера

```bash
host.docker.internal
```

<!--
Получить свой айпи адрес

```bash
ifconfig | grep 'inet 192\.' | awk '{ print $2 }'
```
-->

Запустить bash в определенном имейдже

```bash
docker run -it --rm IMAGE /bin/bash
```

Подключиться к bash уже работающего контейнера

```bash
docker exec -it CONTAINER_ID /bin/bash
```

Работа с локальным имеджем и с его репозиторием

```bash
docker build -t <image> .                       # create local <image> using Dockerfile
docker run -p 4000:80 <image>                   # run <image> mapping port 4000 to 80
docker login                                    # Login to docker hub
docker tag <image> username/repository:tag      # tag <image> for upload to registry
docker push username/repository:tag             # upload tagged image to registry
docker run username/repository:tag              # run image from registry
```
