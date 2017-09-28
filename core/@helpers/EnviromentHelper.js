import Fs from 'fs';
import PathHelper from './PathHelper';

class EnviromentHelper {

  /**
   * constructor
   */
  constructor() {
  }


  /**
   * get enviroment params from .enviroment.json
   * 
   * @return {Promise} promise with enviroment.json.
   */
  static readEnviroment() {
    return new Promise((resolve, reject) => {
      try {
        Fs.readFile(`${PathHelper.rootProject}/.enviroment.json`, (err, stream) => {
          if (err) {
            throw new Error(err);
          };

          return resolve(JSON.parse(stream));
        })
      } catch (error) {
        console.log(error);
        reject(error);
      }
    })
  }

}

export default EnviromentHelper;