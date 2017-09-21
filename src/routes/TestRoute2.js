import BaseRoute from '../../base/BaseRoute';
import Lodash from 'lodash';

class TestRoute2 extends BaseRoute {
    
    constructor(app) {
        super(app);
    }

    mainRoute() {
        this._app.get('/' + Lodash.toLower(this.constructor.name), (req, res) => {
            res.send({ 'route': `says Hi from ${Lodash.toLower(this.constructor.name)}!` });
        })
    }

}

export default TestRoute2;