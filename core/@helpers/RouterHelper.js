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
     * 
     * @param {*} path 
     */
    instanceAllResourcesRoute(path, app) {
        try {
            const ext = '.js';
            let classFiles = Util.listAllFiles(path);
            let classFilesRequired = {};
            let fileName = '';
            let fileNameWithoutExt = '';
            let pathFile = '';

            for (var index = 0; index < classFiles.length; index++) {
                fileName = Path.basename(classFiles[index]);
                pathFile = classFiles[index];
                fileNameWithoutExt = Path.basename(pathFile, ext);

                if (fileName.indexOf('ResourceRoute') !== -1) {
                    classFilesRequired[fileNameWithoutExt] = require(pathFile).default;
                    new classFilesRequired[fileNameWithoutExt](app);
                }
            }

        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }


    /**
     * up and run all routes
     */
    startRoutes(app, router) {
        return new Promise(async (resolve, reject) => {
            try {
                this.instanceAllResourcesRoute(PathHelper.rootPath, app);

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