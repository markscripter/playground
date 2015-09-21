#  Playground
This is a playground.

## Setup
First, you will need some items installed in order to build, run and serve this project locally. You will need:

### Node & NPM
- [Node.JS](http://nodejs.org/) & [NPM](https://www.npmjs.com/) - Note: NPM installs with Node

### NPM Packages
- [Gulp](https://www.npmjs.com/package/gulp) - This is used for building our project.
- [Eslint](https://www.npmjs.com/package/eslint) - This is used for enforcing a coding standard and providing errors/warnings.
- [Babel-Eslint](https://www.npmjs.com/package/babel-eslint) - Support for ES6 | ES2015 | Harmony | whatever it's called.

After installing Node & NPM, install the NPM packages using these commands:

    sudo npm i -g eslint        // installs eslint
    sudo npm i -g babel         // es6 - es5 stuff
    sudo npm i -g babel-core    // more babel stuff
    sudo npm i -g babel-eslint  // installs babel's plugin for eslint
    sudo npm i -g gulp          // installs Gulp
    sudo npm i -g jade          // templating library
    sudo npm i -g jsdoc         // javascript documentation
    sudo npm i -g svgo          // SVG optimizer



This should setup your environment so you can build and run this project solution. The next step is to install all of the project's dependencies.

To do this, run:

    npm i       // installs all the node dependencies
    bower i     // installs all the bower dependencies.

This will grab the dependencies from the package.json file and install them.

## Build Commands
The following are a list of build commands for this project.

    // GLOBAL COMMANDS
    gulp build      // this will build jade, less, javascript, svg's tasks
    gulp serve      // this runs the 'build' command and also serves a local server instance
    gulp javascript // this builds out all of the javascript tasks

    // SPECIFIC TASKS
    gulp es6-babel      // builds out the express file so it can be ran in nodes es5 environment
    gulp jade           // builds jade templates
    gulp styles         // builds less files
    gulp js-global      // builds the global javascript files
    gulp js-libraries   // builds the third party javascript files and concats them into 1 file
    gulp js-components  // builds and concats all of the javascript components into 1 file
    gulp js-jsdoc       // builds out the JSDOCS
    gulp js-maps        // moves the javascript map files into the public directory for use
    gulp server         // runs a local server instance
    gulp styleguide     // builds out the styleguide items
    gulp svg            // builds svg's
