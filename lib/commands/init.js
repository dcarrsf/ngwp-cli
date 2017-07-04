const inquirer = require('inquirer');
const doCommand = require('./command_all');

// Command
const command = {
  // Type
  type: 'init',
  // Source file paths
  paths: {
    templ: 'ng',
    templ_routes: 'ng_routes'
  },
  keys: {
    name: 'abc',
    author: 'Jane Doe',
    description: 'Describe abc...'
  },
  files: {
    'index.html': ['name'],
    'README.md': ['name', 'description'],
    'package.json': ['name', 'author', 'description']
  }
};

// Command
module.exports = function(name, options) {
  
  // Gather configuration info
  inquirer.prompt([{
      type: 'input',
      name: 'name',
      message: 'Project name:'
    }, {
      type: 'input',
      name: 'description',
      message: 'Project description:'
    }, {
      type: 'input',
      name: 'author',
      message: 'Project author:'
    }, {
      type: 'confirm',
      name: 'routing',
      message: 'Do you need page routing?'
    } 
  ]).then((answers) => {
    console.log(answers);
    // Run command
    doCommand(command, answers);
  });
}
