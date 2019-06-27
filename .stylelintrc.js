module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended'
  ],
  plugins: [
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-no-unsupported-browser-features',
    'stylelint-scss'
  ],
  rules: {
    'at-rule-no-unknown': null,
    'at-rule-empty-line-before': ['always', {
      except: [
        'blockless-after-same-name-blockless',
        'first-nested',
      ],
      ignore: [
        'after-comment'
      ],
      ignoreAtRules: [
        'else'
      ]
    }],
    'scss/at-rule-no-unknown': true,
    'plugin/declaration-block-no-ignored-properties': true,
    'plugin/no-unsupported-browser-features': [true, {
      browsers: [
        '> 0.5% in JP',
        'ie >= 10',
        'android >= 4.4'
      ],
      ignore: [
        'text-size-adjust',
        'rem'
      ]
    }]
  }
};
