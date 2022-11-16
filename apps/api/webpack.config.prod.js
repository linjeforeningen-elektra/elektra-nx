const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (config, context) => {
  return merge(config, {
    plugins: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
        },
      }),
    ],
  });
};
