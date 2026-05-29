## [1.2.1](https://github.com/nathievzm/lumi/compare/v1.2.0...v1.2.1) (2026-05-29)

### Bug Fixes

- **index:** await for update notifier
  ([6eab884](https://github.com/nathievzm/lumi/commit/6eab884c213f457ac4f389fa8a44c5223dec5b22))

# [1.2.0](https://github.com/nathievzm/lumi/compare/v1.1.6...v1.2.0) (2026-05-29)

### Bug Fixes

- guard function and recursive flag
  ([41fcb3e](https://github.com/nathievzm/lumi/commit/41fcb3e38c7c271971543b2cc38665f7c545c9c2))

### Features

- **image:** cache sharp dynamic import promise to improve performance
  ([08a02fd](https://github.com/nathievzm/lumi/commit/08a02fd0a166dfd3587b76c9635fee323ddff38c))
- **ui:** add initialValue to dimensions prompt to reduce user friction
  ([b72ccaf](https://github.com/nathievzm/lumi/commit/b72ccafe8dfbd66d35a5b3abbe727500f36e5921))
- **ux:** add initialValue to askWidthAndHeight prompt
  ([027ec53](https://github.com/nathievzm/lumi/commit/027ec536da421716121f306fefa5d23fa5c49696))
- **ux:** add initialValue to askWidthAndHeight prompt
  ([a095643](https://github.com/nathievzm/lumi/commit/a09564304ba0b49d3e9d2d45ed64a9460c578a97))
- **ux:** update journal learning about initialValue vs placeholder
  ([80c873f](https://github.com/nathievzm/lumi/commit/80c873fb16ded0ad9b098670f92f9839cf0c66d7))
- **ux:** update journal learning about initialValue vs placeholder
  ([3f75765](https://github.com/nathievzm/lumi/commit/3f7576541d7792a0004e8ba2dddb8d8873106303))
- **ux:** update journal learning about initialValue vs placeholder
  ([b56fd87](https://github.com/nathievzm/lumi/commit/b56fd876ee00478efe24b604c5084e8c27d49509))

### Performance Improvements

- **image:** lazily load heavy sharp module to improve startup time
  ([5c3c9a4](https://github.com/nathievzm/lumi/commit/5c3c9a424e21d46c7830feb5e80517a4e274ba91))
- optimize path resolution in `getImages`
  ([1b91635](https://github.com/nathievzm/lumi/commit/1b91635306851cd1840e1a11b9eacd361741993d))

### Reverts

- Remove initialValue from dimension prompt to show placeholder
  ([06b9a0c](https://github.com/nathievzm/lumi/commit/06b9a0c35089d89d056fecc8ff50e7a31b34a789))

## [1.1.6](https://github.com/nathievzm/lumi/compare/v1.1.5...v1.1.6) (2026-05-19)

### Bug Fixes

- prevent path traversal on input image resolution
  ([cfe9f2a](https://github.com/nathievzm/lumi/commit/cfe9f2a78d570b63fbfe2051bc21b13710930c0e))
- **prompt:** remove defaultValue to prefer descriptive placeholder
  ([bf63182](https://github.com/nathievzm/lumi/commit/bf631822bf0ab3c9bbc99600692ca7143d651bb6))
- remove step that logs the whole github json
  ([1ff461d](https://github.com/nathievzm/lumi/commit/1ff461d9192421c6562d85436e45d30fd0b22085))
- revert changes from jules
  ([2a4db48](https://github.com/nathievzm/lumi/commit/2a4db4843b381da26fb42b1c11839f469029e78e))

### Features

- add code to add the issue labels to the pr
  ([d8b5d87](https://github.com/nathievzm/lumi/commit/d8b5d8789879f76a9969a67223593db89638a3ac))
- add test workflow to sync pr with issue
  ([a4f8e10](https://github.com/nathievzm/lumi/commit/a4f8e1032d12283a456003d5d274bef98914028f))
- add ts script to get pull request
  ([c7f0e2d](https://github.com/nathievzm/lumi/commit/c7f0e2d9b20b0040889d6dcae76b62eaf5fb17f9))
- log found connected found issue
  ([edb6375](https://github.com/nathievzm/lumi/commit/edb6375a3881361afc0819b27f71418d560d62b4))
- move notify function to update module
  ([d701256](https://github.com/nathievzm/lumi/commit/d701256b69b54eae195090ff23dd4ed64f2b0cc1))
- **prompt:** add default value to dimension prompt
  ([7271ae5](https://github.com/nathievzm/lumi/commit/7271ae5aaef008a8024b916deaae6d6465b9c7bc))
- remove error when branch doesn't have correct format
  ([03fc8fb](https://github.com/nathievzm/lumi/commit/03fc8fb50466cedd78b959b51c52cd5c52800144))
- replace auto-assign workflow with ts script and bun action
  ([aeda5fa](https://github.com/nathievzm/lumi/commit/aeda5fa6d09b030a50c079c0ca628ecbd1cd3d50))
- replace small try/catch by global try/catch block with new errors
  ([74f3d2c](https://github.com/nathievzm/lumi/commit/74f3d2cff8f95e7d521670d9eefca55510ccd3e9))
- use gh script action to run js scripts
  ([3afe134](https://github.com/nathievzm/lumi/commit/3afe134d76c5d7d14c7cd1dbdce384e0507d5f48))

### Performance Improvements

- cache sharp formats to avoid redundant computation
  ([3eea037](https://github.com/nathievzm/lumi/commit/3eea037679b3b9677a13fa4898c2bb81ff31b0c9))
- cache sharp formats to avoid redundant computation and fix CI
  ([4eeea88](https://github.com/nathievzm/lumi/commit/4eeea88ce1daebafcf8417e996dde515aa6fbf86))
- replace @js-temporal/polyfill with performance.now()
  ([e28a380](https://github.com/nathievzm/lumi/commit/e28a38065d9f5bc08ea31d04fa37d7e171f42d29))

## [1.1.5](https://github.com/nathievzm/lumi/compare/v1.1.4...v1.1.5) (2026-05-14)

### Bug Fixes

- restrict image dimensions to prevent resource exhaustion
  ([40e65f3](https://github.com/nathievzm/lumi/commit/40e65f34f04f22cea1d7f543beddc6d45c66d87a))

### Features

- provide smart default for CLI format selection prompt
  ([7e31044](https://github.com/nathievzm/lumi/commit/7e31044e841610b660388258a5cc971246ad2884))
- **ux:** improve error handling for missing input folders
  ([b4ad267](https://github.com/nathievzm/lumi/commit/b4ad26711348c3f0c38f990531c4f2ea0b3ad0ff))

### Performance Improvements

- improve readability of code suggested by jules
  ([aa11125](https://github.com/nathievzm/lumi/commit/aa11125156cec42f97a3e3ab08cdf98fb63aa432))
- **index:** use getMessage function to get the error message
  ([5571325](https://github.com/nathievzm/lumi/commit/557132529d782af777fa9df3bac03b1fa800f48c))
- remove oxlint disabled comments by jules
  ([7f6ece6](https://github.com/nathievzm/lumi/commit/7f6ece6379c944504e08865a34bfd0c28819566c))

## [1.1.4](https://github.com/nathievzm/lumi/compare/v1.1.3...v1.1.4) (2026-05-13)

## [1.1.3](https://github.com/nathievzm/lumi/compare/v1.1.2...v1.1.3) (2026-05-13)

### Features

- add update notifier to notify when there'a a new version ([#67](https://github.com/nathievzm/lumi/issues/67))
  ([b567f03](https://github.com/nathievzm/lumi/commit/b567f03b3c6617b18bdc34587d65055c5726bcfc))

## [1.1.2](https://github.com/nathievzm/lumi/compare/v1.1.1...v1.1.2) (2026-05-13)

### Bug Fixes

- use boxen to fix the intro banner
  ([e3e8085](https://github.com/nathievzm/lumi/commit/e3e80853251b584aab892b688eb12c8c6b7799d4))

## [1.1.1](https://github.com/nathievzm/lumi/compare/v1.1.0...v1.1.1) (2026-05-12)

### Bug Fixes

- intro banner and use lightning emoji in outro message
  ([a3d4f33](https://github.com/nathievzm/lumi/commit/a3d4f3362d847fd8415027c9a73f6fc486dcd770))

# [1.1.0](https://github.com/nathievzm/lumi/compare/v1.0.1...v1.1.0) (2026-05-12)

### Features

- add colors to logs ([#44](https://github.com/nathievzm/lumi/issues/44))
  ([2dcca2e](https://github.com/nathievzm/lumi/commit/2dcca2e3df40ac577ca5fdaeddbaedecd67d3256))
- add recursive arg to toggle the recursiveness when reading the input folder
  ([#25](https://github.com/nathievzm/lumi/issues/25))
  ([3644d34](https://github.com/nathievzm/lumi/commit/3644d346569aa40a2d6b7007ece64be6b787dc42))
- clear console on start and add a cute banner at the beginning
  ([1ad4ade](https://github.com/nathievzm/lumi/commit/1ad4adef1090224915b724374f0e537f371a93a7))
- **image, index:** make getImages function pure by removing any side effect
  ([addea55](https://github.com/nathievzm/lumi/commit/addea5542f6b923c36d093797d0b9387c199cfc3))
- **index:** replace spinnies with clack spinner for cleaner cli ([#42](https://github.com/nathievzm/lumi/issues/42))
  ([6c59c5a](https://github.com/nathievzm/lumi/commit/6c59c5a62af9d3ac13c94997f063842591f9a799))
- show the seconds that took to process the files in the result log ([#43](https://github.com/nathievzm/lumi/issues/43))
  ([439482e](https://github.com/nathievzm/lumi/commit/439482e075af4aaba70da2967743250456b35b20))

### Performance Improvements

- optimize path parsing by using extname and basename instead of parse
  ([962299f](https://github.com/nathievzm/lumi/commit/962299ffc519826d1c023275290525d92b7d4db2))

## [1.0.1](https://github.com/nathievzm/lumi/compare/v1.0.0...v1.0.1) (2026-05-10)

### Bug Fixes

- format arg by passing cli value ([#22](https://github.com/nathievzm/lumi/issues/22))
  ([8a88391](https://github.com/nathievzm/lumi/commit/8a88391009addb9129eac53a6744affad7693ddf))
- **index, image:** add support to all image extensions using an third-party library
  ([#24](https://github.com/nathievzm/lumi/issues/24))
  ([183189f](https://github.com/nathievzm/lumi/commit/183189f724c3ecf444308384eb5d11de3e28ed80))
- **index, image:** exclude all files that aren't images ([#24](https://github.com/nathievzm/lumi/issues/24))
  ([ebb03f4](https://github.com/nathievzm/lumi/commit/ebb03f49cc0628dd19ce303d74417f435f2fc268))

### Features

- **package.json:** update urls for repository and bugs
  ([781733a](https://github.com/nathievzm/lumi/commit/781733a84562a5e4940a4d645c5845cda496a16a))
- **prompt:** ask width and height in a single prompt ([#30](https://github.com/nathievzm/lumi/issues/30))
  ([93872d4](https://github.com/nathievzm/lumi/commit/93872d42caddb6aee8da0cdacb41533bb1946ccd))
- remove prompt for input folder and assume current folder as input ([#23](https://github.com/nathievzm/lumi/issues/23))
  ([f0f43c8](https://github.com/nathievzm/lumi/commit/f0f43c8841450364f130670336685b2a1b5f0aa5))
- rename package name and bin command
  ([44df0a7](https://github.com/nathievzm/lumi/commit/44df0a734d6ba5e1a629a49658c1511eb01bc485))
- use current path and default name of 'output' for the output folder
  ([#40](https://github.com/nathievzm/lumi/issues/40))
  ([6bb9dd6](https://github.com/nathievzm/lumi/commit/6bb9dd6bc87ddb9df1aae2a374198909fc64cdfa))

# [1.0.0](https://github.com/nathievzm/lumi/compare/bd74fd40baea7cd88c4f547d1aeabcc2c53b47ac...v1.0.0) (2026-05-05)

### Bug Fixes

- **folder:** change log type to info
  ([ede37a1](https://github.com/nathievzm/lumi/commit/ede37a1485bd1b5de82d71b9722ae7686ac61d25))

### Features

- add .env.example file ([917b862](https://github.com/nathievzm/lumi/commit/917b862a558847d16e86ca6ff94fabe33f2a5992))
- add logic to allow users select the format for each extension found in the input
  ([0461325](https://github.com/nathievzm/lumi/commit/0461325e9a414ab71903b16da3f7b20fd1134bb3))
- add logic to prompt width and height if user didn't provide it via cli or env
  ([d7a0a21](https://github.com/nathievzm/lumi/commit/d7a0a21eee9d3b4e1c4544e92ce0406cb26b521e))
- add prompt to ask for the input folder in case it's not by cli or env
  ([59551de](https://github.com/nathievzm/lumi/commit/59551decf7a3b6cdb6e665dd28e4e20a860f642a))
- add support to specify default concurrency limit by env variable
  ([eda599d](https://github.com/nathievzm/lumi/commit/eda599d88bef56af992482a58a08d3004e33d378))
- allow setting the default format and limit via cli
  ([d273210](https://github.com/nathievzm/lumi/commit/d273210efb0512b8800d889974f670d96f6a302f))
- create images module and add prompt for the output folder name
  ([88c68f4](https://github.com/nathievzm/lumi/commit/88c68f41b716fb2aff90b8fe82fcf7f184723eff))
- develop functionality to resize images
  ([bd74fd4](https://github.com/nathievzm/lumi/commit/bd74fd40baea7cd88c4f547d1aeabcc2c53b47ac))
- implement @clack/prompts to enhance the cli ux
  ([6138c15](https://github.com/nathievzm/lumi/commit/6138c15f4c484cbea711a5c1e11b59221e008097))
- implement p-limit to limit the concurrent promises
  ([bb25145](https://github.com/nathievzm/lumi/commit/bb25145092d75f51845810b30de524cb1b3bdd31))
- move all helper files to the lib folder
  ([9df89cf](https://github.com/nathievzm/lumi/commit/9df89cf28b1d6510fce115f7db5ef989c47cf71c))
- move logic to check the output folder to an isolated module
  ([35b3e0a](https://github.com/nathievzm/lumi/commit/35b3e0ae732a60ec49ca6fea4c8e1b5388528e12))
