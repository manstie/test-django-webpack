const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

const dist = path.resolve(__dirname, 'static/bundles');

module.exports = {
  entry: {
    utils: './home/js/utils.js',
    home: {
      import: './home/js/index.js',
      dependOn: ['utils']
    }
  },
  resolve: {
    modules: ['node_modules']
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: dist,
    publicPath: 'bundles/',
  },
  plugins: [
    new CleanWebpackPlugin(),  // deletes files inside of output path folder
    new WebpackManifestPlugin({ fileName: "../../manifest.json" }),
  ],
  optimization: {
    moduleIds: 'deterministic', // so that file hashes don't change unexpectedly?
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
};