import TestController from '../controllers/TestController';
import TestModel from '../models/TestModel';

class TestRoute extends Bases.BaseRoute {

    /**
    * construct for TestRoute
    *
    * @param {json} router instance of ExpressJS router
    */
    constructor(router) {
        super(router);
        this.testModel = new TestModel();
    }

    
    // resourceInit(){
    //   this.resource('myprefix', TestController);
    // }

    /**
    * main method, init all routes for TestRoute here!
    */
    changolesInit() {
        this.get('/'+this.nameRoute,async (req, res) => {res.send( await this.testModel.findAll({}) );});
        // this.get('/'+this.nameRoute,async (req, res) => {res.send({ 'route':  'Hi from ' + this.nameRoute + '' });});
        this.post('/'+this.nameRoute,async (req, res) => {res.send({ 'route':  'Hi from ' + this.nameRoute + '' });});
        this.put('/'+this.nameRoute,async (req, res) => {res.send({ 'route':  'Hi from ' + this.nameRoute + '' });});
        this.patch('/'+this.nameRoute,async (req, res) => {res.send({ 'route':  'Hi from ' + this.nameRoute + '' });});
        this.delete('/'+this.nameRoute,async (req, res) => {res.send({ 'route':  'Hi from ' + this.nameRoute + '' });});
    }

}

export default TestRoute;
