---
title: Перестановка блоков местами с помощью css, не используя скриптов
date: "2014-06-16 23:50:40"
---

Задача: визуально поменять местами два блока, не переставляя их в исходном коде и не применяя javascript.
Особенно это актуально в целях продвижения в поисковых системах.
Перестановки двух типов: вертикальная и горизонтальная.

Для начала горизонтальная перестановка. Возьмем простой html.

```html
<div class="swap-hr">
  <span class="swap-hr__foot">[переместится вправо]</span>
  <span class="swap-hr__body">[останется в середине]</span>
  <span class="swap-hr__head">[переместится влево]</span>
</div>
```

Стили на основе банальных float.

```css
.swap-hr {
  display: inline-block;
}
.swap-hr__body {
  float: right;
}
.swap-hr__head {
  float: left;
}
.swap-hr__foot {
  float: right;
}
```

Либо другой вариант с помощью волшебного flexbox.

```css
.swap-hr {
  display: inline-flex;
  flex-direction: row-reverse;
}
```

Результат

<pre>
до:     [переместится вправо][останется в середине][переместится влево]
после:  [переместится влево][останется в середине][переместится вправо]
</pre>

Для вертикальной перестановки возьмем аналогичный простой html.

```html
<div class="swap-vr">
  <span class="swap-vr__foot">[переместится вниз]</span>
  <span class="swap-vr__body">[останется в середине]</span>
  <span class="swap-vr__head">[переместится вверх]</span>
</div>
```

Можем переставить местами можно с помощью условно табличной верстки.
Шапка таблицы `<thead>` всегда отображается вверху таблицы, а футер `<tfoot>` — внизу.
Вот и используем для перестановки варианты свойства `display`: `table`, `table-header-group`, `table-row-group` и `table-footer-group`.

```css
.swap-vr {
  border-collapse: collapse;
  border-spacing: 0;
  display: table;
}
.swap-vr__head {
  display: table-header-group;
}
.swap-vr__body {
  display: table-row-group;
}
.swap-vr__foot {
  display: table-footer-group;
}
```

Либо тот же волшебный flexbox.

```css
.swap-vr {
  display: flex;
  flex-direction: column-reverse;
}
```

Результат в обоих случаях будет одинаковый.

<pre>
до:                            после:
[переместится вниз]            [переместится вверх]
[останется в середине]         [останется в середине]
[переместится вверх]           [переместится вниз]
</pre>

Вариант с flexbox, конечно, выигрывает.
Изящный, гибкий, лаконичный.
Но, к сожалению, частенько приходится учитывать старые браузеры, в которых он [не поддерживается](http://caniuse.com/flexbox).
