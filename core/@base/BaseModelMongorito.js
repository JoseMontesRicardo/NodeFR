import Lodash from 'lodash';
import { Database, Model } from 'mongorito';

class BaseModelMongorito extends Model {

    /**
     * constructor
     * 
     * @param {Boolean} sync syncronization switch
     */
    constructor(data) {
        super(data);
        this._connection = null;
        this.registerModel();
    }


    /**
     * Return the 'package' mongorito
     */
    get package () {
        return 'mongorito';
    }


    /**
     * Find an set connection defined in .enviroment.yaml as "default"
     * 
     * @param {String} connDefault name of connection defined in .enviroment.yaml as "default"
     */
    setConnection(connDefault = connectionDefault) {
        let connectionFound = Lodash.find(allConnections, { name: connDefault, package: this.package });
        if (connectionFound) {
            this._connection = connectionFound.connection;
        } else {
            throw new Error(`Connection '${connDefault}' not found for '${this.package}' package!`);
        }
    }


    /**
     * Get connection selected from .enviroment.yaml.
     * 
     */
    getConnection() {
        return this._connection;
    }


    /**
     * Register model in mongorito
     */
    registerModel() {
        if ( !this.getConnection() ) {
            if ( this.connection === "default" ) {
                this.setConnection();
            } else {
                this.setConnection(this.connection);
            }
        } 
        this.getConnection().register(BaseModelMongorito);
    }
}

export default BaseModelMongorito;