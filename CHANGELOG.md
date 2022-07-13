# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.8.0](https://github.com/hidoo/unit-sass/compare/v0.7.0...v0.8.0) (2022-07-13)


### Bug Fixes

* **deps:** update dependency glob to v7.2.3 ([0fe028d](https://github.com/hidoo/unit-sass/commit/0fe028d939f2592945ed978a70a75279f24344dc))
* **deps:** update dependency postcss to v8.4.14 ([1d66b47](https://github.com/hidoo/unit-sass/commit/1d66b473507f681bc60aa132e2bfa415c76d774c))
* **deps:** update dependency postcss-scss to v4.0.4 ([def578e](https://github.com/hidoo/unit-sass/commit/def578eb5030e7bf18420d09aff35d2b91772235))
* **deps:** update dependency resolve to v1.21.1 ([a8769ba](https://github.com/hidoo/unit-sass/commit/a8769ba8f4cd2691347ede409307826e7f2a27f9))
* **deps:** update dependency resolve to v1.22.1 ([d8b94f6](https://github.com/hidoo/unit-sass/commit/d8b94f68acb41c18aff1630feef94f748443d3cb))
* **deps:** update dependency sassdoc to v2.7.4 ([739ef05](https://github.com/hidoo/unit-sass/commit/739ef054615c9dd0a9a3bc28b8363a058cb54de5))
* **unit:** fix an issue --copy-protect modifier of unit-document with images being copied on chrome ([eb9d4f5](https://github.com/hidoo/unit-sass/commit/eb9d4f506fe3eef7821de992c483c5930f4fe592))
* **unit:** fix an issue --copy-protect modifier of unit-pict with images being copied on chrome ([c08a77b](https://github.com/hidoo/unit-sass/commit/c08a77bb55104c045234d9ba0f0c158363a9cd35))


### Features

* **stylelint-config:** enable keyframe-block-no-duplicate-selectors rules ([dbcf7c4](https://github.com/hidoo/unit-sass/commit/dbcf7c41ec4057308b7b3570d2f1a9e3dc3a9dcc))
* **unit:** add [@function](https://github.com/function) z-index-reserve ([6cea008](https://github.com/hidoo/unit-sass/commit/6cea008a629a1cd15181a4fc17bb1d92f99df0a6))





# [0.7.0](https://github.com/hidoo/unit-sass/compare/v0.6.0...v0.7.0) (2022-01-20)


### Bug Fixes

* **deps:** update dependency @hidoo/handlebars-helpers to v0.8.2 ([2856a4a](https://github.com/hidoo/unit-sass/commit/2856a4a6d9d705b9c3c5f13dda17b02c9549476f))
* **deps:** update dependency glob to v7.2.0 ([42ec58a](https://github.com/hidoo/unit-sass/commit/42ec58a515f52c9c89d3d19480315b5b99b25be9))
* **deps:** update dependency highlight.js to v11.1.0 ([89ec765](https://github.com/hidoo/unit-sass/commit/89ec765f00931ee10488e76a67bf38d958a8468e))
* **deps:** update dependency highlight.js to v11.4.0 ([07349bb](https://github.com/hidoo/unit-sass/commit/07349bbe1d2b62d14680dc9331c0222916e6637f))
* **deps:** update stylelint packages ([63e9911](https://github.com/hidoo/unit-sass/commit/63e991177c46ee9e26f1cfe344eb3a920ff04c58))
* **deps:** update stylelint packages ([4812d22](https://github.com/hidoo/unit-sass/commit/4812d22700ef812dad07418cb20b39d1957ba024))
* **deps:** update stylelint packages and update rules ([0331e7e](https://github.com/hidoo/unit-sass/commit/0331e7e860bb7ab2980602c8f23f355f371d0d22))
* **kss-builder:** fix deprecation warnings ([2bea673](https://github.com/hidoo/unit-sass/commit/2bea673be62c62e55e2aec6c6272ceb7ee2315ef))


### Features

* **stylelint-config:** update options of scss/at-function-named-arguments ([35cee26](https://github.com/hidoo/unit-sass/commit/35cee26a3a1727ca2359b3e7b6a14f45dfaf21fe))
* **unit:** add functions and organize by module ([f3d3878](https://github.com/hidoo/unit-sass/commit/f3d387888ff96574b430658f5f2902777fa728b1))
* **unit:** update mixins and organize by module ([4ee3680](https://github.com/hidoo/unit-sass/commit/4ee36808f9bebd02a2616eb9647394a6b036c326))





# [0.6.0](https://github.com/hidoo/unit-sass/compare/v0.5.0...v0.6.0) (2021-06-09)


### Bug Fixes

* **kss-builder:** change to use sass module system ([2c20d48](https://github.com/hidoo/unit-sass/commit/2c20d48811550940d97367a051a61aef37e4c102))
* **unit:** fix deprecated warnings for slash as division ([6039646](https://github.com/hidoo/unit-sass/commit/603964622a20ed251420c3eacd4022d97e1f2692))


### Features

* **stylelint-config:** enable scss/no-global-function-names rule ([d8dbc4e](https://github.com/hidoo/unit-sass/commit/d8dbc4e763189828e6db1c4a69848d9c5897adef))
* **unit:** add settings.$verbose ([b5f4b4d](https://github.com/hidoo/unit-sass/commit/b5f4b4d0e3b83aeb4bf5c446db527caa6c49f95c))
* **unit:** add spritesheet plugin ([3f03059](https://github.com/hidoo/unit-sass/commit/3f03059cc2581e75a824174cd1f4dc37c08e4b0b))


* fix!: remove unit-mixin-use-spritesheet ([04f0963](https://github.com/hidoo/unit-sass/commit/04f09637aaa59db19c9ccc216ee35753b8eca3d2))
* feat(unit)!: support module system ([be3e994](https://github.com/hidoo/unit-sass/commit/be3e9946bbfccd9e3c9ede2db829d5fd8ca019ea))


### BREAKING CHANGES

* Remove @hidoo/unit-mixin-use-spritesheet package, instead use src/plugin/spritesheet in @hidoo/unit.
*   Drop support for node-sass for migration to module system.

  Remove feature of "Hook mixins". Use instead `with` for configuration of settings.

  Remove `_override.scss` partial. Use instead `_bootstrap.scss`.





# [0.5.0](https://github.com/hidoo/unit-sass/compare/v0.4.4...v0.5.0) (2021-06-08)


### Bug Fixes

* **deps:** update dependency fs-extra to v10 ([db930a5](https://github.com/hidoo/unit-sass/commit/db930a58f63db1913698fe31d753a6ef97a87ede))
* **deps:** update dependency glob to v7.1.7 ([ee0999e](https://github.com/hidoo/unit-sass/commit/ee0999e8e366b128c9111c4121398abbf9918530))
* **deps:** update dependency highlight.js to v10.7.2 ([f69b7d9](https://github.com/hidoo/unit-sass/commit/f69b7d932b3188959b58f225137952a6a77a6106))
* **deps:** update dependency highlight.js to v10.7.3 ([61cb7c5](https://github.com/hidoo/unit-sass/commit/61cb7c5826eb6c8e7232b57b59e2310ceec03cad))
* **deps:** update dependency highlight.js to v11 ([554b990](https://github.com/hidoo/unit-sass/commit/554b99020c3e15ddf11097c47947fa124ae58e1d))
* **deps:** update stylelint packages ([cfadd5a](https://github.com/hidoo/unit-sass/commit/cfadd5a940453c9ce4fc69156056ed6e4b798881))
* **kss-builder:** tweaks code element style of highlight.js ([6fcbd63](https://github.com/hidoo/unit-sass/commit/6fcbd63161c0aade3531b460974813ff89c2571e))
* **stylelint-config:** disable no-invalid-position-at-import-rule in sass config ([44b809e](https://github.com/hidoo/unit-sass/commit/44b809edaced4455ccaadb208b7c78cdab263ea6))


### Features

* **sass-importer:** add custom sass importer ([2a38273](https://github.com/hidoo/unit-sass/commit/2a38273504483fdcc588eae116cdbeb009dbf27d))
* **sass-importer:** adjust and update test cases ([a1fdd67](https://github.com/hidoo/unit-sass/commit/a1fdd67fb6133df96cc12cb14fbae173a4c44106))





## [0.4.4](https://github.com/hidoo/unit-sass/compare/v0.4.2...v0.4.4) (2021-03-31)


### Bug Fixes

* **deps:** update dependency @hidoo/handlebars-helpers to v0.8.0 ([dbf4884](https://github.com/hidoo/unit-sass/commit/dbf4884422adc724102f0286f6e02a680b2f561c))
* **deps:** update dependency fs-extra to v9.0.1 ([f72413e](https://github.com/hidoo/unit-sass/commit/f72413eeeb821834c1e5eea42b71fca78ed97ccb))
* **deps:** update dependency fs-extra to v9.1.0 ([ae51160](https://github.com/hidoo/unit-sass/commit/ae51160326cd5ab4edd3aff0902b9ffc28e3fa5d))
* **deps:** update dependency handlebars to v4.7.7 ([ddabfd4](https://github.com/hidoo/unit-sass/commit/ddabfd498cd0d9e9278669b04d6dde86f5c9ab4b))
* **deps:** update dependency highlight.js to v10.0.2 ([ba197e3](https://github.com/hidoo/unit-sass/commit/ba197e3a5c90ca9ccc18c2a7ec7a86dbecd084ab))
* **deps:** update dependency highlight.js to v10.0.3 ([34b4467](https://github.com/hidoo/unit-sass/commit/34b44676282d19b31ca44759f9704a34a15787f0))
* **deps:** update dependency highlight.js to v10.4.1 [security] ([947b759](https://github.com/hidoo/unit-sass/commit/947b759a2cda589f616d8e6200e0b0a39321224c))
* **deps:** update dependency highlight.js to v10.7.1 ([0e05b3f](https://github.com/hidoo/unit-sass/commit/0e05b3f7dc88f4958bd5522c28f830ba5acb7064))
* **deps:** update dependency meow to v7 ([eb41854](https://github.com/hidoo/unit-sass/commit/eb4185423ecec6392a9c5451f67b7039e2a68e1e))
* **deps:** update dependency meow to v7.0.1 ([2b90cf7](https://github.com/hidoo/unit-sass/commit/2b90cf764a203a1e9c157aef1a028cd1d102b29a))
* **deps:** update dependency meow to v9 ([8e5825d](https://github.com/hidoo/unit-sass/commit/8e5825d2ef438777e0ca3ef1d34470378f0ccb2c))
* **deps:** update dependency remark to v12.0.1 ([e66822a](https://github.com/hidoo/unit-sass/commit/e66822ab2d01bb273c74f4bc6a58f0c9443e1d03))
* **deps:** update dependency remark to v13 ([ad1add2](https://github.com/hidoo/unit-sass/commit/ad1add26c6f673fc3ff4f9f523bcc913b67a279f))
* **deps:** update dependency sassdoc to v2.7.2 ([7633742](https://github.com/hidoo/unit-sass/commit/76337427c587b7759182b65d1fbf7f810c6650eb))
* **deps:** update dependency sassdoc to v2.7.3 ([e8cafd7](https://github.com/hidoo/unit-sass/commit/e8cafd7fa7070d79828e4a235fd6fe67c16d68f8))
* **deps:** update dependency stylelint-config-standard to v21 ([0a4f9e7](https://github.com/hidoo/unit-sass/commit/0a4f9e749593c64f45b862181046d7897e9a7ad8))
* **deps:** update dependency stylelint-group-selectors to v1.0.8 ([6b0a8cb](https://github.com/hidoo/unit-sass/commit/6b0a8cb3b0f994296b0333805e2c0334e27da157))
* **deps:** update dependency stylelint-high-performance-animation to v1.5.2 ([81348c9](https://github.com/hidoo/unit-sass/commit/81348c9ba984f622653e32aa6575615e3227a71e))
* **deps:** update dependency stylelint-scss to v3.17.2 ([353a0e1](https://github.com/hidoo/unit-sass/commit/353a0e19c44012ac79d8cf2bdf3ed4df6886d43b))
* **generator:** fixed in response to changes of commander ([0454249](https://github.com/hidoo/unit-sass/commit/045424935b894adab654c849efd66ee7e5353ded))
* **kss-builder:** strip path from overview when homepage set local path ([c3bb518](https://github.com/hidoo/unit-sass/commit/c3bb5186a7f8b7806a53bf17d1bb80cf02deb638))





## [0.4.3](https://github.com/hidoo/unit-sass/compare/v0.4.2...v0.4.3) (2021-03-31)


### Bug Fixes

* **deps:** update dependency @hidoo/handlebars-helpers to v0.8.0 ([dbf4884](https://github.com/hidoo/unit-sass/commit/dbf4884422adc724102f0286f6e02a680b2f561c))
* **deps:** update dependency fs-extra to v9.0.1 ([f72413e](https://github.com/hidoo/unit-sass/commit/f72413eeeb821834c1e5eea42b71fca78ed97ccb))
* **deps:** update dependency fs-extra to v9.1.0 ([ae51160](https://github.com/hidoo/unit-sass/commit/ae51160326cd5ab4edd3aff0902b9ffc28e3fa5d))
* **deps:** update dependency handlebars to v4.7.7 ([ddabfd4](https://github.com/hidoo/unit-sass/commit/ddabfd498cd0d9e9278669b04d6dde86f5c9ab4b))
* **deps:** update dependency highlight.js to v10.0.2 ([ba197e3](https://github.com/hidoo/unit-sass/commit/ba197e3a5c90ca9ccc18c2a7ec7a86dbecd084ab))
* **deps:** update dependency highlight.js to v10.0.3 ([34b4467](https://github.com/hidoo/unit-sass/commit/34b44676282d19b31ca44759f9704a34a15787f0))
* **deps:** update dependency highlight.js to v10.4.1 [security] ([947b759](https://github.com/hidoo/unit-sass/commit/947b759a2cda589f616d8e6200e0b0a39321224c))
* **deps:** update dependency highlight.js to v10.7.1 ([0e05b3f](https://github.com/hidoo/unit-sass/commit/0e05b3f7dc88f4958bd5522c28f830ba5acb7064))
* **deps:** update dependency meow to v7 ([eb41854](https://github.com/hidoo/unit-sass/commit/eb4185423ecec6392a9c5451f67b7039e2a68e1e))
* **deps:** update dependency meow to v7.0.1 ([2b90cf7](https://github.com/hidoo/unit-sass/commit/2b90cf764a203a1e9c157aef1a028cd1d102b29a))
* **deps:** update dependency meow to v9 ([8e5825d](https://github.com/hidoo/unit-sass/commit/8e5825d2ef438777e0ca3ef1d34470378f0ccb2c))
* **deps:** update dependency remark to v12.0.1 ([e66822a](https://github.com/hidoo/unit-sass/commit/e66822ab2d01bb273c74f4bc6a58f0c9443e1d03))
* **deps:** update dependency remark to v13 ([ad1add2](https://github.com/hidoo/unit-sass/commit/ad1add26c6f673fc3ff4f9f523bcc913b67a279f))
* **deps:** update dependency sassdoc to v2.7.2 ([7633742](https://github.com/hidoo/unit-sass/commit/76337427c587b7759182b65d1fbf7f810c6650eb))
* **deps:** update dependency sassdoc to v2.7.3 ([e8cafd7](https://github.com/hidoo/unit-sass/commit/e8cafd7fa7070d79828e4a235fd6fe67c16d68f8))
* **deps:** update dependency stylelint-config-standard to v21 ([0a4f9e7](https://github.com/hidoo/unit-sass/commit/0a4f9e749593c64f45b862181046d7897e9a7ad8))
* **deps:** update dependency stylelint-group-selectors to v1.0.8 ([6b0a8cb](https://github.com/hidoo/unit-sass/commit/6b0a8cb3b0f994296b0333805e2c0334e27da157))
* **deps:** update dependency stylelint-high-performance-animation to v1.5.2 ([81348c9](https://github.com/hidoo/unit-sass/commit/81348c9ba984f622653e32aa6575615e3227a71e))
* **deps:** update dependency stylelint-scss to v3.17.2 ([353a0e1](https://github.com/hidoo/unit-sass/commit/353a0e19c44012ac79d8cf2bdf3ed4df6886d43b))
* **generator:** fixed in response to changes of commander ([0454249](https://github.com/hidoo/unit-sass/commit/045424935b894adab654c849efd66ee7e5353ded))





## [0.4.2](https://github.com/hidoo/unit-sass/compare/v0.4.1...v0.4.2) (2020-05-08)


### Bug Fixes

* **deps:** update dependency @hidoo/handlebars-helpers to v0.6.1 ([60ed63e](https://github.com/hidoo/unit-sass/commit/60ed63e96f188eed69774f4e945698bca55e2b5e))
* **deps:** update dependency @hidoo/handlebars-helpers to v0.7.0 ([1f18f1c](https://github.com/hidoo/unit-sass/commit/1f18f1cfe29fe37794de7508cb0c1256edc3ac9e))
* **deps:** update dependency fs-extra to v9 ([9f79e69](https://github.com/hidoo/unit-sass/commit/9f79e69618f1636c1e66a563524751587b695cd9))
* **deps:** update dependency handlebars to v4.5.2 ([dbfbe65](https://github.com/hidoo/unit-sass/commit/dbfbe65a165cffb613aadd74865b0f8f29a20bde))
* **deps:** update dependency handlebars to v4.5.3 ([dc10e9b](https://github.com/hidoo/unit-sass/commit/dc10e9b3fde2ad8cc6f2380729c06c09354c833f))
* **deps:** update dependency handlebars to v4.7.2 ([9b685de](https://github.com/hidoo/unit-sass/commit/9b685de4da09e5a46591846be2c49381c9a6d0e4))
* **deps:** update dependency handlebars to v4.7.3 ([4231457](https://github.com/hidoo/unit-sass/commit/4231457283400511ed6e7e4012d61b14dac94dcc))
* **deps:** update dependency handlebars to v4.7.6 ([bddcd3f](https://github.com/hidoo/unit-sass/commit/bddcd3f27c50c062d097970dfc16c9b6f9fbe1ee))
* **deps:** update dependency highlight.js to v10 ([9748b1e](https://github.com/hidoo/unit-sass/commit/9748b1eb73fa84e0a966f9a91f7a097dba0cb695))
* **deps:** update dependency highlight.js to v9.17.1 ([193e43d](https://github.com/hidoo/unit-sass/commit/193e43d33d6272fdd2451bbb507a990de255b156))
* **deps:** update dependency highlight.js to v9.18.0 ([9b54283](https://github.com/hidoo/unit-sass/commit/9b54283bf2e60c5c51ec40fcd8f729af70e54ad6))
* **deps:** update dependency highlight.js to v9.18.1 ([7243a2b](https://github.com/hidoo/unit-sass/commit/7243a2bb609a9c715e7890ad16baf84dffa4e0d9))
* **deps:** update dependency meow to v6 ([927fa06](https://github.com/hidoo/unit-sass/commit/927fa0605302b3de1c49d1660211bdd2e1655915))
* **deps:** update dependency meow to v6.0.1 ([8ffc641](https://github.com/hidoo/unit-sass/commit/8ffc64182e55eda445e813fd85230e2cf577ecc9))
* **deps:** update dependency meow to v6.1.0 ([32a43b4](https://github.com/hidoo/unit-sass/commit/32a43b41ba831d38dd6484c0906b406b4192ff18))
* **deps:** update dependency meow to v6.1.1 ([2e6eb45](https://github.com/hidoo/unit-sass/commit/2e6eb45dc35c9876beed4bd2daa4f29f3d567e84))
* **deps:** update dependency remark to v12 ([4da3219](https://github.com/hidoo/unit-sass/commit/4da32195bae3ab80476f9fea62fd9b5219b01cb2))
* **deps:** update dependency stylelint-a11y to v1.2.3 ([b0be228](https://github.com/hidoo/unit-sass/commit/b0be228a976e1352d8529b9a8c207cda52a44bc1))
* **deps:** update dependency stylelint-config-standard to v20 ([7a03ede](https://github.com/hidoo/unit-sass/commit/7a03edefd2d2368765a7d361b00b849e2aae2819))
* **deps:** update dependency stylelint-high-performance-animation to v1.4.0 ([a4eea33](https://github.com/hidoo/unit-sass/commit/a4eea3385af666b3194371da60f3e258aed3aa2f))
* **deps:** update dependency stylelint-scss to v3.14.2 ([fec61bf](https://github.com/hidoo/unit-sass/commit/fec61bfecd9b7ac4664ff4f43dc52d4fab1a78b5))
* **deps:** update dependency stylelint-scss to v3.15.0 ([8164bc0](https://github.com/hidoo/unit-sass/commit/8164bc0987ee18961526ee69b4e8ea55bca03538))
* **deps:** update dependency stylelint-scss to v3.16.0 ([fe27868](https://github.com/hidoo/unit-sass/commit/fe27868f2109f078462138e33ba12b642b7941a5))
* **deps:** update dependency stylelint-scss to v3.17.1 ([754b3ae](https://github.com/hidoo/unit-sass/commit/754b3aef0bcc6bad3a3d4071d53d0f6bee1e77b1))
* **deps:** update dependency stylelint-selector-tag-no-without-class to v2.0.3 ([812a19d](https://github.com/hidoo/unit-sass/commit/812a19de01ca593b8b51934a5a85991f721a1136))
* **deps:** update stylelint packages ([f670b56](https://github.com/hidoo/unit-sass/commit/f670b56ff3ed6f438c41110d7dbb861b4394e203))
* **deps:** update stylelint packages ([425b087](https://github.com/hidoo/unit-sass/commit/425b087516e6668d7ba32e91943a72bd2189f4c1))
* **node:** remove node v8 support ([f1e05e1](https://github.com/hidoo/unit-sass/commit/f1e05e17da2f54f7682d0c3495c14d21686d31a8))
* **stylelint-config:** ignore sass variables in value-keyword-case rule ([bd270f1](https://github.com/hidoo/unit-sass/commit/bd270f15be8b41369fd24db0c763d59a3567d663))


### Features

* **node:** add node v14 support ([659ec0a](https://github.com/hidoo/unit-sass/commit/659ec0ad948096aac73515785bb51677d966ec59))





## [0.4.1](https://github.com/hidoo/unit-sass/compare/v0.4.0...v0.4.1) (2019-11-11)


### Bug Fixes

* **deps:** update dependency glob to v7.1.5 ([f06e880](https://github.com/hidoo/unit-sass/commit/f06e880))
* **deps:** update dependency glob to v7.1.6 ([78ddc32](https://github.com/hidoo/unit-sass/commit/78ddc32))
* **deps:** update dependency handlebars to v4.2.1 ([6ff4556](https://github.com/hidoo/unit-sass/commit/6ff4556))
* **deps:** update dependency handlebars to v4.3.4 ([ed996b3](https://github.com/hidoo/unit-sass/commit/ed996b3))
* **deps:** update dependency handlebars to v4.4.0 ([3e85ecd](https://github.com/hidoo/unit-sass/commit/3e85ecd))
* **deps:** update dependency handlebars to v4.4.2 ([7937ced](https://github.com/hidoo/unit-sass/commit/7937ced))
* **deps:** update dependency handlebars to v4.4.3 ([72d6aaa](https://github.com/hidoo/unit-sass/commit/72d6aaa))
* **deps:** update dependency handlebars to v4.4.5 ([4893c3c](https://github.com/hidoo/unit-sass/commit/4893c3c))
* **deps:** update dependency handlebars to v4.5.1 ([5298f1a](https://github.com/hidoo/unit-sass/commit/5298f1a))
* **deps:** update dependency highlight.js to v9.16.2 ([f4f4666](https://github.com/hidoo/unit-sass/commit/f4f4666))
* **deps:** update dependency remark to v11.0.2 ([95ca4b7](https://github.com/hidoo/unit-sass/commit/95ca4b7))
* **deps:** update dependency stylelint-a11y to v1.2.2 ([7759fa4](https://github.com/hidoo/unit-sass/commit/7759fa4))
* **deps:** update dependency stylelint-high-performance-animation to v1.3.0 ([d6d23ea](https://github.com/hidoo/unit-sass/commit/d6d23ea))
* **deps:** update dependency stylelint-no-unsupported-browser-features to v4 ([c0f5f8f](https://github.com/hidoo/unit-sass/commit/c0f5f8f))
* **deps:** update dependency stylelint-order to v3.1.1 ([cd15f08](https://github.com/hidoo/unit-sass/commit/cd15f08))
* **deps:** update dependency stylelint-scss to v3.11.1 ([5f5ff2e](https://github.com/hidoo/unit-sass/commit/5f5ff2e))
* **deps:** update dependency stylelint-scss to v3.12.1 ([1271d3b](https://github.com/hidoo/unit-sass/commit/1271d3b))
* **deps:** update dependency stylelint-selector-tag-no-without-class to v2.0.2 ([363938e](https://github.com/hidoo/unit-sass/commit/363938e))





# [0.4.0](https://github.com/hidoo/unit-sass/compare/v0.3.1...v0.4.0) (2019-09-17)


### Bug Fixes

* **deps:** update dependency handlebars to v4.2.0 ([8b56846](https://github.com/hidoo/unit-sass/commit/8b56846))
* **deps:** update dependency highlight.js to v9.15.10 ([5ffeb77](https://github.com/hidoo/unit-sass/commit/5ffeb77))
* **deps:** update dependency sassdoc to v2.7.1 ([d4c460d](https://github.com/hidoo/unit-sass/commit/d4c460d))
* **stylelint-config:** change required stylelint version to 10.1.0+ ([7938d9e](https://github.com/hidoo/unit-sass/commit/7938d9e))
* **stylelint-config:** disabled unicode-bom ([6903eb0](https://github.com/hidoo/unit-sass/commit/6903eb0))


### Features

* **stylelint-config:** add rules that added in stylelint-scss ([94fbc0a](https://github.com/hidoo/unit-sass/commit/94fbc0a))
* **stylelint-config:** add unicode-bom rule ([502b29b](https://github.com/hidoo/unit-sass/commit/502b29b))





## [0.3.1](https://github.com/hidoo/unit-sass/compare/v0.3.0...v0.3.1) (2019-08-21)


### Bug Fixes

* **kss-builder:** update files for npm ([952aca8](https://github.com/hidoo/unit-sass/commit/952aca8))





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
