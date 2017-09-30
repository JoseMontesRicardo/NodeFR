
/**
 * template of router
 * 
 * @param {String} fileName router fine name
 */
const routeTemplate = function (fileName) {
    return `
class ${fileName} extends bases.BaseRoute {
        
    /**
    * construct for ${fileName}
    * 
    * @param {json} router instance of ExpressJS router 
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
import Sequelize from 'sequelize';

class ${fileName} extends bases.BaseModel {

    /**
     * constructor for ${fileName}
     * 
     * @param {Boolean} sync sincronization switch.
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

