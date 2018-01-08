import {AngularCompilerPlugin} from '@ngtools/webpack'
import path from 'path';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyPlugin = require('@angular-devkit/build-optimizer').PurifyPlugin;

module.exports = function makeWebpackConfig(options) {

  const rootDir = path.resolve(__dirname, '..');

  let DEV = options.DEV;
  let BUILD = options.BUILD;

  const envFile = options.envFile && `.${options.envFile}` || '';

  let entryApp = 'app.ts';
  let tsconfig = 'tsconfig.app.json';
  let entryModule = 'app.browser.module#AppBrowserModule';

  let config = {};

  config.entry = {
    polyfills: path.resolve(rootDir, 'client/app.angular/polyfills.ts'),
    app: path.resolve(rootDir, `client/app.angular/${entryApp}`)
  };

  config.resolve = {
    modules: [
      'node_modules',
      'bower_components'
    ],
    extensions: ['*', '.ts', '.js']
  };

  config.module = {
    rules: [
      // {
      //   test: /\.ts$/,
      //   loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      // },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        loader: 'file-loader?name=assets/images/[name].[ext]'
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'file-loader?name=assets/fonts/[name].[ext]'
      },
      {
        test: /\.css$/,
        exclude: [path.resolve(rootDir, 'client/app.angular/app')],
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: `css-loader?${DEV ? 'sourceMap' : ''}!postcss-loader`
        })
      },
      {
        test: /\.css$/,
        include: path.resolve(rootDir, 'client/app.angular/app'),
        loader: `raw-loader`
      },
      {
        test: /\.scss$/,
        loaders: ['raw-loader', 'sass-loader',]
      },
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        loader: '@ngtools/webpack',
        "options": {
          "tsConfigPath": path.resolve(rootDir, `client/app.angular/${tsconfig}`),
        }
      }
    ]
  };

  config.plugins = [
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve(rootDir, 'client/app.angular'), // location of your src
      {} // a map of your routes
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(rootDir, 'client/app.angular/index.html'),
      alwaysWriteToDisk: true
    }),

    new webpack.ProvidePlugin({
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
      $: "jquery",
      jQuery: "jquery"
    }),

    new AngularCompilerPlugin({
      tsConfigPath: path.resolve(rootDir, `client/app.angular/${tsconfig}`),
      entryModule: path.resolve(rootDir, `client/app.angular/app/${entryModule}`),
      hostReplacementPaths: {
        [`${path.resolve(rootDir, 'client/app.angular/environments/environment.ts')}`]:
          `${path.resolve(rootDir, `client/app.angular/environments/environment${envFile}.ts`)}`
      },
      sourceMap: true
    })

  ];

  if (DEV) {
    config.devtool = 'source-map';
    config.output = {
      path: path.resolve(rootDir, 'dist'),
      publicPath: '',
      filename: '[name].js',
      chunkFilename: '[id].chunk.js'
    };
    config.devServer = {
      historyApiFallback: true,
      stats: 'minimal'
    };
    config.plugins.push(
      new ExtractTextPlugin('[name].css'),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"development"'
        }
      })
    );
  }

  if (BUILD) {
    config.output = {
      path: path.resolve(rootDir, 'dist'),
      publicPath: '',
      filename: '[name].js',
      chunkFilename: '[id].chunk.js'
    };
    config.devServer = {
      historyApiFallback: true,
      stats: 'minimal'
    };
    config.module.rules.push(
      {
        test: /\.js$/,
        loader: '@angular-devkit/build-optimizer/webpack-loader',
        options: {
          sourceMap: false
        }
      }
    );
    config.plugins.push(
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
        mangle: {
          keep_fnames: true
        }
      }),
      new ExtractTextPlugin('[name].css'),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new webpack.LoaderOptionsPlugin({
        htmlLoader: {
          minimize: false
        }
      }),
      new PurifyPlugin()
    );
  }
  return config;
};
