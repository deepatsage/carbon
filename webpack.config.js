const path = require('path');
const Entries = require('./src/index.js');

// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// const production = process.env.NODE_ENV === 'production';

module.exports = {
  entry: Entries,
  output: {
    filename: '[name].js',
    // chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'lib'),
    libraryTarget: 'umd2'
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all'
  //   }
  // },
  module: {
    rules: [
      {
        test: /\.(ts|js|tsx|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  targets: {
                    browsers: 'IE 11'
                  },
                  corejs: 3
                }
              ],
              '@babel/preset-react',
              '@babel/preset-typescript'
            ],
            plugins: [
              '@babel/plugin-proposal-function-bind',
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-syntax-dynamic-import'
            ]
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '/fonts/[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      },
      {
        test: /\.(scss|css)$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader',
          options: {
            includePaths: [
              path.resolve(process.cwd(), './src/style-config')
            ]
          }
        }]
      }
    ]
  }
};
