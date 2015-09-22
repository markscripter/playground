var path = require('path');

module.exports = {
  entry: './src/scripts/main.js',
  output: {
    path: __dirname,
    filename: 'src/scripts/bundle.js',
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
      },
    ],
  },
};
