import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {LocalStorageService} from 'angular-2-local-storage';
import {AngularFireDatabase} from "angularfire2/database";
import {Observer} from "rxjs/Observer";
import {Observable} from "rxjs/Observable";
import {FirebaseModel} from "../models/firebase";
import {AngularFireAuth} from "angularfire2/auth";

import * as objectHash from 'object-hash';

@Injectable()

export class PersistenceManager {


    storageWrapper: any;
    private firebaseDatabase: AngularFireDatabase;
    private firebaseModel: FirebaseModel;
    private observer: Observer<any>;
    private observable: Observable<any>;
    private _pendingChangesModels: any = {};

    constructor() {

        let self = this;

        let storage = new LocalStorageService({storageType: 'localStorage', prefix: 'appsapps-'});


        this.storageWrapper = {
            set: function (key, set) {
                return new Promise(function (resolve, reject) {
                    resolve(storage.set(key, set));
                });
            },
            get: function (key) {
                return new Promise(function (resolve, reject) {
                    resolve(storage.get(key));
                });
            },
            clear: function () {
                return new Promise(function (resolve, reject) {
                    resolve(storage.remove());
                });
            },
            remove: function (key) {
                return new Promise(function (resolve, reject) {
                    resolve(storage.remove(key));
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


        if (!model.getPersistenceManager() || !model.getFirebaseDatabasePath()) {

            model.setPersistenceManager(this);

            this.observable.subscribe((data) => {

                if (data.action == 'connected' && model.getFirebaseDatabase() && model.getFirebaseDatabasePath()) {
                    this.workOnPendingChanges(model);
                }

                if (data.action == 'initFirebaseDatabase' && self.getFirebasePath(model)) {
                    model.setFirebaseDatabase(self.getFirebaseDatabase());
                    model.setFirebaseDatabasePath(self.getFirebasePath(model));
                }

                if (data.action == 'initFirebaseDatabase' && model.getFirebaseDatabase() && model.getFirebaseDatabasePath()) {

                    model.setFirebaseDatabaseObject(model.getFirebaseDatabase().object(model.getFirebaseDatabasePath() + "/data")).getFirebaseDatabaseObject().snapshotChanges().subscribe((action) => {

                        if (model.hasPendingChanges()) {

                            window.setTimeout(function () {
                                self.workOnPendingChanges(model).then(() => {
                                    model.setHasPendingChanges(false).emit();
                                }).catch();
                            }, 2000);

                        } else {

                            model.loadJson(action.payload.val()).then((m) => {
                                m.emit();
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
     * @param {Observer} observer
     * @param action
     * @returns {Promise<any>}
     */
    public action(model, observer, action: { name: string, data?: {} }) {

        let self = this;

        return new Promise(function (resolve, reject) {

            self.callAction(model, observer, action, resolve, reject);

        });

    }


    /**
     *
     * @param model
     * @param observer
     * @param action
     * @param resolve
     * @param reject
     * @returns void
     */
    private callAction(model, observer, action: { name: string, data?: {} }, resolve, reject) {


        let self = this, c = self.getActionDataWithIdentifier(action, model);

        observer.next(model.getMessage('processing'));

        self.observable.subscribe((data) => {

            let timeout = null;

            if (data.action == 'disconnected') {
                observer.next(model.getMessage('disconnected'));
                timeout = window.setTimeout(function () {
                    if (!model.isOnline()) {
                        observer.next(model.getMessage('submittedInBackground'));
                        window.setTimeout(function () {
                            observer.complete();
                        }, 5000);
                    }
                }, 15000);

            }
            if (data.action == 'connected') {
                window.clearTimeout(timeout);
                observer.next(model.getMessage('connected'));
                window.setTimeout(function () {
                    observer.next(model.getMessage('processing'));
                }, 3000);
            }

        });

        model.getFirebaseDatabase().object(model.getFirebaseDatabasePath() + '/action').set(c).then((data) => {
            model.setHasPendingChanges(false);
            model.getFirebaseDatabase().object(model.getFirebaseDatabasePath() + '/action/' + Object.keys(c)[0]).snapshotChanges().subscribe((action) => {
                let p = action.payload.val();
                if (p && p.state && p.state !== 'requested') {

                    if (p.message && p.message !== 'done' && p.state !== 'done' && p.state !== 'error') {
                        observer.next(model.getMessage(p.message));
                    }

                    if (p.state == 'error') {
                        observer.error(p.message ? p.message : 'error');
                    }

                    if (p.state == 'done') {

                        if (p.message && p.message !== 'done') {
                            observer.next(model.getMessage(p.message));
                            observer.complete();
                        } else {
                            observer.complete();
                        }

                    }
                }

            }, (error) => {
                // skip access denied
            });

        }).catch((error) => {
            reject(error);
        });


    }

    /**
     * save one model to storage
     * @param model
     * @param {Observer} observer
     * @param action
     * @param {boolean} localStorageOnly
     * @returns {Promise<any>}
     */
    public save(model, observer, action?: { name: string, data?: {} }, localStorageOnly?) {

        let self = this;


        return new Promise(function (resolve, reject) {


            model.validate(localStorageOnly).then(() => {

                self.storageWrapper.set(self.getPersistanceIdentifier(model), model.serialize(false, true)).then((m) => {

                    if (!localStorageOnly && model.getFirebaseDatabasePath() && model.getFirebaseDatabase()) {

                       self.clone(model).then((c:any) => {
                           model.getFirebaseDatabase().object(model.getFirebaseDatabasePath() + '/data').set(c.transformAllProperties().serialize(true, true)).then((data) => {
                               if (action) {
                                   self.callAction(model, observer, action, resolve, reject);
                               } else {
                                   model.setHasPendingChanges(false);
                               }
                               resolve(model);

                           }).catch((error) => {
                               reject(error);
                           });

                       }).catch((error) => {
                           reject(error);
                       });





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
     * prepare action data for transmitting
     * @param action
     * @param model
     * @returns {any}
     */
    private getActionDataWithIdentifier(action, model) {

        let d = {};
        action.state = 'requested';
        d[objectHash.sha1([model.serialize(true), action])] = action;

        return d;


    }

    /**
     * get hash
     * @param string
     */
    public getHash(string) {
        return objectHash.sha1(string);
    }


    /**
     * load and autosave data model
     * @param model
     * @param any data
     * @returns {Promise<any>}
     */

    public initAndload(model, data?) {

        let self = this;

        return new Promise(function (resolve, reject) {

            self.initModelForFirebaseDatabase(model);

            self.load(model).then((m) => {

                // set default data
                if (data) {
                    Object.keys(data).forEach((property) => {
                        model[property] = data[property];
                    });
                }

                // loaded and update bindings
                Object.keys(model.__bindingsObserver).forEach((property) => {
                    model.__bindingsObserver[property].next(model[property]);
                });

                resolve(model);

            }).catch(() => {
                resolve(model);
            });

        });


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
     * clone  model
     * @param model
     * @returns {Promise<any>}
     */
    public clone(model) {

        return new Promise(function (resolve, reject) {

            let m = new model.constructor();
            m.loadJson(model.serialize(true, true)).then((m) => {
                resolve(m);
            }).catch((error) => {
                reject(error);
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


                        if (self._pendingChangesModels[object].firebase.path) {
                            try {
                                model.getFirebaseDatabase().object(self._pendingChangesModels[object].firebase.path + "/data").set(o).then((data) => {


                                    if (self._pendingChangesModels[object] && self._pendingChangesModels[object].action) {

                                        model.getFirebaseDatabase().object(self._pendingChangesModels[object].firebase.path + "/action").update(self._pendingChangesModels[object].action).then((data) => {

                                            try {
                                                delete self._pendingChangesModels[object];
                                            } catch (e) {
                                                // e
                                            }

                                            self.updatePropertyFromLocalStorage('_hasPendingChanges', false, object).then((o) => {
                                                resolve(o);
                                            }).catch((error) => {
                                                reject(error);
                                            });

                                        }).catch((error) => {
                                            reject(error);
                                        });

                                    } else {

                                        try {
                                            delete self._pendingChangesModels[object];
                                        } catch (e) {
                                            // e
                                        }

                                        self.updatePropertyFromLocalStorage('_hasPendingChanges', false, object).then((o) => {
                                            resolve(o);
                                        }).catch((error) => {
                                            reject(error);
                                        });

                                    }


                                }).catch((error) => {
                                    try {
                                        delete self._pendingChangesModels[object]
                                    } catch (e) {
                                        //
                                    }
                                    self.storageWrapper.set('_pendingChanges', self._pendingChangesModels).then((m) => {
                                        resolve(o);
                                    }).catch((e) => {
                                        reject(error);
                                    });

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
            let a = this.getActionDataWithIdentifier(action, model);
            this._pendingChangesModels[i]['action'][Object.keys(a)[0]] = a[Object.keys(a)[0]];
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
