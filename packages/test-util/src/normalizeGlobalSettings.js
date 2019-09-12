const existOrEmptyString = require('./existOrEmptyString');

/**
 * default options
 *
 * @type {Object}
 */
const defaultOptions = {
  prefix: 'unit',
  utilPrefix: 'util',
  breakpoints: '("desktop": 1024px, "mobile": 667px)',
  stateSelectorsFocus: '(".is-focus")',
  stateSelectorsSelected: '(".is-selected")',
  stateSelectorsDisabled: '(".is-disabled")',
  stateSelectorsCurrent: '(".is-current")',
  fontEnableOverride: 'true',
  fontFamily: 'sans-serif',
  fontFamilyMonospace: 'monospace',
  fontEnableAdvancedSettings: 'true',
  fontEnableRelativeSize: 'true',
  fontBaseSize: '16px',
  fontSize: '14px',
  letterSpacing: '0.04em',
  lineHeight: '1.5'
};

/**
 * mapping key to sass variable
 *
 * @type {Object}
 */
const mappingKeyToSassVariable = new Map(
  [
    ['prefix', '$unit-prefix'],
    ['utilPrefix', '$unit-util-prefix'],
    ['breakpoints', '$unit-breakpoints'],
    ['stateSelectorsFocus', '$unit-state-selectors-focus'],
    ['stateSelectorsSelected', '$unit-state-selectors-selected'],
    ['stateSelectorsDisabled', '$unit-state-selectors-disabled'],
    ['stateSelectorsCurrent', '$unit-state-selectors-current'],
    ['fontEnableOverride', '$unit-font-enable-override'],
    ['fontFamily', '$unit-font-family'],
    ['fontFamilyMonospace', '$unit-font-family-monospace'],
    ['fontEnableAdvancedSettings', '$unit-font-enable-advanced-settings'],
    ['fontEnableRelativeSize', '$unit-font-enable-relative-size'],
    ['fontBaseSize', '$unit-font-base-size'],
    ['fontSize', '$unit-font-size'],
    ['letterSpacing', '$unit-letter-spacing'],
    ['lineHeight', '$unit-line-height']
  ]
);

/**
 * return global settings
 *
 * @param {Object} options global settings
 *   @param {String} options.prefix value of $unit-prefix
 *   @param {String} options.utilPrefix value of $unit-util-prefix
 *   @param {String} options.breakpoints value of $unit-breakpoints
 *   @param {String} options.stateSelectorsFocus value of $unit-state-selectors-focus
 *   @param {String} options.stateSelectorsSelected value of $unit-state-selectors-selected
 *   @param {String} options.stateSelectorsDisabled value of $unit-state-selectors-disabled
 *   @param {String} options.stateSelectorsCurrent value of $unit-state-selectors-current
 *   @param {String} options.fontEnableOverride value of $unit-font-enable-override
 *   @param {String} options.fontFamily value of $unit-font-family
 *   @param {String} options.fontFamilyMonospace value of $unit-font-family-monospace
 *   @param {String} options.fontEnableAdvancedSettings value of $unit-font-enable-advanced-settings
 *   @param {String} options.fontEnableRelativeSize value of $unit-font-enable-relative-size
 *   @param {String} options.fontBaseSize value of $unit-font-base-size
 *   @param {String} options.fontSize value of $unit-font-size
 *   @param {String} options.letterSpacing value of $unit-letter-spacing
 *   @param {String} options.lineHeight value of $unit-line-height
 * @return {String}
 */
module.exports = function normalizeGlobalSettings(options = {}) {
  const opts = Object.assign({}, defaultOptions, options);

  const values = Object.entries(opts)
    .map(([key, value]) => {
      if (mappingKeyToSassVariable.has(key)) {
        const varName = mappingKeyToSassVariable.get(key);

        if (existOrEmptyString(value)) {
          return `${varName}: ${value};`;
        }
        return false;
      }
      return false;
    });

  return values.filter((value) => Boolean(value)).join('\n');
};
