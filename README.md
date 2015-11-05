#  FED Environment
This is the Horizontal Integration (HI) FED Development Environment.

## Setup
First, you will need some items installed in order to build, run and serve this project locally. First, make sure your computer is setup to be working in this HI's environment. See: [FED Computer Setup](https://horizontal.atlassian.net/wiki/display/frontend/FED+Computer+Setup)

## Installation
The recommended way is to fork this repo and do pull request to merge in changes. Once forked and cloned locally, run:

    npm i       // installs all the node dependencies

This will grab the dependencies from the package.json file and install them.

## Build Commands
The following are a list of build commands for this project.

    // GLOBAL COMMANDS
    gulp                            // the default gulp runner. It will run the the build, watch, and server tasks.
    gulp build                      // builds the styles, styleguide, javascript, assets, fonts, and templates tasks.
    gulp serve                      // serves our static environment

    // GROUP TASKS
    gulp assets                     // moves all of our assets into the public directory for use.
    gulp javascript                 // builds out all of the js-global, js-libraries, js-maps, js-docs, and the js-test tasks
    gulp styles                     // builds out the all of our styles
    gulp templates                  // builds out all our templates, including the styleguide

    // SPECIFIC TASKS
    gulp assetFolder                // moves our assets into the public folder
    gulp fonts                      // moves our fonts into the public folder
    gulp jade                       // builds out our jade templates (not styleguide)
    gulp js-docs                    // builds out the our JavaScript documentation
    gulp js-global                  // builds out our global javascript files
    gulp js-libraries               // builds out our third party javascript files and concats them into 1 file
    gulp js-maps                    // moves the javascript map files into the public directory for use
    gulp js-test                    // runs our testing framework and compiles a coverage report
    gulp sass                       // builds out our sass styles
    gulp server                     // runs a local server instance
    gulp styles-documentation       // builds out our sass documentation
    gulp styleguide-styles          // builds out our styleguide stylesheet
    gulp styleguide-jade            // builds out our styleguide templates
    gulp svg                        // builds svg's
    gulp watch                      // watches our files and runs specific tasks based on the file change.

## Tests
There are unit tests and functional tests.
To run the tests from root of the project:

    npm test
