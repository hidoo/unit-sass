const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const Handlebars = require('handlebars');
const glob = require('glob');
const KssBuilderBase = require('kss/builder/base');
const helpers = require('@hidoo/handlebars-helpers');

const asyncReadFile = promisify(fs.readFile);

let pkg = {};

// try to load package.json that on current working directory
try {
  pkg = require(path.resolve(process.cwd(), 'package.json')); // eslint-disable-line global-require
}
catch (error) {
  console.error('Failed to load package.json.'); // eslint-disable-line no-console
}

/**
 * A kss-node builder that takes input files and builds a style guide using
 * Handlebars templates.
 * + Fixed handling of Promise (Bluebird) in original KssBuilderHandlebars.
 * + original: <https://github.com/kss-node/kss-node/blob/master/builder/base/handlebars/kss_builder_base_handlebars.js>
 * @class KssBuilderHandlebars
 */
class KssBuilderHandlebars extends KssBuilderBase {

  constructor() {
    super();

    // Store the version of the builder API that the builder instance is
    // expecting; we will verify this in loadBuilder().
    this.API = '3.0';
  }

  /**
   * extend buildGuide method in parent class
   * + disable the function of generating individual style guide for each item,
   *   added to version 3.0.0-beta.17 or later.
   *
   * @param {KssStyleGuide} styleGuide The KSS style guide in object format.
   * @param {object} options The options necessary to use this helper method.
   * @returns {Promise.<KssStyleGuide>} A `Promise` object resolving to a
   *   `KssStyleGuide` object.
   */
  buildGuide(styleGuide, options) {

    // if set the value other than undefined to this.templates.item,
    // individual style guide will not be generated
    // https://github.com/kss-node/kss-node/blob/master/builder/base/kss_builder_base.js#L743
    if (typeof this.templates === 'undefined') {
      this.templates = {
        item: null
      };
    }
    else {
      this.templates.item = null;
    }

    return super.buildGuide(styleGuide, options);
  }

  /**
   * Allow the builder to preform pre-build tasks or modify the KssStyleGuide
   * object.
   *
   * The method can be set by any KssBuilderBase sub-class to do any custom
   * tasks after the KssStyleGuide object is created and before the HTML style
   * guide is built.
   *
   * @param {KssStyleGuide} styleGuide The KSS style guide in object format.
   * @returns {Promise.<null>} A `Promise` object resolving to `null`.
   */
  prepare(styleGuide) {

    // call prepare method in parent class
    // + "prepare" method return Promise, so add process by "then" method
    // eslint-disable-next-line no-shadow
    return super.prepare(styleGuide).then((styleGuide) => {

      // create new Handlebars instance
      this.Handlebars = Handlebars.create();

      // add helpers
      Object.entries(helpers).forEach(([name, func]) =>
        this.Handlebars.registerHelper(name, func)
      );

      // add helpers (NODE_ENV)
      this.Handlebars.registerHelper('NODE_ENV', () =>
        process.env.NODE_ENV || 'development' // eslint-disable-line no-process-env
      );

      // add helpers (package information)
      this.Handlebars.registerHelper('packageName', () =>
        new this.Handlebars.SafeString(pkg.name || '')
      );
      this.Handlebars.registerHelper('packageDescription', () =>
        new this.Handlebars.SafeString(pkg.description || '')
      );
      this.Handlebars.registerHelper('packageVersion', () =>
        new this.Handlebars.SafeString(pkg.version || '')
      );

      // add partials
      glob.sync(`${__dirname}/src/partials/**/*.hbs`).forEach((filepath) => {
        const data = fs.readFileSync(filepath, 'utf8');

        if (data && typeof data.toString === 'function') {
          this.Handlebars.registerPartial(path.basename(filepath, '.hbs'), data);
        }
      });

      // + Create a new destination directory.
      // + Load modules that extend Handlebars.
      const prepareTasks = [
        this.prepareDestination('kss-assets'),
        this.prepareExtend(this.Handlebars)
      ];

      return Promise.all(prepareTasks).then(() => Promise.resolve(styleGuide));
    });
  }

  /**
   * Build the HTML files of the style guide given a KssStyleGuide object.
   *
   * @param {KssStyleGuide} styleGuide The KSS style guide in object format.
   * @returns {Promise.<KssStyleGuide>} A `Promise` object resolving to a
   *   `KssStyleGuide` object.
   */
  build(styleGuide) {
    const options = {};

    options.readBuilderTemplate = (name) =>
      asyncReadFile(path.resolve(this.options.builder, `${name}.hbs`), 'utf8')
        .then((data) => this.Handlebars.compile(data));

    // Returns a promise to read/load a template specified by a section.
    options.readSectionTemplate = (name, filepath) => asyncReadFile(filepath, 'utf8')
      .then((data) => this.Handlebars.registerPartial(name, data));

    // Returns a promise to load an inline template from markup.
    options.loadInlineTemplate = (name, markup) => new Promise((resolve) => {
      this.Handlebars.registerPartial(name, markup);
      return resolve();
    });

    // Returns a promise to load the data context given a template file path.
    options.loadContext = (filepath) => new Promise((resolve) => {
      let context = null;

      // Load sample context for the template from the sample .json file.
      try {
        const dir = path.dirname(filepath);
        const filename = `${path.basename(filepath, path.extname(filepath))}.json`;
        const jsonpath = path.join(dir, filename);

        // require() returns a cached object. We want an independent clone of
        // the object so we can make changes without affecting the original.
        context = require(jsonpath); // eslint-disable-line global-require
        context = JSON.parse(JSON.stringify(context));
      }
      catch (error) {
        context = {};
      }

      return resolve(context);
    });

    // Returns a promise to get a template by name.
    options.getTemplate = (name) => new Promise((resolve) =>
      resolve(this.Handlebars.compile(`{{> ${name}}}`))
    );

    // Returns a promise to get a template's markup by name.
    options.getTemplateMarkup = (name) => new Promise((resolve) =>
      resolve(this.Handlebars.partials[name])
    );

    // Renders a template and returns the markup.
    options.templateRender = (template, context) => template(context);

    // Converts a filename into a Handlebars partial name.
    // + Return the filename without the full path or the file extension.
    options.filenameToTemplateRef = (filename) =>
      path.basename(filename, path.extname(filename));

    options.templateExtension = 'hbs';
    options.emptyTemplate = '{{! Cannot be an empty string. }}';

    return this.buildGuide(styleGuide, options);
  }
}

module.exports = KssBuilderHandlebars;