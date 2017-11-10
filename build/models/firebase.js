var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { PersistableModel } from './persistable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
var FirebaseModel = (function (_super) {
    __extends(FirebaseModel, _super);
    function FirebaseModel() {
        var _this = _super.call(this) || this;
        _this.config = {};
        _this.firebase = firebase;
        return _this;
    }
    /**
     * Get firebase realtime dabase
     * @return {?} Promise<AngularFireDatabase>
     */
    FirebaseModel.prototype.getDatabase = function () {
        var /** @type {?} */ self = this;
        return new Promise(function (resolve) {
            if (self.instance && self.database) {
                resolve(self.database);
            }
            self.getObservable().subscribe(function () {
                if (self.instance && self.database) {
                    resolve(self.database);
                }
            });
        });
    };
    /**
     * get firebase firestore
     * @return {?} Promise<AngularFirestore>
     */
    FirebaseModel.prototype.getFirestore = function () {
        var /** @type {?} */ self = this;
        return new Promise(function (resolve) {
            if (self.instance && self.firestore) {
                resolve(self.firestore);
            }
            self.getObservable().subscribe(function () {
                if (self.instance && self.firestore) {
                    resolve(self.firestore);
                }
            });
        });
    };
    /**
     * get firebase auth
     * @return {?} Promise<AngularFireAuth>
     */
    FirebaseModel.prototype.getAuth = function () {
        var /** @type {?} */ self = this;
        return new Promise(function (resolve) {
            if (self.instance && self.auth) {
                resolve(self.auth);
            }
            self.getObservable().subscribe(function () {
                if (self.instance && self.auth) {
                    resolve(self.auth);
                }
            });
        });
    };
    /**
     * get current app config
     * @return {?}
     */
    FirebaseModel.prototype.getFirebaseAppConfig = function () {
        return this.firebaseAppConfig;
    };
    /**
     * set firebase cordova plugin
     * @return {?}
     */
    FirebaseModel.prototype.getFirebasePlugin = function () {
        return this.firebasePlugin;
    };
    /**
     * get firebase cordova plugin
     * @param {?} firebasePlugin
     * @return {?}
     */
    FirebaseModel.prototype.setFirebasePlugin = function (firebasePlugin) {
        this.firebasePlugin = firebasePlugin;
        return this;
    };
    /**
     * return firebase instance
     * @return {?} firebase
     */
    FirebaseModel.prototype.getInstance = function () {
        return this.instance;
    };
    /**
     * get latest firebase config
     * @return {?}
     */
    FirebaseModel.prototype.getConfig = function () {
        return this.config;
    };
    /**
     * initialize firebase instance
     * @param {?} config
     * @return {?}
     */
    FirebaseModel.prototype.init = function (config) {
        var _this = this;
        var /** @type {?} */ rawConfig = {
            'firebaseProjectId': config.firebaseProjectId !== undefined ? config.firebaseProjectId : (config.getFirebaseProjectId !== undefined ? config.getFirebaseProjectId() : null),
            'firebaseApiKey': config.firebaseApiKey !== undefined ? config.firebaseApiKey : (config.getFirebaseApiKey !== undefined ? config.getFirebaseApiKey() : null),
            'firebaseDatabaseURL': config.firebaseDatabaseURL !== undefined ? config.firebaseDatabaseURL : (config.getFirebaseDatabaseURL !== undefined ? config.getFirebaseDatabaseURL() : null),
            'firebaseAuthDomain': config.firebaseAuthDomain !== undefined ? config.firebaseAuthDomain : (config.getFirebaseAuthDomain !== undefined ? config.getFirebaseAuthDomain() : null),
        };
        if (rawConfig.firebaseProjectId && rawConfig.firebaseApiKey && this.firebase) {
            this.config = config;
            var /** @type {?} */ isexisting_1 = false;
            this.firebase.apps.forEach(function (f) {
                if (f.name == config.getFirebaseProjectId()) {
                    isexisting_1 = true;
                    _this.instance = f;
                }
            });
            if (isexisting_1 === false) {
                try {
                    this.firebaseAppConfig = {
                        databaseURL: rawConfig.firebaseDatabaseURL ? rawConfig.firebaseDatabaseURL : 'https://' + rawConfig.firebaseProjectId + '.firebaseio.com',
                        authDomain: rawConfig.firebaseAuthDomain ? rawConfig.firebaseAuthDomain : 'https://' + rawConfig.firebaseProjectId + '.firebaseio.com',
                        projectId: rawConfig.firebaseProjectId,
                        apiKey: rawConfig.firebaseApiKey
                    };
                    this.instance = this.firebase.initializeApp(this.firebaseAppConfig, rawConfig.firebaseProjectId);
                }
                catch (error) {
                    console.log(error);
                    this.instance = null;
                }
            }
            if (this.instance) {
                this.database = new AngularFireDatabase(this.instance);
                this.firestore = new AngularFirestore(this.instance, false);
                this.auth = new AngularFireAuth(this.instance);
                this.emit();
            }
        }
        return this;
    };
    return FirebaseModel;
}(PersistableModel));
export { FirebaseModel };
function FirebaseModel_tsickle_Closure_declarations() {
    /** @type {?} */
    FirebaseModel.prototype.instance;
    /** @type {?} */
    FirebaseModel.prototype.firebase;
    /** @type {?} */
    FirebaseModel.prototype.database;
    /** @type {?} */
    FirebaseModel.prototype.firestore;
    /** @type {?} */
    FirebaseModel.prototype.auth;
    /** @type {?} */
    FirebaseModel.prototype.firebaseAppConfig;
    /** @type {?} */
    FirebaseModel.prototype.firebasePlugin;
    /** @type {?} */
    FirebaseModel.prototype.config;
}
