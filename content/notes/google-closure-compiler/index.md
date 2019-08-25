---
title: Google Closure Compiler
date: "2014-01-13 23:04:29"
---

«Компилятор» javascript от гугля. Качать со [страницы проекта](http://code.google.com/closure/compiler/) на google code.

Поддерживает [3 уровня](http://code.google.com/closure/compiler/docs/compilation_levels.html) оптимизации:

Удаление пробельных символов и комментариев.
```bash
java -jar compiler.jar --compilation_level WHITESPACE_ONLY --js input.js --js_output_file input.min.js
```

Простая оптимизация (укорачивает локальные переменные).  
Используется по умолчанию.
```bash
java -jar compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS --js input.js --js_output_file input.min.js
```

Продвинутая оптимизация (укорачивает все: локальные, глобальные переменные и функции).  
К коду предъявляется очень [много][1] [требований][2].
```bash
java -jar compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --js input.js --js_output_file input.min.js
```

[1]: http://code.google.com/closure/compiler/docs/limitations.html
[2]: http://code.google.com/closure/compiler/docs/js-for-compiler.html
