/* eslint-disable max-len, no-magic-numbers, max-statements */

import assert from 'assert';
import {eachTestCases, existOrEmptyString, normalizeGlobalSettings} from '@hidoo/unit-test-util';

describe('@mixin use-spritesheet($type, $name, $options)', () => {

  /**
   * wrapper
   * @param {String|Null} type type of spritesheet
   * @param {String|Null} name of spritesheet item
   * @param {String|Null} options options
   * @param {String|Null} spritesheets values of spritesheets
   * @param {Object} globalSettings global settings
   * @return {String}
   */
  function wrapper(type, name, options, spritesheets, globalSettings = {}) { // eslint-disable-line max-params
    const args = [
      existOrEmptyString(type) ? `$type: ${type}` : false,
      existOrEmptyString(name) ? `$name : ${name}` : false,
      existOrEmptyString(options) ? `$options: ${options}` : false
    ];

    return `
${normalizeGlobalSettings(globalSettings)}
@import "../../node_modules/@hidoo/unit/src/lib";
@import "src/index.scss";

${existOrEmptyString(spritesheets) ? spritesheets : ''}

.selector {
  @include use-spritesheet(${args.filter((arg) => arg !== false).join(', ')});
}
    `;
  }

  it('should throw error if argument "$type" is not valid string.', async () => {
    const cases = [
      {params: ['null', '"hoge"']},
      {params: ['0', '"hoge"']},
      {params: ['())', '"hoge"']},
      {params: ['#000', '"hoge"']},
      {params: ['""', '"hoge"']}
    ];

    await eachTestCases(cases, wrapper, ({error}, {resolve}) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should throw error if argument "$name" is not valid string.', async () => {
    const cases = [
      {params: ['"hoge"', 'null']},
      {params: ['"hoge"', '0']},
      {params: ['"hoge"', '())']},
      {params: ['"hoge"', '#000']},
      {params: ['"hoge"', '""']}
    ];

    await eachTestCases(cases, wrapper, ({error}, {resolve}) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should not out if spritesheets value is not found.', async () => {
    const cases = [
      {
        params: ['"hoge"', '"fuga"', null, ''],
        expected: ''
      }
    ];

    await eachTestCases(cases, wrapper, ({error, result, expected}, {resolve, reject}) => {
      if (error) {
        return reject(error);
      }

      const actual = result.css.toString().trim();

      assert(actual === expected);
      return resolve();
    });
  });

  it('should not out if specified $type value in spritesheets is not found.', async () => {
    const cases = [
      {
        params: ['"hoge"', '"fuga"', null, '$sprites: ();'],
        expected: ''
      },
      {
        params: ['"hoge"', '"fuga"', null, '$sprites: ("hoge": ());'],
        expected: ''
      },
      {
        params: ['"hoge"', '"fuga"', null, '$sprites: ("hoge": ("image": "path/to/hoge.png"));'],
        expected: ''
      },
      {
        params: ['"hoge"', '"fuga"', null, '$sprites: ("hoge": ("items": ()));'],
        expected: ''
      }
    ];

    await eachTestCases(cases, wrapper, ({error, result, expected}, {resolve, reject}) => {
      if (error) {
        return reject(error);
      }

      const actual = result.css.toString().trim();

      assert(actual === expected);
      return resolve();
    });
  });

  it('should out spritesheet settings.', async () => {
    const cases = [
      {
        params: [
          '"icon-image"',
          '"logo"',
          null,
          `
          $sprites: (
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
          `
        ],
        expected:
`.selector-logo {
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
}`
      }
    ];

    await eachTestCases(cases, wrapper, ({error, result, expected}, {resolve, reject}) => {
      if (error) {
        return reject(error);
      }

      const actual = result.css.toString().trim();

      assert(actual === expected);
      return resolve();
    }, {outputStyle: 'expanded'});
  });

  it('should out spritesheet settings by custom variable specified by hook if @function use-spritesheet-hook-resolve-spritesheets is defined.', async () => {
    const cases = [
      {
        params: [
          '"icon-image"',
          '"logo"',
          null,
          `
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
          @function use-spritesheet-hook-resolve-spritesheets() {
            @if global-variable-exists("custom-spritesheets") {
              @return $custom-spritesheets;
            }
            @return null;
          }
          `
        ],
        expected:
`.selector-logo {
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
}`
      }
    ];

    await eachTestCases(cases, wrapper, ({error, result, expected}, {resolve, reject}) => {
      if (error) {
        return reject(error);
      }

      const actual = result.css.toString().trim();

      assert(actual === expected);
      return resolve();
    }, {outputStyle: 'expanded'});
  });

  it('should out 2x spritesheet settings if argument $options is ("use2x": true).', async () => {
    const cases = [
      {
        params: [
          '"icon-image"',
          '"logo"',
          '("use2x": true)',
          `
          $sprites: (
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
          `
        ],
        expected:
`.selector-logo {
  overflow: hidden;
  text-indent: -100%;
  color: transparent;
  background-image: url(path/to/sprite/icon-image.png);
}

.selector-logo {
  width: 5px;
  height: 5px;
  background-position: -5px -5px;
  background-size: 15px 15px;
}`
      }
    ];

    await eachTestCases(cases, wrapper, ({error, result, expected}, {resolve, reject}) => {
      if (error) {
        return reject(error);
      }

      const actual = result.css.toString().trim();

      assert(actual === expected);
      return resolve();
    }, {outputStyle: 'expanded'});
  });

  it('should out responsive spritesheet settings if argument $options is ("responsive": true).', async () => {
    const cases = [
      {
        params: [
          '"icon-image"',
          '"logo"',
          '("responsive": true)',
          `
          $sprites: (
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
                ),
                "logo--if-mobile": (
                  "width": 20px,
                  "height": 20px,
                  "total-width": 30px,
                  "total-height": 30px,
                  "offset-x": -4px,
                  "offset-y": -4px
                )
              )
            )
          );
          `
        ],
        expected:
`.selector-logo {
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

@media only screen and (max-width: 666px) {
  .selector-logo {
    width: 20px;
    height: 20px;
    background-position: -4px -4px;
    background-size: 30px 30px;
  }
}`
      }
    ];

    await eachTestCases(cases, wrapper, ({error, result, expected}, {resolve, reject}) => {
      if (error) {
        return reject(error);
      }

      const actual = result.css.toString().trim();

      assert(actual === expected);
      return resolve();
    }, {outputStyle: 'expanded'});
  });


  it('should out responsive spritesheet settings if argument $options is ("use2x": "if-mobile", "responsive": true).', async () => {
    const cases = [
      {
        params: [
          '"icon-image"',
          '"logo"',
          '("use2x": if-mobile, "responsive": true)',
          `
          $sprites: (
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
                ),
                "logo--if-mobile": (
                  "width": 20px,
                  "height": 20px,
                  "total-width": 30px,
                  "total-height": 30px,
                  "offset-x": -4px,
                  "offset-y": -4px
                )
              )
            )
          );
          `
        ],
        expected:
`.selector-logo {
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

@media only screen and (max-width: 666px) {
  .selector-logo {
    width: 10px;
    height: 10px;
    background-position: -2px -2px;
    background-size: 15px 15px;
  }
}`
      }
    ];

    await eachTestCases(cases, wrapper, ({error, result, expected}, {resolve, reject}) => {
      if (error) {
        return reject(error);
      }

      const actual = result.css.toString().trim();

      assert(actual === expected);
      return resolve();
    }, {outputStyle: 'expanded'});
  });

  it('should out spritesheet settings with state if image like "#{$name}--focus" exists.', async () => {
    const cases = [
      {
        params: [
          '"icon-image"',
          '"logo"',
          null,
          `
          $sprites: (
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
                ),
                "logo--focus": (
                  "width": 10px,
                  "height": 10px,
                  "total-width": 30px,
                  "total-height": 30px,
                  "offset-x": -20px,
                  "offset-y": -20px
                )
              )
            )
          );
          `
        ],
        expected:
`.selector-logo {
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

.selector-logo:hover, .selector-logo:focus, .selector-logo.is-focus {
  background-position: -20px -20px;
}`
      },
      {
        params: [
          '"icon-image"',
          '"logo"',
          null,
          `
          $sprites: (
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
                ),
                "logo--disabled": (
                  "width": 10px,
                  "height": 10px,
                  "total-width": 30px,
                  "total-height": 30px,
                  "offset-x": -20px,
                  "offset-y": -20px
                )
              )
            )
          );
          `
        ],
        expected:
`.selector-logo {
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

.selector-logo:disabled, .selector-logo.is-disabled {
  background-position: -20px -20px;
}`
      },
      {
        params: [
          '"icon-image"',
          '"logo"',
          null,
          `
          $sprites: (
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
                ),
                "logo--current": (
                  "width": 10px,
                  "height": 10px,
                  "total-width": 30px,
                  "total-height": 30px,
                  "offset-x": -20px,
                  "offset-y": -20px
                )
              )
            )
          );
          `
        ],
        expected:
`.selector-logo {
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

.selector-logo.is-current {
  background-position: -20px -20px;
}`
      }
    ];

    await eachTestCases(cases, wrapper, ({error, result, expected}, {resolve, reject}) => {
      if (error) {
        return reject(error);
      }

      const actual = result.css.toString().trim();

      assert(actual === expected);
      return resolve();
    }, {outputStyle: 'expanded'});
  });

  it('should out responsive spritesheet settings with state if image like "#{$name}--focus--if-mobile" exists and argument $options is ("responsive": true).', async () => {
    const cases = [
      {
        params: [
          '"icon-image"',
          '"logo"',
          '("responsive": true)',
          `
          $sprites: (
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
                ),
                "logo--if-mobile": (
                  "width": 20px,
                  "height": 20px,
                  "total-width": 30px,
                  "total-height": 30px,
                  "offset-x": -4px,
                  "offset-y": -4px
                ),
                "logo--focus": (
                  "width": 10px,
                  "height": 10px,
                  "total-width": 30px,
                  "total-height": 30px,
                  "offset-x": -20px,
                  "offset-y": -20px
                ),
                "logo--focus--if-mobile": (
                  "width": 20px,
                  "height": 20px,
                  "total-width": 30px,
                  "total-height": 30px,
                  "offset-x": -24px,
                  "offset-y": -24px
                )
              )
            )
          );
          `
        ],
        expected:
`.selector-logo {
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

@media only screen and (max-width: 666px) {
  .selector-logo {
    width: 20px;
    height: 20px;
    background-position: -4px -4px;
    background-size: 30px 30px;
  }
}

.selector-logo:hover, .selector-logo:focus, .selector-logo.is-focus {
  background-position: -20px -20px;
}

@media only screen and (max-width: 666px) {
  .selector-logo:hover, .selector-logo:focus, .selector-logo.is-focus {
    background-position: -24px -24px;
  }
}`
      },
      {
        params: [
          '"icon-image"',
          '"logo"',
          '("responsive": true)',
          `
          $sprites: (
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
                ),
                "logo--if-mobile": (
                  "width": 20px,
                  "height": 20px,
                  "total-width": 30px,
                  "total-height": 30px,
                  "offset-x": -4px,
                  "offset-y": -4px
                ),
                "logo--disabled": (
                  "width": 10px,
                  "height": 10px,
                  "total-width": 30px,
                  "total-height": 30px,
                  "offset-x": -20px,
                  "offset-y": -20px
                ),
                "logo--disabled--if-mobile": (
                  "width": 20px,
                  "height": 20px,
                  "total-width": 30px,
                  "total-height": 30px,
                  "offset-x": -24px,
                  "offset-y": -24px
                )
              )
            )
          );
          `
        ],
        expected:
`.selector-logo {
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

@media only screen and (max-width: 666px) {
  .selector-logo {
    width: 20px;
    height: 20px;
    background-position: -4px -4px;
    background-size: 30px 30px;
  }
}

.selector-logo:disabled, .selector-logo.is-disabled {
  background-position: -20px -20px;
}

@media only screen and (max-width: 666px) {
  .selector-logo:disabled, .selector-logo.is-disabled {
    background-position: -24px -24px;
  }
}`
      },
      {
        params: [
          '"icon-image"',
          '"logo"',
          '("responsive": true)',
          `
          $sprites: (
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
                ),
                "logo--if-mobile": (
                  "width": 20px,
                  "height": 20px,
                  "total-width": 30px,
                  "total-height": 30px,
                  "offset-x": -4px,
                  "offset-y": -4px
                ),
                "logo--current": (
                  "width": 10px,
                  "height": 10px,
                  "total-width": 30px,
                  "total-height": 30px,
                  "offset-x": -20px,
                  "offset-y": -20px
                ),
                "logo--current--if-mobile": (
                  "width": 20px,
                  "height": 20px,
                  "total-width": 30px,
                  "total-height": 30px,
                  "offset-x": -24px,
                  "offset-y": -24px
                )
              )
            )
          );
          `
        ],
        expected:
`.selector-logo {
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

@media only screen and (max-width: 666px) {
  .selector-logo {
    width: 20px;
    height: 20px;
    background-position: -4px -4px;
    background-size: 30px 30px;
  }
}

.selector-logo.is-current {
  background-position: -20px -20px;
}

@media only screen and (max-width: 666px) {
  .selector-logo.is-current {
    background-position: -24px -24px;
  }
}`
      }
    ];

    await eachTestCases(cases, wrapper, ({error, result, expected}, {resolve, reject}) => {
      if (error) {
        return reject(error);
      }

      const actual = result.css.toString().trim();

      assert(actual === expected);
      return resolve();
    }, {outputStyle: 'expanded'});
  });

  it('should out spritesheet settings for toggle if argument $options is ("toggle": true).', async () => {
    const cases = [
      {
        params: [
          '"radio-image"',
          '"radio"',
          '("toggle": true)',
          `
          $sprites: (
            "radio-image": (
              "image": "path/to/sprite/radio-image.png",
              "items": (
                "radio": (
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
          `
        ],
        expected:
`.selector-radio {
  overflow: hidden;
  vertical-align: middle;
}

.selector-radio > .unit-toggle__field {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.selector-radio > .unit-toggle__alt {
  display: block;
  overflow: hidden;
  z-index: 0;
  text-indent: -100%;
  vertical-align: middle;
  color: transparent;
  background-image: url(path/to/sprite/radio-image.png);
}

.selector-radio > .unit-toggle__field + .unit-toggle__alt {
  width: 10px;
  height: 10px;
  background-position: -10px -10px;
  background-size: 30px 30px;
}`
      }
    ];

    await eachTestCases(cases, wrapper, ({error, result, expected}, {resolve, reject}) => {
      if (error) {
        return reject(error);
      }

      const actual = result.css.toString().trim();

      assert(actual === expected);
      return resolve();
    }, {outputStyle: 'expanded'});
  });

  it('should out 2x spritesheet settings for toggle if argument $options is ("toggle": true, "use2x": true).', async () => {
    const cases = [
      {
        params: [
          '"radio-image"',
          '"radio"',
          '("toggle": true, "use2x": true)',
          `
          $sprites: (
            "radio-image": (
              "image": "path/to/sprite/radio-image.png",
              "items": (
                "radio": (
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
          `
        ],
        expected:
`.selector-radio {
  overflow: hidden;
  vertical-align: middle;
}

.selector-radio > .unit-toggle__field {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.selector-radio > .unit-toggle__alt {
  display: block;
  overflow: hidden;
  z-index: 0;
  text-indent: -100%;
  vertical-align: middle;
  color: transparent;
  background-image: url(path/to/sprite/radio-image.png);
}

.selector-radio > .unit-toggle__field + .unit-toggle__alt {
  width: 5px;
  height: 5px;
  background-position: -5px -5px;
  background-size: 15px 15px;
}`
      }
    ];

    await eachTestCases(cases, wrapper, ({error, result, expected}, {resolve, reject}) => {
      if (error) {
        return reject(error);
      }

      const actual = result.css.toString().trim();

      assert(actual === expected);
      return resolve();
    }, {outputStyle: 'expanded'});
  });

  it('should out responsive spritesheet settings for toggle if argument $options is ("toggle": true, "responsive": true).', async () => {
    const cases = [
      {
        params: [
          '"radio-image"',
          '"radio"',
          '("toggle": true, "responsive": true)',
          `
          $sprites: (
            "radio-image": (
              "image": "path/to/sprite/radio-image.png",
              "items": (
                "radio": (
                  "width": 10px,
                  "height": 10px,
                  "total-width": 30px,
                  "total-height": 30px,
                  "offset-x": -10px,
                  "offset-y": -10px
                ),
                "radio--if-mobile": (
                  "width": 20px,
                  "height": 20px,
                  "total-width": 30px,
                  "total-height": 30px,
                  "offset-x": -4px,
                  "offset-y": -4px
                )
              )
            )
          );
          `
        ],
        expected:
`.selector-radio {
  overflow: hidden;
  vertical-align: middle;
}

.selector-radio > .unit-toggle__field {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.selector-radio > .unit-toggle__alt {
  display: block;
  overflow: hidden;
  z-index: 0;
  text-indent: -100%;
  vertical-align: middle;
  color: transparent;
  background-image: url(path/to/sprite/radio-image.png);
}

.selector-radio > .unit-toggle__field + .unit-toggle__alt {
  width: 10px;
  height: 10px;
  background-position: -10px -10px;
  background-size: 30px 30px;
}

@media only screen and (max-width: 666px) {
  .selector-radio > .unit-toggle__field + .unit-toggle__alt {
    width: 20px;
    height: 20px;
    background-position: -4px -4px;
    background-size: 30px 30px;
  }
}`
      }
    ];

    await eachTestCases(cases, wrapper, ({error, result, expected}, {resolve, reject}) => {
      if (error) {
        return reject(error);
      }

      const actual = result.css.toString().trim();

      assert(actual === expected);
      return resolve();
    }, {outputStyle: 'expanded'});
  });

  it('should out responsive spritesheet settings for toggle if argument $options is ("toggle": true, "use2x": "if-mobile", "responsive": true).', async () => {
    const cases = [
      {
        params: [
          '"radio-image"',
          '"radio"',
          '("toggle": true, "use2x": "if-mobile", "responsive": true)',
          `
          $sprites: (
            "radio-image": (
              "image": "path/to/sprite/radio-image.png",
              "items": (
                "radio": (
                  "width": 10px,
                  "height": 10px,
                  "total-width": 30px,
                  "total-height": 30px,
                  "offset-x": -10px,
                  "offset-y": -10px
                ),
                "radio--if-mobile": (
                  "width": 20px,
                  "height": 20px,
                  "total-width": 30px,
                  "total-height": 30px,
                  "offset-x": -4px,
                  "offset-y": -4px
                )
              )
            )
          );
          `
        ],
        expected:
`.selector-radio {
  overflow: hidden;
  vertical-align: middle;
}

.selector-radio > .unit-toggle__field {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.selector-radio > .unit-toggle__alt {
  display: block;
  overflow: hidden;
  z-index: 0;
  text-indent: -100%;
  vertical-align: middle;
  color: transparent;
  background-image: url(path/to/sprite/radio-image.png);
}

.selector-radio > .unit-toggle__field + .unit-toggle__alt {
  width: 10px;
  height: 10px;
  background-position: -10px -10px;
  background-size: 30px 30px;
}

@media only screen and (max-width: 666px) {
  .selector-radio > .unit-toggle__field + .unit-toggle__alt {
    width: 10px;
    height: 10px;
    background-position: -2px -2px;
    background-size: 15px 15px;
  }
}`
      }
    ];

    await eachTestCases(cases, wrapper, ({error, result, expected}, {resolve, reject}) => {
      if (error) {
        return reject(error);
      }

      const actual = result.css.toString().trim();

      assert(actual === expected);
      return resolve();
    }, {outputStyle: 'expanded'});
  });

  it('should out spritesheet settings for toggle with state if image like "#{$name}--focus" exists and argument $options is ("toggle": true).', async () => {
    const cases = [
      {
        params: [
          '"radio-image"',
          '"radio"',
          '("toggle": true)',
          `
          $sprites: (
            "radio-image": (
              "image": "path/to/sprite/radio-image.png",
              "items": (
                "radio": (
                  "width": 10px,
                  "height": 10px,
                  "total-width": 30px,
                  "total-height": 30px,
                  "offset-x": -10px,
                  "offset-y": -10px
                ),
                "radio--focus": (
                  "width": 10px,
                  "height": 10px,
                  "total-width": 30px,
                  "total-height": 30px,
                  "offset-x": -20px,
                  "offset-y": -20px
                )
              )
            )
          );
          `
        ],
        expected:
`.selector-radio {
  overflow: hidden;
  vertical-align: middle;
}

.selector-radio > .unit-toggle__field {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.selector-radio > .unit-toggle__alt {
  display: block;
  overflow: hidden;
  z-index: 0;
  text-indent: -100%;
  vertical-align: middle;
  color: transparent;
  background-image: url(path/to/sprite/radio-image.png);
}

.selector-radio > .unit-toggle__field + .unit-toggle__alt {
  width: 10px;
  height: 10px;
  background-position: -10px -10px;
  background-size: 30px 30px;
}

.selector-radio > .unit-toggle__field:hover + .unit-toggle__alt, .selector-radio > .unit-toggle__field:focus + .unit-toggle__alt, .selector-radio > .unit-toggle__field.is-focus + .unit-toggle__alt {
  background-position: -20px -20px;
}`
      }
    ];

    await eachTestCases(cases, wrapper, ({error, result, expected}, {resolve, reject}) => {
      if (error) {
        return reject(error);
      }

      const actual = result.css.toString().trim();

      assert(actual === expected);
      return resolve();
    }, {outputStyle: 'expanded'});
  });


  it('should out responsive spritesheet settings for toggle with state if image like "#{$name}--focus--if-mobile" exists and argument $options is ("toggle": true, "responsive": true).', async () => {
    const cases = [
      {
        params: [
          '"radio-image"',
          '"radio"',
          '("toggle": true, "responsive": true)',
          `
          $sprites: (
            "radio-image": (
              "image": "path/to/sprite/radio-image.png",
              "items": (
                "radio": (
                  "width": 10px,
                  "height": 10px,
                  "total-width": 30px,
                  "total-height": 30px,
                  "offset-x": -10px,
                  "offset-y": -10px
                ),
                "radio--if-mobile": (
                  "width": 20px,
                  "height": 20px,
                  "total-width": 30px,
                  "total-height": 30px,
                  "offset-x": -4px,
                  "offset-y": -4px
                ),
                "radio--focus": (
                  "width": 10px,
                  "height": 10px,
                  "total-width": 30px,
                  "total-height": 30px,
                  "offset-x": -20px,
                  "offset-y": -20px
                ),
                "radio--focus--if-mobile": (
                  "width": 20px,
                  "height": 20px,
                  "total-width": 30px,
                  "total-height": 30px,
                  "offset-x": -24px,
                  "offset-y": -24px
                )
              )
            )
          );
          `
        ],
        expected:
`.selector-radio {
  overflow: hidden;
  vertical-align: middle;
}

.selector-radio > .unit-toggle__field {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.selector-radio > .unit-toggle__alt {
  display: block;
  overflow: hidden;
  z-index: 0;
  text-indent: -100%;
  vertical-align: middle;
  color: transparent;
  background-image: url(path/to/sprite/radio-image.png);
}

.selector-radio > .unit-toggle__field + .unit-toggle__alt {
  width: 10px;
  height: 10px;
  background-position: -10px -10px;
  background-size: 30px 30px;
}

@media only screen and (max-width: 666px) {
  .selector-radio > .unit-toggle__field + .unit-toggle__alt {
    width: 20px;
    height: 20px;
    background-position: -4px -4px;
    background-size: 30px 30px;
  }
}

.selector-radio > .unit-toggle__field:hover + .unit-toggle__alt, .selector-radio > .unit-toggle__field:focus + .unit-toggle__alt, .selector-radio > .unit-toggle__field.is-focus + .unit-toggle__alt {
  background-position: -20px -20px;
}

@media only screen and (max-width: 666px) {
  .selector-radio > .unit-toggle__field:hover + .unit-toggle__alt, .selector-radio > .unit-toggle__field:focus + .unit-toggle__alt, .selector-radio > .unit-toggle__field.is-focus + .unit-toggle__alt {
    background-position: -24px -24px;
  }
}`
      },
      {
        params: [
          '"radio-image"',
          '"radio"',
          '("toggle": true, "responsive": true)',
          `
          $sprites: (
            "radio-image": (
              "image": "path/to/sprite/radio-image.png",
              "items": (
                "radio": (
                  "width": 10px,
                  "height": 10px,
                  "total-width": 30px,
                  "total-height": 30px,
                  "offset-x": -10px,
                  "offset-y": -10px
                ),
                "radio--if-mobile": (
                  "width": 20px,
                  "height": 20px,
                  "total-width": 30px,
                  "total-height": 30px,
                  "offset-x": -4px,
                  "offset-y": -4px
                ),
                "radio--disabled": (
                  "width": 10px,
                  "height": 10px,
                  "total-width": 30px,
                  "total-height": 30px,
                  "offset-x": -20px,
                  "offset-y": -20px
                ),
                "radio--disabled--if-mobile": (
                  "width": 20px,
                  "height": 20px,
                  "total-width": 30px,
                  "total-height": 30px,
                  "offset-x": -24px,
                  "offset-y": -24px
                )
              )
            )
          );
          `
        ],
        expected:
`.selector-radio {
  overflow: hidden;
  vertical-align: middle;
}

.selector-radio > .unit-toggle__field {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.selector-radio > .unit-toggle__alt {
  display: block;
  overflow: hidden;
  z-index: 0;
  text-indent: -100%;
  vertical-align: middle;
  color: transparent;
  background-image: url(path/to/sprite/radio-image.png);
}

.selector-radio > .unit-toggle__field + .unit-toggle__alt {
  width: 10px;
  height: 10px;
  background-position: -10px -10px;
  background-size: 30px 30px;
}

@media only screen and (max-width: 666px) {
  .selector-radio > .unit-toggle__field + .unit-toggle__alt {
    width: 20px;
    height: 20px;
    background-position: -4px -4px;
    background-size: 30px 30px;
  }
}

.selector-radio > .unit-toggle__field:disabled + .unit-toggle__alt, .selector-radio > .unit-toggle__field.is-disabled + .unit-toggle__alt {
  background-position: -20px -20px;
}

@media only screen and (max-width: 666px) {
  .selector-radio > .unit-toggle__field:disabled + .unit-toggle__alt, .selector-radio > .unit-toggle__field.is-disabled + .unit-toggle__alt {
    background-position: -24px -24px;
  }
}`
      },
      {
        params: [
          '"radio-image"',
          '"radio"',
          '("toggle": true, "responsive": true)',
          `
          $sprites: (
            "radio-image": (
              "image": "path/to/sprite/radio-image.png",
              "items": (
                "radio": (
                  "width": 10px,
                  "height": 10px,
                  "total-width": 30px,
                  "total-height": 30px,
                  "offset-x": -10px,
                  "offset-y": -10px
                ),
                "radio--if-mobile": (
                  "width": 20px,
                  "height": 20px,
                  "total-width": 30px,
                  "total-height": 30px,
                  "offset-x": -4px,
                  "offset-y": -4px
                ),
                "radio--disabled": (
                  "width": 10px,
                  "height": 10px,
                  "total-width": 30px,
                  "total-height": 30px,
                  "offset-x": -20px,
                  "offset-y": -20px
                ),
                "radio--disabled--if-mobile": (
                  "width": 20px,
                  "height": 20px,
                  "total-width": 30px,
                  "total-height": 30px,
                  "offset-x": -24px,
                  "offset-y": -24px
                ),
                "radio--selected": (
                  "width": 10px,
                  "height": 10px,
                  "total-width": 28px,
                  "total-height": 28px,
                  "offset-x": -28px,
                  "offset-y": -28px
                ),
                "radio--selected--if-mobile": (
                  "width": 20px,
                  "height": 20px,
                  "total-width": 38px,
                  "total-height": 38px,
                  "offset-x": -38px,
                  "offset-y": -38px
                ),
                "radio--selected--disabled": (
                  "width": 10px,
                  "height": 10px,
                  "total-width": 40px,
                  "total-height": 40px,
                  "offset-x": -25px,
                  "offset-y": -25px
                ),
                "radio--selected--disabled--if-mobile": (
                  "width": 20px,
                  "height": 20px,
                  "total-width": 60px,
                  "total-height": 60px,
                  "offset-x": -36px,
                  "offset-y": -36px
                )
              )
            )
          );
          `
        ],
        expected:
`.selector-radio {
  overflow: hidden;
  vertical-align: middle;
}

.selector-radio > .unit-toggle__field {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.selector-radio > .unit-toggle__alt {
  display: block;
  overflow: hidden;
  z-index: 0;
  text-indent: -100%;
  vertical-align: middle;
  color: transparent;
  background-image: url(path/to/sprite/radio-image.png);
}

.selector-radio > .unit-toggle__field + .unit-toggle__alt {
  width: 10px;
  height: 10px;
  background-position: -10px -10px;
  background-size: 30px 30px;
}

@media only screen and (max-width: 666px) {
  .selector-radio > .unit-toggle__field + .unit-toggle__alt {
    width: 20px;
    height: 20px;
    background-position: -4px -4px;
    background-size: 30px 30px;
  }
}

.selector-radio > .unit-toggle__field:disabled + .unit-toggle__alt, .selector-radio > .unit-toggle__field.is-disabled + .unit-toggle__alt {
  background-position: -20px -20px;
}

@media only screen and (max-width: 666px) {
  .selector-radio > .unit-toggle__field:disabled + .unit-toggle__alt, .selector-radio > .unit-toggle__field.is-disabled + .unit-toggle__alt {
    background-position: -24px -24px;
  }
}

.selector-radio > .unit-toggle__field:checked + .unit-toggle__alt, .selector-radio > .unit-toggle__field.is-selected + .unit-toggle__alt {
  background-position: -28px -28px;
}

@media only screen and (max-width: 666px) {
  .selector-radio > .unit-toggle__field:checked + .unit-toggle__alt, .selector-radio > .unit-toggle__field.is-selected + .unit-toggle__alt {
    background-position: -38px -38px;
  }
}

.selector-radio > .unit-toggle__field:checked:disabled + .unit-toggle__alt, .selector-radio > .unit-toggle__field:checked.is-disabled + .unit-toggle__alt, .selector-radio > .unit-toggle__field.is-selected:disabled + .unit-toggle__alt, .selector-radio > .unit-toggle__field.is-selected.is-disabled + .unit-toggle__alt {
  background-position: -25px -25px;
}

@media only screen and (max-width: 666px) {
  .selector-radio > .unit-toggle__field:checked:disabled + .unit-toggle__alt, .selector-radio > .unit-toggle__field:checked.is-disabled + .unit-toggle__alt, .selector-radio > .unit-toggle__field.is-selected:disabled + .unit-toggle__alt, .selector-radio > .unit-toggle__field.is-selected.is-disabled + .unit-toggle__alt {
    background-position: -36px -36px;
  }
}`
      }
    ];

    await eachTestCases(cases, wrapper, ({error, result, expected}, {resolve, reject}) => {
      if (error) {
        return reject(error);
      }

      const actual = result.css.toString().trim();

      assert(actual === expected);
      return resolve();
    }, {outputStyle: 'expanded'});
  });

});
