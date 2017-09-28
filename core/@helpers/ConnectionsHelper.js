import Sequelize from 'sequelize';
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
                let params = await this.setUpParams();

                const sequelize = new Sequelize(params['data-base'], params['user'], params['pass'], {
                    host: params['hots'],
                    dialect: params['dialect'],
                    timezone: params['timezone']
                });
                return resolve(sequelize);
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
                let connectionParams = null;
                let db = null;

                if (Lodash.has(envFile, 'data-base')) {
                    if (Lodash.has(envFile['data-base'], 'default')) {
                        db = envFile['data-base']['default'];
                        connectionParams = envFile['data-base'][db];
                    } else {
                        throw new Error('Connection key not found.')
                    }
                } else {
                    throw new Error('Data-base config not found.')
                }
                return resolve(connectionParams);
            } catch (error) {
                console.log(error);
                reject(error);
            }
        })
    }
}

export default Connection;