---
title: Подчеркивание градиентами
date: "2014-03-23 23:23:39"
---

Оказывается, <span class="test-underline">подчеркивание</span> <span class="test-dashed">можно</span> <span class="test-dotted">делать</span> с помощью градиентов.

```css
.test-underline {
    background: linear-gradient(to right, #999, #999 100%);
    background-position: 0 100%;
    background-size: 10px 1px;
    background-repeat: repeat-x;
}

.test-dashed {
    background: linear-gradient(to right, #999, #999 60%, transparent 60%);
    background-position: 0 100%;
    background-repeat: repeat-x;
    background-size: 10px 1px;
}

.test-dotted {
    background: linear-gradient(to right, #999, #999 50%, transparent 50%);
    background-repeat: repeat-x;
    background-position: 0 100%;
    background-size: 3px 1px;
}
```

А еще возможно когда-нибудь заработают css свойства <code class="test-decoration-color">text-decoration-color</code> и <code class="test-decoration-style">text-decoration-style</code>.

```css
.test-decoration-color {
    text-decoration-color: #999;
    text-decoration: underline;
}

.test-decoration-style {
    text-decoration-style: dotted;
    text-decoration: underline;
}
```
