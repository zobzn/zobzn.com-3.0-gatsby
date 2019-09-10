---
title: Адаптивная верстка без медиа запросов
date: "2019-09-10 19:21"
---

Интересный способ преобразования колонок в строки с помощью flexbox без медиа запросов.

Например, на широком экране отображаются три колонки, на узком — одна.

```css
.container {
  margin: 1rem auto;
  max-width: 900px;
  flex-wrap: wrap;
  display: flex;
}

.cell {
  box-sizing: border-box;
  max-width: 100%;
  min-width: 33%;
  flex-grow: 1;
  flex-basis: calc((40rem - 100%) * 999);
  padding: 0.5rem;
  color: #fff;
}

.cell:before {
  border-radius: 3px;
  background: #333;
  display: block;
  content: " ";
  height: 5rem;
}
```

```html
<div class="container">
  <div class="cell"></div>
  <div class="cell"></div>
  <div class="cell"></div>
  <div class="cell"></div>
  <div class="cell"></div>
  <div class="cell"></div>
</div>
```

<br />

Результат (поизменяйте ширину браузера)

<style>
.container {
  max-width: 900px;
  flex-wrap: wrap;
  margin: 1rem 0;
  display: flex;
}

.cell {
  box-sizing: border-box;
  max-width: 100%;
  min-width: 33%;
  flex-grow: 1;
  flex-basis: calc((40rem - 100%) * 999);
  padding: 0.5rem;
  color: #fff;
}

.cell:before {
  border-radius: 3px;
  background: #ccc;
  display: block;
  content: " ";
  height: 3rem;
}
</style>

<div class="container">
  <div class="cell"></div>
  <div class="cell"></div>
  <div class="cell"></div>
  <div class="cell"></div>
  <div class="cell"></div>
  <div class="cell"></div>
</div>
