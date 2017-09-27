
/**
 * template of router
 * 
 * @param {String} fileName router fine name
 */
const routeTemplate = function (fileName) {
    return `
import BaseRoute from '../../base/BaseRoute';
import Lodash from 'lodash';

class ${ fileName} extends BaseRoute {
        
    /**
    * construct for ${fileName}
    * 
    * @param {json} app instance of ExpressJS 
    */
    constructor(app) {
        super(app);
    }

    /**
    * main method, init all routes for ${fileName} here!
    */
    init() {

        this.get('/'+this.nameRoute,async (req, res) => {res.send({ 'route':  'Hi from ' + this.nameRoute + '' });});
        this.post('/'+this.nameRoute,async (req, res) => {res.send({ 'route':  'Hi from ' + this.nameRoute + '' });});
        this.put('/'+this.nameRoute,async (req, res) => {res.send({ 'route':  'Hi from ' + this.nameRoute + '' });});
        this.patch('/'+this.nameRoute,async (req, res) => {res.send({ 'route':  'Hi from ' + this.nameRoute + '' });});
        this.delete('/'+this.nameRoute,async (req, res) => {res.send({ 'route':  'Hi from ' + this.nameRoute + '' });});

    }

}

export default ${fileName};`;
}


/**
 * template of model
 * 
 * @param {String} fileName model file name 
 */
const modelTemplate = function (fileName) {
    return `
import BaseModel from '../../base/BaseModel';
import Lodash from 'lodash';
import Sequelize from 'sequelize';

class ${fileName} extends BaseModel {

    /**
     * constructor for ${fileName}
     * 
     * @param {Boolean} sync sincronization switch
     */
    constructor( sync = true ) {
        super(sync);
    }


    /**
     * defineSchema
     */
    getSchema() {
        return sequelize.define(this.schemaName, {
            //this is a field from TestModel table
            ${fileName}Field: {
                //type String
                type: Sequelize.STRING,
                defaultValue: '${fileName}Field!'
            }
            
        });
    }

}

export default ${fileName};
    `;
}

module.exports = {
    routeTemplate,
    modelTemplate
}

