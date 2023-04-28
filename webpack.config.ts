/*
 * @Author: weibin.zheng
 * @Date: 2021-01-21 21:16:55
 * @LastEditTime: 2021-06-01 16:37:19
 * @LastEditors: Please set LastEditors
 * @Description: content
 * @FilePath: /base-react-webpack-ts/webpack.config.ts
 */
import path from 'path';
import { Configuration as WebpackConfiguration, Plugin } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

console.log('process env: ', process.env.NODE_ENV);

const config: Configuration = {
  devtool: 'source-map',
  entry: {
    index: './src/index.tsx',
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-spring',
      '@mui/material',
      'antd-mobile',
      'axios',
      '@emotion/react',
    ],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  regenerator: true,
                },
              ],
              [
                'babel-plugin-import',
                { libraryName: 'antd-mobile', style: 'css' },
              ],
              ['@babel/plugin-transform-modules-commonjs'],
            ],
          },
        },
      },
      // file-loader
      //   {
      //     test: /\.(png|jpg|gif)$/,
      //     use: 'file-loader',
      //   options: {
      //     name: '[name].[ext]',
      //     publicPath: './another-path/',
      // },
      // }
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/, /\.webp$/],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              esModule: false,
            },
          },
        ],
      },
      {
        test: [/\.ico$/],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name].ico',
            },
          },
        ],
      },
      //html模板加载器，可以处理引用的静态资源，默认配置参数attrs=img:src，处理图片的src引用的资源
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          attributes: {
            list: [
              //  'img:src',
              { tag: 'img', attribute: 'src', type: 'src' },
              //'link:href',
              {
                tag: 'link',
                // Attribute name
                attribute: 'href',
                // Type of processing, can be `src` or `scrset`
                type: 'src',
              },
            ],
          },
        },
      },
      {
        test: /\.s[ac]ss$/,
        exclude: /\.css$/,
        use: [
          {
            // loader: 'style-loader',
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              //   includePaths: ['src'],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        // include: (cssPath) => {
        //   console.log('css file path: ', cssPath);
        //   return true;
        // },
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // publicPath: '/public/path/to/',
            },
          },
          // 'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: ['./src/**/*.ts', './src/**/*.tsx'],
      },
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      favicon: 'public/favicon.ico',
      // inject: 'body',
      publicPath: '',
    }),
    // @ts-ignore
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css'],
  },
  output: {
    path: path.resolve(
      __dirname,
      'build',
      process.env.ENV === 'production' ? 'prod' : 'dev'
    ),
    filename: '[name]@[hash].js',
    publicPath: '',
  },
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      // maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      // automaticNameDelimiter: '~',
      // automaticNameMaxLength: 30,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        // default: {
        //   minChunks: 2,
        //   priority: -20,
        //   reuseExistingChunk: true,
        // },
      },
    },
  },
  devServer: {
    // contentBase: './temp',
    // historyApiFallback: true,
    compress: true,
    port: 9876,
    host: '0.0.0.0',
    open: false,
    hot: true,
    // publicPath: '/',
    // public: 'localhost:9876',
  },
  stats: {
    warnings: false,
  },
};

export default config;
