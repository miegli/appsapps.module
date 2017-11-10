import { PersistableModel } from "./persistable";
export declare class ConfigModel extends PersistableModel {
    private firebaseProjectId;
    private firebaseApiKey;
    private authenticationMethod;
    private projectLabel;
    private firebaseUserName;
    private firebaseUserPassword;
    private _os;
    /**
     * set operating system
     * @param os
     * @returns {ConfigModel}
     */
    setOs(os: any): this;
    /**
     * get operating system
     * @returns {string}
     */
    getOs(): string;
    /**
     * get firebase users password
     * @returns {string}
     */
    getFirebaseUserPassword(): string;
    /**
     * set firebases user password
     * @param firebaseUserPassword
     * @returns {ConfigModel}
     */
    setFirebaseUserPassword(firebaseUserPassword: any): this;
    /**
     * get firebase username
     * @returns {string}
     */
    getFirebaseUserName(): string;
    /**
     * set firebase username
     * @param firebaseUserName
     * @returns {ConfigModel}
     */
    setFirebaseUserName(firebaseUserName: any): this;
    /**
     * set project label
     * @param projectLabel
     */
    setProjectLabel(projectLabel: any): this;
    /**
     * set firebase api key
     * @param firebaseApiKey
     * @returns {ConfigModel}
     */
    setFirebaseApiKey(firebaseApiKey: any): this;
    /**
     * get project label
     * @returns {string}
     */
    getProjectLabel(): string;
    /**
     * set authenticationMethod
     * @param authenticationMethod
     * @returns {ConfigModel}
     */
    setAuthenticationMethod(authenticationMethod: any): this;
    /**
     * get authenticationMethod
     * @returns {string}
     */
    getAuthenticationMethod(): string;
    /**
     * get firebase project id
     * @returns {string}
     */
    getFirebaseProjectId(): string;
    /**
     * get firebase database url
     * @returns {string}
     */
    getFirebaseDatabaseURL(): string;
    /**
     * get firebase auth domain
     * @returns {string}
     */
    getFirebaseAuthDomain(): string;
    /**
     * get firebase database url
     * @returns {string}
     */
    getFirebaseApiKey(): string;
    /**
     * set firebase project id
     * @param firebaseProjectId
     * @returns {ConfigModel}
     */
    setFirebaseProjectId(firebaseProjectId: any): this;
}
