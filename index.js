#!/usr/bin/env node
'use strict';
var chalk       = require('chalk');
var clear       = require('clear');
// var CLI         = require('clui');
var figlet      = require('figlet');
var inquirer    = require('inquirer');
var Preferences = require('preferences');
// var Spinner     = CLI.Spinner;
// var GitHubApi   = require('github');
// var _           = require('lodash');
// var git         = require('simple-git')();
var touch       = require('touch');
var fs          = require('fs');
var files       = require('./lib/files');

clear();
console.log(
  chalk.yellow(
    figlet.textSync('ngwp', { horizontalLayout: 'full' })
  )
);
console.log(chalk.cyan('Angular2+')); 
console.log('Typescript, Sass, Karma, Jasmine, and Webpack 2\n');

// Check to make sure we're not already a git repository
// if (files.directoryExists('.git')) {
//   console.log(chalk.red('Already a git repository!'));
//   process.exit();
// }

// console.log(process.cwd())
// console.log(files.directoryExists('/Users/dancarr/Desktop/cli/blueprints'))

files.install();