#!/usr/bin/env node
'use strict';
const program     = require('commander');
const chalk       = require('chalk');
const clear       = require('clear');
const figlet      = require('figlet');
const ngwp        = require('./lib/ngwp');

const printBanner = () => {
  // clear();
  console.log(
    chalk.yellow(
      figlet.textSync('ngwp', { horizontalLayout: 'full' })
    )
  );
  console.log(chalk.cyan('Angular2+')); 
  console.log('Typescript, Sass, Karma, Jasmine, and Webpack\n');
};

program
  .version('0.1.0')

program
  .command('init')
  .action(function(name, options){
    printBanner();
    ngwp.init(name, options);
  });

program
  .command('component [name]')
  .action(function(name, options){
    printBanner();
    ngwp.component(name, options);
  });

program
  .command('directive [name]')
  .action(function(name, options){
    printBanner();
    ngwp.directive(name, options);
  });

program
  .command('service [name]')
  .action(function(name, options){
    printBanner();
    ngwp.service(name, options);
  });

program
  .command('pipe [name]')
  .action(function(name, options){
    printBanner();
    ngwp.pipe(name, options);
  });

program
  .command('model [name]')
  .action(function(name, options){
    printBanner();
    ngwp.model(name, options);
  });

program
  .command('route [name]')
  .action(function(name, options){
    printBanner();
    ngwp.route(name, options);
  });

program.on('--help', function() {
  // Banner
  printBanner();
  // Usage
  console.log(chalk.yellow('Usage: ngwp init'));
  // Commands
  console.log();
  console.log(chalk.cyan('Commands:'));
  console.log();
  console.log('init                  Install Angular2+ starter files with optional routing.');
  console.log('route [name]          Install a new route into ./');
  console.log('component [name]      Install a new component into ./shared/controls');
  console.log('directive [name]      Install a new directive into ./shared/directives');
  console.log('pipe [name]           Install a new pipe into ./shared/pipes');
  console.log('service [name]        Install a new service into ./shared/services');
  console.log('model [name]          Install a new pipe into ./shared/models');
  // Options
  console.log();
  console.log(chalk.cyan('Options:'));
  console.log();
  console.log('-h, --help            Output usage information.');
  console.log('-V, --version         Output the version number.');
  // Examples
  // console.log();
  // console.log(chalk.cyan('Examples:'));
  // console.log();
  // console.log(' $ ngwp init');
  // console.log(' $ ngwp route <name>');
  // console.log(' $ ngwp component <name>');
  // console.log(' $ ngwp directive <name>');
  // console.log(' $ ngwp service <name>');
  // console.log(' $ ngwp pipe <name>');
  // console.log(' $ ngwp model <name>');
  // todo: route specific installations
  // console.log(' $ ngwp container <name> --target <route>');
  // console.log(' $ ngwp module <name> --target <route>');
  console.log();
});

program.parse(process.argv);
