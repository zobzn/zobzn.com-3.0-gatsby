---
title: Определение браузера в css (хаки)
date: "2014-03-05 23:37:08"
---

Допустим нужно применить какие-то стили, зависящие от браузера, к элементу `<span class="test-hack">`

<h3 class="test-hack test-hack-webkit">Webkit (chrome, safari, opera 15+ …)</h3>

```css
_:-webkit-any-link, :root .test-hack { ... }
```

<h3 class="test-hack test-hack-ff">Firefox</h3>

```css
@-moz-document url-prefix() {
    .test-hack {
        ...
    }
}
```

<h3 class="test-hack test-hack-presto">Presto (Opera 9.5-12)</h3>

```css
_:-o-prefocus, .test-hack { ... }
```

<h3 class="test-hack test-hack-ie6">IE6</h3>

```css
* html .test-hack { ... }
```

<h3 class="test-hack test-hack-ie7">IE7</h3>

```css
*:first-child+html .test-hack { ... }
*+html .test-hack { ... }
```

<h3 class="test-hack test-hack-not-ie6">not IE6</h3>

```css
html > body .test-hack { ... }
```

<h3 class="test-hack test-hack-not-ie8">not IE8</h3>

```css
.test-hack, #ie#fix { ... }
```

<h3 class="test-hack test-hack-not-ie68">not IE6-8</h3>

```css
:root .test-hack { ... }
```

<h3 class="test-hack test-hack-ie1011">IE10-IE11</h3>

```css
_:-ms-input-placeholder, :root .test-hack { ... }
```

<h3 class="test-hack test-hack-ie11">IE11</h3>

```css
_:-ms-fullscreen, :root .test-hack { ... }
```

<h3 class="test-hack test-hack-edge">MS Edge</h3>

```css
@supports (-ms-ime-align:auto) { .test-hack { ... } }
```
