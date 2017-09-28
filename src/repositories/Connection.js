import Sequelize from 'sequelize';
import Fixture from './Fixture';
import Lodash from 'lodash';

class Connection {

    /**
     * constructor
     */
    constructor() {
    }


    /**
     * getConnection
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
     * setup de variables de entorno
     */
    setUpParams() {
        return new Promise(async (resolve, reject) => {
            try {
                let envFile = await Fixture.readEnviroment();
                let connectionParams = null;
                if (Lodash.has(envFile, 'data-base')) {
                    if (Lodash.has(envFile['data-base'], 'default')) {
                        connectionParams = envFile['data-base']['default'];
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
