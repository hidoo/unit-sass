module.exports = {
  'extends': [
    './src/base.js'
  ],
  'plugins': [
    'stylelint-scss'
  ],
  'rules': {
    // stylelint
    'at-rule-no-unknown': null,
    'at-rule-empty-line-before': ['always', {
      except: [
        'blockless-after-same-name-blockless',
        'first-nested'
      ],
      ignore: [
        'after-comment'
      ],
      ignoreAtRules: [
        'else'
      ]
    }],
    'no-invalid-position-at-import-rule': null,
    'value-keyword-case': ['lower', {
      // for sass variable
      ignoreProperties: [/^\$.+/]
    }],

    // stylelint-scss
    'scss/at-each-key-value-single-line': true,
    'scss/at-else-empty-line-before': 'never',
    'scss/at-else-if-parentheses-space-before': 'always',
    'scss/at-rule-conditional-no-parentheses': null,
    'scss/at-extend-no-missing-placeholder': true,
    'scss/at-function-named-arguments': 'never',
    'scss/at-if-no-null': true,
    'scss/at-import-no-partial-leading-underscore': true,
    'scss/at-import-partial-extension': null,
    'scss/at-import-partial-extension-whitelist': ['scss'],
    'scss/at-mixin-argumentless-call-parentheses': 'always',
    'scss/at-mixin-parentheses-space-before': 'never',
    'scss/at-rule-no-unknown': true,
    'scss/dollar-variable-colon-space-after': 'always-single-line',
    'scss/dollar-variable-colon-space-before': 'never',
    'scss/dollar-variable-default': [true, {
      ignore: 'local'
    }],
    'scss/dollar-variable-empty-line-before': ['always', {
      except: [
        'first-nested',
        'after-dollar-variable'
      ],
      ignore: [
        'after-comment'
      ]
    }],
    'scss/double-slash-comment-empty-line-before': ['always', {
      except: [
        'first-nested'
      ],
      ignore: [
        'between-comments',
        'stylelint-commands'
      ]
    }],
    'scss/double-slash-comment-inline': ['never', {
      ignore: [
        'stylelint-commands'
      ]
    }],
    'scss/double-slash-comment-whitespace-inside': 'always',
    'scss/declaration-nested-properties': 'never',
    'scss/dimension-no-non-numeric-values': true,
    'scss/function-quote-no-quoted-strings-inside': true,
    'scss/function-unquote-no-unquoted-strings-inside': true,
    'scss/map-keys-quotes': 'always',
    'scss/operator-no-newline-after': true,
    'scss/operator-no-newline-before': true,
    'scss/operator-no-unspaced': true,
    'scss/selector-nest-combinators': 'always',
    'scss/selector-no-redundant-nesting-selector': true
  }
};
