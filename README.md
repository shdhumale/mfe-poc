# mfe-poc
This poc will demonstrate usage of MicroFrontEnd with Angular 17.0.1
explain this project in .md file

```markdown
#   mfe-poc

This poc will demonstrate usage of MicroFrontEnd with Angular 17.0.1 [cite: 649]

##   Directory structure

    
    └── shdhumale-mfe-poc/
        ├── README.md
        ├── dynamic-federation-files/
        │   └── hostapp/
        │       ├── app.routes.ts
        │       ├── main.ts
        │       └── webpack.config.js
        ├── hostapp/
        │   ├── README.md
        │   ├── angular.json
        │   ├── package-lock.json
        │   ├── package.json
        │   ├── tsconfig.app.json
        │   ├── tsconfig.json
        │   ├── tsconfig.spec.json
        │   ├── webpack.config.js
        │   ├── webpack.prod.config.js
        │   ├── .editorconfig
        │   ├── .gitignore
        │   ├── src/
        │   │   ├── bootstrap.ts
        │   │   ├── decl.d.ts
        │   │   ├── index.html
        │   │   ├── main.ts
        │   │   ├── styles.css
        │   │   ├── app/
        │   │   │   ├── app.component.css
        │   │   │   ├── app.component.html
        │   │   │   ├── app.component.spec.ts
        │   │   │   ├── app.component.ts
        │   │   │   ├── app.config.ts
        │   │   │   ├── app.routes.ts
        │   │   │   └── home/
        │   │   │       ├── home.component.css
        │   │   │       ├── home.component.html
        │   │   │       ├── home.component.spec.ts
        │   │   │       └── home.component.ts
        │   │   └── assets/
        │   │       └── .gitkeep
        │   └── .vscode/
        │       ├── extensions.json
        │       ├── launch.json
        │       └── tasks.json
        ├── remote1/
        │   ├── README.md
        │   ├── angular.json
        │   ├── package-lock.json
        │   ├── package.json
        │   ├── tsconfig.app.json
        │   ├── tsconfig.json
        │   ├── tsconfig.spec.json
        │   ├── webpack.config.js
        │   ├── webpack.prod.config.js
        │   ├── .editorconfig
        │   ├── .gitignore
        │   ├── src/
        │   │   ├── bootstrap.ts
        │   │   ├── index.html
        │   │   ├── main.ts
        │   │   ├── styles.css
        │   │   ├── app/
        │   │   │   ├── app.component.css
        │   │   │   ├── app.component.html
        │   │   │   ├── app.component.spec.ts
        │   │   │   ├── app.component.ts
        │   │   │   ├── app.config.ts
        │   │   │   ├── app.routes.ts
        │   │   │   └── purchase/
        │   │   │       ├── purchase-routing.module.ts
        │   │   │       ├── purchase.component.css
        │   │   │       ├── purchase.component.html
        │   │   │       ├── purchase.component.spec.ts
        │   │   │       ├── purchase.component.ts
        │   │   │       └── purchase.module.ts
        │   │   └── assets/
        │   │       └── .gitkeep
        │   └── .vscode/
        │       ├── extensions.json
        │       ├── launch.json
        │       └── tasks.json
        └── remote2/
            ├── README.md
            ├── angular.json
            ├── package-lock.json
            ├── package.json
            ├── tsconfig.app.json
            ├── tsconfig.json
            ├── tsconfig.spec.json
            ├── webpack.config.js
            ├── webpack.prod.config.js
            ├── .editorconfig
            ├── .gitignore
            ├── src/
            │   ├── bootstrap.ts
            │   ├── index.html
            │   ├── main.ts
            │   ├── styles.css
            │   ├── app/
            │   │   ├── app.component.css
            │   │   ├── app.component.html
            │   │   ├── app.component.spec.ts
            │   │   ├── app.component.ts
            │   │   ├── app.config.ts
            │   │   └── app.routes.ts
            │   └── assets/
            │       └── .gitkeep
            └── .vscode/
                ├── extensions.json
                ├── launch.json
                └── tasks.json
                

##   README.md

    
    #   mfe-poc
    
    This poc will demonstrate usage of MicroFrontEnd with Angular 17.0.1
    

##   dynamic-federation-files/hostapp/app.routes.ts

    
    import { HomeComponent } from './home/home.component';
    import { Routes } from '@angular/router';
    import { loadRemoteModule } from '@angular-architects/module-federation';
    import {
      WebComponentWrapper,
      WebComponentWrapperOptions,
    } from '@angular-architects/module-federation-tools';
    
    export const routes: Routes = [
      {
        path:'', redirectTo:'home', pathMatch:'full'
      },
      {
        path:'home', component:HomeComponent
      },
      {
        path:'remote1',
         // loadChildren: () => import('remote1/PurchaseModule')
         // then(m => m.PurchaseModule)
         loadChildren: () =>
                loadRemoteModule({
                   type: 'module',
                   remoteEntry: 'http://localhost:4001/remoteEntry.js',
                   exposedModule: './PurchaseModule'
             })
             .then(m => m.PurchaseModule)
      },
      {
        path: 'react',
        component: WebComponentWrapper,
        data: {
          type: 'script',
          remoteEntry:
            'https://witty-wave-0a695f710.azurestaticapps.net/remoteEntry.js',
          remoteName: 'react',
          exposedModule: './web-components',
          elementName: 'react-element',
        } as WebComponentWrapperOptions,
      }
    
    
    ];
    

##   dynamic-federation-files/hostapp/main.ts

    
    //import('./bootstrap')   .catch(err => console.error(err));
    import { loadRemoteEntry } from '@angular-architects/module-federation';
    
    Promise.all([
      loadRemoteEntry({
        type: 'module',
        remoteEntry: 'http://localhost:4001/remoteEntry.js',
      }),
    ])
      .catch((err) => console.error('Error loading remote entries', err))
      .then(() => import('./bootstrap'))
      .catch((err) => console.error(err));
    

##   dynamic-federation-files/hostapp/webpack.config.js

    
    const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
    
    module.exports = withModuleFederationPlugin({
    
      remotes: {
       // "mfe1": "http://localhost:3000/remoteEntry.js",
       //"remote1" : "http://localhost:4001/remoteEntry.js",
      },
    
      shared: {
        ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
      },
    
    });
    

##   hostapp/README.md

    
    #   Hostapp
    
    This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.1.
    
    ##   Development server
    
    Run `ng serve` for a dev server. [cite: 656, 657] Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
    
    ##   Code scaffolding
    
    Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
    
    ##   Build
    
    Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
    
    ##   Running unit tests
    
    Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
    
    ##   Running end-to-end tests
    
    Run `ng e2e` to execute the end-to-end tests via a platform of your choice.
    
    To use this command, you need to first add a package that implements end-to-end testing capabilities.
    
    ##   Further help
    
    To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
    

##   hostapp/angular.json

    
    {
        "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
        "version": 1,
        "newProjectRoot": "projects",
        "projects": {
            "hostapp": {
                "projectType": "application",
                "schematics": {},
                "root": "",
                "sourceRoot": "src",
                "prefix": "app",
                "architect": {
                    "build": {
                        "builder": "ngx-build-plus:browser",
                        "options": {
                            "outputPath": "dist/hostapp",
                            "index": "src/index.html",
                            "polyfills": [
                                "zone.js"
                            ],
                            "tsConfig": "tsconfig.app.json",
                            "assets": [
                                "src/favicon.ico",
                                "src/assets"
                            ],
                            "styles": [
                                "src/styles.css"
                            ],
                            "scripts": [],
                            "main": "src/main.ts",
                            "extraWebpackConfig": "webpack.config.js",
                            "commonChunk": false
                        },
                        "configurations": {
                            "production": {
                                "budgets": [
                                    {
                                        "type": "initial",
                                        "maximumWarning": "500kb",
                                        "maximumError": "1mb"
                                    },
                                    {
                                        "type": "anyComponentStyle",
                                        "maximumWarning": "2kb",
                                        "maximumError": "4kb"
                                    }
                                ],
                                "outputHashing": "all",
                                "extraWebpackConfig": "webpack.prod.config.js"
                            },
                            "development": {
                                "optimization": false,
                                "extractLicenses": false,
                                "sourceMap": true
                            }
                        },
                        "defaultConfiguration": "production"
                    },
                    "serve": {
                        "builder": "ngx-build-plus:dev-server",
                        "configurations": {
                            "production": {
                                "buildTarget": "hostapp:build:production",
                                "extraWebpackConfig": "webpack.prod.config.js"
                            },
                            "development": {
                                "buildTarget": "hostapp:build:development"
                            }
                        },
                        "defaultConfiguration": "development",
                        "options": {
                            "port": 4000,
                            "publicHost": "http://localhost:4000",
                            "extraWebpackConfig": "webpack.config.js"
                        }
                    },
                    "extract-i18n": {
                        "builder": "ngx-build-plus:extract-i18n",
                        "options": {
                            "buildTarget": "hostapp:build",
                            "extraWebpackConfig": "webpack.config.js"
                        }
                    },
                    "test": {
                        "builder": "@angular-devkit/build-angular:karma",
                        "options": {
                            "polyfills": [
                                "zone.js",
                                "zone.js/testing"
                            ],
                            "tsConfig": "tsconfig.spec.json",
                            "assets": [
                                "src/favicon.ico",
                                "src/assets"
                            ],
                            "styles": [
                                "src/styles.css"
                            ],
                            "scripts": []
                        }
                    }
                }
            }
        }
    }
    

##   hostapp/package-lock.json

    
    {
      "name": "hostapp",
      "version": "0.0.0",
      "lockfileVersion": 2,
      "requires": true,
      "packages": {
        "": {
          "name": "hostapp",
          "version": "0.0.0",
          "dependencies": {
            "@angular-architects/module-federation": "^17.0.1",
            "@angular-architects/module-federation-tools": "^17.0.1",
            "@angular/animations": "^17.1.0",
            "@angular/common": "^17.1.0",
            "@angular/compiler": "^17.1.0",
            "@angular/core": "^17.1.0",
            "@angular/forms": "^17.1.0",
            "@angular/platform-browser": "^17.1.0",
            "@angular/platform-browser-dynamic": "^17.1.0",
            "@angular/router": "^17.1.0",
            "rxjs": "~7.8.0",
            "tslib": "^2.3.0",
            "zone.js": "~0.14.3"
          },
          "devDependencies": {
            "@angular-devkit/build-angular": "^17.1.1",
            "@angular/cli": "^17.1.1",
            "@angular/compiler-cli": "^17.1.0",
            "@types/jasmine": "~5.1.0",
            "jasmine-core": "~5.1.0",
            "karma": "~6.4.0",
            "karma-chrome-launcher": "~3.2.0",
            "karma-coverage": "~2.2.0",
            "karma-jasmine": "~5.1.0",
            "karma-jasmine-html-reporter": "~2.1.0",
            "ngx-build-plus": "^17.0.0",
            "typescript": "~5.3.2"
          }
        },
        "node_modules/@ampproject/remapping": {
          "version": "2.2.1",
          "resolved": "https://registry.npmjs.org/@ampproject/remapping/-/remapping-2.2.1.tgz",
          "integrity": "sha512-lFMjJTrFL3j7L9yBxwYfCq2k6qqwHyzuUl/XBnif78PWTJYyL/dfowQHWE3sp6U6ZzqWiiIZnpTMO96zhkjwtg==",
          "dev": true,
          "dependencies": {
            "@jridgewell/gen-mapping": "^0.3.0",
            "@jridgewell/trace-mapping": "^0.3.9"
          },
          "engines": {
            "node": ">=6.0.0"
          }
        },
        "node_modules/@angular-architects/module-federation": {
          "version": "17.0.1",
          "resolved": "https://registry.npmjs.org/@angular-architects/module-federation/-/module-federation-17.0.1.tgz",
          "integrity": "sha512-XEikBjz+cOx5Dq0XLfP+qxgvBC4f0T3BBAl054xMAwt0+1fQrSe+pSQ9d2O7Q8DeC0CySGetOjxppWJrJ+KXaw==",
          "dependencies": {
            "@angular-architects/module-federation-runtime": "17.0.1",
            "callsite": "^1.0.0",
            "node-fetch": "^2.6.7",
            "semver": "^7.3.5",
            "word-wrap": "^1.2.3"
          }
        },
        "node_modules/@angular-architects/module-federation-runtime": {
          "version": "17.0.1",
          "resolved": "https://registry.npmjs.org/@angular-architects/module-federation-runtime/-/module-federation-runtime-17.0.1.tgz",
          "integrity": "sha512-k/FbYrkLj0B+o0VT/5oaDabBUPQK3zVqOu0RGaNzLUbjvUbHAkFz4X94
```
