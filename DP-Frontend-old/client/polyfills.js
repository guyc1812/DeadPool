// Polyfills
// (these modules are what are in 'angular2/bundles/angular2-polyfills' so don't use that here)
// import 'ie-shim'; // Internet Explorer
// import 'es6-shim';
// import 'es6-promise';
// import 'es7-reflect-metadata';
// Prefer CoreJS over the polyfills above
import 'core-js/es6/symbol';
import 'core-js/es6/object';
import 'core-js/es6/function';
import 'core-js/es6/parse-int';
import 'core-js/es6/parse-float';
import 'core-js/es6/number';
import 'core-js/es6/math';
import 'core-js/es6/string';
import 'core-js/es6/date';
import 'core-js/es6/array';
import 'core-js/es6/regexp';
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/weak-map';
import 'core-js/es6/weak-set';
import 'core-js/es6/typed';
import 'core-js/es6/reflect';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import 'reflect-metadata';

Error.stackTraceLimit = Infinity;

// if(!ENV) {
//   let ENV = 'development';
// }
// if(ENV === 'production') {
//   Production
// } else {
//   Development
// }

// require('zone.js/dist/long-stack-trace-zone');
