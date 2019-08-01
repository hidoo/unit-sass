# @hidoo/unit-test-util

> Test utilities for unit framework.

## Installation

```sh
$ npm install --save-dev @hidoo/unit-test-util
```

## Usage (with Mocha)

```js
import assert from 'assert';
import {eachTestCases, existOrEmptyString, normalizeGlobalSettings} from '@hidoo/unit-test-util';

describe('@function hoge()', () => {

  /**
   * wrapper of @function hoge()
   * @param {String|null} value
   * @param {Object} globalSettings global settings
   * @return {String}
   */
  function wrapper(value = '', globalSettings = {}) {
    const args = [
      existOrEmptyString(value) ? `$value: ${value}` : false
    ];

    return `
${normalizeGlobalSettings(globalSettings)}
@import "path/to/function/hoge";

p {
  content: #{hoge(${args.filter((arg) => arg !== false).join(', ')})};
}
    `;
  }

  it('should return "hoge".', async () => {
    const cases = [
      {
        params: ['"fuga"', {fontSize: '16px'}],
        expected: 'p { content: hoge; }'
      },
      ...
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

});
```

## License

MIT
