#!/usr/bin/env node


let chalk = require('chalk');
let cli = require('cli');
let figlet = require('figlet');
let fs = require('fs');
let path = require('path');
let findRoot = require('find-root');
let srcPath = findRoot(process.cwd()) + '/src';
let Lodash = require('lodash');
let exec = require('exec');
let download = require('download-git-repo');
let routersPath = srcPath + '/routes';
let modelPath = srcPath + '/models';
let controllerPath = srcPath + '/controllers';
let coreTemplates = require('./.cli-templates/CoreTemplates');

let options = cli.parse({
    generate: ['g', 'create new File with specification', 'string', false],
    new: ['n', 'create new project']
});


if (options.generate) {
    if (options.generate === 'route') {
        generateRouter();
    } else if (options.generate === 'model') {
        generateModel();
    } else if (options.generate === 'controller') {
        generateController();
    } else if (options.generate === 'resource') {
        let arrayResourcesFolders = createResourceFolders();

        // for (var index = 0; index < arrayResourcesFolders.length; index++) {
            generateModel(true, arrayResourcesFolders);
            generateController(true, arrayResourcesFolders);
            generateResourceRouter(arrayResourcesFolders);
        // }

    } else {
        return console.log(
            chalk.red(new Error('Undefined layout!'))
        );
    }
}


if (options.new) {
    cloneProject();
}

function createResourceFolders() {
    try {
        let resourceFolder = [];
        let arg = '';
        let folderPath = '';

        for (let key in cli.args) {
            arg = cli.args[key];
            folderPath = `${srcPath}/${Lodash.camelCase(arg + 'Resource')}`;
            resourceFolder.push(folderPath);
            if (!fs.existsSync(folderPath)) {
                try {
                    fs.mkdirSync(folderPath);
                } catch (error) {
                    return console.log(
                        chalk.red(new Error(err))
                    );
                }
            }
        }

        return resourceFolder;

    } catch (error) {
        return console.log(
            chalk.red(new Error(error))
        );
    }
}


/**
 * to generate route
 */
function generateRouter(resource = false) {
    if (cli.args) {
        for (let key in cli.args) {
            if (cli.args.hasOwnProperty(key)) {

                let fileName = Lodash.upperFirst(Lodash.camelCase(cli.args[key] + 'Route'));
                let filePath = routersPath + '/' + fileName + '.js';

                if (!fs.existsSync(filePath)) {
                    fs.writeFile(filePath, coreTemplates.routeTemplate(fileName), function (err) {
                        if (err) {
                            return console.log(
                                chalk.red(new Error(err))
                            );
                        }
                        return console.log(
                            chalk.green('[OK] route generated!')
                        );
                    });
                } else {
                    return console.log(
                        chalk.yellow(`[WARNING] ${fileName} allredy exist!`)
                    );
                }
            }
        }
    }
}


/**
 * to generate route
 */
function generateResourceRouter(folder) {
    if (cli.args) {
        for (let key in cli.args) {
            if (cli.args.hasOwnProperty(key)) {

                let suffix = 'Resource';
                let fileName = Lodash.upperFirst(Lodash.camelCase(cli.args[key] + `${suffix}Route`));
                let filePath = folder[key] + '/' + fileName + '.js';
                let controllerSuffix = `${suffix}Controller`;
                let importfileName = Lodash.upperFirst(Lodash.camelCase(cli.args[key] + controllerSuffix));
                let imports = `import ${importfileName} from './${importfileName}.js'`;

                if (!fs.existsSync(filePath)) {
                    fs.writeFile(filePath, coreTemplates.resourceRouteTemplate(fileName, imports, importfileName), function (err) {
                        if (err) {
                            return console.log(
                                chalk.red(new Error(err))
                            );
                        }
                        return console.log(
                            chalk.green('[OK] route generated!')
                        );
                    });
                } else {
                    return console.log(
                        chalk.yellow(`[WARNING] ${fileName} allredy exist!`)
                    );
                }
            }
        }
    }
}


/**
 * to generate model
 */
function generateModel(resource = false, folder = false) {
    if (cli.args) {
        for (let key in cli.args) {
            if (cli.args.hasOwnProperty(key)) {
                let suffix = 'Resource';
                let modelSuffix = (!resource) ? 'Model' : `${suffix}Model`;
                let fileName = Lodash.upperFirst(Lodash.camelCase(cli.args[key] + modelSuffix));
                let filePath = (folder) ? folder[key] + '/' + fileName + '.js' : modelPath + '/' + fileName + '.js';

                if (!fs.existsSync(filePath)) {
                    fs.writeFile(filePath, coreTemplates.modelTemplate(fileName), function (err) {
                        if (err) {
                            return console.log(
                                chalk.red(new Error(err))
                            );
                        }
                        return console.log(
                            chalk.green('[OK] Model generated!')
                        );
                    });
                } else {
                    console.log(
                        chalk.yellow(`[WARNING] ${fileName} allredy exist!`)
                    );
                }
            }
        }
    }
}

/**
 * to generate controller
 */
function generateController(resource = false, folder = false) {
    if (cli.args) {
        for (let key in cli.args) {
            if (cli.args.hasOwnProperty(key)) {
                let suffix = 'Resource';
                let controllerSuffix = (!resource) ? 'Controller' : `${suffix}Controller`;
                let modelSuffix = `${suffix}Model`;
                let imports = '';
                let fileName = Lodash.upperFirst(Lodash.camelCase(cli.args[key] + controllerSuffix));
                let importfileName = Lodash.upperFirst(Lodash.camelCase(cli.args[key] + modelSuffix));
                let filePath = (folder) ? folder[key] + '/' + fileName + '.js' : controllerPath + '/' + fileName + '.js';

                if (resource) {
                    imports = `import ${importfileName} from './${importfileName}.js'`;
                }

                if (!fs.existsSync(filePath)) {
                    fs.writeFile(filePath, coreTemplates.controllerTemplate(fileName, imports), function (err) {
                        if (err) {
                            return console.log(
                                chalk.red(new Error(err))
                            );
                        }
                        return console.log(
                            chalk.green('[OK] Controller generated!')
                        );
                    });
                } else {
                    console.log(
                        chalk.yellow(`[WARNING] ${fileName} allredy exist!`)
                    );
                }
            }
        }
    }
}

/**
 * to generate resource
 */
function generateResource() {

}

function cloneProject() {
    console.log(
        chalk.red(
            figlet.textSync('NodeFR', { horizontalLayout: 'fitted' })
        )
    );

    cli.spinner('Creating..');

    if (cli.argc === 1) {
        download('JoseMontesRicardo/nodejs-min-framework', process.cwd() + '/' + cli.args[0], (err) => {
            if (err) {
                return console.log(
                    chalk.red(new Error(err))
                );
            }

            cli.spinner('Creating.. done!', true)
            return console.log(
                chalk.green('[OK] project created!')
            );
        })
    }

}