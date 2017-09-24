
import BaseModel from '../../base/BaseModel';
import Lodash from 'lodash';
import Sequelize from 'sequelize';

class TestModel extends BaseModel {

    /**
     * construct for TestModel
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
            TestModelField: {
                //type String
                type: Sequelize.STRING,
                defaultValue: 'TestModelField!'
            }
            
        });
    }

}

export default TestModel;
    