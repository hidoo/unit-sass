module.exports = {
  'root': true,
  'extends': [
    '@hidoo/eslint-config',
    '@hidoo/eslint-config/+babel'
  ],
  'overrides': [
    // for Mocha
    {
      'files': [
        '**/*.test.js'
      ],
      'extends': [
        '@hidoo/eslint-config/+mocha'
      ]
    },
    // for Node
    {
      'files': [
        '**/gulpfile.babel.js',
        '**/task/*.js',
        'packages/sassdoc-to-markdown/src/**/*.js'
      ],
      'extends': [
        '@hidoo/eslint-config/+node'
      ]
    }
  ]
};
