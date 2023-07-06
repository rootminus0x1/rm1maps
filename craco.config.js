module.exports = {
  webpack: {
    configure: {
      module: {
        rules: [
          {
            test: /\.native\.js$/,
            exclude: /src/,
          },
        ],
      },
      externals: {
        '@mapbox/node-pre-gyp': 'commonjs2 @mapbox/node-pre-gyp',
        '@mapbox/mbtiles': 'commonjs2 @mapbox/mbtiles',
      },
    },
  },
};
