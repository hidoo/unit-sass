/* eslint max-len: 0, no-magic-numbers: 0 */

import assert from 'assert';
import eachTestCases from '../fixture/eachTestCases';
import normalizeGlobalSettings from '../fixture/normalizeGlobalSettings';

describe('@mixin on-disabled(...)', () => {

  /**
   * wrapper
   * @param {Object} options options
   *   @param {String|Null} options.additionalSelectors setting for additional-selectors
   * @param {Object} globalSettings global settings
   * @return {String}
   */
  function wrapper(options = {}, globalSettings = {}) {
    const args = [
      options.additionalSelectors || options.additionalSelectors === '' ? `$additional-selectors: ${options.additionalSelectors}` : false
    ];

    return `
${normalizeGlobalSettings(globalSettings)}
@import "src/scss/lib/function/merge-state-selectors";
@import "src/scss/lib/mixin/define-inline-placeholder";
@import "src/scss/lib/mixin/on";
@import "src/scss/lib/mixin/on-disabled";

.selector {
  @include on-disabled(${args.filter((arg) => arg !== false).join(', ')}) {
    font-size: 16px;
  };
}
    `;
  }

  it('should out with default selectors if argument is not set.', async () => {
    const cases = [
      {
        params: [{}],
        expected: '.selector:disabled, .selector.is-disabled { font-size: 16px; }'
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

  it('should out without specified selectors if global variable $unit-state-selectors-disabled is not defined.', async () => {
    const cases = [
      {
        params: [{}, {stateSelectorsDisabled: null}],
        expected: '.selector:disabled { font-size: 16px; }'
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

  it('should out with specified selectors if argument $additional-selectors is set.', async () => {
    const cases = [
      {
        params: [{additionalSelectors: '(".is-not-use")'}],
        expected: '.selector:disabled, .selector.is-disabled, .selector.is-not-use { font-size: 16px; }'
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

});
