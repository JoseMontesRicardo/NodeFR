var routeTemplate = function (nameFile) {
    return `
import BaseRoute from '../../base/BaseRoute';
import Lodash from 'lodash';

class ${ nameFile } extends BaseRoute {
        
    /**
    * construct for ${nameFile}
    * 
    * @param {json} app instance of ExpressJS 
    */
    constructor(app) {
        super(app);
    }

    /**
    * main route method
    */
    mainRoute() {
        this._app.get('/' + Lodash.toLower(this.constructor.name), async (req, res) => {
            res.send({ 'route':  'says Hi from ' + Lodash.toLower(this.constructor.name) + '' });
        })
    }

}

export default ${nameFile};
    `
}

module.exports = {
    routeTemplate
}

