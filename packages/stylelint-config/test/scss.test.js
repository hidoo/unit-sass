/* eslint max-len: off, no-magic-numbers: off, no-sync: off */

import assert from 'assert';
import fs from 'fs';
import stylelint from 'stylelint';
import config from '../scss';

const invalidScss = fs.readFileSync(`${__dirname}/fixture/invalid.scss`, 'utf-8');

describe('@hidoo/stylint-config/scss', () => {
  const rules = [
    'scss/at-each-key-value-single-line',
    'scss/at-else-empty-line-before',
    'scss/at-else-if-parentheses-space-before',
    'scss/at-extend-no-missing-placeholder',
    'scss/at-function-named-arguments',
    'scss/at-import-no-partial-leading-underscore',
    'scss/at-import-partial-extension-whitelist',
    'scss/at-mixin-argumentless-call-parentheses',
    'scss/at-mixin-parentheses-space-before',
    'scss/at-rule-no-unknown',
    'scss/dollar-variable-colon-space-after',
    'scss/dollar-variable-colon-space-before',
    'scss/dollar-variable-default',
    'scss/dollar-variable-empty-line-before',
    'scss/double-slash-comment-empty-line-before',
    'scss/double-slash-comment-inline',
    'scss/double-slash-comment-whitespace-inside',
    'scss/declaration-nested-properties',
    'scss/function-quote-no-quoted-strings-inside',
    'scss/function-unquote-no-unquoted-strings-inside',
    'scss/map-keys-quotes',
    'scss/operator-no-newline-after',
    'scss/operator-no-newline-before',
    'scss/operator-no-unspaced',
    'scss/selector-nest-combinators',
    'scss/selector-no-redundant-nesting-selector'
  ];

  it('should error all rules in invalid.scss.', async () => {
    const results = stylelint.lint({
      code: invalidScss,
      config,
      ignoreDisables: true,
      syntax: 'scss'
    });

    await results
      .then(({errored, output}) => {
        assert(errored);

        const values = JSON.parse(output);

        values.forEach((value) => {
          const {
            deprecations,
            invalidOptionWarnings,
            parseErrors,
            warnings
          } = value;

          assert.deepStrictEqual(deprecations, []);
          assert.deepStrictEqual(invalidOptionWarnings, []);
          assert.deepStrictEqual(parseErrors, []);

          warnings.forEach(({rule, severity}) => {
            assert(rules.includes(rule));
            assert.deepStrictEqual(severity, 'error');
          });
        });
      });
  });
});
