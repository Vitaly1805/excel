const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    }
  ]

  if (isDev) {
    loaders.push('eslint-loader')
  }

  return loaders
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './index.js',
  output: {
    filename: 'bundle[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: isDev ? 'source-map' : '',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      minify: {
        collapseWhitespace: isProd,
        keepClosingSlash: isProd,
        removeComments: isProd,
        removeRedundantAttributes: isProd,
        removeScriptTypeAttributes: isProd,
        removeStyleLinkTypeAttributes: isProd,
        useShortDoctype: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/favicon.ico"),
          to: path.resolve(__dirname, "dist/")
        }
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle[hash].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: jsLoaders()
      }
    ]
  },
  devServer: {
    open: true,
    hot: isDev,
    port: 8080,
    static: [
      {
        directory: path.join(__dirname, 'src/scss'),
      },
      {
        directory: path.join(__dirname, 'src'),
      }
    ]
  }
}
