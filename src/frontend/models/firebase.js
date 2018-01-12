"use strict";
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
exports.__esModule = true;
var appsapp_cli_1 = require("appsapp-cli");
var database_1 = require("angularfire2/database");
var firestore_1 = require("angularfire2/firestore");
var auth_1 = require("angularfire2/auth");
var app_1 = require("@firebase/app");
var FirebaseModel = (function (_super) {
    __extends(FirebaseModel, _super);
    function FirebaseModel() {
        var _this = _super.call(this) || this;
        _this.config = {};
        _this.firebase = app_1.firebase;
        return _this;
    }
    /**
     * Get firebase realtime dabase
     * @returns Promise<AngularFireDatabase>
     */
    FirebaseModel.prototype.getDatabase = function () {
        var self = this;
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
     * @returns Promise<AngularFirestore>
     */
    FirebaseModel.prototype.getFirestore = function () {
        var self = this;
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
     * @returns Promise<AngularFireAuth>
     */
    FirebaseModel.prototype.getAuth = function () {
        var self = this;
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
     * @returns {any}
     */
    FirebaseModel.prototype.getFirebaseAppConfig = function () {
        return this.firebaseAppConfig;
    };
    /**
     * set firebase cordova plugin
     * @returns {any}
     */
    FirebaseModel.prototype.getFirebasePlugin = function () {
        return this.firebasePlugin;
    };
    /**
     * get firebase cordova plugin
     * @param {FirebaseModel}
     */
    FirebaseModel.prototype.setFirebasePlugin = function (firebasePlugin) {
        this.firebasePlugin = firebasePlugin;
        return this;
    };
    /**
     * return firebase instance
     * @returns firebase
     */
    FirebaseModel.prototype.getInstance = function () {
        return this.instance;
    };
    /**
     * get latest firebase config
     * @returns {any}
     */
    FirebaseModel.prototype.getConfig = function () {
        return this.config;
    };
    /**
     * initialize firebase instance
     * @param {ConfigModel} config
     * @returns {FirebaseModel}
     */
    FirebaseModel.prototype.init = function (config) {
        var _this = this;
        var rawConfig = {
            'firebaseProjectId': config.firebaseProjectId !== undefined ? config.firebaseProjectId : (config.getFirebaseProjectId !== undefined ? config.getFirebaseProjectId() : null),
            'firebaseApiKey': config.firebaseApiKey !== undefined ? config.firebaseApiKey : (config.getFirebaseApiKey !== undefined ? config.getFirebaseApiKey() : null),
            'firebaseDatabaseURL': config.firebaseDatabaseURL !== undefined ? config.firebaseDatabaseURL : (config.getFirebaseDatabaseURL !== undefined ? config.getFirebaseDatabaseURL() : null),
            'firebaseAuthDomain': config.firebaseAuthDomain !== undefined ? config.firebaseAuthDomain : (config.getFirebaseAuthDomain !== undefined ? config.getFirebaseAuthDomain() : null)
        };
        if (rawConfig.firebaseProjectId && rawConfig.firebaseApiKey && this.firebase) {
            this.config = config;
            var isexisting_1 = false;
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
                this.database = new database_1.AngularFireDatabase(this.instance.database !== undefined ? this.instance : this.firebase.app(rawConfig.firebaseProjectId));
                this.firestore = new firestore_1.AngularFirestore(this.instance, false);
                this.auth = new auth_1.AngularFireAuth(this.instance);
                this.emit();
            }
        }
        return this;
    };
    return FirebaseModel;
}(appsapp_cli_1.PersistableModel));
exports.FirebaseModel = FirebaseModel;
