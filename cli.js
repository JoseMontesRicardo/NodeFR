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
    } else {
        return console.log(
            chalk.red(new Error('Undefined layout!'))
        );
    }
}


if (options.new) {
    cloneProject();
}


/**
 * to generate route
 */
function generateRouter() {
    if (cli.args) {
        for (let key in cli.args) {
            if (cli.args.hasOwnProperty(key)) {

                let nameFile = Lodash.upperFirst(Lodash.camelCase(cli.args[key] + ' Route'));
                let filePath = routersPath + '/' + nameFile + '.js';

                if (!fs.existsSync(filePath)) {
                    fs.writeFile(filePath, coreTemplates.routeTemplate(nameFile), function (err) {
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
                        chalk.yellow(`[WARNING] ${nameFile} allredy exist!`)
                    );
                }
            }
        }
    }
}


/**
 * to generate model
 */
function generateModel() {
    if (cli.args) {
        for (let key in cli.args) {
            if (cli.args.hasOwnProperty(key)) {

                let nameFile = Lodash.upperFirst(Lodash.camelCase(cli.args[key] + ' Model'));
                let filePath = modelPath + '/' + nameFile + '.js';

                if (!fs.existsSync(filePath)) {
                    fs.writeFile(filePath, coreTemplates.modelTemplate(nameFile), function (err) {
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
                    return console.log(
                        chalk.yellow(`[WARNING] ${nameFile} allredy exist!`)
                    );
                }
            }
        }
    }
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