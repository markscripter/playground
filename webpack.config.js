module.exports = {
  entry: './src/javascript/main.js',
  output: {
    path: __dirname,
    filename: './src/javascript/bundle.js',
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
      },
    ],
  },
};
