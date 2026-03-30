const { join } = require('path');
const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');

module.exports = {
  entry: './src/main.ts',
  output: {
    path: join(__dirname, 'dist/apps/navtor-test-app'),
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  devServer: {
    port: 4200,
  },
  plugins: [
    new NxAppWebpackPlugin({
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      index: './src/index.html',
      styles: ['./src/styles.scss'],
      outputHashing: process.env['NODE_ENV'] === 'production' ? 'all' : 'none',
      optimization: process.env['NODE_ENV'] === 'production',
    }),
  ],
};
