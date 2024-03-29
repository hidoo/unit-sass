# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.9.0](https://github.com/hidoo/unit-sass/compare/v0.8.0...v0.9.0) (2023-04-17)


### Features

* **unit:** add as-mask option to plugin/spritesheet ([6d2e4d4](https://github.com/hidoo/unit-sass/commit/6d2e4d48e96706d030c8ab8be9b67eb145dddd93))
* **unit:** add on-print mixin ([3a177c0](https://github.com/hidoo/unit-sass/commit/3a177c0c6f4bfe8f8ef9885a93a9faedfb1b9774))
* **unit:** add use-object-fit option to pict-apply-flexible-size ([4bc01bd](https://github.com/hidoo/unit-sass/commit/4bc01bdc466f23baba7aef44ff6e8fb1b2c406cc))





# [0.8.0](https://github.com/hidoo/unit-sass/compare/v0.7.0...v0.8.0) (2022-07-13)


### Bug Fixes

* **unit:** fix an issue --copy-protect modifier of unit-document with images being copied on chrome ([eb9d4f5](https://github.com/hidoo/unit-sass/commit/eb9d4f506fe3eef7821de992c483c5930f4fe592))
* **unit:** fix an issue --copy-protect modifier of unit-pict with images being copied on chrome ([c08a77b](https://github.com/hidoo/unit-sass/commit/c08a77bb55104c045234d9ba0f0c158363a9cd35))


### Features

* **unit:** add [@function](https://github.com/function) z-index-reserve ([6cea008](https://github.com/hidoo/unit-sass/commit/6cea008a629a1cd15181a4fc17bb1d92f99df0a6))





# [0.7.0](https://github.com/hidoo/unit-sass/compare/v0.6.0...v0.7.0) (2022-01-20)


### Bug Fixes

* **deps:** update stylelint packages and update rules ([0331e7e](https://github.com/hidoo/unit-sass/commit/0331e7e860bb7ab2980602c8f23f355f371d0d22))


### Features

* **unit:** add functions and organize by module ([f3d3878](https://github.com/hidoo/unit-sass/commit/f3d387888ff96574b430658f5f2902777fa728b1))
* **unit:** update mixins and organize by module ([4ee3680](https://github.com/hidoo/unit-sass/commit/4ee36808f9bebd02a2616eb9647394a6b036c326))





# [0.6.0](https://github.com/hidoo/unit-sass/compare/v0.5.0...v0.6.0) (2021-06-09)


### Bug Fixes

* **kss-builder:** change to use sass module system ([2c20d48](https://github.com/hidoo/unit-sass/commit/2c20d48811550940d97367a051a61aef37e4c102))
* **unit:** fix deprecated warnings for slash as division ([6039646](https://github.com/hidoo/unit-sass/commit/603964622a20ed251420c3eacd4022d97e1f2692))


### Features

* **unit:** add settings.$verbose ([b5f4b4d](https://github.com/hidoo/unit-sass/commit/b5f4b4d0e3b83aeb4bf5c446db527caa6c49f95c))
* **unit:** add spritesheet plugin ([3f03059](https://github.com/hidoo/unit-sass/commit/3f03059cc2581e75a824174cd1f4dc37c08e4b0b))


* feat(unit)!: support module system ([be3e994](https://github.com/hidoo/unit-sass/commit/be3e9946bbfccd9e3c9ede2db829d5fd8ca019ea))


### BREAKING CHANGES

*   Drop support for node-sass for migration to module system.

  Remove feature of "Hook mixins". Use instead `with` for configuration of settings.

  Remove `_override.scss` partial. Use instead `_bootstrap.scss`.





# [0.5.0](https://github.com/hidoo/unit-sass/compare/v0.4.4...v0.5.0) (2021-06-08)

**Note:** Version bump only for package @hidoo/unit





## [0.4.4](https://github.com/hidoo/unit-sass/compare/v0.4.2...v0.4.4) (2021-03-31)


### Bug Fixes

* **generator:** fixed in response to changes of commander ([0454249](https://github.com/hidoo/unit-sass/commit/045424935b894adab654c849efd66ee7e5353ded))





## [0.4.3](https://github.com/hidoo/unit-sass/compare/v0.4.2...v0.4.3) (2021-03-31)


### Bug Fixes

* **generator:** fixed in response to changes of commander ([0454249](https://github.com/hidoo/unit-sass/commit/045424935b894adab654c849efd66ee7e5353ded))





## [0.4.2](https://github.com/hidoo/unit-sass/compare/v0.4.1...v0.4.2) (2020-05-08)

**Note:** Version bump only for package @hidoo/unit





## [0.4.1](https://github.com/hidoo/unit-sass/compare/v0.4.0...v0.4.1) (2019-11-11)

**Note:** Version bump only for package @hidoo/unit





# [0.4.0](https://github.com/hidoo/unit-sass/compare/v0.3.1...v0.4.0) (2019-09-17)

**Note:** Version bump only for package @hidoo/unit





# [0.3.0](https://github.com/hidoo/unit-sass/compare/v0.2.0...v0.3.0) (2019-08-21)


### Bug Fixes

* **unit:** fix typo ([50494d9](https://github.com/hidoo/unit-sass/commit/50494d9))
* **unit:** remove text base settings from structure role units ([a5aec88](https://github.com/hidoo/unit-sass/commit/a5aec88))


### BREAKING CHANGES

* **unit:** rename unit-text--decoration-default to unit-text-text--decoration-false and unit-text--decoration-strikelike to unit-text---text--decoration-strikeline
* **unit:** text styles no longer apply to internal text nodes





# [0.2.0](https://github.com/hidoo/unit-sass/compare/v0.1.0...v0.2.0) (2019-08-14)


### Bug Fixes

* **unit:** fix to not override font-family in body ([11e12d0](https://github.com/hidoo/unit-sass/commit/11e12d0))
* **unit:** remove argument $feature-settings from [@mixin](https://github.com/mixin) use-font-base ([4101736](https://github.com/hidoo/unit-sass/commit/4101736))


### Features

* **unit:** add [@mixin](https://github.com/mixin) use-font-advanced-settings ([ec0f853](https://github.com/hidoo/unit-sass/commit/ec0f853))
* **unit:** add argument $word-break to [@mixin](https://github.com/mixin) use-text-base ([0ad73e1](https://github.com/hidoo/unit-sass/commit/0ad73e1))


### BREAKING CHANGES

* **unit:** changed @mixin use-font-family not to refer to $unit-font-enable-override
* **unit:** instead use @mixin use-font-advanced-settings if to set font-feature-settings





# 0.1.0 (2019-08-02)


### Bug Fixes

* **unit:** add prefix to $counter-name in unit--list--marker-numeric ([8641333](https://github.com/hidoo/unit-sass/commit/8641333))
* **unit:** change to ignore multiple define-inline-placeholder ([7846b78](https://github.com/hidoo/unit-sass/commit/7846b78))
* **unit:** fix default font family in windows ([1e05de9](https://github.com/hidoo/unit-sass/commit/1e05de9))
* **unit:** rename [@mixin](https://github.com/mixin) define-inline-placeholder to define-placeholder ([6d7d1e1](https://github.com/hidoo/unit-sass/commit/6d7d1e1))
* **unit:** rename to $unit-font-enable-advanced-settings ([7e2d5b2](https://github.com/hidoo/unit-sass/commit/7e2d5b2))


### Features

* **unit:** add $capturing-selectors argument to [@mixin](https://github.com/mixin) on-disabled ([a64fa05](https://github.com/hidoo/unit-sass/commit/a64fa05))
* **unit:** add hook mixins ([ac7176a](https://github.com/hidoo/unit-sass/commit/ac7176a))
* **unit:** add package that sass based css framework ([b2e9e19](https://github.com/hidoo/unit-sass/commit/b2e9e19))
* **unit:** add select unit ([924fb6c](https://github.com/hidoo/unit-sass/commit/924fb6c))
