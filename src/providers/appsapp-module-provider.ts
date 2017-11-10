import {Injectable, Inject, ModuleWithProviders} from '@angular/core';
import 'rxjs/add/operator/map';
import {ConfigModel} from "../models/config";
import {FirebaseModel} from "../models/firebase";
import {AngularFireAuth} from "angularfire2/auth";
import {PersistenceManager} from "../manager/persistenceManager";


/*
  Generated class for the AppProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.

*/


export interface AppsappModuleProviderConfig {
  apiKey: string,
  projectId: string
};


export class AppsappModuleProvider {

  public config: ConfigModel;
  private firebaseProject: FirebaseModel;
  private firebaseGlobal: FirebaseModel;
  private persistenceManager: any;

  constructor() {


    let self = this;

      let providerConfig ={
          apiKey: 'AIzaSyCyld8fFu8jiGjZeDiSpO9tdHlPu2w6hM8',
          projectId: 'appsapp-io'
      };


    this.persistenceManager = new PersistenceManager();


    // init configuration instance
    this.config = new ConfigModel();

    // init global firebase instance
    this.firebaseGlobal = new FirebaseModel();
    this.firebaseGlobal.init({firebaseProjectId: providerConfig.projectId, firebaseApiKey: providerConfig.apiKey});


    // init projects firebase instance
    self.firebaseProject = new FirebaseModel();



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
    model.setPersistanceManager(this.persistenceManager);
    this.persistenceManager.initAndload(model);

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

    console.log(this);

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


}
