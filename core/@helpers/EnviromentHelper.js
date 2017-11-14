import Fs from 'fs';
import Yaml from 'js-yaml';
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
                const file = Yaml.safeLoad(Fs.readFileSync(`${PathHelper.rootProject}/.enviroment.yaml`));
                const json = JSON.parse(JSON.stringify(file));
                return resolve(json);
            } catch (error) {
                console.error(error);
                reject(error);
            }
        })
    }

}

export default EnviromentHelper;