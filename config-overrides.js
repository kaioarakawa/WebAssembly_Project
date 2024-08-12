const { override, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
  addWebpackModuleRule({
    test: /\.wasm$/,
    use: 'file-loader',
    type: 'javascript/auto'
  }),
);