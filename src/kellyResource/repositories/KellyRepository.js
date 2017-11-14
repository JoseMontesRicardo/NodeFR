import KellyModel from '../models/KellyModel';
import Mongodb from 'mongodb';

class KellyRepository {

    constructor() {
        new KellyModel();
    }

    index(query = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await KellyModel.find(query));
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    show(id) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await KellyModel.findOne({ _id: Mongodb.ObjectID(id) }));
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    store(data) {
        return new Promise(async (resolve, reject) => {
            try {
                let newData = new KellyModel(data);
                resolve(await newData.save());
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    update(id, data) {
        return new Promise(async (resolve, reject) => {
            try {
                let element = await KellyModel.findOne({ _id: Mongodb.ObjectID(id) })
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
                resolve(await KellyModel.remove({ _id: Mongodb.ObjectID(id) }));
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

}

export default KellyRepository;

