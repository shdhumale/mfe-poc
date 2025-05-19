# mfe-poc
This poc will demonstrate usage of MicroFrontEnd with Angular 17.0.1
Explanation

The provided code demonstrates a Micro Frontend (MFE) architecture using Angular 17 and Module Federation. It consists of a host application (hostapp) and two remote applications (remote1 and remote2). The host application dynamically loads modules from the remote applications.

Key Components and Functionality

hostapp: This is the main application that orchestrates the loading and display of remote modules.
dynamic-federation-files/hostapp/app.routes.ts: Defines the routes for the host application. It uses @angular-architects/module-federation to lazy-load the PurchaseModule from remote1 at http://localhost:4001/remoteEntry.js and also loads a React component as a web component.
dynamic-federation-files/hostapp/main.ts: This file initializes the loading of remote entries. It uses loadRemoteEntry to load remoteEntry.js from http://localhost:4001/remoteEntry.js.
dynamic-federation-files/hostapp/webpack.config.js: This webpack configuration sets up Module Federation for the host application, defining which remote modules to consume and which dependencies to share.
hostapp/angular.json: The Angular CLI configuration file for the host application. It uses ngx-build-plus to enable webpack customizations.
The host app also includes basic components like HomeComponent.


remote1: This is a remote application that exposes the PurchaseModule.
It contains components and modules related to purchase functionality.
The webpack.config.js (not shown in full, but implied) in remote1 would configure it to expose the PurchaseModule as a remote entry.
remote2: This is another remote application. 


It's structure is similar to remote1, and it would expose its own modules for the host app to consume.
Module Federation: This webpack feature allows the host application to dynamically load and use modules from the remote applications at runtime. This is achieved using the @angular-architects/module-federation library.


Simplified Workflow

The user navigates to a route in hostapp (e.g., /remote1).
hostapp uses loadRemoteModule to fetch and load the PurchaseModule from remote1's remote entry (http://localhost:4001/remoteEntry.js).
The PurchaseModule is then rendered within the hostapp.
Similarly, hostapp can load modules from remote2.
Markdown Output

Markdown

#   MFE POC Explanation

This proof of concept demonstrates a Micro Frontend (MFE) architecture using Angular 17 and Module Federation.

##   Directory Structure

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


##   Key Components

* **`hostapp`**:  The main application that loads remote modules.
* **`remote1`**:  A remote application exposing the `PurchaseModule`.
* **`remote2`**:  Another remote application exposing modules.
* **Module Federation**:  Webpack feature for dynamic loading of modules.

##   Workflow

1.  User navigates to a route in `hostapp`.
2.  `hostapp` loads the corresponding module from a remote application.
3.  The remote module is rendered in `hostapp`.
