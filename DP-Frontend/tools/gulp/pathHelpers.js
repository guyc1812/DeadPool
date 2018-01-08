const path = require('path');
const root = path.join(__dirname, '../../');
const clientPath = 'client';
const serverPath = 'server';
const clientPathABS = path.join(__dirname, '../../client');
const serverPathABS = path.join(__dirname, '../../server');

const paths = {
  client: {
    // relative path
    assets: `${clientPath}/assets/**/*`,
    images: `${clientPath}/assets/images/**/*`,
    api: `${clientPath}/assets/api/**/*`,
    md: `${clientPath}/assets/md/**/*`,
    revManifest: `${clientPath}/assets/rev-manifest.json`,
    scripts: [`${clientPath}/**/!(*.spec|*.mock).js`],
    styles: [`${clientPath}/{app,components}/**/*.css`],
    mainStyle: `${clientPath}/app/app.css`,
    views: `${clientPath}/{app,components}/**/*.html`,
    mainView: `${clientPath}/index.html`,
    test: [`${clientPath}/{app,components}/**/*.{spec,mock}.js`],
    e2e: ['e2e/**/*.spec.js'],
    // absolute path
    assetsABS: `${clientPathABS}/assets/**/*`,
    imagesABS: `${clientPathABS}/assets/images/**/*`,
    apiABS: `${clientPathABS}/assets/api/**/*`,
    mdABS: `${clientPathABS}/assets/md/**/*`,
    revManifestABS: `${clientPathABS}/assets/rev-manifest.json`,
    scriptsABS: [`${clientPathABS}/**/!(*.spec|*.mock).js`],
    stylesABS: [`${clientPathABS}/{app,components}/**/*.css`],
    mainStyleABS: `${clientPathABS}/app/app.css`,
    viewsABS: `${clientPathABS}/{app,components}/**/*.html`,
    mainViewABS: `${clientPathABS}/index.html`,
    testABS: [`${clientPathABS}/{app,components}/**/*.{spec,mock}.js`],
    e2eABS: [`${root}/e2e/**/*.spec.js`]
  },
  server: {
    scripts: [
      `${serverPathABS}/**/!(*.spec|*.integration).js`,
      `!${serverPathABS}/config/local.env.sample.js`
    ],
    json: [`${serverPathABS}/**/*.json`],
    test: {
      integration: [`${serverPathABS}/**/*.integration.js`, 'mocha.global.js'],
      unit: [`${serverPathABS}/**/*.spec.js`, 'mocha.global.js']
    }
  },
  karma: path.join(root, '/karma.conf.js'),
  dist: path.join(root, '/dist'),
  e2eTmp: path.join(root, '/e2e/.tmp')
};

export {
  root,
  clientPath,
  serverPath,
  clientPathABS,
  serverPathABS,
  paths,
};
