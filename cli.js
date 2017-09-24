#!/usr/bin/env node


var chalk = require('chalk');
var cli = require('cli');
var figlet = require('figlet');
var fs = require('fs');
var path = require('path');
var srcPath = process.cwd() + '/src';
var Lodash = require('lodash');
var routersPath = srcPath + '/routes';
var modelPath = srcPath + '/models';
var coreTemplates = require('./.cli-templates/CoreTemplates');

let options = cli.parse({
    generate: ['g', 'create new File with specification', 'string', false]
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

// console.log(
//     chalk.red(
//         figlet.textSync('NodeFR', { horizontalLayout: 'fitted' })
//     )
// );

// var i = 0, interval = setInterval(function () { 
//     cli.progress(++i / 100); 
//     if (i === 100) {
//         clearInterval(interval);
//         cli.ok('Finished!');
//     }
// }, 50);


/**
 * to generate route
 */
function generateRouter() {
    if (cli.args) {
        for (var key in cli.args) {
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
        for (var key in cli.args) {
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
