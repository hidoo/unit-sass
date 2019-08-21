# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.3.0](https://github.com/hidoo/unit-sass/compare/v0.2.0...v0.3.0) (2019-08-21)


### Bug Fixes

* **kss-builder:** fix styling of code tag in kss-block-document ([a6e98de](https://github.com/hidoo/unit-sass/commit/a6e98de))
* **unit:** fix typo ([50494d9](https://github.com/hidoo/unit-sass/commit/50494d9))
* **unit:** remove text base settings from structure role units ([a5aec88](https://github.com/hidoo/unit-sass/commit/a5aec88))


### Features

* **kss-builder:** add custom builder for kss-node ([229914b](https://github.com/hidoo/unit-sass/commit/229914b))


### BREAKING CHANGES

* **unit:** rename unit-text--decoration-default to unit-text-text--decoration-false and unit-text--decoration-strikelike to unit-text---text--decoration-strikeline
* **unit:** text styles no longer apply to internal text nodes





# [0.2.0](https://github.com/hidoo/unit-sass/compare/v0.1.0...v0.2.0) (2019-08-14)


### Bug Fixes

* **deps:** update dependency remark to v11.0.1 ([082b110](https://github.com/hidoo/unit-sass/commit/082b110))
* **unit:** fix to not override font-family in body ([11e12d0](https://github.com/hidoo/unit-sass/commit/11e12d0))
* **unit:** remove argument $feature-settings from [@mixin](https://github.com/mixin) use-font-base ([4101736](https://github.com/hidoo/unit-sass/commit/4101736))


### Features

* **stylelint-config:** add word-break to properties-order settings ([85b825a](https://github.com/hidoo/unit-sass/commit/85b825a))
* **unit:** add [@mixin](https://github.com/mixin) use-font-advanced-settings ([ec0f853](https://github.com/hidoo/unit-sass/commit/ec0f853))
* **unit:** add argument $word-break to [@mixin](https://github.com/mixin) use-text-base ([0ad73e1](https://github.com/hidoo/unit-sass/commit/0ad73e1))


### BREAKING CHANGES

* **unit:** changed @mixin use-font-family not to refer to $unit-font-enable-override
* **unit:** instead use @mixin use-font-advanced-settings if to set font-feature-settings





# 0.1.0 (2019-08-02)


### Bug Fixes

* **sassdoc-to-markdown:** fix parameterTable partial ([d48df5d](https://github.com/hidoo/unit-sass/commit/d48df5d))
* **sassdoc-to-markdown:** fix slug helper ([a03d264](https://github.com/hidoo/unit-sass/commit/a03d264))
* **sassdoc-to-markdown:** fix sort rules ([d9738ef](https://github.com/hidoo/unit-sass/commit/d9738ef))
* **sassdoc-to-markdown:** markdown format tweek ([e457e8d](https://github.com/hidoo/unit-sass/commit/e457e8d))
* **unit:** add prefix to $counter-name in unit--list--marker-numeric ([8641333](https://github.com/hidoo/unit-sass/commit/8641333))
* **unit:** change to ignore multiple define-inline-placeholder ([7846b78](https://github.com/hidoo/unit-sass/commit/7846b78))
* **unit:** fix default font family in windows ([1e05de9](https://github.com/hidoo/unit-sass/commit/1e05de9))
* **unit:** rename [@mixin](https://github.com/mixin) define-inline-placeholder to define-placeholder ([6d7d1e1](https://github.com/hidoo/unit-sass/commit/6d7d1e1))
* **unit:** rename to $unit-font-enable-advanced-settings ([7e2d5b2](https://github.com/hidoo/unit-sass/commit/7e2d5b2))
* **unit-mixin-use-spritesheet:** fix to can specify if-mobile to $use2x ([ad51868](https://github.com/hidoo/unit-sass/commit/ad51868))
* **unit-mixin-use-spritesheet:** fix to use builtin css template ([186ad48](https://github.com/hidoo/unit-sass/commit/186ad48))
* **unit-mixin-use-spritesheet:** rename --responsive to --if-mobile ([c7cd778](https://github.com/hidoo/unit-sass/commit/c7cd778))


### Features

* **sassdoc-to-markdown:** add tool that build markdown docs use sassdoc ([db01c4d](https://github.com/hidoo/unit-sass/commit/db01c4d))
* **stylelint-config:** add package that sharable stylelint config ([a8c174c](https://github.com/hidoo/unit-sass/commit/a8c174c))
* **stylelint-config:** add sharable stylelint config ([d0dbe89](https://github.com/hidoo/unit-sass/commit/d0dbe89))
* **unit:** add $capturing-selectors argument to [@mixin](https://github.com/mixin) on-disabled ([a64fa05](https://github.com/hidoo/unit-sass/commit/a64fa05))
* **unit:** add hook mixins ([ac7176a](https://github.com/hidoo/unit-sass/commit/ac7176a))
* **unit:** add package that sass based css framework ([b2e9e19](https://github.com/hidoo/unit-sass/commit/b2e9e19))
* **unit:** add select unit ([924fb6c](https://github.com/hidoo/unit-sass/commit/924fb6c))
* **unit-mixin-use-spritesheet:** add toggle option ([94ee7f9](https://github.com/hidoo/unit-sass/commit/94ee7f9))
* **unit-mixin-use-spritesheet:** mixin for using spritesheet ([90997a4](https://github.com/hidoo/unit-sass/commit/90997a4))
* **unit-test-util:** add prefix and utilPrefix options ([12687aa](https://github.com/hidoo/unit-sass/commit/12687aa))
* **unit-test-util:** add test utilities for unit framework ([4c9ce70](https://github.com/hidoo/unit-sass/commit/4c9ce70))
