import KellyController from './controllers/KellyController';
    
class KellyRoute extends Bases.BaseRoute {
        
    /**
    * construct for KellyRoute
    * 
    * @param {json} router instance of ExpressJS router 
    */
    constructor(app) {
        super(app);
    }

    resourceInit(){
      this.resource(this.nameRoute, KellyController);
    }

}

export default KellyRoute;

