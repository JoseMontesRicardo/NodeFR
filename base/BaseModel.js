class BaseModel {

    /**
     * constructor
     * 
     * @param {Boolean} sync syncronization switch
     */
    constructor(sync = false) {
        (async () => {
            await this.syncModel(sync);
        })();
    }


    /**
     * return schema
     */
    get schema() {
        return this.getSchema();
    }

    
    /**
     * return schema name
     */
    get schemaName() {
        return this.constructor.name;
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
                    await this.schema.sync({ force: false });
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