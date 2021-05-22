const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        use: {
          options: {
            compilerOptions: {
              dev: false,
            },
            emitCss: false,
            hotReload: false,
          },
        },
      },
    ],
  },
});
