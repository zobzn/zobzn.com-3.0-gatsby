---
title: Спецсимволы в css content
date: "2015-05-04 10:32:57"
---

Для вставки спецсимволов в `content` надо использовать escaped unicode. Например,  
`\0a` — перенос строки  
`\a0` — неразрывный пробел  
`\20` — пробел  
…

Например,

```html
<div class="some-element"></div>
```

```css
.some-element:before {
  content: "с \a0 приветом \0a из \a0 Москвы";
  white-space: pre;
  color: green;
}
```

<div class="test-special-symbols"></div>

<!--
http://stackoverflow.com/a/8595802
http://xiper.net/collect/html-and-css-tricks/content/insert-symbols
http://xiper.net/collect/services/calc-symbols.html
-->
