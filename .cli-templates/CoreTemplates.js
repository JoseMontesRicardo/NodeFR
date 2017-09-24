
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
    * route main method
    */
    mainRoute() {
        this._app.get('/' + Lodash.toLower(this.constructor.name), async (req, res) => {
            res.send({ 'route':  'route said Hi from ' + Lodash.toLower(this.constructor.name) + '' });
        })
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
     * construct for ${fileName}
     */
    constructor( sync = true ) {
        super(sync);
    }

    /**
     * return schema name
     */
    get schemaName() {
        return this.constructor.name;
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

