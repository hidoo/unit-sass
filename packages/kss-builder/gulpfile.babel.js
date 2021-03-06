/**
 * import modules
 */
import gulp from 'gulp';
import rimraf from 'rimraf';
import fancyPrint from '@hidoo/util-fancy-print';

/**
 * import modules - tasks
 */
import * as config from './config';
import * as css from './task/css';
import * as js from './task/js';
import * as styleguide from './task/styleguide';
import server from './task/server';

/**
 * print values of config
 */
fancyPrint(`${config.pkg.name} - ${config.pkg.version}`, [
  {
    label: 'NODE_ENV',
    value: process.env.NODE_ENV // eslint-disable-line node/no-process-env
  },
  {
    label: 'Compress Flag',
    value: config.compress
  },
  {
    label: 'Destination',
    value: config.path.dest
  },
  {
    label: 'Local Web Server',
    value: (({host, port, protocol}) =>
      `${protocol}://${host}:${port}/`)(config.serverOptions)
  }
]);

/**
 * clean dest task
 *
 * @param {Function} done callback
 * @return {void}
 */
export const clean = (done) => rimraf(`${config.path.dest}/*`, done);

/**
 * server task
 *
 * @type {Function}
 */
export {default as server} from './task/server';

/**
 * build task
 *
 * @return {Function}
 */
export const build = gulp.series(
  css.main,
  js.main,
  styleguide.main
);

/**
 * file observe task
 *
 * @return {Function}
 */
export const watch = gulp.parallel(
  css.watch,
  js.watch,
  styleguide.watch
);

/**
 * default task
 *
 * @return {Function}
 */
export default gulp.series(
  clean,
  build,
  gulp.parallel(
    server,
    watch
  )
);
