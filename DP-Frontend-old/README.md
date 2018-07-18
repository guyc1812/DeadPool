# ssr test

### Upgrade for package.json

note the ng5 requires typescript >= 2.4

```json
{
  "dependencies": {
      "@angular/animations": "^5.0.0-rc.8",
      "@angular/common": "^5.0.0-rc.8",
      "@angular/compiler": "^5.0.0-rc.8",
      "@angular/core": "^5.0.0-rc.8",
      "@angular/forms": "^5.0.0-rc.8",
      "@angular/http": "^5.0.0-rc.8",
      "@angular/platform-browser": "^5.0.0-rc.8",
      "@angular/platform-browser-dynamic": "^5.0.0-rc.8",
      "@angular/platform-server": "^5.0.0-rc.8",
      "@angular/router": "^5.0.0-rc.8",
      "@nguniversal/express-engine": "^5.0.0-beta.4",
      "@nguniversal/module-map-ngfactory-loader": "^5.0.0-beta.4",
      "core-js": "^2.4.1",
      "rxjs": "^5.5.2",
      "zone.js": "^0.8.14"
   },
  "devDependencies": {
      "@angular/cli": "1.5.0-rc.6",
      "@angular/compiler-cli": "^5.0.0-rc.8",
      "@angular/language-service": "^5.0.0-rc.8",
      "@types/node": "^8.0.30",
      "cpy-cli": "^1.0.1",
      "express": "^4.15.2",
      "http-server": "^0.10.0",
      "reflect-metadata": "^0.1.10",
      "ts-loader": "^2.3.7",
      "typescript": "~2.4.2",
      "webpack": "^3.8.1",
      "extract-text-webpack-plugin": "^3.0.2",
      "webpack-node-externals": "^1.6.0"
   }
}
``` 

### Added new files

* angular-cli.json

* tsconfig for angular-cli
    * client/app.ng2/tsconfig.app.json
    * client/app.ng2/tsconfig.server.json
    
* environment for angular-cli
    * client/app.ng2/environments/environment.ts
    * client/app.ng2/environments/environment.prod.ts
    
* ng-root-module
    * client/app.ng2/app/app.module.ts
    * client/app.ng2/app/app.server.module.ts
    
* ng-main-entry
    * client/app.ng2/app.ts
    * client/app.ng2/app.server.ts
    
* server.ssr
    * server.ts
    * prerender.ts
    * static.paths.ts   //ssr-route

* webpack for ssr-server
    * webpack/ng2/webpack.ssr.js
    
### Scripts

dev
```bash
  gulp serve                   # listen on 3000
```

prod
* build without ssr

    ```bash
      gulp build --env prod     # dist | - client/
                                #        - server/                                   
      gulp start:server:prod    # listen on 8080
    ```

* build with ssr

    ```bash
      gulp build:ssr            # dist | - client/
                                #        - client-ssr/
                                #        - server/
                                #        - server-ssr/
                              
      gulp start:server:ssr     # listen on 4000
      
      # or directly
      gulp serve:ssr            # listen on 4000
    ```

* build ssr only

    ```bash
      gulp build:ssr-only       # dist | - client-ssr/
                                #        - server-ssr/
    ```
