import Fs from 'fs';
import Path from 'path';

class Util {

  /**
   * constructor for Utils
   */
  constructor() {

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
      let paths = [];
      let ext = '.js'
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
    }

  }

}

export default Util;