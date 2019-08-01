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

SCSS

```scss
// import spritesheet variables
@import "path/to/sprite/icon-image";

// use mixin inside block
.selector {
  @include use-spritesheet($type: "icon-image", $name: "logo");
}
```

CSS Outputs

```css
.selector-logo {
  /* spritesheet settings */
}
```

## Supported format of spritesheet

This mixin support following format of spritesheet.

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

| Suffix                  | Example                        | State                                                     |
| :---------------------- | :----------------------------- | :-------------------------------------------------------- |
| (None)                  | `example`                      | (Default)                                                 |
| `--focus`               | `example--focus`               | Styles in `:hover, :focus, .is-focus`                     |
| `--disabled`            | `example--disabled`            | Styles in `:disabled, .is-disabled`.                      |
| `--if-mobile`           | `example--if-mobile`           | Styles at mobile viewport.                                |
| `--focus--if-mobile`    | `example--focus--if-mobile`    | Styles in `:hover, :focus, .is-focus` at mobile viewport. |
| `--disabled--if-mobile` | `example--disabled--if-mobile` | Styles in `:disabled, .is-disabled` at mobile viewport.   |

#### When `$options: ("toggle": false);`

| Suffix                 | Example                       | State                                       |
| :--------------------- | :---------------------------- | :------------------------------------------ |
| `--current`            | `example--current`            | Styles in `.is-current`.                    |
| `--current--if-mobile` | `example--current--if-mobile` | Styles in `.is-current` at mobile viewport. |

#### When `$options: ("toggle": true);`

| Suffix                            | Example                                  | State                                                                                                                                            |
| :-------------------------------- | :--------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| `--selected`                      | `example--selected`                      | Styles in `:checked, .is-selected`.                                                                                                              |
| `--selected--focus`               | `example--selected--focus`               | Styles in `:checked:hover, :checked:focus :checked.is-focus, .is-selected:hover, .is-selected:focus .is-selected.is-focus`.                      |
| `--selected--disabled`            | `example--selected--disabled`            | Styles in `:checked:disabled :checked.is-disabled, .is-selected:disabled .is-selected.is-disabled`.                                              |
| `--selected--if-mobile`           | `example--selected--if-mobile`           | Styles in `:checked, .is-selected` at mobile viewport.                                                                                           |
| `--selected--focus--if-mobile`    | `example--selected--focus--if-mobile`    | Styles in `:checked:hover, :checked:focus, :checked.is-focus, .is-selected:hover, .is-selected:focus, .is-selected.is-focus` at mobile viewport. |
| `--selected--disabled--if-mobile` | `example--selected--disabled--if-mobile` | Styles in `:checked:disabled, :checked.is-disabled, .is-selected:disabled, .is-selected.is-disabled` at mobile viewport.                         |

## API

<a id="spritesheets-function-_use-spritesheet-get-sheet-by-type"></a>

### @function \_use-spritesheet-get-sheet-by-type

get sheet by type from values of spritesheets

+ **Group:** Spritesheets
+ **Access:** private

#### Parameters

| Name            | Type                                                             | Description          | Default |
| :-------------- | :--------------------------------------------------------------- | :------------------- | :------ |
| `$type`         | **[String](https://sass-lang.com/documentation/values/strings)** | type of spritesheet  | -       |
| `$spritesheets` | **[Map](https://sass-lang.com/documentation/values/maps)**       | data of spritesheets | `()`    |

#### Returns

**[Map](https://sass-lang.com/documentation/values/maps)**, **[Null](https://sass-lang.com/documentation/values/null)**

#### Dependents

+ **@mixin use-spritesheet** use spritesheet settings

<a id="spritesheets-function-_use-spritesheet-resolve-spritesheets"></a>

### @function \_use-spritesheet-resolve-spritesheets

resolve values of spritesheets

+ **Group:** Spritesheets
+ **Access:** private

#### Returns

**[Map](https://sass-lang.com/documentation/values/maps)**, **[Null](https://sass-lang.com/documentation/values/null)**

#### Dependents

+ **@mixin use-spritesheet** use spritesheet settings

<a id="spritesheets-mixin-_use-spritesheet-define-responsive"></a>

### @mixin \_use-spritesheet-define-responsive

define responsive item

+ **Group:** Spritesheets
+ **Access:** private

#### Parameters

| Name       | Type                                                             | Description              | Default |
| :--------- | :--------------------------------------------------------------- | :----------------------- | :------ |
| `$name`    | **[String](https://sass-lang.com/documentation/values/strings)** | name of spritesheet item | -       |
| `$items`   | **[Map](https://sass-lang.com/documentation/values/maps)**       | spritesheet items        | `()`    |
| `$options` | **[Map](https://sass-lang.com/documentation/values/maps)**       | options                  | `()`    |

#### Dependencies

+ **[@mixin \_use-spritesheet-set-properties](#spritesheets-mixin-_use-spritesheet-set-properties)**

#### Dependents

+ **@mixin use-spritesheet** use spritesheet settings

<a id="spritesheets-mixin-_use-spritesheet-define-toggle-responsive"></a>

### @mixin \_use-spritesheet-define-toggle-responsive

define responsive toggle item

+ **Group:** Spritesheets
+ **Access:** private

#### Parameters

| Name       | Type                                                             | Description              | Default |
| :--------- | :--------------------------------------------------------------- | :----------------------- | :------ |
| `$name`    | **[String](https://sass-lang.com/documentation/values/strings)** | name of spritesheet item | -       |
| `$items`   | **[Map](https://sass-lang.com/documentation/values/maps)**       | spritesheet items        | `()`    |
| `$options` | **[Map](https://sass-lang.com/documentation/values/maps)**       | options                  | `()`    |

#### Dependencies

+ **[@mixin \_use-spritesheet-set-properties](#spritesheets-mixin-_use-spritesheet-set-properties)**

#### Dependents

+ **@mixin use-spritesheet** use spritesheet settings

<a id="spritesheets-mixin-_use-spritesheet-define-toggle"></a>

### @mixin \_use-spritesheet-define-toggle

define toggle item

+ **Group:** Spritesheets
+ **Access:** private

#### Parameters

| Name       | Type                                                             | Description              | Default |
| :--------- | :--------------------------------------------------------------- | :----------------------- | :------ |
| `$name`    | **[String](https://sass-lang.com/documentation/values/strings)** | name of spritesheet item | -       |
| `$items`   | **[Map](https://sass-lang.com/documentation/values/maps)**       | spritesheet items        | `()`    |
| `$options` | **[Map](https://sass-lang.com/documentation/values/maps)**       | options                  | `()`    |

#### Dependencies

+ **[@mixin \_use-spritesheet-set-properties](#spritesheets-mixin-_use-spritesheet-set-properties)**

#### Dependents

+ **@mixin use-spritesheet** use spritesheet settings

<a id="spritesheets-mixin-_use-spritesheet-define"></a>

### @mixin \_use-spritesheet-define

define item

+ **Group:** Spritesheets
+ **Access:** private

#### Parameters

| Name       | Type                                                             | Description              | Default |
| :--------- | :--------------------------------------------------------------- | :----------------------- | :------ |
| `$name`    | **[String](https://sass-lang.com/documentation/values/strings)** | name of spritesheet item | -       |
| `$items`   | **[Map](https://sass-lang.com/documentation/values/maps)**       | spritesheet items        | `()`    |
| `$options` | **[Map](https://sass-lang.com/documentation/values/maps)**       | options                  | `()`    |

#### Dependencies

+ **[@mixin \_use-spritesheet-set-properties](#spritesheets-mixin-_use-spritesheet-set-properties)**

#### Dependents

+ **@mixin use-spritesheet** use spritesheet settings

<a id="spritesheets-mixin-_use-spritesheet-set-properties"></a>

### @mixin \_use-spritesheet-set-properties

set properties

+ **Group:** Spritesheets
+ **Access:** private

#### Parameters

| Name      | Type                                                               | Description         | Default |
| :-------- | :----------------------------------------------------------------- | :------------------ | :------ |
| `$values` | **[Map](https://sass-lang.com/documentation/values/maps)**         | values of item      | `()`    |
| `$use2x`  | **[Boolean](https://sass-lang.com/documentation/values/booleans)** | use 2x image or not | `false` |

#### Dependents

+ **@mixin \_use-spritesheet-define-responsive** define responsive item
+ **@mixin \_use-spritesheet-define-toggle-responsive** define responsive toggle item
+ **@mixin \_use-spritesheet-define-toggle** define toggle item
+ **@mixin \_use-spritesheet-define** define item

<a id="spritesheets-mixin-use-spritesheet"></a>

### @mixin use-spritesheet

use spritesheet settings

+ **Group:** Spritesheets
+ **Access:** public

#### Parameters

| Name                           | Type                                                               | Description                                               | Default           |
| :----------------------------- | :----------------------------------------------------------------- | :-------------------------------------------------------- | :---------------- |
| `$type`                        | **[String](https://sass-lang.com/documentation/values/strings)**   | type of spritesheet                                       | -                 |
| `$name`                        | **[String](https://sass-lang.com/documentation/values/strings)**   | name of spritesheet item                                  | -                 |
| `$options`                     | **[Map](https://sass-lang.com/documentation/values/maps)**         | options                                                   | `()`              |
| `$options.use2x`               | **[Boolean](https://sass-lang.com/documentation/values/booleans)** | use 2x image or (one of `true`, `false` or `"if-mobile"`) | `false`           |
| `$options.responsive`          | **[Boolean](https://sass-lang.com/documentation/values/booleans)** | responsive or not                                         | `false`           |
| `$options.toggle`              | **[Boolean](https://sass-lang.com/documentation/values/booleans)** | toggle or not                                             | `false`           |
| `$options.capturing-selectors` | **[List](https://sass-lang.com/documentation/values/lists)**       | capturing parent selectors                                | `("a", "button")` |

#### Examples

scss inputs

```scss
// format of spritesheets values
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

// use this
.selector {
  @include use-spritesheet($type: "icon-image", $name: "logo");
}
```

css outputs

```css
.selector-logo {
  overflow: hidden;
  text-indent: -100%;
  color: transparent;
  background-image: url(path/to/sprite/icon-image.png);
}
.selector-logo {
  width: 10px;
  height: 10px;
  background-position: -10px -10px;
  background-size: 30px 30px;
}
```

#### Dependencies

+ **[@function \_use-spritesheet-resolve-spritesheets](#spritesheets-function-_use-spritesheet-resolve-spritesheets)**
+ **[@function \_use-spritesheet-get-sheet-by-type](#spritesheets-function-_use-spritesheet-get-sheet-by-type)**
+ **[@mixin \_use-spritesheet-define](#spritesheets-mixin-_use-spritesheet-define)**
+ **[@mixin \_use-spritesheet-define-responsive](#spritesheets-mixin-_use-spritesheet-define-responsive)**
+ **[@mixin \_use-spritesheet-define-toggle](#spritesheets-mixin-_use-spritesheet-define-toggle)**
+ **[@mixin \_use-spritesheet-define-toggle-responsive](#spritesheets-mixin-_use-spritesheet-define-toggle-responsive)**

## Test

```sh
$ yarn test
```

## License

MIT
