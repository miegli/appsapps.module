import {Inject} from '@angular/core';
import 'rxjs/add/operator/map';
import {ConfigModel} from "../models/config";
import {FirebaseModel} from "../models/firebase";
import {AngularFireAuth} from "angularfire2/auth";
import {PersistenceManager} from "../manager/persistenceManager";
import {AppsappModuleProviderMessages} from "appsapp-cli";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";


/*
  Generated class for the AppProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.

*/


export interface AppsappModuleProviderConfig {
    apiKey: string,
    projectId: string
};


declare var require: any;

export class AppsappModuleProvider {

    public config: ConfigModel;
    public redirectUrl: string;
    public loading: boolean = false;
    public platform: any = null;
    private firebaseProject: FirebaseModel;
    private persistenceManager: any;
    private notificationProvider: object;
    public authenticated: boolean;
    private _isAuthenticated: Observable<boolean>;
    private _isAuthenticatedObserver: Observer<any>;


    constructor(@Inject('config') private providerConfig: AppsappModuleProviderConfig, @Inject('messages') private providerMessages: AppsappModuleProviderMessages, private http: HttpClient) {

        let self = this;


        // init configuration instance
        this.config = new ConfigModel();

        // init projects firebase instance
        this.firebaseProject = new FirebaseModel();
        this.firebaseProject.init({
            firebaseProjectId: providerConfig.projectId,
            firebaseApiKey: providerConfig.apiKey,
            firebaseDatabaseURL: 'https://' + providerConfig.projectId + '.firebaseio.com/',
            firebaseAuthDomain: 'https://' + providerConfig.projectId + '.firebaseio.com/'
        });


        // init persistenceManager
        self.persistenceManager = new PersistenceManager();


        // init notification provider
        let timeout = null;
        this.notificationProvider = function (message, error?) {
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


            } else {

                if (typeof message == 'string') {

                    console.log(message);

                    // mobiscroll.alert({
                    //     title: providerMessages.error,
                    //     message: message
                    // });

                } else {
                    console.log(message);

                    // mobiscroll.toast({
                    //     message: providerMessages.error
                    // }).then();
                }


            }
        }


        this.config.watch('config', (config) => {

            // try to auto-login
            if (config && config.getFirebaseUserPassword() && self.config.getFirebaseUserName()) {
                self.userSignIn(config.getFirebaseUserName(), config.getFirebaseUserPassword()).then((user) => {
                    self._isAuthenticatedObserver.next(true);
                }).catch((error) => {
                    self._isAuthenticatedObserver.next(false);
                    console.log(error);
                });
            }

        });


        // init authentcation observer
        this._isAuthenticated = new Observable<boolean>((observer: Observer<any>) => {
            this._isAuthenticatedObserver = observer;
            this.firebaseProject.getAuth().then((auth: AngularFireAuth) => {

                auth.authState.subscribe((state) => {

                    if (state && !state.isAnonymous) {
                        self._isAuthenticatedObserver.next(true);
                    }

                    if (state === null && this.authenticated === undefined) {
                        //try to authenticate with Firebase Anonymously
                        self.anonymousSignIn().then((user) => {
                            self._isAuthenticatedObserver.next(false);
                        }).catch((error) => {
                            self._isAuthenticatedObserver.next(false);
                            console.log(error);
                        });
                    }


                })


            });

        });
        window.setTimeout(() => {
            this._isAuthenticated.subscribe((state) => {
                this.authenticated = state;
            });
        });


    }


    /**
     * is user authenticated observable
     * @returns {Observable<boolean>}
     */
    public isAuthenticated() {


        return new Observable<boolean>((observer: Observer<any>) => {

            this.firebaseProject.getAuth().then((auth: AngularFireAuth) => {
                auth.authState.subscribe((state) => {
                    if (state && !state.isAnonymous) {
                        observer.next(true);
                    } else {
                        observer.next(false);
                    }
                })

            });

        });


    }

    /**
     * get http client
     * @returns HttpClient
     */
    public getHttpClient() {
        return this.http;
    }

    /**
     * creates and return new persistable model
     * @param constructor
     * @param uuid string
     * @param data
     * @returns any
     */
    public new(constructor: any, uuid?: any, data?: any) {


        let model = new constructor(), initialdata = null;

        if (uuid) {
            model.setUuid(uuid);
        }

        if (data && typeof data == 'object') {
            if (typeof data.serialize == 'function') {
                initialdata = data.serialize(true, true);
            }
        } else {
            if (typeof data == 'string') {
                initialdata = JSON.parse(data);
            }
        }


        this.lazyLoad(model, initialdata);


        return model;


    }

    /**
     * load lazy model
     * @param model
     * @param data
     * @param promise
     * @returns {any}
     */
    public lazyLoad(model, data?) {


        if (!model.__isLoaded) {
            let self = this, pm = new PersistenceManager(),
                modeldata = data === undefined ? model.serialize(true, true) : data;

            let p = new Promise(function (resolve, reject) {


                pm.init().then((persistenceManager: PersistenceManager) => {
                    self.persistenceManager = persistenceManager;
                    model.setHttpClient(self.http).setNotificationProvider(self.notificationProvider).setMessages(self.providerMessages);
                    persistenceManager.initAndload(model, modeldata).then((model: any) => {
                        persistenceManager.setFirebase(self.firebaseProject);
                        model.setPersistenceManager(persistenceManager);
                        persistenceManager._loadedResolver = resolve;

                        if (model.getParent()) {
                           model.getParent().save().subscribe();
                        }

                        if (model.getParent() && model.getParent().__isAutosave) {
                            model.autosave();
                            model.getChangesWithCallback(() => {
                                model.getParent().save().subscribe();
                            });
                        }

                    }).catch((e) => {
                        console.log(e);
                        resolve(model);
                    });

                });

            });

            model.setIsLoadedPromise(p);
            model.setAppsAppModuleProvider(this);

        }

        return model;

    }


    /**
     * sets platform provider
     * @param platform
     */
    public setPlatform(platform: any) {

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
        } else if (platform.is('android')) {
            this.config.setOs('android');
        } else if (platform.is('core')) {
            this.config.setOs('desktop');
        } else if (platform.is('windows')) {
            this.config.setOs('windows');
        } else {
            this.config.setOs('browser');
        }

        this.platform = platform;

    }

    public getLang() {

        return this.platform && this.platform.lang !== undefined ? this.platform.lang() : 'de';

    }


    /**
     * get persitence manager
     * @returns {PersistenceManager}
     */
    public getPersistenceManager() {
        return this.persistenceManager;
    }


    /**
     * Login user with email and password
     * @param {string} username
     * @param {string} password
     * @returns {Promise<any>}
     */
    public userSignIn(username: string, password: string) {


        let self = this;
        let t = <any>{};

        return new Promise(function (resolve, reject) {


            t.resolve = resolve;
            t.reject = reject;


            if (self.config.getAuthenticationMethod() == 'mail') {

                self.firebaseProject.getAuth().then((auth: AngularFireAuth) => {
                    auth.auth.signInWithEmailAndPassword(username, password).then((user) => {
                        self._isAuthenticatedObserver.next(true);
                        resolve(user);
                    }).catch((error) => {
                        reject(error);
                    });

                });
            }


        });
    }

    /**
     * Register a new user by given email and password
     * @param {string} email
     * @param {string} password
     * @returns {Promise<any>}
     */
    public userRegister(email: string, password: string) {


        let self = this;
        let t = <any>{};

        return new Promise(function (resolve, reject) {


            t.resolve = resolve;
            t.reject = reject;


            if (self.config.getAuthenticationMethod() == 'mail') {

                self.firebaseProject.getAuth().then((auth: AngularFireAuth) => {
                    auth.auth.createUserWithEmailAndPassword(email, password).then((user) => {
                        self._isAuthenticatedObserver.next(true);
                        resolve(user);
                    }).catch((error) => {
                        reject(error);
                    });

                });
            }


        });
    }

    /**
     * Login anonymous
     * @returns {Promise<any>}
     */
    private anonymousSignIn() {


        let self = this;
        let t = <any>{};

        return new Promise(function (resolve, reject) {

            t.resolve = resolve;
            t.reject = reject;

            self.firebaseProject.getAuth().then((auth: AngularFireAuth) => {

                auth.auth.signInAnonymously().then(function (user) {
                    resolve(user);
                }).catch((error) => {
                    reject(error);
                });


            });


        });
    }


    /**
     * Logout user
     * @returns {Promise<any>}
     */
    public userSignOut() {

        let self = this;

        return new Promise(function (resolve, reject) {

            self.config.setFirebaseUserPassword('').emit();
            self._isAuthenticatedObserver.next(false);

            self.firebaseProject.getAuth().then((auth: AngularFireAuth) => {
                auth.auth.signOut().then((next) => {
                    self.getPersistenceManager().clearStorage().then(() => {
                        resolve(next);
                    }).catch((e) => {
                        reject(e);
                    });

                }, (error) => {
                    resolve(error);
                });
            });


        });


    }


    /**
     *
     * @param {string} data
     * @returns {string}
     */
    public appsAppEncrypt(data: string) {

        return data;

    }


}
