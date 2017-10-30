import Sequelize from 'sequelize';
import  DatabaseMongorito from 'mongorito';

import EnviromentHelper from './EnviromentHelper';
import Lodash from 'lodash';

class Connection {

    /**
     * constructor
     */
    constructor() {
    }


    /**
     * get connection
     * 
     * @return {Promise} Promise with object connection.
     */
    getConnection() {
        return new Promise(async (resolve, reject) => {
            try {
                let { params, envFile } = await this.setUpParams();
                let dbConnectionDefault = envFile['data-base']['db-connection'];
                let dbConnection = null;
                switch (dbConnectionDefault) {
                    case "sequelize":
                        dbConnection = new Sequelize(params['data-base'], params['user'], params['pass'], {
                            host: params['host'],
                            dialect: params['dialect'],
                            timezone: params['timezone']
                        });
                        break;
                    case "mongorito":
                        dbConnection = new DatabaseMongorito(`mongodb://${params['host']}:${params['port']}/${params['data-base']}?connectTimeoutMS=52000000`);
                        await dbConnection.connect();
                        break;

                    default:
                        console.log('Not BD selected!')
                        break;
                }


                return resolve(dbConnection);
            } catch (error) {
                console.log(error);
                reject(error);
            }
        })
    }


    /**
     * setup connection params from .enviroment.json
     * 
     * @return {Promise} Promise with connection params
     */
    setUpParams() {
        return new Promise(async (resolve, reject) => {
            try {
                let envFile = await EnviromentHelper.readEnviroment();
                let params = null;
                let db = null;

                if (Lodash.has(envFile, 'data-base')) {
                    if (Lodash.has(envFile['data-base'], 'default')) {
                        db = envFile['data-base']['default'];
                        params = envFile['data-base'][db];
                    } else {
                        throw new Error('Connection key not found.')
                    }
                } else {
                    throw new Error('Data-base config not found.')
                }
                return resolve({ params, envFile });
            } catch (error) {
                console.log(error);
                reject(error);
            }
        })
    }
}

export default Connection;