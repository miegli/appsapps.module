import 'rxjs/add/operator/map';
import { ConfigModel } from "../models/config";
export interface AppsappModuleProviderConfig {
    apiKey: string;
    projectId: string;
}
export declare class AppsappModuleProvider {
    private providerConfig;
    config: ConfigModel;
    private firebaseProject;
    private firebaseGlobal;
    private persistenceManager;
    constructor(providerConfig: AppsappModuleProviderConfig);
    /**
     * creates and return new persistable model
     * @param constructor
     */
    new(constructor: any): any;
    /**
     * sets platform provider
     * @param platform
     */
    setPlatform(platform: any): void;
    /**
     * get persitence manager
     * @returns {PersistenceManager}
     */
    getPersistenceManager(): any;
    /**
     * Login user with email and password
     * @param {string} username
     * @param {string} password
     * @returns {Promise<any>}
     */
    private userSignIn(username, password);
    /**
     * Logout user
     * @returns {Promise<any>}
     */
    private userSignOut();
}
