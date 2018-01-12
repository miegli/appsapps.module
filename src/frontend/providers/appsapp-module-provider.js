"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var config_1 = require("../models/config");
var firebase_1 = require("../models/firebase");
var persistenceManager_1 = require("../manager/persistenceManager");
var angular_1 = require("@mobiscroll/angular");
;
var AppsappModuleProvider = (function () {
    function AppsappModuleProvider(providerConfig, providerMessages, http) {
        this.providerConfig = providerConfig;
        this.providerMessages = providerMessages;
        this.http = http;
        var self = this;
        this.persistenceManager = new persistenceManager_1.PersistenceManager();
        // init configuration instance
        this.config = new config_1.ConfigModel();
        // init projects firebase instance
        this.firebaseProject = new firebase_1.FirebaseModel();
        this.firebaseProject.init({
            firebaseProjectId: providerConfig.projectId,
            firebaseApiKey: providerConfig.apiKey,
            firebaseDatabaseURL: 'https://' + providerConfig.projectId + '.firebaseio.com/',
            firebaseAuthDomain: 'https://' + providerConfig.projectId + '.firebaseio.com/'
        });
        // init notification provider
        var timeout = null;
        this.notificationProvider = function (message, error) {
            if (!error) {
                if (timeout) {
                    window.clearTimeout(timeout);
                }
                timeout = window.setTimeout(function () {
                    angular_1.mobiscroll.toast({
                        message: message
                    }).then();
                }, timeout ? 1000 : 1);
            }
            else {
                if (typeof message == 'string') {
                    angular_1.mobiscroll.alert({
                        title: providerMessages.error,
                        message: message
                    });
                }
                else {
                    console.log(message);
                    angular_1.mobiscroll.toast({
                        message: providerMessages.error
                    }).then();
                }
            }
        };
        this.config.getObservable().subscribe(function (config) {
            // try to auto-login
            if (self.config.getFirebaseUserPassword() && self.config.getFirebaseUserName()) {
                self.userSignIn(self.config.getFirebaseUserName(), self.config.getFirebaseUserPassword()).then(function (user) {
                    //
                })["catch"](function (error) {
                    console.log(error);
                });
            }
            else {
                // try to authenticate with Firebase Anonymously
                self.anonymousSignIn().then(function (user) {
                    //
                })["catch"](function (error) {
                    console.log(error);
                    config.setIs;
                });
            }
        });
        // connect persistence manager to projects firebase instance
        this.firebaseProject.getAuth().then(function (auth) {
            auth.authState.subscribe(function (user) {
                if (user) {
                    self.persistenceManager.setFirebase(self.firebaseProject);
                }
            });
        });
    }
    /**
     * get http client
     * @returns HttpClient
     */
    AppsappModuleProvider.prototype.getHttpClient = function () {
        return this.http;
    };
    /**
     * creates and return new persistable model
     * @param constructor
     * @param uuid string
     * @param data
     * @returns any
     */
    AppsappModuleProvider.prototype["new"] = function (constructor, uuid, data) {
        var model = new constructor();
        var pm = new persistenceManager_1.PersistenceManager();
        var self = this;
        if (uuid) {
            model.setUuid(uuid);
        }
        var p = new Promise(function (resolve, reject) {
            model.setHttpClient(self.http).setNotificationProvider(self.notificationProvider).setMessages(self.providerMessages).setPersistenceManager(pm.setFirebase(self.firebaseProject)).getPersistenceManager().initAndload(model, data).then(function (model) {
                resolve(model);
            })["catch"](function () {
                resolve(model);
            });
        });
        model.setIsLoadedPromise(p);
        model.setAppsAppModuleProvider(this);
        return model;
    };
    /**
     * sets platform provider
     * @param platform
     */
    AppsappModuleProvider.prototype.setPlatform = function (platform) {
        /**
         * | Platform Name   | Description                        |
         * |-----------------|------------------------------------|
         * | android         | on a device running Android.       |
         * | cordova         | on a device running Cordova.       |
         * | core            | on a desktop device.               |
         * | ios             | on a device running iOS.           |
         * | ipad            | on an iPad device.                 |
         * | iphone          | on an iPhone device.               |
         * | mobile          | on a mobile device.                |
         * | mobileweb       | in a browser on a mobile device.   |
         * | phablet         | on a phablet device.               |
         * | tablet          | on a tablet device.                |
         * | windows         | on a device running Windows.       |
         */
        if (platform.is('ios')) {
            this.config.setOs('ios');
        }
        else if (platform.is('android')) {
            this.config.setOs('android');
        }
        else if (platform.is('core')) {
            this.config.setOs('desktop');
        }
        else if (platform.is('windows')) {
            this.config.setOs('windows');
        }
        else {
            this.config.setOs('browser');
        }
    };
    /**
     * get persitence manager
     * @returns {PersistenceManager}
     */
    AppsappModuleProvider.prototype.getPersistenceManager = function () {
        return this.persistenceManager;
    };
    /**
     * Login user with email and password
     * @param {string} username
     * @param {string} password
     * @returns {Promise<any>}
     */
    AppsappModuleProvider.prototype.userSignIn = function (username, password) {
        var self = this;
        var t = {};
        return new Promise(function (resolve, reject) {
            t.resolve = resolve;
            t.reject = reject;
            if (self.config.getAuthenticationMethod() == 'mail') {
                self.firebaseProject.getAuth().then(function (auth) {
                    auth.auth.signInWithEmailAndPassword(username, password).then(function (user) {
                        resolve(user);
                    })["catch"](function (error) {
                        reject(error);
                    });
                });
            }
        });
    };
    /**
     * Login anonymous
     * @returns {Promise<any>}
     */
    AppsappModuleProvider.prototype.anonymousSignIn = function () {
        var self = this;
        var t = {};
        return new Promise(function (resolve, reject) {
            t.resolve = resolve;
            t.reject = reject;
            self.firebaseProject.getAuth().then(function (auth) {
                auth.auth.signInAnonymously().then(function (user) {
                    resolve(user);
                })["catch"](function (error) {
                    reject(error);
                });
            });
        });
    };
    /**
     * Logout user
     * @returns {Promise<any>}
     */
    AppsappModuleProvider.prototype.userSignOut = function () {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.config.setFirebaseUserPassword('').emit();
            self.firebaseProject.getAuth().then(function (auth) {
                auth.auth.signOut().then(function (next) {
                    resolve(next);
                }, function (error) {
                    resolve(error);
                });
            });
        });
    };
    /**
     *
     * @param {string} data
     * @returns {string}
     */
    AppsappModuleProvider.prototype.appsAppEncrypt = function (data) {
        return data;
    };
    return AppsappModuleProvider;
}());
AppsappModuleProvider = __decorate([
    __param(0, core_1.Inject('config')), __param(1, core_1.Inject('messages'))
], AppsappModuleProvider);
exports.AppsappModuleProvider = AppsappModuleProvider;
