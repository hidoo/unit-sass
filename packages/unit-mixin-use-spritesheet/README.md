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

### Usage with custom variables

```scss
$custom-spritesheets: (
  "icon-image": (
    "image": "path/to/sprite/icon-image.png",
    "items": (
      "logo": (
        "width": 10px,
        "height": 10px,
        "total-width": 30px,
        "total-height": 30px,
        "offset-x": -10px,
        "offset-y": -10px
      )
    )
  )
);

// define hook that change to use $custom-spritesheets
@function use-spritesheet-hook-resolve-spritesheets() {
  @if global-variable-exists("custom-spritesheets") {
    @return $custom-spritesheets;
  }

  @return null;
}
```

### Usage with suffix of item state

The state can be expressed by specifying the following suffix in the item name.

| Suffix                  | Example              | State                                                     |
| :---------------------- | :------------------- | :-------------------------------------------------------- |
| (None)                  | `example`            | (Default)                                                 |
| `--focus`               | `example--focus`     | Styles in `:hover, :focus, .is-focus`                     |
| `--current`             | `example--current`   | Styles in `.is-current`.                                  |
| `--disabled`            | `example--disabled`  | Styles in `:disabled, .is-disabled`.                      |
| `--if-mobile`           | `example--if-mobile` | Styles at mobile viewport.                                |
| `--focus--if-mobile`    | `example--focus--if-mobile`     | Styles in `:hover, :focus, .is-focus` at mobile viewport. |
| `--current--if-mobile`  | `example--current--if-mobile`   | Styles in `.is-current` at mobile viewport.               |
| `--disabled--if-mobile` | `example--disabled--if-mobile`  | Styles in `:disabled, .is-disabled` at mobile viewport.   |

## Test

```sh
$ yarn test
```

## License

MIT
