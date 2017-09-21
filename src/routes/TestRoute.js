import BaseRoute from '../../base/BaseRoute';
import Lodash from 'lodash';

class TestRoute extends BaseRoute {

    constructor(app) {
        super(app);
    }

    mainRoute() {
        this._app.get('/' + Lodash.toLower(this.constructor.name), async (req, res) => {
            res.send({ 'route': `says Hi from ${Lodash.toLower(this.constructor.name)}!` });
        })
    }

}

export default TestRoute;