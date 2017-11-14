
import Sequelize from 'sequelize';

class TestModel extends Bases.BaseModel {

    /**
     * constructor for TestModel
     * 
     * @param {Boolean} sync sincronization switch
     */
    constructor( sync = true ) {
        super(sync);
    }
    

    get connection () {
        return 'default';
    }


    /**
     * Define your schema here!
     */
    schema() {
        return {
            //this is a field from TestModel table
            TestModelField: {
                //type String
                type: Sequelize.STRING,
                defaultValue: 'TestModelField!'
            }
            
        };
    }

}

export default TestModel;
    