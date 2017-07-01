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

inquirer.prompt([{
  type: 'input',
  name: 'name',
  message: 'Enter project name: ',
  default: 'my-app'
}, {
  type: 'checkbox',
  name: 'routes',
  message: 'Do you need routing? ',
  choices: [
    {name: 'true', value: true, checked: true},
    {name: 'false', value: false}
  ]
}])
.then(function (answers) {
    console.log(answers);
})
.catch(function (error) {
    console.log(error);
});

// files.new('my-app', false);