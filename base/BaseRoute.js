import { router } from './Decorators';
import Lodash from 'lodash';


class BaseRoute {

    /**
     * construct of BaseRoute
     * 
     * @param {json} app Express.js instance
     */
    constructor(router) {
        this.router = router;
        this.startAllMethods();
    }


    /**
     * up and run all methods of the routes
     */
    startAllMethods() {
        let functions = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
        let cont = 0;

        for (var key in functions) {
            if (functions.hasOwnProperty(key)) {
                if ( functions[key] !== 'constructor' ) {
                    if (  functions[key].indexOf('init') !== -1 ) {
                        this[functions[key]]();
                        cont++;
                    }
                }
            }
        }

        if (cont > 0) console.log(`routes for ${this.constructor.name} loaded!`);
        
    }

    get nameRoute() {
        return Lodash.toLower(this.constructor.name);
    }

    get(path, cb) {
        this.router.get(path, cb);
    }

    post(path, cb) {
        this.router.post(path, cb);
    }

    put(path, cb) {
        this.router.put(path, cb);
    }

    patch(path, cb) {
        this.router.patch(path, cb);
    }

    delete(path, cb) {
        this.router.delete(path, cb);
    }

}

export default BaseRoute;