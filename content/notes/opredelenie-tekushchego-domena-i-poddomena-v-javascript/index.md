---
title: Определение текущего домена и поддомена в javascript
date: "2015-07-13 22:01:08"
---

Трюк основывается на том, что браузер может сохранять cookie на доменах любого уровня, кроме верхнего (tld — top level domain).

Например, для `sub.example.org`.  
Перебираем части домена с конца до тех пор, пока не получится записать и считать cookie.  
Сначала пытаемся записать cookie на `.org` — не получается.  
Следом пытаемся записать на `.example.org` — получается, значит `example.org` это искомый домен, а все что слева — это поддомен.

Реализация функции.

```javascript
function get_host_info() {
    var hostname = document.location.hostname.split('.');
    var cookie = 'tldfind=' + new Date().getTime();
    var domain = [];
    var segment;

    while (segment = hostname.pop()) {
        domain.unshift(segment);
        document.cookie = cookie + ';domain=.' + domain.join('.') + ';';
        if (document.cookie.indexOf(cookie) > -1) {
            document.cookie = cookie + ';domain=.' + domain.join('.') + ';expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            break;
        }
    }

    return {
        subdomain: hostname.join('.') || null,
        domain: domain.join('.') || null,
        tld: domain.slice(1).join('.') || null
   };
})();
```

Пример использования.

```javascript
var info = get_host_info();
console.log(info.tld); // org
console.log(info.domain); // example.org
console.log(info.subdomain); // sub
```
