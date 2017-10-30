
import {Database, Model} from 'mongorito';

class BaseModelMongorito extends Model {

    /**
     * constructor
     * 
     * @param {Boolean} sync syncronization switch
     */
    constructor(data) {
        super(data);
        dBDefault.register(BaseModelMongorito);
    }
}

export default BaseModelMongorito;