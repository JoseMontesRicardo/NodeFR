import fs from 'fs';
import path from 'path';
import appRootDir from 'app-root-dir';

class Util {

    /**
     * constructor
     */
    constructor() {
        global.rootPath = appRootDir.get();
    }

    /**
    * get root path of project
    */
    static rootPath() {
        return `${rootPath}/src`;
    }

    /**
     * get config path of project
     */
    static configPath() {
        return `${this.rootPath()}/config`;
    }

    /**
     * get route path of project
     */
    static reoutesPath() {
        return `${this.rootPath()}/routes`;
    }

    /**
     * leer archivo de configuracion
     */
    static readEnviromentsVar() {
        return new Promise((resolve, reject) => {
            try {
                fs.readFile(`${Util.configPath()}/.env.json`, (err, stream) => {
                    if (err) return reject(err);
                    resolve(JSON.parse(stream));
                })
            } catch (error) {
                console.log(error);
                reject(error);
            }
        })
    }

    /**
     * leer configuracion
     */
    static readConfig() {
        return new Promise((resolve, reject) => {
            try {
                fs.readFile(`${Util.configPath()}/.config.json`, (err, stream) => {
                    if (err) return reject(err);
                    resolve(JSON.parse(stream));
                })
            } catch (error) {
                console.log(error);
                reject(error);
            }
        })
    }

    /**
     * define enviroment in .config.json file
     */
    getEnviroment() {
        return new Promise(async (resolve, reject) => {
            try {
                let envFile = await Util.readEnviromentsVar();
                let enviroment = "";

                for (var key in envFile.enviroment) {
                    if (envFile.enviroment.hasOwnProperty(key)) {
                        if (envFile.enviroment[key] === true) {
                            enviroment = key;
                        }
                    }
                }

                return resolve(enviroment);
            } catch (error) {
                console.log(error);
                reject(error);
            }
        })
    }

    /**
     * up and run all routes
     * 
     * @param {json} app express instance
     */
    readAllRouteFiles() {
        return new Promise(async (resolve, reject) => {
            try {
                fs.readdir(Util.reoutesPath(), (err, files) => {
                    if (err) {
                        console.log(erro);
                        return reject(error);
                    }

                    for (var key in files) {
                        if (files.hasOwnProperty(key)) {
                            if (path.extname(files[key]) !== '.js') {
                                let msg = `extencion incorrecta en el archivo ${files[key]}`;
                                throw new Error(msg);
                            }

                            if (files[key].indexOf('Route') === -1) {
                                let msg = `nombre del archivo ${files[key]} incorrecto`;
                                throw new Error(msg);
                            }
                            files[key] = `${Util.reoutesPath()}/${files[key]}`;
                        }
                    }

                    return resolve(files);
                })
            } catch (error) {
                console.log(error);
                reject(error);
            }
        })
    }

    /**
     * up and run all routes
     * 
     * @param {json} app express instance
     */
    startRoutes(app, router) {
        return new Promise(async (resolve, reject) => {
            try {
                let files = await this.readAllRouteFiles();
                for (var key in files) {
                    if (files.hasOwnProperty(key)) {
                        let route = require(files[key]).default;
                        new route(app);
                    }
                }
                app.use(router);
                return resolve(true);
            } catch (error) {
                console.log(error);
                reject(error);
            }
        })
    }

}

export default Util;