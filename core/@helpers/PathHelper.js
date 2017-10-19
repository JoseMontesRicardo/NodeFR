import appRootDir from 'app-root-dir';

class PathHelper {

  /**
   * constructor
   */
  constructor() {
  }


  /**
   * get core path of project
   * 
   * @return {String} core path of project
   */
  static get corePath() {
    return `${PathHelper.rootProject}/core`;
  }


  /**
   * get core path of project
   * 
   * @return {String} core path of project
   */
  static get basePath() {
    return `${PathHelper.corePath}/@base`;
  }


  /**
   * get src path ( structure of project )
   * 
   * @return {String} src path
   */
  static get rootPath() {
    return `${PathHelper.rootProject}/src`;
  }


  /**
   * get root path of project
   * 
   * @return {String} root path of project
   */
  static get rootProject() {
    global.rootPath = appRootDir.get();
    return rootPath;
  }
  

  /**
   * get routers path of project
   * 
   * @return {String} routers path of project
   */
  static get routesPath() {
    return `${PathHelper.rootPath}/routes`;
  }


}

export default PathHelper;