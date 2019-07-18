# @hidoo/unit-mixin-use-spritesheet

> Mixin for using spritesheet in @hidoo/unit framework.

## Installation

```sh
$ npm install @hidoo/unit @hidoo/unit-mixin-use-spritesheet
```

## Usage

```scss
@import "node_modules/@hidoo/unit/src/index.scss";
@import "node_modules/@hidoo/unit-mixin-use-spritesheet/src/index.scss";
```

### Import with [node-sass-magic-importer](https://github.com/maoberlehner/node-sass-magic-importer)

```scss
@import "~@hidoo/unit";
@import "~@hidoo/unit-mixin-use-spritesheet";
```

### Usage for this mixin

```scss
// import spritesheet variables in advance
@import "path/to/sprite/icon-image";

// use mixin inside block
.selector {
  @include use-spritesheet($type: "icon-image", $name: "logo");
}
// -> .selector-logo { ... }
```

## Supported format of spritesheet

This mixin is support following format of spritesheet.

```scss
$sprites: (
  // output each by files of spritesheet
  "icon-image": (
    "image": "path/to/sprite/icon-image.png",
    "items": (
      // output each by items
      "logo": (
        "width": 10px,
        "height": 10px,
        "total-width": 30px,
        "total-height": 30px,
        "offset-x": -10px,
        "offset-y": -10px
      ),
      ...
    )
  ),
  ...
);
```

## Test

```sh
$ yarn test
```

## License

MIT
