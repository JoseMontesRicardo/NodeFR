import Lodash from 'lodash';

class BaseRoute {

    /**
     * construct of BaseRoute
     *
     * @param {json} router Express.js instance
     */
    constructor(router) {
        this.router = router;
        this.startAllMethods(); //Use this method when you want load the class's methods finished on Init
    }


    /**
     * up and run all methods of the routes
     */
    startAllMethods() {
        let functions = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
        let cont = 0;

        for (var key in functions) {
            if (functions.hasOwnProperty(key)) {
                if (functions[key] !== 'constructor') {
                    if (functions[key].indexOf('Init') !== -1) {
                        this[functions[key]]();
                        cont++;
                    }
                }
            }
        }

        if (cont > 0) console.log(`Routes for ${this.constructor.name} loaded!`);

    }

    get nameRoute() {
        return this.constructor.name.toLowerCase();
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


    objRoute(source) {
        return [
            { verb: 'get', route: `/${source}`, action: 'index' },
            { verb: 'get', route: `/${source}/:id`, action: 'show' },
            { verb: 'post', route: `/${source}`, action: 'store' },
            { verb: 'put', route: `/${source}/:id`, action: 'update' },
            { verb: 'delete', route: `/${source}/:id`, action: 'destroy' }
        ]
    }

    resource(source, controller) {
        let arrayRoutes = this.objRoute(source);
        let instanceOfController =  new controller();
        let allMethods = Lodash.union(
            Object.getOwnPropertyNames(Object.getPrototypeOf(instanceOfController)),  
            Object.getOwnPropertyNames(Object.getPrototypeOf(controller.prototype))
        );
        
        arrayRoutes.forEach((objRoute) => {
            if (Object.getPrototypeOf(instanceOfController).hasOwnProperty(objRoute.action)) {
                let route = this.router.route(objRoute.route);
                route[objRoute.verb](instanceOfController[objRoute.action]());
            }
        });
    }


}

export default BaseRoute;
