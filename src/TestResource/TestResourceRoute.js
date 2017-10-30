import TestResourceController from './controllers/TestResourceController';
    
class TestResourceRoute extends Bases.BaseRoute {
        
    /**
    * construct for TestResourceRoute
    * 
    * @param {json} router instance of ExpressJS router 
    */
    constructor(app) {
        super(app);
    }

    resourceInit(){
      this.resource(this.nameRoute, TestResourceController);
    }

}

export default TestResourceRoute;