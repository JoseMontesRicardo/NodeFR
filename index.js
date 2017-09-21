import Sequelize from 'sequelize';
import fs from 'fs';
import appRootDir from 'app-root-dir';
import Connection from './src/repositories/Connection';
import Express from 'express';
import Util from './Util';
import http from 'http';
import cors from 'cors';
 

(async () => {
    try {

        //init utils
        let util = new Util();
        //read config file
        let config = await Util.readConfig();
        // read enviroment
        let enviroment = await util.getEnviroment();


        // define port from config file
        let port = config.ports[enviroment].app;


        //start connections and sequelize
        let connection = new Connection();
        global.sequelize = await connection.getConnection();

        //start Express
        let app = Express();
        
        //Expressjs configurations
        // enable cors
        app.use(cors());
        await util.startRoutes(app);

        //create server http
        app.server = http.createServer(app);
        app.server.listen(port, () => {
            console.log(`Running on ${port}`);
        })

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
})()