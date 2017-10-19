import Fs from 'fs';
import Path from 'path';
import Glob from 'glob';
import Lodash from 'lodash';

class Util {

  /**
   * constructor for Utils
   */
  constructor() {

  }



  /**
   * list all files in folder
   */
  static listAllFiles(path, array = []) {
    try {
      let files = Glob.sync(path + '/*');
      if (!Lodash.isEmpty(files)) {
        array = Util.walkDir(files, array);
      }

      return array;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  /**
   * 
   * @param {*} path 
   */
  static instanceClass(path) {
    try {
      let moduleExports = {};
      const ext = '.js';

      if (Path.extname(path) === ext) {
        moduleExports[Path.basename(path)] = require(path).default;
        console.log(moduleExports);
      }

    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }


  /**
   * 
   * @param {Array} paths array of paths
   */
  static walkDir(paths, array) {
    try {
      const ext = '.js';

      for (var index = 0; index < paths.length; index++) {
        if (Fs.statSync(paths[index]).isDirectory()) {
          array = Util.listAllFiles(paths[index], array);
        } else if (Path.extname(paths[index]) === ext) {
          array.push(paths[index]);
          // Util.instanceClass();
        }

      }

      return array;

    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }


  /**
   * Load all files in folder
   * 
   * @param {String} path Folder path 
   * @param {String} exclude Name file to exclude
   * 
   * @return {Object} Objects with loaded files
   */
  static readAllFiles(path, exclude = 'index') {
    try {
      const ext = '.js'
      let paths = [];
      let moduleExports = {};
      let files = Fs.readdirSync(path);

      for (var key in files) {
        if (files.hasOwnProperty(key)) {

          if (Path.extname(files[key]) === ext) {
            if (files[key].indexOf(exclude) === -1) {
              moduleExports[Path.basename(files[key], ext)] = require(`${path}/${files[key]}`).default;
            }
          }

        }
      }

      return moduleExports;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }

  }


}

export default Util;