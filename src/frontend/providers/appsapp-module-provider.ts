import {Injectable, Inject, ModuleWithProviders} from '@angular/core';
import 'rxjs/add/operator/map';
import {ConfigModel} from "../models/config";
import {FirebaseModel} from "../models/firebase";
import {AngularFireAuth} from "angularfire2/auth";
import {PersistenceManager} from "../manager/persistenceManager";
import {mobiscroll} from "@mobiscroll/angular";
import * as ts from "typescript";
import * as CryptoJS from 'crypto-js';

/*
  Generated class for the AppProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.

*/


export interface AppsappModuleProviderConfig {
  apiKey: string,
  projectId: string
};

export interface AppsappModuleProviderMessages {
  saved: string,
  processing: string,
  wait: string,
  done: string,
  submitted: string,
  submittedInBackground: string,
  disconnected: string,
  connected: string
};


declare var require: any

export class AppsappModuleProvider {

  public config: ConfigModel;
  private firebaseProject: FirebaseModel;
  private firebaseGlobal: FirebaseModel;
  private persistenceManager: any;
  private notificationProvider: object;


  constructor(@Inject('config') private providerConfig: AppsappModuleProviderConfig, @Inject('messages') private providerMessages: AppsappModuleProviderMessages) {

    let self = this;


    this.persistenceManager = new PersistenceManager();


    // init configuration instance
    this.config = new ConfigModel();

    // init global firebase instance
    this.firebaseGlobal = new FirebaseModel();
    this.firebaseGlobal.init({firebaseProjectId: providerConfig.projectId, firebaseApiKey: providerConfig.apiKey});


    // init projects firebase instance
    self.firebaseProject = new FirebaseModel();

    // init notification provider
    let timeout = null;
    this.notificationProvider = function (message) {
      if (timeout) {
        window.clearTimeout(timeout);
      }
      timeout = window.setTimeout(function () {
        mobiscroll.toast({
          message: message
        }).then();
      }, timeout ? 1000 : 1);
    }


    this.config.getObservable().subscribe((config) => {

      self.firebaseProject.init(config);

      // try to auto-login
      if (self.config.getFirebaseUserPassword() && self.config.getFirebaseUserName()) {
        self.userSignIn(self.config.getFirebaseUserName(), self.config.getFirebaseUserPassword()).then((user) => {
          //
          console.log(user);
        }).catch((error) => {
          //
          console.log(error);
        });
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
   * creates and return new persistable model
   * @param constructor
   */
  public new(constructor: any) {

    let model = new constructor();
    let pm = new PersistenceManager();

    model.setNotificationProvider(this.notificationProvider).setMessages(this.providerMessages).setPersistanceManager(pm.setFirebase(this.firebaseProject).initAndload(model));

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