import PathHelper from './PathHelper';
import Util from '../Util';

class BaseHelper {

  /**
   * constructor
   */
  constructor() {
  }

  loadBaseFiles() {
    let modules = Util.readAllFiles(PathHelper.basePath);
    global.Bases = modules;
  }

}

export default BaseHelper;