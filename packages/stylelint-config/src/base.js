/**
 * properties order settings
 * @type {Object}
 */
const order = {
  sizes: [
    'min',
    'max'
  ],
  directions: [
    'top',
    'right',
    'bottom',
    'left'
  ]
};

/**
 * return flatten array
 * @param {Array} arr array
 * @return {Array}
 */
function flatten(arr = []) {
  return arr.reduce((prev, current) => prev.concat(current), []);
}

module.exports = {
  extends: [
    'stylelint-config-standard'
  ],
  plugins: [
    'stylelint-a11y',
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-high-performance-animation',
    'stylelint-no-unsupported-browser-features',
    'stylelint-order',
    'stylelint-selector-tag-no-without-class'
  ],
  rules: {
    // stylelint
    'at-rule-semicolon-space-before': 'never',
    // 'unicode-bom': 'never',

    // a11y/stylelint-a11y
    'a11y/no-display-none': true,
    'a11y/no-obsolete-attribute': true,
    'a11y/no-obsolete-element': true,
    'a11y/no-outline-none': true,
    'a11y/no-text-align-justify': true,
    'a11y/selector-pseudo-class-focus': true,

    // order/stylelint-order
    'order/properties-order': [
      flatten([
        'content',
        'display',
        'visibility',
        'overflow',
        'box-sizing',
        'table-layout',
        'position',
        'z-index',
        order.directions,
        'flex-basis',
        'flex-direction',
        'flex-grow',
        'flex-shrink',
        'flex-wrap',
        'justify-content',
        'align-items',
        'align-content',
        'float',
        'clear',
        'width',
        order.sizes.map((size) => `${size}-width`),
        'height',
        order.sizes.map((size) => `${size}-height`),
        'margin',
        order.directions.map((direction) => `margin-${direction}`),
        'padding',
        order.directions.map((direction) => `padding-${direction}`),
        'list-style',
        'letter-spacing',
        'line-height',
        'text-align',
        'text-decoration',
        'text-indent',
        'vertical-align',
        'white-space',
        'word-break',
        'word-wrap',
        'color',
        'background',
        'background-attachment',
        'background-color',
        'background-image',
        'background-position',
        'background-size',
        'background-repeat',
        'border',
        'border-collapse',
        'border-color',
        order.directions.map((direction) => `border-${direction}-color`),
        'border-style',
        order.directions.map((direction) => `border-${direction}-style`),
        'border-radius',
        'border-width',
        order.directions.map((direction) => `border-${direction}-width`),
        'font',
        'font-family',
        'font-feature-settings',
        'font-size',
        'font-style',
        'font-weight',
        'counter-reset',
        'counter-increment',
        'appearance',
        'box-shadow',
        'cursor',
        'opacity',
        'transform-origin',
        'transform',
        'transition-duration',
        'transition-property',
        'transition-timing-function'
      ]),
      {
        unspecified: 'ignore'
      }
    ],

    // plugin/stylelint-declaration-block-no-ignored-properties
    'plugin/declaration-block-no-ignored-properties': true,

    // plugin/stylelint-high-performance-animation
    'plugin/no-low-performance-animation-properties': [true, {
      ignore: 'paint-properties'
    }],

    // plugin/stylelint-no-unsupported-browser-features
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
    }],

    // plugin/selector-tag-no-without-class
    'plugin/selector-tag-no-without-class': [
      'div',
      'span'
    ]
  }
};
