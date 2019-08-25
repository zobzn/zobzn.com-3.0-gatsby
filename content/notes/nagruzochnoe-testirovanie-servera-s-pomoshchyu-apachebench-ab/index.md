---
title: Нагрузочное тестирование сервера с помощью ApacheBench (ab)
date: "2016-02-28 17:37:30"
---

Утилита ApacheBench (ab) предназначена для тестирования производительсности web-сервера.

Синтаксис запроса:

```bash
ab [options] [http://]hostname[:port]/path
```

Наиболее полезные Ключи:

<table class="zbz-table">
    <tr>
        <td><code>-n requests</code></td>
        <td>количество запросов, которое надо выполнить</td>
    </tr>
    <tr>
        <td><code>-c concurrency</code></td>
        <td>количество одновременных запросов</td>
    </tr>
    <tr>
        <td><code>-t timelimit</code></td>
        <td>максимальное время на выполнения теста</td>
    </tr>
</table>

Пример – выполнить 100 запросов, максимум 10 одновременно, к серверу ya.ru:

```bash
ab -n 100 -c 10 http://ya.ru/
```

Результат:

```
This is ApacheBench, Version 2.3 <$Revision: 1638069 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking ya.ru (be patient).....done

Server Software:        nginx
Server Hostname:        ya.ru
Server Port:            80

Document Path:          /
Document Length:        0 bytes

Concurrency Level:      10
Time taken for tests:   3.034 seconds
Complete requests:      100
Failed requests:        0
Non-2xx responses:      100
Total transferred:      47892 bytes
HTML transferred:       0 bytes
Requests per second:    32.96 [#/sec] (mean)
Time per request:       303.404 [ms] (mean)
Time per request:       30.340 [ms] (mean, across all concurrent requests)
Transfer rate:          15.41 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:       25   30   3.0     29      43
Processing:    38  257  47.2    269     289
Waiting:       38  161  71.2    159     288
Total:         65  287  47.3    299     324

Percentage of the requests served within a certain time (ms)
  50%    299
  66%    302
  75%    304
  80%    305
  90%    311
  95%    313
  98%    316
  99%    324
 100%    324 (longest request)
```
