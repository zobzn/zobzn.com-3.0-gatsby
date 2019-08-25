---
title: Полезности в javascript
date: "2019-02-12 08:24:02"
---

Преобразовать NodeList в массив (и перебрать элементы)

```js
const listItems = document.querySelectorAll("li");

// по старинке
Array.prototype.slice.call(listItems).forEach(node => {});

// или
[...listItems].forEach(node => {});

// или
Array.from(listItems).forEach(node => {});
```

Удалить повторы в массиве

```js
[...new Set([1, 3, 1, 5, 7])];
```
