const sass = require('node-sass');

/**
 * default options of eachCompile
 *
 * @type {Object}
 */
const defaultOptions = {
  outputStyle: 'compact'
};

/* eslint-disable max-params */
/**
 * each compile by test cases
 *
 * @param {Array<Object>} testCases test case
 * @param {Function} wrapper wrapper function of sass code
 * @param {Function} rendered callback function when call rendered
 * @param {Object} options option
 * @return {Promise}
 */
module.exports = async function eachCompile(
  testCases = [],
  wrapper = () => {}, // eslint-disable-line no-empty-function
  rendered = () => {}, // eslint-disable-line no-empty-function
  options = {}
) {
  const opts = Object.assign({}, defaultOptions, options),
        {outputStyle} = opts;

  await Promise.all(testCases.map(
    (testCase) => new Promise((resolve, reject) => {
      const {params, expected} = testCase;

      sass.render(
        {
          data: wrapper(...params),
          outputStyle
        },
        (error, result) => rendered({params, expected, error, result}, {resolve, reject})
      );
    })
  ));
};
/* eslint-enable max-params */
