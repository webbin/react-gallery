/*
 * @Author: weibin.zheng
 * @Date: 2021-01-21 21:16:55
 * @LastEditTime: 2021-06-01 16:37:19
 * @LastEditors: Please set LastEditors
 * @Description: content
 * @FilePath: /base-react-webpack-ts/webpack.config.ts
 */
import path from 'path';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

// console.log(process.env);

const config: Configuration = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
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
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
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
        test: /\.s[ac]ss$/,
        exclude: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            // options: {
            //   includePaths: ['src'],
            // },
          },
        ],
      },
      {
        test: /\.css$/,
        // exclude: /node_modules/,
        include: (cssPath) => {
          console.log('css file path: ', cssPath);
          return true;
        },
        use: [
          'style-loader',
          'css-loader',
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
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.bundle.js',
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
    compress: true,
    port: 9876,
    host: '0.0.0.0'
  },
};

export default config;
