const webpackNg = require('./webpack/webpack');
const webpackSSR = require('./webpack/webpack.ssr');

const FRAMEWORK = {
  NG: 'angular',
  SSR: 'ssrServer'
};

module.exports = framework => {
  if (framework === FRAMEWORK.NG) {
    return webpackNg;
  } else if (framework === FRAMEWORK.SSR) {
    return webpackSSR;
  } else {
    console.error('[webpack] \t Please Choose A Proper Framework!');
    throw '[webpack] \t Please Choose A Proper Framework!';
  }
};
