---
title: Футер, прижатый к низу страницы
date: "2014-09-12 23:57:55"
---

Самое элегантное решение, которое встречал &mdash; используем flexbox.

```html
<body>
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
</body>
```

```css
body {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
}

header,
footer {
    flex-shrink: 0;
}

main {
    flex: 1 0 auto;
}
```
