const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const rimraf = require('rimraf');
const replace = require('replacestream');

// Config
const ignore = { '.DS_Store': true };

// Paths
const root = '/Users/dancarr/Desktop/cli'; // ./
const cwd  = '';

// Inject data while piping
const injectData = (filter, stream) => {
  const name = `<% ${filter.name} %>`;
  const value = filter.value[filter.name];
  return stream.pipe(replace(name, value));
}
const injectFilters = (filters, stream) => {
  for (let i = 0, len = filters.length; i < len; i++) {
    stream = injectData(filters[i], stream);
  }
  return stream;
};

class FileSystem {
  constructor() {
    this.base = root;
    this.basePath = 'blueprints';
    this.install = cwd;
    this.installPath = process.cwd();
  }

  /**
   * The setter here is a little odd in that it concatenates
   * any input with the current 'base' value. 
   */
  set basePath(folder) {
    this.base = path.join(this.base, folder);
  }

  // Returns current path to src folder
  get basePath() {
    return this.base;
  }

  /**
   * The setter here is a little odd in that it concatenates
   * any input with the current 'install' value. 
   */
  set installPath(folder) {
    this.install = path.join(this.install, folder);
  }

  // Returns current path to installation folder
  get installPath() {
    return this.install;
  }

  // Returns root path containing the blueprints folder
  get rootPath() {
    return root;
  }

  /**
   * Create a new file from a template.
   * @param {string} from Path to the template file.
   * @param {string} to Installation path.
   * @param {string} name Name of the new file.
   * @param {function} filter Replace data in templates.
   */
  copyFile(from, to, name, templates) {
    if (fs.existsSync(from)) {
      let matched = false;
      if (templates) {
        for (let file in templates) {     // todo: do this without the loop
          if (from.indexOf(file) > -1) {
            matched = true;
            // Run filters
            injectFilters(
              templates[file],            // filters for this file
              fs.createReadStream(from)   // stream
            ).pipe(fs.createWriteStream(to));
            break;
          }
        }
      }
      if (!matched) {
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
      if (this.is(base, fof, 'folder')) {
        this.removeFolder(path.join(base, fof));
      } else if (this.is(base, fof, 'file')) {
        this.removeFile(path.join(base, fof));
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
      if (this.is(newbase, fof, 'folder')) {
        callback.apply(this, [fof, null, dirs]);
      } else if (this.is(newbase, fof, 'file')) {
        callback.apply(this, [null, fof, dirs]);
      }
    });
  }
}

module.exports = new FileSystem();
