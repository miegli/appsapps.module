import { PersistableModel } from "./persistable";
export declare class FirebaseModel extends PersistableModel {
    private instance;
    private firebase;
    private database;
    private firestore;
    private auth;
    private firebaseAppConfig;
    private firebasePlugin;
    private config;
    constructor();
    /**
     * Get firebase realtime dabase
     * @returns Promise<AngularFireDatabase>
     */
    getDatabase(): Promise<{}>;
    /**
     * get firebase firestore
     * @returns Promise<AngularFirestore>
     */
    getFirestore(): Promise<{}>;
    /**
     * get firebase auth
     * @returns Promise<AngularFireAuth>
     */
    getAuth(): Promise<{}>;
    /**
     * get current app config
     * @returns {any}
     */
    getFirebaseAppConfig(): any;
    /**
     * set firebase cordova plugin
     * @returns {any}
     */
    getFirebasePlugin(): any;
    /**
     * get firebase cordova plugin
     * @param {FirebaseModel}
     */
    setFirebasePlugin(firebasePlugin: any): this;
    /**
     * return firebase instance
     * @returns firebase
     */
    getInstance(): any;
    /**
     * get latest firebase config
     * @returns {any}
     */
    getConfig(): any;
    /**
     * initialize firebase instance
     * @param {ConfigModel} config
     * @returns {FirebaseModel}
     */
    init(config: any): this;
}
