import Fs from 'fs';
import Path from 'path';
import PathHelper from './PathHelper';
import Util from '../Util';

class RouterHelper {

    /**
     * constructor
     */
    constructor() {
        // global.rootPath = appRootDir.get();
    }
 
    
    /**
     * up and run all routes
     */
    startRoutes(app, router) {
        return new Promise(async (resolve, reject) => {
            try {
                let modules = Util.readAllFiles(PathHelper.routesPath);
                let files = modules;
                for (var key in files) {
                    if (files.hasOwnProperty(key)) {
                        new files[key](app);
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

export default RouterHelper;