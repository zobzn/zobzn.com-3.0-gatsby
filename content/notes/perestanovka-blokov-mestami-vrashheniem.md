---
title: Перестановка блоков местами вращением
date: "2014-07-01 14:02:36"
---

Нашел еще один способ перестановки местами нескольких блоков, используя только css.

Для примера, некий простенький html.

```html
<table class="demo-rotate">
  <tr>
    <td><span class="demo-rotate__item">первый текст</span></td>
  </tr>
  <tr>
    <td><span class="demo-rotate__item">второй текст</span></td>
  </tr>
</table>
```

Далее с помощью трансформации вращения, перевернем обрабляющий элемент на 180°, а сами блоки перекрутим назад на те же 180°.

```css
.demo-rotate {
  transform: rotate(180deg);
}
.demo-rotate__item {
  transform: rotate(-180deg);
}
```

Наглядно, процесс перемещения виден при наведении курсора.

<div class="demo-hover">
    <table class="demo-rotate">
        <tbody>
            <tr>
                <td><span class="demo-rotate__item">первый текст</span></td>
            </tr>
            <tr>
                <td><span class="demo-rotate__item">второй текст</span></td>
            </tr>
        </tbody>
    </table>
</div>

<br />

<div class="demo-hover">
    <table class="demo-rotate">
        <tbody>
            <tr>
                <td><span class="demo-rotate__item">первый текст</span></td>
                <td><span class="demo-rotate__item">второй текст</span></td>
            </tr>
        </tbody>
    </table>
</div>

<br />

А если использовать [матрицу преобразований](http://htmlbook.ru/blog/matritsa-preobrazovanii), то теоретически этот способ может заработать и в старых версиях ie.
