'use strict';

import errors from './components/errors';
import path from 'path';
import apiProxy from './api/proxy';

export default function (app) {

  // Proxy to Java Backend
  app.use('/api/note', apiProxy.dpProxy);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  // Default page mapping to UI.html
  app.use('/', (req, res) => {
    res.sendFile(path.resolve(`${app.get('appPath')}/UI.html`));
  });

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(errors[404]);
}
