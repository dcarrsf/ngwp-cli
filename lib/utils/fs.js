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
const injectData = (filter, config, stream) => {
  const name = `<% ${filter} %>`;
  const value = config[filter];
  return stream.pipe(replace(name, value));
};
const injectFilters = (filters, config, stream) => {
  for (let i = 0, len = filters.length; i < len; i++) {
    stream = injectData(filters[i], config, stream);
  }
  return stream;
};

class FileSystem {
  // ----------------
  // PROPERTIES:
  constructor() {
    this.base = root;
    this.basePath = 'blueprints';
    this.install = cwd;
    this.installPath = process.cwd();
  }
  // ----------------
  // METHODS:

  /**
   * Create a new file from a template.
   * 
   * This method copies a template file, injects data into it,
   * and renames the resulting file before writing it to the cwd.
   * 
   * @param {string} from Path to the template file.
   * @param {string} to Installation path.
   * @param {string} name Name of the new file.
   * @param {array}  filters Array of keys to replace in template.
   * @param {object} config Values to inject for each key.
   */
  copyFile(from, to, name, filters, config) {
    if (fs.existsSync(from)) {
      if (filters.length > 0) {
        filters.forEach((key) {
          // Run filters
          injectFilters(
            filters[key],                   // filter for this file
            config,                         // values for each filter
            fs.createReadStream(from)       // read stream
          ).pipe(fs.createWriteStream(to)); // write stream
        });
      } else {
        fs.createReadStream(from).pipe(fs.createWriteStream(to));
      }
    }
  }

  /**
   * Creates a folder
   * 
   * @param {string} base  Path to create the folder in.
   * @param {string} name  Name of the new folder.
   */
  createFolder(base, name) {
    const newpath = path.join(...arguments);
    if (!fs.existsSync(newpath)) {
      fs.mkdirSync(newpath);
    }
  }

  /**
   * Removes all children
   * 
   * @param {string} base  Path to the folder to clear.
   */
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

  /**
   * Removes a folder
   * 
   * @param {string} folder  Path to the folder to remove.
   */
  removeFolder(folder) {
    if (fs.existsSync(folder)) {
      rimraf.sync(folder);
    }
  }

  /**
   * Removes a file
   * 
   * @param {string} file  Path to the file to remove.
   */
  removeFile(file) {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
  }

  /**
   * Checks the type of file or folder
   * 
   * This method checks to see if a path is a file or a folder
   * and checks the path against a black list that ignores 
   * some file types (.DS_Store, etc.).
   * 
   * @param {string} base  Path to the file to check.
   * @param {string} fof   Name of the file or folder.
   * @param {string} type  Type to match (folder or file).
   * @returns {boolean}  True if the file matches the query.
   */
  is(base, fof, type) { 
    if (ignore[fof] !== undefined) return false;
    const func = type === 'folder' ? 'isDirectory' : 'isFile';
    try {
      return fs.statSync(path.join(base, fof))[func]();
    } catch (err) {
      return false;
    }
  }

  /**
   * Traverses the given folder
   * 
   * This method can be called recursively building the path with
   * the dirs parameter. Supply a callback function to process each
   * folder or file using the signature [folder, file, dirs].
   * 
   * @param {string} base  Path to folder to traverse.
   * @param {string} dirs  Additional subdirectories to add to path.
   * @param {function} callback  Callback function used to process files and folders.
   */
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

  // ----------------
  // GETTER / SETTERS:

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
}

module.exports = new FileSystem();
