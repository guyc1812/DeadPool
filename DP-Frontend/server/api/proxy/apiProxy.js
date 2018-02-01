'use strict';
const Url = require('url');
import proxy from 'express-http-proxy';
const jsBeautifier = require('js-beautify');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


export const itProxy = proxy('localhost:8083', {
  proxyReqPathResolver: function (req) {
    console.log('*********************************************************');
    console.log('*********************************************************');
    console.log('*********************************************************');
    let prefix = '/api/IT';
    reqLog('localhost:8083', prefix, req);
    return prefix + Url.parse(req.url).path;
  }
});
export const mobileProxy = proxy('localhost:8082', {
  proxyReqPathResolver: function (req) {
    let prefix = '/api/MOBILE';
    reqLog('localhost:8082', prefix, req);
    return prefix + Url.parse(req.url).path;
  }
});
export const auProxy = proxy('localhost:8081', {
  proxyReqPathResolver: function (req) {
    let prefix = '/api/AU';
    reqLog('localhost:8081', prefix, req);
    return prefix + Url.parse(req.url).path;
  }
});
export const boltProxy = proxy('localhost:8080', {



  proxyReqPathResolver: function (req) {
    console.log('*********************************************************');
    console.log('*********************************************************');
    console.log('*********************************************************');
    let prefix = '/api/DP';
    reqLog('localhost:8080', prefix, req);
    return prefix + Url.parse(req.url).path;
  }
});

let reqLog = function (host, prefix, req) {

    const reqUrl = `${prefix}${Url.parse(req.url).path}`;
    const reqBody = jsBeautifier.js_beautify(JSON.stringify(req.body));
    const reqParams = jsBeautifier.js_beautify(JSON.stringify(req.params));
    const reqQuery = jsBeautifier.js_beautify(JSON.stringify(req.query));
    const cookies = jsBeautifier.js_beautify(JSON.stringify(req.cookies));
    const method = jsBeautifier.js_beautify(JSON.stringify(req.method));

console.log(`
    
[------- proxying Origin URL -------]

localhost:3000${reqUrl} 

[---------- request body -----------]

${reqBody}

[--------- request params ----------]

${reqParams}

[--------- request query -----------]

${reqQuery}

[------------ cookies --------------]

${cookies}

[------------ method ---------------]

${method}

[------ proxying Forward URL -------]

${host}${reqUrl} 

`);

};

