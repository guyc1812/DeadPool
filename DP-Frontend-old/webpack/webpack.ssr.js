const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const root = path.join(__dirname, '..');

module.exports = {
  entry: {
    server: path.join(root, 'server.ssr/server.ts'),
    // prerender: path.join(root, 'server.ssr/prerender.ts')
  },
  target: 'node',
  resolve: {extensions: ['.ts', '.js']},
  externals: [
    /(node_modules|main\..*\.js)/,
    nodeExternals({whitelist: [/^(jquery|\$)$/i]})
  ],
  output: {
    path: path.join(root, 'dist/server-ssr'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {test: /\.ts$/, loader: 'awesome-typescript-loader'}
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(root, 'client/app.angular'), // location of your src
      {} // a map of your routes
    ),
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?express(\\|\/)(.+)?/,
      path.join(root, 'client/app.angular'),
      {}
    )
  ]
};
