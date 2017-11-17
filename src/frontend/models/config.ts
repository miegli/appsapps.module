import {PersistableModel} from "./persistable";


export class ConfigModel extends PersistableModel {


  private firebaseProjectId: string = '';
  private firebaseApiKey: string = '';
  private authenticationMethod: string = 'mail';
  private projectLabel: string = 'm';
  private firebaseUserName: string = '';
  private firebaseUserPassword: string = '';
  private _os: string;

  /**
   * set operating system
   * @param os
   * @returns {ConfigModel}
   */

  public setOs(os) {
    this._os = os;
    return this;
  }

  /**
   * get operating system
   * @returns {string}
   */
  public getOs() {
    return this._os;
  }



  /**
   * get firebase users password
   * @returns {string}
   */
  public getFirebaseUserPassword() {
    return this.firebaseUserPassword;
  }

  /**
   * set firebases user password
   * @param firebaseUserPassword
   * @returns {ConfigModel}
   */
  public setFirebaseUserPassword(firebaseUserPassword) {
    this.firebaseUserPassword = firebaseUserPassword;
    return this;
  }


  /**
   * get firebase username
   * @returns {string}
   */
  public getFirebaseUserName() {
    return this.firebaseUserName;
  }

  /**
   * set firebase username
   * @param firebaseUserName
   * @returns {ConfigModel}
   */
  public setFirebaseUserName(firebaseUserName) {
    this.firebaseUserName = firebaseUserName;
    return this;
  }

  /**
   * set project label
   * @param projectLabel
   */
  public setProjectLabel(projectLabel) {
    this.projectLabel = projectLabel;
    return this;
  }

  /**
   * set firebase api key
   * @param firebaseApiKey
   * @returns {ConfigModel}
   */
  public setFirebaseApiKey(firebaseApiKey) {
    this.firebaseApiKey = firebaseApiKey;

    return this;

  }


  /**
   * get project label
   * @returns {string}
   */
  public getProjectLabel() {
    return this.projectLabel;
  }

  /**
   * set authenticationMethod
   * @param authenticationMethod
   * @returns {ConfigModel}
   */
  public setAuthenticationMethod(authenticationMethod) {

    this.authenticationMethod = authenticationMethod;
    return this;
  }

  /**
   * get authenticationMethod
   * @returns {string}
   */
  public getAuthenticationMethod() {
    return this.authenticationMethod;
  }

  /**
   * get firebase project id
   * @returns {string}
   */
  public getFirebaseProjectId() {
    return this.firebaseProjectId;
  }

  /**
   * get firebase database url
   * @returns {string}
   */
  public getFirebaseDatabaseURL() {
    return 'https://' + this.firebaseProjectId + '.firebaseio.com/';
  }

  /**
   * get firebase auth domain
   * @returns {string}
   */
  public getFirebaseAuthDomain() {
    return this.firebaseProjectId + '.firebaseio.com';
  }

  /**
   * get firebase database url
   * @returns {string}
   */
  public getFirebaseApiKey() {
    return this.firebaseApiKey;
  }


  /**
   * set firebase project id
   * @param firebaseProjectId
   * @returns {ConfigModel}
   */
  public setFirebaseProjectId(firebaseProjectId) {
    this.firebaseProjectId = firebaseProjectId;
    return this;
  }


}
