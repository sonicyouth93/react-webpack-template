const path = require('path');
const webpack = require('webpack');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  devServer: {
    port: 3000,
    open: true, //自动打开browser
    hot: true
  },
  // entry 支持多文件入口，现在我们有两个入口
  // 一个是我们自己的代码，一个是依赖库的代码
  entry: {
    // bundle 和 vendor 都是自己随便取名的，会映射到 output的[name] 中
    bundle: './src/index.js',
    // login: './src/login.js'
    //若想实现多个入口
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    // 既然我们希望缓存生效，就应该每次在更改代码以后修改文件名
    // [hash]会自动根据文件是否更改而更换哈希
    filename: '[name].[hash:4].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true //开启CSS模块化
            }
          }, 'postcss-loader', 'sass-loader'],
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 限制 图片大小 10000B，小于限制会将图片转换为 base64格式
              limit: 10000,
              // 超出限制的话，创建的文件格式
              // dist/images/[图片名].[hash].[图片格式]
              name: 'images/[name].[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|svg)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('build'),
    new HtmlWebPackPlugin({
      template: './src/index.html',//模板文件路径
      filename: 'index.html',  //会出现在dist folder
      hash: true, //在<script>中的js文件名加上hash值 => cache buster
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'all', //包含动态加载的第三方库
          name: 'vendor'
        }
      }
    }
  },
  resolve: {
    extensions: ['.js', '.json', 'scss'], //省略后缀名
    //路径别名
    alias: {
      '@': path.resolve(__dirname, 'src'),
      css: path.resolve(__dirname, 'src/styles/')
    }
  }
}