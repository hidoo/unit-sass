module.exports = {
  extends: [
    'stylelint-config-standard'
  ],
  plugins: [
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-no-unsupported-browser-features'
  ],
  rules: {
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
