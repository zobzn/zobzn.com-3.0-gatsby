---
title: css clearfix
date: "2014-03-05 23:34:53"
---

<h3>метод 1</h3>

<pre>
<code class="language-css">.container {
    box-sizing: border-box;
    display: inline-block;
    width: 100%;
    zoom: 1;
}</code></pre>

<h3>метод 2</h3>

<pre>
<code class="language-css">.container:before,
.container:after {
    content: " ";
    display: table;
}
.container:after {
    clear: both;
}
.container {
    zoom: 1;
}</code></pre>

<h3>метод 3</h3>

<pre>
<code class="language-css">.container {
    overflow: hidden;
    display: block;
    zoom: 1;
}</code></pre>
