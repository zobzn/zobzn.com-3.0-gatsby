---
title: Адаптивный размер шрифта с ограничением
date: "2019-08-31 11:18:23"
---

Задача: начиная с ширины экрана N вплоть до M менять размер шрифта с X по Y.  
Решение: mixin для sass ))

```scss
/**
 * Плавное изменение значения свойства между двумя брекпойнтами
 */
@mixin adaptive-property(
  $property,
  $min-value,
  $max-value,
  $min-break-point,
  $max-break-point
) {
  $min-value-unitless: $min-value / ($min-value * 0 + 1);
  $max-value-unitless: $max-value / ($max-value * 0 + 1);
  $min-break-point-unitless: $min-break-point / ($min-break-point * 0 + 1);
  $max-break-point-unitless: $max-break-point / ($max-break-point * 0 + 1);

  & {
    #{$property}: $min-value;
  }

  @media screen and (min-width: $min-break-point) {
    $diff-value: $max-value-unitless - $min-value-unitless;
    $diff-media: $max-break-point-unitless - $min-break-point-unitless;
    $coefficient: $diff-value / $diff-media;
    #{$property}: calc(
      #{$min-value} + (100vw - #{$min-break-point}) * #{$coefficient}
    );
  }

  @media screen and (min-width: $max-break-point) {
    #{$property}: $max-value;
  }
}
```

Пример использования.

Например, для экрана 320px и меньше нужен размер шрифта 10px, для экрана 1024px и больше нужен размер шрифта 16px, и между этими двумя размерами экрана шрифт плавно меняется с 10 по 16px.

```scss
.some-selector {
  @include adaptive-property("font-size", 10px, 14px, 320px, 1024px);
}
```

Как понятно из названия миксина, его можно использовать не только для font-size. Например, между экранами 640px и 1280px плавно меняем padding с 10px по 40px:

```scss
.some-selector {
  @include adaptive-property("padding", 10px, 40px, 640px, 1280px);
}
```
