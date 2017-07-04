const path = require('path');
const chalk = require('chalk');
const files = require('../utils/fs');

// Update keys with naming convention
const createProjectKeys = (command, options) => {
  // Update keys

};

// Create folder for new template files
const createProjectFolder = (command, options) => {
  
};

// Install template files
const installProjectFiles = (command, options) => {
  
};

// Command runner
module.exports = (command, options) => {
  // 1. Update keys
  createProjectKeys(command, options);
  // 2. Get installation folder
  createProjectFolder(command, options);
  // 3. Install template files
  installProjectFiles(command, options);
};
