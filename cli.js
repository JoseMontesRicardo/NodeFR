#!/usr/bin/env node


var chalk = require('chalk');
var cli = require('cli');
var figlet = require('figlet');
var fs = require('fs');
var srcPath = __dirname + '/src';
var Lodash = require('lodash');
var routersPath = srcPath + '/routes';
var modelPath = srcPath + '/models';
var coreTemplates = require('./.cli-templates/RouteTemplate');

let options = cli.parse({
    generate: ['g', 'create new File with specification', 'string', false]
});


if (options.generate) {
    if (options.generate === 'route') {
        generateRouter();
    } else if (options.generate === 'model') {

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
