import appRootDir from 'app-root-dir';
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
    global.bases = modules;
  }

}

export default BaseHelper;