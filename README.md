# mfe-poc
This poc will demonstrate usage of MicroFrontEnd with Angular 17.0.1
explain the main part of the project in .md file

## Explanation of the Main Parts of the Project

This project demonstrates the use of Micro Frontends with Angular 17 and Module Federation. It consists of a host application (`hostapp`) and two remote Angular applications (`remote1`, `remote2`), along with the integration of a React component.

**1. Host Application (`hostapp`)**

* The `hostapp` acts as the main container. It's responsible for dynamically loading and displaying components from the remote applications. [cite: 656, 657, 658, 659, 660, 661]
* It uses Angular 17 and Module Federation to achieve this. [cite: 668]
* Key files:
    * `app.routes.ts`:  Defines the application's routes, including the configuration for loading remote modules (`remote1`) and the React component. [cite: 668, 669, 670, 671, 672] It uses `@angular-architects/module-federation` to lazy-load the `PurchaseModule` from `remote1` and `@angular-architects/module-federation-tools` to wrap the React component. [cite: 668, 669, 670, 671, 672]
    * `main.ts`:  Bootstraps the `hostapp` and handles loading remote entries. [cite: 672, 673] It uses `loadRemoteEntry` from `@angular-architects/module-federation` to load `remoteEntry.js` from `http://localhost:4001`. [cite: 672, 673]
    * `webpack.config.js`: Configures Webpack for Module Federation, specifying the remote applications. [cite: 674]
    * `HomeComponent`: A component within the `hostapp`. [cite: 668, 669, 670, 671, 672, 228, 229, 230, 231, 232]

**2. Remote Angular Applications (`remote1`, `remote2`)**

* `remote1` and `remote2` are separate Angular applications that expose components or modules for use by the `hostapp`. [cite: 660, 661, 662, 663, 664, 665, 666, 667]
* They also use Angular 17 and Module Federation. [cite: 660, 661, 662, 663, 664, 665, 666, 667, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506, 507, 646, 647, 648, 649, 650, 651, 652, 653, 654, 655]
* For example, `remote1` exposes a `PurchaseModule`. [cite: 668, 669, 670, 671, 672]

**3. React Component Integration**

* The `hostapp` also demonstrates how to integrate a React component as a Micro Frontend. [cite: 668, 669, 670, 671, 672]
* It uses `@angular-architects/module-federation-tools` to wrap the React component, which is loaded from a remote entry. [cite: 668, 669, 670, 671, 672]

**Key Concepts Demonstrated**

* **Module Federation**:  The core technology enabling the Micro Frontend architecture, allowing separately compiled applications to work together at runtime. [cite: 674]
* **Dynamic Module Loading**:  The `hostapp` dynamically loads modules from remote applications, rather than importing them at build time. [cite: 668, 669, 670, 671, 672]
* **Component Sharing**:  Remote applications expose components for use in the host application.
* **Technology Agnostic**:  The project shows how different technologies (Angular, React) can be integrated into a single application.

**In essence, this project provides a practical example of building a Micro Frontend architecture with Angular and Module Federation, showcasing how to compose an application from independently developed and deployed parts.**
