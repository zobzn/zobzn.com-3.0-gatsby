---
title: Responsive video с фиксированным соотношением сторон
date: "2019-09-08 17:42:51"
---

Сначала создаем элемент контейнер, в котором реализуем нужное соотношение сторон с помощью padding, потом помещаем видео в этот контейнер, и абсолютным позиционированием растягиваем на весь размер контейнера.

Нужное соотношение стороно получаем с помощью вертикального padding. Если указывать его в процентах, то он будет рассчитываться от ширины элемента. Например, если нужно соотношение стороно 16:9, то ставим `padding-bottom: 56.25%` (`16:9 это 100% * 9 / 16 = 56.25%`); если нужно 16:10, то ставим 62.5%.

А растянуть видео можно или с помощью `top: 0; left: 0; width: 100%; height: 100%;` или с помощью `top: 0; left: 0; right: 0; bottom: 0;`.

В итоге получается что-то типа такого.

```css
.media-embed-wrapper {
  box-sizing: border-box;
  max-width: 800px;
}

.media-embed {
  box-sizing: border-box;
  position: relative;
  border: none;
  width: auto;
  padding: 0;
  margin: 0;
  height: 0;
}

.media-embed,
.media-embed--16x9 {
  padding: 0 0 56.25% 0; /* 16:9 */
}

.media-embed--16x10 {
  padding: 0 0 62.5% 0; /* 16:10 */
}

.media-embed iframe,
.media-embed object,
.media-embed embed {
  box-sizing: border-box;
  position: absolute;
  border: none;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  left: 0;
  top: 0;
}
```

```html
<div class="media-embed-wrapper">
  <div class="media-embed">
    <object
      data="https://www.youtube.com/embed/hNQFjqDvPhA?rel=0"
      standby="Загрузка…"
    ></object>
  </div>
</div>
```

<br />

<div class="media-embed-wrapper" style="max-width: 600px;">
  <div class="media-embed">
    <object
      data="https://www.youtube.com/embed/hNQFjqDvPhA?rel=0"
      standby="Загрузка…"
    ></object>
  </div>
</div>
