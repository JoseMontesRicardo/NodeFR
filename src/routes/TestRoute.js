
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
    * main method, init all routes for TestRoute here!
    */
    init() {

        this.get('/'+this.nameRoute,async (req, res) => {res.send({ 'route':  'Hi from ' + this.nameRoute + '' });});
        this.post('/'+this.nameRoute,async (req, res) => {res.send({ 'route':  'Hi from ' + this.nameRoute + '' });});
        this.put('/'+this.nameRoute,async (req, res) => {res.send({ 'route':  'Hi from ' + this.nameRoute + '' });});
        this.patch('/'+this.nameRoute,async (req, res) => {res.send({ 'route':  'Hi from ' + this.nameRoute + '' });});
        this.delete('/'+this.nameRoute,async (req, res) => {res.send({ 'route':  'Hi from ' + this.nameRoute + '' });});

    }

}

export default TestRoute;