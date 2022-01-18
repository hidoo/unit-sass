/* eslint max-len: off, no-magic-numbers: off, no-sync: off */

import assert from 'assert';
import fs from 'fs';
import stylelint from 'stylelint';
import config from '..';

const invalidCss = fs.readFileSync(`${__dirname}/fixture/invalid.css`, 'utf-8');

describe('@hidoo/stylint-config', () => {
  const rules = [
    'at-rule-semicolon-space-before',
    'alpha-value-notation',
    'color-function-notation',
    'max-line-length',
    'selector-class-pattern',
    'selector-list-comma-space-before',
    'a11y/no-display-none',
    'a11y/no-obsolete-attribute',
    'a11y/no-obsolete-element',
    'a11y/no-outline-none',
    'a11y/no-text-align-justify',
    'a11y/selector-pseudo-class-focus',
    'order/properties-order',
    'plugin/stylelint-group-selectors',
    'plugin/no-low-performance-animation-properties',
    'plugin/no-unsupported-browser-features',
    'plugin/stylelint-selector-no-empty',
    'plugin/selector-tag-no-without-class'
  ];

  it('should error all rules in invalid.css.', async () => {
    const results = stylelint.lint({
      code: invalidCss,
      config,
      ignoreDisables: true
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
