const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const rimraf = require('rimraf');
const replace = require('replacestream');

// Paths
const root = '/Users/dancarr/Desktop/cli'; // ./
const base = path.join(root, 'blueprints');
const ng = path.join(base, 'ng');
const ng_routes = path.join(base, 'ng_routes');

// Installation path
let ipath = process.cwd(); // current working directory
let ifldr = '';
let src_path = '';
let config = {};

class FileSystem {

}

export default new FileSystem();