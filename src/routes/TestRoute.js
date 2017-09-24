
import BaseRoute from '../../base/BaseRoute';
import Lodash from 'lodash';

class TestRoute extends BaseRoute {
        
    /**
    * construct for TestRoute
    * 
    * @param {json} app instance of ExpressJS 
    */
    constructor(app) {
        super(app);
    }

    /**
    * route main method
    */
    mainRoute() {
        this._app.get('/' + Lodash.toLower(this.constructor.name), async (req, res) => {
            res.send({ 'route':  'route said Hi from ' + Lodash.toLower(this.constructor.name) + '' });
        })
    }

}

export default TestRoute;