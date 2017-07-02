const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const rimraf = require('rimraf');
const replace = require('replacestream');

// Config
const ignore = { '.DS_Store': true };

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

// example filter
// const myfilter = {
//   'package.json': { name: '<% projectname %>', value: config.name }
// };

class FileSystem {
  /**
   * Create a new file from a template.
   * @param {string} from Path to the template file.
   * @param {string} to Installation folder.
   * @param {string} name Name of the new file.
   * @param {function} filter Replace data in templates.
   */
  copyFile(from, to, name, filter) {
    if (fs.existsSync(from)) {
      if (filter) {
        for (let file in filter) {
          if (from.indexOf(file) > -1) {
            const temp = filter[file];
            fs.createReadStream(from)
            .pipe(replace(temp.name, temp.value))
            .pipe(fs.createWriteStream(to));
          }
        }
      } else {
        fs.createReadStream(from).pipe(fs.createWriteStream(to));
      }
    }
  }

  removeFile(file) {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
  }

  createFolder(base, name) {
    const newpath = path.join(...arguments);
    if (!fs.existsSync(newpath)) {
      fs.mkdirSync(newpath);
    }
  }

  removeFolder(folder) {
    if (fs.existsSync(folder)) {
      rimraf.sync(folder);
    }
  }

  clearFolder(base) {
    fs.readdirSync(base)
    .forEach((fof) => { 
      if (is(base, fof, 'folder')) {
        removeFolder(path.join(base, fof));
      } else if (is(base, fof, 'file')) {
        removeFile(path.join(base, fof));
      }
    });
  }

  is(base, fof, type) { 
    if (ignore[fof] !== undefined) return false;
    const func = type === 'folder' ? 'isDirectory' : 'isFile';
    try {
      return fs.statSync(path.join(base, fof))[func]();
    } catch (err) {
      return false;
    }
  }

  // File Traversal
  traverseFolder(base, dirs, callback) {
    const newbase = path.join(base, dirs);
    fs.readdirSync(newbase)
    .forEach((fof) => { // fof = file or folder
      if (is(newbase, fof, 'folder')) {
        callback.apply(this, [fof, null, dirs]);
      } else if (is(newbase, fof, 'file')) {
        callback.apply(this, [null, fof, dirs]);
      }
    });
  }
}

export default new FileSystem();