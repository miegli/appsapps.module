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
var Observable_1 = require("rxjs/Observable");
;
var AppsappModuleProvider = /** @class */ (function () {
    function AppsappModuleProvider(providerConfig, providerMessages, http) {
        var _this = this;
        this.providerConfig = providerConfig;
        this.providerMessages = providerMessages;
        this.http = http;
        this.platform = null;
        var self = this;
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
        // init persistenceManager
        self.persistenceManager = new persistenceManager_1.PersistenceManager();
        // init notification provider
        var timeout = null;
        this.notificationProvider = function (message, error) {
            if (!error) {
                if (timeout) {
                    window.clearTimeout(timeout);
                }
                timeout = window.setTimeout(function () {
                    console.log(message);
                    // mobiscroll.toast({
                    //     message: message
                    // }).then();
                }, timeout ? 1000 : 1);
            }
            else {
                if (typeof message == 'string') {
                    console.log(message);
                    // mobiscroll.alert({
                    //     title: providerMessages.error,
                    //     message: message
                    // });
                }
                else {
                    console.log(message);
                    // mobiscroll.toast({
                    //     message: providerMessages.error
                    // }).then();
                }
            }
        };
        this.config.watch('config', function (config) {
            // try to auto-login
            if (config && config.getFirebaseUserPassword() && self.config.getFirebaseUserName()) {
                self.userSignIn(config.getFirebaseUserName(), config.getFirebaseUserPassword()).then(function (user) {
                    self._isAuthenticatedObserver.next(true);
                })["catch"](function (error) {
                    self._isAuthenticatedObserver.next(false);
                    console.log(error);
                });
            }
        });
        // init authentcation observer
        this._isAuthenticated = new Observable_1.Observable(function (observer) {
            _this._isAuthenticatedObserver = observer;
            _this.firebaseProject.getAuth().then(function (auth) {
                auth.authState.subscribe(function (state) {
                    if (state && !state.isAnonymous) {
                        self._isAuthenticatedObserver.next(true);
                    }
                    if (state === null && _this.authenticated === undefined) {
                        //try to authenticate with Firebase Anonymously
                        self.anonymousSignIn().then(function (user) {
                            self._isAuthenticatedObserver.next(false);
                        })["catch"](function (error) {
                            self._isAuthenticatedObserver.next(false);
                            console.log(error);
                        });
                    }
                });
            });
        });
        window.setTimeout(function () {
            _this._isAuthenticated.subscribe(function (state) {
                _this.authenticated = state;
            });
        });
    }
    /**
     * is user authenticated observable
     * @returns {Observable<boolean>}
     */
    AppsappModuleProvider.prototype.isAuthenticated = function () {
        var _this = this;
        return new Observable_1.Observable(function (observer) {
            _this.firebaseProject.getAuth().then(function (auth) {
                auth.authState.subscribe(function (state) {
                    if (state && !state.isAnonymous) {
                        observer.next(true);
                    }
                    else {
                        observer.next(false);
                    }
                });
            });
        });
    };
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
        var model = new constructor(), initialdata = null;
        if (uuid) {
            model.setUuid(uuid);
        }
        if (data && typeof data == 'object') {
            if (typeof data.serialize == 'function') {
                initialdata = data.serialize(true, true);
            }
        }
        else {
            if (typeof data == 'string') {
                initialdata = JSON.parse(data);
            }
        }
        this.lazyLoad(model, initialdata);
        return model;
    };
    /**
     * load lazy model
     * @param model
     * @param data
     * @param promise
     * @returns {any}
     */
    AppsappModuleProvider.prototype.lazyLoad = function (model, data) {
        if (!model.__isLoaded) {
            var self_1 = this, pm_1 = new persistenceManager_1.PersistenceManager(), modeldata_1 = data === undefined ? model.serialize(true, true) : data;
            var p = new Promise(function (resolve, reject) {
                pm_1.init().then(function (persistenceManager) {
                    self_1.persistenceManager = persistenceManager;
                    model.setHttpClient(self_1.http).setNotificationProvider(self_1.notificationProvider).setMessages(self_1.providerMessages);
                    persistenceManager.initAndload(model, modeldata_1).then(function (model) {
                        persistenceManager.setFirebase(self_1.firebaseProject);
                        model.setPersistenceManager(persistenceManager);
                        persistenceManager._loadedResolver = resolve;
                    })["catch"](function (e) {
                        console.log(e);
                        resolve(model);
                    });
                });
            });
            model.setIsLoadedPromise(p);
            model.setAppsAppModuleProvider(this);
        }
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
        this.platform = platform;
    };
    AppsappModuleProvider.prototype.getLang = function () {
        return this.platform && this.platform.lang !== undefined ? this.platform.lang() : 'de';
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
                        self._isAuthenticatedObserver.next(true);
                        resolve(user);
                    })["catch"](function (error) {
                        reject(error);
                    });
                });
            }
        });
    };
    /**
     * Register a new user by given email and password
     * @param {string} email
     * @param {string} password
     * @returns {Promise<any>}
     */
    AppsappModuleProvider.prototype.userRegister = function (email, password) {
        var self = this;
        var t = {};
        return new Promise(function (resolve, reject) {
            t.resolve = resolve;
            t.reject = reject;
            if (self.config.getAuthenticationMethod() == 'mail') {
                self.firebaseProject.getAuth().then(function (auth) {
                    auth.auth.createUserWithEmailAndPassword(email, password).then(function (user) {
                        self._isAuthenticatedObserver.next(true);
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
            self._isAuthenticatedObserver.next(false);
            self.firebaseProject.getAuth().then(function (auth) {
                auth.auth.signOut().then(function (next) {
                    self.getPersistenceManager().clearStorage().then(function () {
                        resolve(next);
                    })["catch"](function (e) {
                        reject(e);
                    });
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
    AppsappModuleProvider = __decorate([
        __param(0, core_1.Inject('config')), __param(1, core_1.Inject('messages'))
    ], AppsappModuleProvider);
    return AppsappModuleProvider;
}());
exports.AppsappModuleProvider = AppsappModuleProvider;
