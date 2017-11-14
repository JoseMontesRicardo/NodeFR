import Lodash from 'lodash';

class BaseModel {


    /**
     * constructor
     * 
     * @param {Boolean} sync syncronization switch
     */
    constructor(sync = false) {
        (async () => {
            this._connection = null;
            await this.syncModel(sync);
        })();
        return this.getSchema;
    }


    get package() {
        return 'sequelize';
    }

    
    /**
     * return schema
     */
    get getSchema() {
        if (!this.getConnection()) {
            if ( this.connection === "default" ) {
                this.setConnection();
            } else {
                this.setConnection(this.connection);
            }
        } 
        return this.getConnection().define(this.schemaName, this.schema());
    }


    /**
     * return schema name
     */
    get schemaName() {
        return this.constructor.name;
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
     * to sincronize model with table
     * 
     * @param {Boolean} sync syncronization switch
     */
    syncModel(sync) {
        return new Promise(async (resolve, reject) => {
            try {
                if (sync) {
                    await this.getSchema.sync({ force: false });
                    console.log(`${this.constructor.name} sincronized!`)
                }
                resolve(true);
            } catch (error) {
                console.log(error);
                reject(error);
            }
        })
    }

}

export default BaseModel;