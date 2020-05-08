/**
 * import modules
 */
import {relative, resolve} from 'path';
import gulp from 'gulp';
import buildStyleguide from '@hidoo/gulp-task-build-styleguide-kss';

/**
 * import modules - local
 */
import * as config from '../config';

/**
 * relative path from styleguide to css
 *
 * @type {String}
 */
const pathToCss = relative(config.path.destStyleguide, config.path.destCss);

// define main task
export const main = buildStyleguide({
  name: 'styleguide:build',
  src: `${config.path.srcStyleguide}`,
  dest: `${config.path.destStyleguide}`,
  css: [`${pathToCss}/main.css`],
  homepage: resolve(__dirname, '../README.md'),
  builder: resolve(__dirname, '../../kss-builder')
});

// define watch task
export const watch = () => {
  gulp.watch(
    [
      `./*.md`,
      `${config.path.srcStyleguide}/*.css`
    ],
    main
  );
};

