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
