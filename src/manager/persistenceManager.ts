import 'rxjs/add/operator/map';
import { LocalStorageService } from 'angular-2-local-storage';
import {AngularFireDatabase} from "angularfire2/database";
import {Observer} from "rxjs/Observer";
import {Observable} from "rxjs/Observable";
import {FirebaseModel} from "../models/firebase";
import {AngularFireAuth} from "angularfire2/auth";

export class PersistenceManager {


  storageWrapper: any;
  private firebaseDatabase: AngularFireDatabase;
  private firebaseModel: FirebaseModel;
  private observer: Observer<any>;
  private observable: Observable<any>;
  private _pendingChangesModels: any = {};

  constructor(private storage: LocalStorageService) {

    let self = this;


    this.storageWrapper = {
      set: function (key, set) {
        return new Promise(function (resolve, reject) {
          resolve(self.storage.set(key, set));
        });
      },
      get: function (key) {
        return new Promise(function (resolve, reject) {
          resolve(self.storage.get(key));
        });
      },
      clear: function () {
        return new Promise(function (resolve, reject) {
          resolve(self.storage.remove());
        });
      },
      remove: function (key) {
        return new Promise(function (resolve, reject) {
          resolve(self.storage.remove(key));
        });
      },
      ready: function () {

        return new Promise(function (resolve, reject) {
          resolve(true);
        });

      }
    };


    this.observable = new Observable<any>((observer: Observer<any>) => {
      self.observer = observer;
    });
    this.observable.share();


    self.storageWrapper.get('_pendingChanges').then((data) => {
      this._pendingChangesModels = data && Object.keys(data).length ? data : {};
    });


  }


  /**
   * get persistence managers oberserver
   * @returns {Observer<any>}
   */
  public getObserver() {
    return this.observer;
  }


  /**
   * connect with firebaseModel
   * @param {FirebaseModel} firebaseModel
   */
  public setFirebase(firebaseModel) {


    let self = this;

    firebaseModel.getDatabase().then((database) => {
      self.firebaseDatabase = database;
    });

    firebaseModel.getAuth().then((auth: AngularFireAuth) => {
      auth.authState.subscribe((user) => {
        if (self.observer) {
          self.observer.next({action: 'initFirebaseDatabase'});
        }
      });
    });

    this.firebaseModel = firebaseModel;

    return this;


  }


  /**
   * get firebase
   * @returns {FirebaseModel}
   */
  public getFirebase() {

    return this.firebaseModel;

  }

  /**
   * get firebase user uuid
   * return string|null
   */
  public getFirebaseUserId() {

    if (this.getFirebaseDatabase() && this.getFirebaseDatabase().app && this.getFirebaseDatabase().app.auth().currentUser) {
      return this.getFirebaseDatabase().app.auth().currentUser.uid;
    }

    return null;

  }


  /**
   * get firebase database
   * @returns {AngularFireDatabase}
   */
  public getFirebaseDatabase() {
    return this.firebaseDatabase;
  }

  /**
   * storage ready promise
   * @returns {Promise<any>}
   */
  public ready() {


    return this.storageWrapper.ready();

  }

  private initModelForFirebaseDatabase(model) {

    let self = this;

    if (!model.getPersistanceManager() || !model.getFirebaseDatabasePath()) {

      model.setPersistanceManager(this);
      this.observable.subscribe((data) => {


        if (data.action == 'connected' && model.getFirebaseDatabase() && model.getFirebaseDatabasePath()) {
          this.workOnPendingChanges(model);
        }

        if (data.action == 'initFirebaseDatabase' && self.getFirebasePath(model) && (!model.getFirebaseDatabase() || !model.getFirebaseDatabasePath())) {
          model.setFirebaseDatabase(self.getFirebaseDatabase());
          model.setFirebaseDatabasePath(self.getFirebasePath(model));
        }

        if (data.action == 'initFirebaseDatabase' && model.getFirebaseDatabase() && model.getFirebaseDatabasePath()) {

          model.setFirebaseDatabaseObject(model.getFirebaseDatabase().object(model.getFirebaseDatabasePath() + "/data")).getFirebaseDatabaseObject().snapshotChanges().subscribe((action) => {

            if (model.hasPendingChanges()) {
              self.workOnPendingChanges(model).then(() => {
                model.setHasPendingChanges(false).emit();
              }).catch();
            } else {

              model.loadJson(action.payload.val()).then((m) => {

                m.emit();

                // self.save(model,{},true).then(() => {
                //   m.emit();
                // }).catch((error) => {
                //   console.log(error);
                // });

              }).catch((error) => {
                //
                console.log('error', error);
              });
            }

          }, (error) => {
            // skip access denied
          });
        }

      });


    }

    return this;

  }


  /**
   * save one model to storage
   * @param model
   * @param {any} action
   * @param {any} localStorageOnly
   * @returns {Promise<any>}
   */
  public save(model, action?, localStorageOnly?) {

    let self = this;



    return new Promise(function (resolve, reject) {


      model.validate(localStorageOnly).then(() => {


        self.storageWrapper.set(self.getPersistanceIdentifier(model), model.serialize(false, true)).then((m) => {

          if (!localStorageOnly && model.getFirebaseDatabasePath() && model.getFirebaseDatabase()) {

            let o = {
              'data': model.serialize(true, true),
              'action': action == undefined ? null : action
            }

            model.getFirebaseDatabase().object(model.getFirebaseDatabasePath() + (o.action ? '' : '/data')).set(o.action ? o : o.data).then((data) => {
              resolve(model);
            }).catch((error) => {
              reject(error);
            });
            resolve(model);

          } else {
            resolve(model);
          }

        }).catch((error) => {
          reject(error);
        });

      }).catch((error) => {
        reject(error);
      });


    });


  }


  /**
   * load and autsave data model
   * @param model
   * @returns {PersistenceManager}
   */

  public initAndload(model) {

    this.initModelForFirebaseDatabase(model);

    this.load(model).then((m) => {
      // loaded and update bindings
      Object.keys(model.__bindingsObserver).forEach((property) => {
        model.__bindingsObserver[property].next(model[property]);
      });
    });

    return this;

  }


  /**
   * load one model from storage
   * @param model
   * @param json
   * @returns {Promise<any>}
   */
  public load(model, json?) {

    let self = this;



    return new Promise(function (resolve, reject) {

      if (json == undefined) {
        self.storageWrapper.ready().then((data) => {

          self.storageWrapper.get(self.getPersistanceIdentifier(model)).then((json) => {

            if (json) {
              model.loadJson(json).then((model) => {
                resolve(model.emit());
              }).catch((error) => {
                reject(error);
              });
            } else {
              resolve(model.emit());
            }

          }).catch((error) => {
            reject(error);
          });
        });
      } else {

        model.loadJson(json).then((model) => {
          resolve(model.emit());
        }).catch((error) => {
          reject(error);
        });

      }

    });

  }


  /**
   * delete one model from storage
   * @param model
   * @returns {Promise<any>}
   */
  public delete(model) {

    let self = this;

    return new Promise(function (resolve, reject) {

      self.storageWrapper.ready().then((data) => {
        self.storageWrapper.remove(self.getPersistanceIdentifier(model)).then(() => {
          let m = new model.constructor(model.getObserver(), model.getObservable());
          model = m;
          m.emit();
          resolve(m);

        }).catch((error) => {
          reject(error);
        });
      });


    });

  }

  /**
   * Clear the entire key value store. WARNING: HOT!
   * @returns {Promise<any>}
   */
  public clear() {

    let self = this;

    return new Promise(function (resolve, reject) {
      self.storageWrapper.ready().then((data) => {
        self.storageWrapper.clear().then(() => {
            resolve(true);
          }
        ).catch((error) => {
          resolve(error);
        })
      });
    });

  }


  /**
   * work pending changes
   * @param model
   * @returns {Promise<any>}
   */
  public workOnPendingChanges(model) {

    let self = this;

    return new Promise(function (resolve, reject) {

      if (Object.keys(self._pendingChangesModels).length === 0) {
        resolve();
        return null;
      }


      Object.keys(self._pendingChangesModels).forEach((object) => {

        if (self._pendingChangesModels[object]) {

          self.storageWrapper.get(object).then((json) => {


            let o = json;
            try {
              delete o._hasPendingChanges;
            } catch (e) {
              // e
            }

            let d = {
              'data': o,
              'action': self._pendingChangesModels[object].action == undefined ? null : self._pendingChangesModels[object].action
            }


            if (self._pendingChangesModels[object].firebase.path) {
              try {
                model.getFirebaseDatabase().object(self._pendingChangesModels[object].firebase.path).set(d).then((data) => {

                  try {
                    delete self._pendingChangesModels[object];
                  } catch (e) {
                    // e
                  }

                  self.updatePropertyFromLocalStorage('_hasPendingChanges', false, object).then((o) => {
                    resolve(o);
                  }).catch((error) => {
                    console.log(error);
                  });


                }).catch((error) => {
                  reject(error);
                });

              } catch (e) {
                reject(e);
              }
            } else {
              delete self._pendingChangesModels[object];
            }


          });


        }

      });

    });

  }


  /**
   * mark model as has pending changes state
   * @param {any} action
   * @param model
   */
  public addPendingChanges(model, action?) {

    let self = this;


    let i = this.getPersistanceIdentifier(model);

    if (this._pendingChangesModels[i] === undefined) {
      this._pendingChangesModels[i] = {};
    }

    if (this._pendingChangesModels[i]['action'] === undefined) {
      this._pendingChangesModels[i]['action'] = {};
    }

    if (action) {
      Object.keys(action).forEach((key) => {
        this._pendingChangesModels[i]['action'][key] = action[key];
      });

    }

    this._pendingChangesModels[i]['constructor'] = model.constructor.name;
    this._pendingChangesModels[i]['firebase'] = {
      'path': self.getFirebasePath(model)
    };


    if (model.isOnline() === false) {

      self.storageWrapper.set('_pendingChanges', this._pendingChangesModels).then((m) => {
        //
      }).catch((e) => {
        console.log(e);
      });

    }


  }

  /**
   * update property from local storage
   * @param property
   * @param value
   * @param identifier
   * @returns {Promise<any>}
   */
  public updatePropertyFromLocalStorage(property, value, identifier) {

    let self = this;

    return new Promise(function (resolve, reject) {


      self.storageWrapper.get(identifier).then((json) => {

        if (json) {
          json[property] = value;
          self.storageWrapper.set(identifier, json).then((object) => {
            resolve(object);
          });

        } else {
          reject(identifier);
        }

      }).catch((error) => {
        reject(error);
      });

    });


  }

  /**
   * mark model as has pending changes state
   * @param model
   */
  public removePendingChanges(model) {

    try {
      delete this._pendingChangesModels[this.getPersistanceIdentifier(model)];
    } catch (e) {
      // skipp
    }

    if (Object.keys(this._pendingChangesModels).length) {
      this.storageWrapper.set('_pendingChanges', this._pendingChangesModels).then(() => {
      }).catch((e) => {
        console.log(e);
      });
    } else {
      this.storageWrapper.remove('_pendingChanges').then(() => {
      }).catch((e) => {
        console.log(e);
      });
    }

  }

  /**
   * get persistence identifier from model
   * @param model
   * @returns {string}
   */
  private getPersistanceIdentifier(model) {

    return "_" + model.getObjectIdentifier() + "_" + model.getUuid();

  }

  /**
   * get firebase path
   * @param model
   * @returns {any}
   */
  private getFirebasePath(model) {

    if (model.getUuid() && this.getFirebaseUserId()) {
      return model.getFirebaseDatabaseRoot() + '/' + this.getFirebaseUserId() + '/project/' + model.getObjectIdentifier() + "/" + model.getUuid();
    } else {
      return null;
    }
  }


}
