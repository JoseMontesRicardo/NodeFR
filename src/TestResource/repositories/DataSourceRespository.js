
import DataSourceModel from '../models/DataSource';
import Mongodb from 'mongodb';

class DataSourceRespository {

    constructor() {
        this.dataSourceModel = new DataSourceModel();
    }

    index(query = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await DataSourceModel.find(query));
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    show(id) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await DataSourceModel.findOne({ _id: Mongodb.ObjectID(id) }));
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    store(data) {
        return new Promise(async (resolve, reject) => {
            try {
                this.dataSourceModel.set(data);
                resolve(await this.dataSourceModel.save());
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    update(id, data) {
        return new Promise(async (resolve, reject) => {
            try {
                let element = await DataSourceModel.findOne({ _id: Mongodb.ObjectID(id) })
                console.log(id);
                element.set(data);
                resolve(await element.save());
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }


    delete(id) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await DataSourceModel.remove({ _id: Mongodb.ObjectID(id) }));
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }



}

export default DataSourceRespository;