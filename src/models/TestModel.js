
import Lodash from 'lodash';


class TestModel {

    /**
     * TestModel constructor
     */
    constructor(){
        this.schema = this.getSchema();
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
        return sequelize.define(this.schemaName, {});
    }

}

export default TestModel;