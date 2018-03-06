import {PersistableModel} from "appsapp-cli";
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFirestore} from "angularfire2/firestore";
import {AngularFireAuth} from 'angularfire2/auth';


import {firebase} from '@firebase/app'
import {raw} from "body-parser";

export class FirebaseModel extends PersistableModel {

    private instance: any;
    private firebase: any;
    private database: AngularFireDatabase;
    private firestore: AngularFirestore;
    private auth: AngularFireAuth;
    private firebaseAppConfig: any;
    private firebasePlugin: any;
    private config: any = {};

    constructor() {

        super();
        this.firebase = firebase;


    }


    /**
     * Get firebase realtime dabase
     * @returns Promise<AngularFireDatabase>
     */
    public getDatabase() {
        let self = this;

        return new Promise(function (resolve) {
            self.watch('database',(database) => {
                if (database) {
                    resolve(self.database);
                }
            });
        });
    }

    /**
     * get firebase firestore
     * @returns Promise<AngularFirestore>
     */
    public getFirestore() {
        let self = this;

        return new Promise(function (resolve) {
            self.watch('firestore', (firestore) => {
                if (firestore) {
                    resolve(self.firestore);
                }
            });


        });
    }

    /**
     * get firebase auth
     * @returns Promise<AngularFireAuth>
     */
    public getAuth() {

        let self = this;

        return new Promise(function (resolve) {
            self.watch('auth',(auth) => {
                if (auth) {
                    resolve(auth);
                }
            });
        });

    }

    /**
     * get current app config
     * @returns {any}
     */
    public getFirebaseAppConfig() {
        return this.firebaseAppConfig;
    }


    /**
     * set firebase cordova plugin
     * @returns {any}
     */
    public getFirebasePlugin() {
        return this.firebasePlugin;
    }

    /**
     * get firebase cordova plugin
     * @param {FirebaseModel}
     */
    public setFirebasePlugin(firebasePlugin) {
        this.firebasePlugin = firebasePlugin;
        return this;
    }

    /**
     * return firebase instance
     * @returns firebase
     */
    public getInstance() {

        return this.instance;
    }


    /**
     * get latest firebase config
     * @returns {any}
     */
    public getConfig() {
        return this.config;
    }

    /**
     * initialize firebase instance
     * @param {ConfigModel} config
     * @returns {FirebaseModel}
     */
    public init(config) {


        let rawConfig = {

            'firebaseProjectId': config.firebaseProjectId !== undefined ? config.firebaseProjectId : (config.getFirebaseProjectId !== undefined ? config.getFirebaseProjectId() : null),
            'firebaseApiKey': config.firebaseApiKey !== undefined ? config.firebaseApiKey : (config.getFirebaseApiKey !== undefined ? config.getFirebaseApiKey() : null),
            'firebaseDatabaseURL': config.firebaseDatabaseURL !== undefined ? config.firebaseDatabaseURL : (config.getFirebaseDatabaseURL !== undefined ? config.getFirebaseDatabaseURL() : null),
            'firebaseAuthDomain': config.firebaseAuthDomain !== undefined ? config.firebaseAuthDomain : (config.getFirebaseAuthDomain !== undefined ? config.getFirebaseAuthDomain() : null),
        }



        if (rawConfig.firebaseProjectId && rawConfig.firebaseApiKey && this.firebase) {

            this.config = config;


            let isexisting = false;
            this.firebase.apps.forEach((f) => {
                if (f.name == config.getFirebaseProjectId()) {
                    isexisting = true;
                    this.instance = f;
                }
            });


            if (isexisting === false) {
                try {

                    this.firebaseAppConfig = {
                        databaseURL: rawConfig.firebaseDatabaseURL ? rawConfig.firebaseDatabaseURL : 'https://' + rawConfig.firebaseProjectId + '.firebaseio.com',
                        authDomain: rawConfig.firebaseAuthDomain ? rawConfig.firebaseAuthDomain : 'https://' + rawConfig.firebaseProjectId + '.firebaseio.com',
                        projectId: rawConfig.firebaseProjectId,
                        apiKey: rawConfig.firebaseApiKey
                    };

                    this.setProperty('instance',this.firebase.initializeApp(this.firebaseAppConfig, rawConfig.firebaseProjectId));

                } catch (error) {
                  console.log(error);
                    this.setProperty('instance',null);
                }
            }



            if (this.instance) {
                this.setProperty('database',new AngularFireDatabase(this.instance.database !== undefined ? this.instance : this.firebase.app(rawConfig.firebaseProjectId)));
                this.setProperty('firestore', new AngularFirestore(this.instance, false));
                this.setProperty('auth', new AngularFireAuth(this.instance));
            }

        }

        return this;

    }


}
