---
title: Кнопка очистки текста в инпуте
date: "2014-06-15 23:44:10"
---

Задача. Добавить к текстовому полю функционал очистки значения.
Если инпут не заполнен, то инпут отображается как обычно.
Если заполнен, то добавляем к нему крестик, клик по которому приводит к очистке поля.
Получиться должно что-то типа такого.

![](/images/notes/zbz-input-clearable/example.png)

Идея взята в одном из [ответов](http://stackoverflow.com/questions/6258521/clear-icon-inside-input-text) на stackoverflow и немного доработана.
А сама идея заключается в том, чтобы не усложнять разметку, не добавлять лишних элементов, а обойтись только самим инпутом.

Сам крестик добавляется к инпуту с помощью фоновой картинки.
А кликабельность картинки имитируем с помощью небольшого скрипта.
Зная координаты курсора в момент клика и позицию крестика внутри инпута, можно определить произошел клик по крестику либо вне его.

Итак, html разметка (функционал будет добавляться инпутам с классом `zbz-input-clearable`):

```html
<input type="text" value="тест" class="zbz-input-clearable" />
```

Добавляем крестик

```css
.zbz-input-clearable {
  /* ставим инпуту фоновую картинку, но отображаем ее за пределами инпута - 150% в background-position */
  background-image: url("input-clearable-x.png");
  background-position: 150% 50%;
  background-repeat: no-repeat;
  transition: background 0.4s;
  /* добавляем справа небольшой padding, чтоб текст не залазил поверх крестика */
  padding-right: 27px;
}
.zbz-input-clearable--x {
  /* когда нужно отобразить крестик, перемещаем в правый конец инпута */
  background-position: 100% 50%;
}
.zbz-input-clearable--x-over {
  /* и подготовим стиль для ховера по крестику */
  background-image: url("input-clearable-x-hover.png");
  cursor: pointer;
}
.zbz-input-clearable::-ms-clear {
  /* убираем родной крестик очистки в IE */
  display: none;
}
```

И потом немного скриптовой магии

```javascript
(function($) {
  var input_class = "zbz-input-clearable",
    input_class_x = input_class + "--x",
    input_class_x_over = input_class + "--x-over",
    input_selector = "." + input_class,
    input_selector_x = "." + input_class_x,
    input_selector_x_over = "." + input_class_x_over,
    event_main = input_class + "-init",
    event_names = [
      event_main,
      "focus drop paste keydown keypress input change"
    ].join(" "),
    btn_width = 13,
    btn_height = 13,
    btn_margin = 7;

  function tog(v) {
    return v ? "addClass" : "removeClass";
  }

  $(document).on(event_names, input_selector, function() {
    $(this)[tog(this.value)](input_class_x);
  });

  $(document).on("mousemove", input_selector_x, function(e) {
    var input = $(this),
      input_width = this.offsetWidth,
      input_height = this.offsetHeight,
      input_border_bottom = parseFloat(input.css("borderBottomWidth")),
      input_border_right = parseFloat(input.css("borderRightWidth")),
      input_border_left = parseFloat(input.css("borderLeftWidth")),
      input_border_top = parseFloat(input.css("borderTopWidth")),
      input_border_hr = input_border_left + input_border_right,
      input_border_vr = input_border_top + input_border_bottom,
      client_rect = this.getBoundingClientRect(),
      input_cursor_pos_x = e.clientX - client_rect.left,
      input_cursor_pos_y = e.clientY - client_rect.top,
      is_over_cross = true;

    is_over_cross =
      is_over_cross &&
      input_cursor_pos_x >=
        input_width - input_border_hr - btn_margin - btn_width;
    is_over_cross =
      is_over_cross &&
      input_cursor_pos_x <= input_width - input_border_hr - btn_margin;
    is_over_cross =
      is_over_cross &&
      input_cursor_pos_y >= (input_height - input_border_vr - btn_height) / 2;
    is_over_cross =
      is_over_cross &&
      input_cursor_pos_y <=
        (input_height - input_border_vr - btn_height) / 2 + btn_height;

    $(this)[tog(is_over_cross)](input_class_x_over);
  });

  $(document).on("click", input_selector_x_over, function() {
    $(this)
      .removeClass([input_class_x, input_class_x_over].join(" "))
      .val("")
      .trigger("input");
  });

  $(function() {
    $(input_selector).trigger(event_main);
  });
})(jQuery);
```

Пример

<input type="text" class="zbz-input-clearable zbz-input-clearable--x" value="тест" />
