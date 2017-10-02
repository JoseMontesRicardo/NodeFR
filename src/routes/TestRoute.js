import {BaseRoute} from '../../core/@base';
import TestController from '../controllers/TestController'

class TestRoute extends bases.BaseRoute {

    /**
    * construct for TestRoute
    *
    * @param {json} router instance of ExpressJS router
    */
    constructor(router) {
        super(router);
        this.testController = new TestController();
        this.startAllMethods(); //Use this method when you want load the class's methods finished on Init 
    }

    /**
    * main method, init all routes for TestRoute here!
    */
    changolesInit() {
        this.get('/'+this.nameRoute,async (req, res) => {res.send({ 'route':  'Hi from ' + this.nameRoute + '' });});
        this.post('/'+this.nameRoute,async (req, res) => {res.send({ 'route':  'Hi from ' + this.nameRoute + '' });});
        this.put('/'+this.nameRoute,async (req, res) => {res.send({ 'route':  'Hi from ' + this.nameRoute + '' });});
        this.patch('/'+this.nameRoute,async (req, res) => {res.send({ 'route':  'Hi from ' + this.nameRoute + '' });});
        this.delete('/'+this.nameRoute,async (req, res) => {res.send({ 'route':  'Hi from ' + this.nameRoute + '' });});
    }

    resourceInit(){
      this.resource('myprefix',this.testController);
    }
}

export default TestRoute;
