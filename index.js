#!/usr/bin/env node
'use strict';
const program     = require('commander');
const chalk       = require('chalk');
const clear       = require('clear');
const figlet      = require('figlet');
const ngwp        = require('./lib/ngwp');

const printBanner = () => {
  clear();
  console.log(
    chalk.yellow(
      figlet.textSync('ngwp', { horizontalLayout: 'full' })
    )
  );
  console.log(chalk.cyan('Angular2+')); 
  console.log('Typescript, Sass, Karma, Jasmine, and Webpack 2\n');
};

program
  .version('0.1.0')

program
  .command('init [name]')
  .option("-r, --routes [routes]", "Do you need page routing?")
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
  console.log(chalk.yellow('Usage: ngwp my-app --r true'));
  // Commands
  console.log();
  console.log(chalk.cyan('Commands:'));
  console.log();
  console.log('new [name] [options]  Install Angular2+ starter files with optional routing.');
  console.log('route [name]          Install a new route into ./');
  console.log('component [name]      Install a new component into ./shared/controls');
  console.log('directive [name]      Install a new directive into ./shared/directives');
  console.log('service [name]        Install a new service into ./shared/services');
  console.log('pipe [name]           Install a new pipe into ./shared/pipes');
  console.log('model [name]          Install a new pipe into ./shared/models');
  // todo: build project from json config
  // console.log('init [json]        Install project based on json config.');
  // Options
  console.log();
  console.log(chalk.cyan('Options:'));
  console.log();
  console.log('-h, --help            Output usage information.');
  console.log('-V, --version         Output the version number.');
  console.log('-r, --routes          Add routes to the starter files.');
  // Examples
  // console.log();
  // console.log(chalk.cyan('Examples:'));
  // console.log();
  // console.log(' $ ngwp new <name> --routes true');
  // console.log(' $ ngwp new <name> -r false');
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
