import { router } from './Decorators';


class BaseRoute {

    /**
     * construct of BaseRoute
     * 
     * @param {json} app Express.js instance
     */
    constructor(app) {
        this._app = app;
        this.startAllMethods();
    }

    /**
     * up and run all methods of the all routes
     */
    startAllMethods() {
        let functions = Object.getOwnPropertyNames(Object.getPrototypeOf(this));

        for (var key in functions) {
            if (functions.hasOwnProperty(key)) {
                if ( functions[key] !== 'constructor' ) {
                    if (  functions[key].indexOf('Route') !== -1 ) {
                        this[functions[key]]();
                    }
                }
            }
        }
    }

}

export default BaseRoute;