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
var program     = require('commander');

clear();
console.log(
  chalk.yellow(
    figlet.textSync('ngwp', { horizontalLayout: 'full' })
  )
);
console.log(chalk.cyan('Angular2+')); 
console.log('Typescript, Sass, Karma, Jasmine, and Webpack 2\n');

program
  .version('0.1.0')
  .option("-r, --routing [routes]", "Do you need page routing?")

program
  .command('new [name]')
  .description('Install Angular2+ started files with Webpack bundling.')
  .action(function(name, options){
    files.new(name, options.routes == true ? true : false);
  })
.on('--help', function() {
  console.log('  Examples:');
  console.log();
  console.log('    $ ngwp new <name> --routing true');
  console.log('    $ ngwp new <name> -r true');
  console.log();
  console.log('    $ ngwp generate <type> --routing true');
  console.log('    $ ngwp generate <type> -r true');
  console.log();
});



program.parse(process.argv);