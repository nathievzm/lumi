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
