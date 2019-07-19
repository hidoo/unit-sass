/**
 * import modules
 */
import {relative} from 'path';
import gulp from 'gulp';
import buildImageSprite from '@hidoo/gulp-task-build-sprite-image';
import buildSvgSprite from '@hidoo/gulp-task-build-sprite-svg';

/**
 * import modules - local
 */
import * as config from '../config';

/**
 * url parameter for browser cache
 * @type {String}
 */
const cacheParameter = process.env.NODE_ENV === 'development' ? // eslint-disable-line no-process-env
  '' : `?version=${config.pkg.version}`;

/**
 * relative path from css to sprite
 * @type {String}
 */
const pathToSprite = relative(config.path.destCss, config.path.destSprite);

/**
 * return merged build options
 * @param {Object} options build task options
 * @return {Object}
 */
function buildOptions(options = {}) {
  return {
    ...options,
    destImg: config.path.destSprite,
    destCss: `${config.path.srcCss}/sprite`,
    imgPath: `${pathToSprite}/${options.imgName}${cacheParameter}`,
    cssPreprocessor: 'sass',
    compress: config.compress
  };
}

const iconImage = buildImageSprite(buildOptions({
  name: 'sprite:icon:image',
  src: `${config.path.srcSprite}/icon-assets/*.png`,
  imgName: 'icon-image.png',
  cssName: '_icon-image.scss',
  evenize: true
}));

const iconSvg = buildSvgSprite(buildOptions({
  name: 'sprite:icon:svg',
  src: `${config.path.srcSprite}/icon-assets/*.svg`,
  imgName: 'icon-svg.svg',
  cssName: '_icon-svg.scss'
}));

const textImage = buildImageSprite(buildOptions({
  name: 'sprite:text:image',
  src: `${config.path.srcSprite}/text-assets/*.png`,
  imgName: 'text-image.png',
  cssName: '_text-image.scss',
  evenize: true
}));

const textSvg = buildSvgSprite(buildOptions({
  name: 'sprite:text:svg',
  src: `${config.path.srcSprite}/text-assets/*.svg`,
  imgName: 'text-svg.svg',
  cssName: '_text-svg.scss'
}));

// define main task
export const main = gulp.parallel(
  iconImage,
  iconSvg,
  textImage,
  textSvg
);

// define watch task
export const watch = () => {
  gulp.watch(
    [
      `${config.path.srcSprite}/icon-assets/*.svg`,
      `${config.path.srcSprite}/**/*.hbs`
    ],
    iconSvg
  );
  gulp.watch(
    [
      `${config.path.srcSprite}/icon-assets/*.png`,
      `${config.path.srcSprite}/**/*.hbs`
    ],
    iconImage
  );
  gulp.watch(
    [
      `${config.path.srcSprite}/text-assets/*.png`,
      `${config.path.srcSprite}/**/*.hbs`
    ],
    textImage
  );
  gulp.watch(
    [
      `${config.path.srcSprite}/text-assets/*.svg`,
      `${config.path.srcSprite}/**/*.hbs`
    ],
    textSvg
  );
};

