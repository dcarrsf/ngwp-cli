#!/usr/bin/env node
'use strict';
const chalk       = require('chalk');
const clear       = require('clear');
// const CLI         = require('clui');
const figlet      = require('figlet');
const inquirer    = require('inquirer');
const Preferences = require('preferences');
// const Spinner     = CLI.Spinner;
// const GitHubApi   = require('github');
// const _           = require('lodash');
// const git         = require('simple-git')();
const touch       = require('touch');
const fs          = require('fs');
const files       = require('./lib/files');
const program     = require('commander');

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
  .command('new [name]')
  .option("-r, --routes [routes]", "Do you need page routing?")
  .action(function(name, options){
    printBanner();
    files.new(name, options.routes === 'true' ? true : false);
  });

program.on('--help', function() {
  // Banner
  printBanner();
  // Usage
  console.log(chalk.yellow('Usage: ngwp <name> --r true'));
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
  // console.log('init [json]        Install a new pipe into ./shared/models.');
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