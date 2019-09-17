module.exports = {
  'extends': [
    './src/base.js'
  ],
  'plugins': [
    'stylelint-group-selectors',
    'stylelint-selector-no-empty'
  ],
  'rules': {
    // plugin/stylelint-group-selectors
    'plugin/stylelint-group-selectors': true,

    // plugin/stylelint-selector-no-empty
    'plugin/stylelint-selector-no-empty': true
  }
};
