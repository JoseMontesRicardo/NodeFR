
class BaseController {

  constructor() {
  }

  get nameController() {
    return this.constructor.name.toLowerCase();
  }

}

export default BaseController;
