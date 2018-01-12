import {Injectable, Inject, ModuleWithProviders} from '@angular/core';
import 'rxjs/add/operator/map';
import {ConfigModel} from "../models/config";
import {FirebaseModel} from "../models/firebase";
import {AngularFireAuth} from "angularfire2/auth";
import {PersistenceManager} from "../manager/persistenceManager";
import {mobiscroll} from "@mobiscroll/angular";
import {AppsappModuleProviderMessages} from "appsapp-cli";
import {HttpClient} from "@angular/common/http";


/*
  Generated class for the AppProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.

*/


export interface AppsappModuleProviderConfig {
    apiKey: string,
    projectId: string
};


declare var require: any

export class AppsappModuleProvider {

    public config: ConfigModel;
    private firebaseProject: FirebaseModel;
    private persistenceManager: any;
    private notificationProvider: object;


    constructor(@Inject('config') private providerConfig: AppsappModuleProviderConfig, @Inject('messages') private providerMessages: AppsappModuleProviderMessages, private http: HttpClient) {

        let self = this;

        this.persistenceManager = new PersistenceManager();

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


        // init notification provider
        let timeout = null;
        this.notificationProvider = function (message, error?) {
            if (!error) {
                if (timeout) {
                    window.clearTimeout(timeout);
                }
                timeout = window.setTimeout(function () {
                    mobiscroll.toast({
                        message: message
                    }).then();
                }, timeout ? 1000 : 1);
            } else {

                if (typeof message == 'string') {

                    mobiscroll.alert({
                        title: providerMessages.error,
                        message: message
                    });

                } else {
                    console.log(message);
                    mobiscroll.toast({
                        message: providerMessages.error
                    }).then();
                }


            }
        }


        this.config.getObservable().subscribe((config) => {

            // try to auto-login
            if (self.config.getFirebaseUserPassword() && self.config.getFirebaseUserName()) {
                self.userSignIn(self.config.getFirebaseUserName(), self.config.getFirebaseUserPassword()).then((user) => {
                    //
                }).catch((error) => {
                    console.log(error);
                });
            } else {
                // try to authenticate with Firebase Anonymously
                self.anonymousSignIn().then((user) => {
                    //
                }).catch((error) => {
                    console.log(error);
                    config.setIs
                })
            }

        });

        // connect persistence manager to projects firebase instance
        this.firebaseProject.getAuth().then((auth: AngularFireAuth) => {
            auth.authState.subscribe(
                (user) => {
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


        let model = new constructor();
        let pm = new PersistenceManager();
        let self = this;

        if (uuid) {
            model.setUuid(uuid);
        }

        let p = new Promise(function (resolve, reject) {
            model.setHttpClient(self.http).setNotificationProvider(self.notificationProvider).setMessages(self.providerMessages).setPersistenceManager(pm.setFirebase(self.firebaseProject)).getPersistenceManager().initAndload(model, data).then((model) => {
                resolve(model);
            }).catch(() => {
                resolve(model);
            });
        })

        model.setIsLoadedPromise(p);
        model.setAppsAppModuleProvider(this);

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
    private userSignIn(username: string, password: string) {


        let self = this;
        let t = <any>{};

        return new Promise(function (resolve, reject) {


            t.resolve = resolve;
            t.reject = reject;


            if (self.config.getAuthenticationMethod() == 'mail') {

                self.firebaseProject.getAuth().then((auth: AngularFireAuth) => {
                    auth.auth.signInWithEmailAndPassword(username, password).then((user) => {
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
    private userSignOut() {

        let self = this;

        return new Promise(function (resolve, reject) {

            self.config.setFirebaseUserPassword('').emit();

            self.firebaseProject.getAuth().then((auth: AngularFireAuth) => {
                auth.auth.signOut().then((next) => {
                    resolve(next);
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
