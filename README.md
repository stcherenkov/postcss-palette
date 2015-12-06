# PostCSS Palette [![Build Status][ci-img]][ci]

[PostCSS] plugin for colors management using external palettes.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/stcherenkov/postcss-palette.svg
[ci]:      https://travis-ci.org/stcherenkov/postcss-palette

## Example

```js
/* palette.js */

module.exports = {
    red: '#fa1200',
    green: '#1f0',
    blue: 'rgb(0, 42, 240)'
}
```

```js
var palette = require('postcss-palette');

postcss([ palette({ palette: require('/path/to/palette') }) ]);
```

```css
.foo {
    background-color: red;
    color: green;
    text-shadow: 0 0 5px blue;
    box-shadow: 0 0 5px blue;
    border-color: green;
}
```

```css
.foo {
    background-color: #fa1200;
    color: #1f0;
    text-shadow: 0 0 5px rgb(0, 42, 240);
    box-shadow: 0 0 5px rgb(0, 42, 240);
    border-color: #1f0;
}
```

## Usage

```js
postcss([ require('postcss-palette') ])
```

See [PostCSS] docs for examples for your environment.
