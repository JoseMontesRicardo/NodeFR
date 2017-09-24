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
                
            }
        })
    }


    /**
     * setup de variables de entorno
     */
    setUpParams() {
        return new Promise(async (resolve, reject) => {
            try {
                let envFile = await Fixture.readEnviromentsVar();
                let config = await Fixture.readConfig();
                let enviroment = "";
                let connectionParams = null;

                for (var key in envFile.enviroment) {
                    if (envFile.enviroment.hasOwnProperty(key)) {
                        if (envFile.enviroment[key] === true) {
                            enviroment = key;
                        }
                    }
                }

                if (Lodash.has(config, 'data-base')) {
                    if (Lodash.has(config['data-base'], enviroment)) {
                        connectionParams = config['data-base'][enviroment];
                    } else {
                        throw new Error('entorno no definido para la base de datos')
                    }
                } else {
                    throw new Error('configuracion inexistente para la base de datos')
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