import { Inject } from '@angular/core';
import 'rxjs/add/operator/map';
import { ConfigModel } from '../models/config';
import { FirebaseModel } from '../models/firebase';
import { PersistenceManager } from '../manager/persistenceManager';
;
var AppsappModuleProvider = (function () {
    /**
     * @param {?} providerConfig
     */
    function AppsappModuleProvider(providerConfig) {
        this.providerConfig = providerConfig;
        var self = this;
        this.persistenceManager = new PersistenceManager();
        // init configuration instance
        this.config = new ConfigModel();
        // init global firebase instance
        this.firebaseGlobal = new FirebaseModel();
        this.firebaseGlobal.init({ firebaseProjectId: providerConfig.projectId, firebaseApiKey: providerConfig.apiKey });
        // init projects firebase instance
        self.firebaseProject = new FirebaseModel();
        this.config.getObservable().subscribe(function (config) {
            self.firebaseProject.init(config);
            // try to auto-login
            if (self.config.getFirebaseUserPassword() && self.config.getFirebaseUserName()) {
                self.userSignIn(self.config.getFirebaseUserName(), self.config.getFirebaseUserPassword()).then(function (user) {
                    //
                    console.log(user);
                }).catch(function (error) {
                    //
                    console.log(error);
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
     * creates and return new persistable model
     * @param {?} constructor
     * @return {?}
     */
    AppsappModuleProvider.prototype.new = function (constructor) {
        var /** @type {?} */ model = new constructor();
        model.setPersistanceManager(this.persistenceManager);
        this.persistenceManager.initAndload(model);
        return model;
    };
    /**
     * sets platform provider
     * @param {?} platform
     * @return {?}
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
     * @return {?}
     */
    AppsappModuleProvider.prototype.getPersistenceManager = function () {
        return this.persistenceManager;
    };
    /**
     * Login user with email and password
     * @param {?} username
     * @param {?} password
     * @return {?}
     */
    AppsappModuleProvider.prototype.userSignIn = function (username, password) {
        var /** @type {?} */ self = this;
        var /** @type {?} */ t = ({});
        return new Promise(function (resolve, reject) {
            t.resolve = resolve;
            t.reject = reject;
            if (self.config.getAuthenticationMethod() == 'mail') {
                self.firebaseProject.getAuth().then(function (auth) {
                    auth.auth.signInWithEmailAndPassword(username, password).then(function (user) {
                        resolve(user);
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            }
        });
    };
    /**
     * Logout user
     * @return {?}
     */
    AppsappModuleProvider.prototype.userSignOut = function () {
        var /** @type {?} */ self = this;
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
    return AppsappModuleProvider;
}());
export { AppsappModuleProvider };
/**
 * @nocollapse
 */
AppsappModuleProvider.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: ['config',] },] },
]; };
function AppsappModuleProvider_tsickle_Closure_declarations() {
    /**
     * @nocollapse
     * @type {?}
     */
    AppsappModuleProvider.ctorParameters;
    /** @type {?} */
    AppsappModuleProvider.prototype.config;
    /** @type {?} */
    AppsappModuleProvider.prototype.firebaseProject;
    /** @type {?} */
    AppsappModuleProvider.prototype.firebaseGlobal;
    /** @type {?} */
    AppsappModuleProvider.prototype.persistenceManager;
    /** @type {?} */
    AppsappModuleProvider.prototype.providerConfig;
}
