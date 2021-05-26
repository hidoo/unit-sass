/* eslint max-len: 0, no-magic-numbers: 0 */

import assert from 'assert';
import {eachTestCases, useSettingsWith} from '../util';

/**
 * wrapper
 *
 * @param {Array} args arguments
 * @param {Array} settings settings of defaults
 * @return {String}
 */
const wrapper = (args = [], settings = []) => `
${useSettingsWith(settings)}
@use "src/lib/mixin";

.selector {
  @include mixin.use-table-base(${args.filter((arg) => arg !== false).join(', ')});
}
`;

describe('@mixin use-table-base(...)', () => {

  it('should out default properties if arguments not set.', async () => {
    const cases = [
      {
        params: [[]],
        expected:
`.selector {
  display: table;
  width: auto;
  margin: 0;
  padding: 0;
  border-collapse: collapse;
  border-style: solid;
  border-width: 1px;
}`
      }
    ];

    await eachTestCases(
      cases,
      wrapper,
      ({error, result, expected}, {resolve, reject}) => {
        if (error) {
          return reject(error);
        }

        const actual = result.css.toString().trim();

        assert(actual === expected);
        return resolve();
      },
      {outputStyle: 'expanded'}
    );
  });

  it('should out properties with specified value if arguments is set.', async () => {
    const cases = [
      {
        params: [
          [
            '$width: 100%',
            '$margin: 0 auto',
            '$padding: 10px',
            '$border-style: dotted',
            '$border-width: 2px'
          ]
        ],
        expected:
`.selector {
  display: table;
  width: 100%;
  margin: 0 auto;
  padding: 10px;
  border-collapse: collapse;
  border-style: dotted;
  border-width: 2px;
}`
      }
    ];

    await eachTestCases(
      cases,
      wrapper,
      ({error, result, expected}, {resolve, reject}) => {
        if (error) {
          return reject(error);
        }

        const actual = result.css.toString().trim();

        assert(actual === expected);
        return resolve();
      },
      {outputStyle: 'expanded'}
    );
  });

});
