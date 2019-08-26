---
title: Полезности в css
date: "2014-03-05 23:09:09"
---

### Условные комментарии

```html
<!--[if IE]> ... <![endif]-->
- код для всех IE
<!--[if IE 6]> ... <![endif]-->
- код для IE6
<!--[if IE lt 7]> ... <![endif]-->
- код для IE6
<!--[if IE lte 7]> ... <![endif]-->
- код для IE6 и IE7
<!--[if IE gt 6]> ... <![endif]-->
- код для IE старшей 6-й версии
<!--[if IE gte 6]> ... <![endif]-->
- код для IE 6-й версии и выше
<!--[if !IE]-->
...
<!--[endif]-->
- код для не IE браузеров
```

### Условные комментарии на стероидах

```html
<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if lt IE 7]><html class="if-ie if-ie6 if-lt-ie9 if-lt-ie8 if-lt-ie7"><![endif]-->
<!--[if IE 7]><html class="if-ie if-ie7 if-lt-ie9 if-lt-ie8"><![endif]-->
<!--[if IE 8]><html class="if-ie if-ie8 if-lt-ie9"><![endif]-->
<!--[if IE 9]><html class="if-ie if-ie9"><![endif]-->
<!--[if gt IE 9]><!--><html><!--<![endif]--></html>
```

## Селекторы

### IE7+

<dl>
	<dt><code>A + B</code></dt>
	<dd>соседний селектор (стили для B, который расположен непосредственно после A)</dd>
	<dt><code>A ~ B</code></dt>
	<dd>родственный селектор (стили для B, которые расположены после A)</dd>
	<dt><code>A &gt; B</code></dt>
	<dd>дочерний селектор (стили для B, которые расположены непосредственно в A)</dd>
	<dt><code>[attr]</code></dt>
	<dd>селектор аттрибута (стили для элемента, у которого есть аттрибут attr)</dd>
	<dt><code>[attr=&quot;value&quot;]</code></dt>
	<dd>селектор аттрибута (&lt;a attr=&quot;value&quot;&gt;)</dd>
	<dt><code class="language-css">[attr^=&quot;val&quot;]</code></dt>
	<dd>селектор аттрибута (&lt;a attr=&quot;value&quot;&gt;)</dd>
	<dt><code class="language-css">[attr$=&quot;lue&quot;]</code></dt>
	<dd>селектор аттрибута (&lt;a attr=&quot;value&quot;&gt;)</dd>
	<dt><code class="language-css">[attr*=&quot;alu&quot;]</code></dt>
	<dd>селектор аттрибута (&lt;a attr=&quot;value&quot;&gt;)</dd>
	<dt><code class="language-css">[attr~=&quot;val2&quot;]</code></dt>
	<dd>селектор аттрибута (&lt;a attr=&quot;val1 val2 val3&quot;&gt;)</dd>
	<dt><code class="language-css">[attr|=&quot;key&quot;]</code></dt>
	<dd>селектор аттрибута (&lt;a attr=&quot;key-val&quot;&gt;)</dd>
</dl>

## Псевдоэлементы

### IE8+

<dl>
    <dt><code class="language-css">:before</code></dt>
    <dd>псевдоэлемент в начале</dd>
    <dt><code class="language-css">:after</code></dt>
    <dd>псевдоэлемент в конце</dd>
</dl>

## Псевдоклассы

### IE9+

<dl>
    <dt><code class="language-css">:root</code></dt>
    <dd>корневой элемент</dd>
    <dt><code class="language-css">:checked</code></dt>
    <dd>включенные чекбоксы и радиокнопки</dd>
    <dt><code class="language-css">:target</code></dt>
    <dd>элемент, id которого соответствуют хешу урла (например, <code class="language-css">:target</code> = <code class="language-html">&lt;div id=&quot;test&quot;&gt;&lt;/div&gt;</code> при открытии страницы http://example.org/#test)</dd>
    <dt><code class="language-css">:not</code></dt>
    <dd>элементы которые <b>не</b> соответствуют указанному селектору (<code class="language-css">div:not(.red)</code>)</dd>
</dl>
