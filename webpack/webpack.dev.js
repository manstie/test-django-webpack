const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
   mode: 'development',
   // https://webpack.js.org/configuration/devtool/ 
   devtool: 'inline-source-map',
   stats: 'minimal',  // makes webpack quieter
   module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: "svelte-loader",
          options: {
            compilerOptions: {
              dev: true,
            },
            emitCss: false,
            hotReload: true,
          },
        },
      },
    ],
  },
});
