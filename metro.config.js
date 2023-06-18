/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const fs = require('fs');
const path = require('path');
const exclusionList = require('metro-config/src/defaults/exclusionList');

const rnwPath = fs.realpathSync(
  path.resolve(require.resolve('react-native-windows/package.json'), '..'),
);

const rnwebPath = fs.realpathSync(
  path.resolve(require.resolve('react-native-web/package.json'), '..'),
);

module.exports = {
  resolver: {
     extraNodeModules: {
      // Redirect react-native to react-native-web
      'react-native': rnwebPath,
      'react-native-web': rnwebPath,
     },
     // Include the macos platform in addition to the defaults because the fork includes macos, but doesn't declare it
    platforms: ['ios', 'android', 'windesktop', 'windows', 'web', 'macos'],
    providesModuleNodeModules: ['react-native-web'],
    // Since there are multiple copies of react-native, we need to ensure that metro only sees one of them
    // This should go in RN 0.61 when haste is removed
    blockList: exclusionList([
      // This stops "react-native run-windows" from causing the metro server to crash if its already running
      new RegExp(
        `${path.resolve(__dirname, 'windows').replace(/[/\\]/g, '/')}.*`,
      ),
      // This prevents "react-native run-windows" from hitting: EBUSY: resource busy or locked, open msbuild.ProjectImports.zip or other files produced by msbuild
      new RegExp(`${rnwPath}/build/.*`),
      new RegExp(`${rnwPath}/target/.*`),
      /.*\.ProjectImports\.zip/,

      // This stops "react-native run-web" from causing the metro server to crash if its already running
      new RegExp(
        `${path
          .resolve(__dirname, 'web')
          .replace(/[/\\\\]/g, '[/\\\\]')}.*`,
      ),
    ]),
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
