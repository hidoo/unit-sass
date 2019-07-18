/* eslint max-len: 0, no-magic-numbers: 0 */

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
                "logo--responsive": (
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


  it('should out responsive spritesheet settings if argument $options is ("use2x": true, "responsive": true).', async () => {
    const cases = [
      {
        params: [
          '"icon-image"',
          '"logo"',
          '("use2x": true, "responsive": true)',
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
                "logo--responsive": (
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

  it('should out responsive spritesheet settings with state if image like "#{$name}--focus--responsive" exists and argument $options is ("responsive": true).', async () => {
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
                "logo--responsive": (
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
                "logo--focus--responsive": (
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
                "logo--responsive": (
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
                "logo--disabled--responsive": (
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
                "logo--responsive": (
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
                "logo--current--responsive": (
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

});
