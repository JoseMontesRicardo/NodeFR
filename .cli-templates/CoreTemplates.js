
/**
 * template of router
 * 
 * @param {String} fileName router fine name
 */
const routeTemplate = function (fileName) {
    return `
class ${fileName} extends Bases.BaseRoute {
        
    /**
    * construct for ${fileName}
    * 
    * @param {json} router instance of ExpressJS router 
    */
    constructor(app) {
        super(app);
    }

    /**
    * main method, init all routes for ${fileName} here!
    */
    init() {

        this.get('/'+this.nameRoute,async (req, res) => {res.send({ 'route':  'Hi from ' + this.nameRoute + '' });});
        this.post('/'+this.nameRoute,async (req, res) => {res.send({ 'route':  'Hi from ' + this.nameRoute + '' });});
        this.put('/'+this.nameRoute,async (req, res) => {res.send({ 'route':  'Hi from ' + this.nameRoute + '' });});
        this.patch('/'+this.nameRoute,async (req, res) => {res.send({ 'route':  'Hi from ' + this.nameRoute + '' });});
        this.delete('/'+this.nameRoute,async (req, res) => {res.send({ 'route':  'Hi from ' + this.nameRoute + '' });});

    }

}

export default ${fileName};`;
}

/**
 * template of router
 * 
 * @param {String} fileName router fine name
 */
const resourceRouteTemplate = function (fileName, imports, controller) {
    return `${imports};
    
class ${fileName} extends Bases.BaseRoute {
        
    /**
    * construct for ${fileName}
    * 
    * @param {json} router instance of ExpressJS router 
    */
    constructor(app) {
        super(app);
    }

    resourceInit(){
      this.resource(this.nameRoute, ${controller});
    }

}

export default ${fileName};`;
}


/**
 * template of model
 * 
 * @param {String} fileName model file name 
 */
const modelTemplate = function (fileName) {
    return `
import Sequelize from 'sequelize';

class ${fileName} extends Bases.BaseModel {

    /**
     * constructor for ${fileName}
     * 
     * @param {Boolean} sync sincronization switch.
     */
    constructor( sync = true ) {
        super(sync);
    }


    /**
     * defineSchema
     */
    getSchema() {
        return sequelize.define(this.schemaName, {
            //this is a field from TestModel table
            ${fileName}Field: {
                //type String
                type: Sequelize.STRING,
                defaultValue: '${fileName}Field!'
            }
            
        });
    }

}

export default ${fileName};
    `;
}


/**
 * template of controlle
 * 
 * @param {String} fileName router fine name
 */
const controllerTemplate = function (fileName, imports) {
    return `${imports};

class ${fileName} extends Bases.BaseController {

  constructor() {
    super();
  }

  index() {
    return (req, res) => {
      res.send("Hi i'm a resource index from " + this.nameController + " " );
    }
  }

  show() {
    return (req, res) => {
      res.send("Hi i'm a resource show from " + this.nameController + " >> " + + req.params.id + " ");
    }
  }

  store() {
    return (req, res) => {
      res.send("Hi i'm a resource store from " + this.nameController + " >> " + + JSON.stringify(req.body) + " ");
    }
  }

  update() {
    return (req, res) => {
      res.send("Hi i'm a resource update from " + this.nameController + " >> " + JSON.stringify(req.params.id) + JSON.stringify(req.body) + " ");
    }
  }


  destroy() {
    return (req, res) => {
      res.send("Hi i'm a resource destroy from " + this.nameController + " >> " + + JSON.stringify(req.params.id) + " ");
    }
  }

}

export default ${fileName};`;
}


module.exports = {
    routeTemplate,
    modelTemplate,
    controllerTemplate,
    resourceRouteTemplate
}

