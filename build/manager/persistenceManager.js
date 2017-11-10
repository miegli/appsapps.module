import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
var PersistenceManager = (function () {
    function PersistenceManager() {
        var _this = this;
        this._pendingChangesModels = {};
        var self = this;
        var storage = new LocalStorageService({ storageType: 'localStorage', prefix: 'appsapps-' });
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
        this.observable = new Observable(function (observer) {
            self.observer = observer;
        });
        self.storageWrapper.get('_pendingChanges').then(function (data) {
            _this._pendingChangesModels = data && Object.keys(data).length ? data : {};
        });
    }
    /**
     * get persistence managers oberserver
     * @return {?}
     */
    PersistenceManager.prototype.getObserver = function () {
        return this.observer;
    };
    /**
     * connect with firebaseModel
     * @param {?} firebaseModel
     * @return {?}
     */
    PersistenceManager.prototype.setFirebase = function (firebaseModel) {
        var /** @type {?} */ self = this;
        firebaseModel.getDatabase().then(function (database) {
            self.firebaseDatabase = database;
        });
        firebaseModel.getAuth().then(function (auth) {
            auth.authState.subscribe(function (user) {
                if (self.observer) {
                    self.observer.next({ action: 'initFirebaseDatabase' });
                }
            });
        });
        this.firebaseModel = firebaseModel;
        return this;
    };
    /**
     * get firebase
     * @return {?}
     */
    PersistenceManager.prototype.getFirebase = function () {
        return this.firebaseModel;
    };
    /**
     * get firebase user uuid
     * return string|null
     * @return {?}
     */
    PersistenceManager.prototype.getFirebaseUserId = function () {
        if (this.getFirebaseDatabase() && this.getFirebaseDatabase().app && this.getFirebaseDatabase().app.auth().currentUser) {
            return this.getFirebaseDatabase().app.auth().currentUser.uid;
        }
        return null;
    };
    /**
     * get firebase database
     * @return {?}
     */
    PersistenceManager.prototype.getFirebaseDatabase = function () {
        return this.firebaseDatabase;
    };
    /**
     * storage ready promise
     * @return {?}
     */
    PersistenceManager.prototype.ready = function () {
        return this.storageWrapper.ready();
    };
    /**
     * @param {?} model
     * @return {?}
     */
    PersistenceManager.prototype.initModelForFirebaseDatabase = function (model) {
        var _this = this;
        var /** @type {?} */ self = this;
        if (!model.getPersistanceManager() || !model.getFirebaseDatabasePath()) {
            model.setPersistanceManager(this);
            this.observable.subscribe(function (data) {
                if (data.action == 'connected' && model.getFirebaseDatabase() && model.getFirebaseDatabasePath()) {
                    _this.workOnPendingChanges(model);
                }
                if (data.action == 'initFirebaseDatabase' && self.getFirebasePath(model) && (!model.getFirebaseDatabase() || !model.getFirebaseDatabasePath())) {
                    model.setFirebaseDatabase(self.getFirebaseDatabase());
                    model.setFirebaseDatabasePath(self.getFirebasePath(model));
                }
                if (data.action == 'initFirebaseDatabase' && model.getFirebaseDatabase() && model.getFirebaseDatabasePath()) {
                    model.setFirebaseDatabaseObject(model.getFirebaseDatabase().object(model.getFirebaseDatabasePath() + "/data")).getFirebaseDatabaseObject().snapshotChanges().subscribe(function (action) {
                        if (model.hasPendingChanges()) {
                            self.workOnPendingChanges(model).then(function () {
                                model.setHasPendingChanges(false).emit();
                            }).catch();
                        }
                        else {
                            model.loadJson(action.payload.val()).then(function (m) {
                                m.emit();
                                // self.save(model,{},true).then(() => {
                                //   m.emit();
                                // }).catch((error) => {
                                //   console.log(error);
                                // });
                            }).catch(function (error) {
                                //
                                console.log('error', error);
                            });
                        }
                    }, function (error) {
                        // skip access denied
                    });
                }
            });
        }
        return this;
    };
    /**
     * save one model to storage
     * @param {?} model
     * @param {?=} action
     * @param {?=} localStorageOnly
     * @return {?}
     */
    PersistenceManager.prototype.save = function (model, action, localStorageOnly) {
        var /** @type {?} */ self = this;
        return new Promise(function (resolve, reject) {
            model.validate(localStorageOnly).then(function () {
                self.storageWrapper.set(self.getPersistanceIdentifier(model), model.serialize(false, true)).then(function (m) {
                    if (!localStorageOnly && model.getFirebaseDatabasePath() && model.getFirebaseDatabase()) {
                        var /** @type {?} */ o = {
                            'data': model.serialize(true, true),
                            'action': action == undefined ? null : action
                        };
                        model.getFirebaseDatabase().object(model.getFirebaseDatabasePath() + '/data').set(o.data).then(function (data) {
                            resolve(model);
                        }).catch(function (error) {
                            reject(error);
                        });
                    }
                    else {
                        resolve(model);
                    }
                }).catch(function (error) {
                    reject(error);
                });
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    /**
     * load and autsave data model
     * @param {?} model
     * @return {?}
     */
    PersistenceManager.prototype.initAndload = function (model) {
        this.initModelForFirebaseDatabase(model);
        this.load(model).then(function (m) {
            // loaded and update bindings
            Object.keys(model.__bindingsObserver).forEach(function (property) {
                model.__bindingsObserver[property].next(model[property]);
            });
        });
        return this;
    };
    /**
     * load one model from storage
     * @param {?} model
     * @param {?=} json
     * @return {?}
     */
    PersistenceManager.prototype.load = function (model, json) {
        var /** @type {?} */ self = this;
        return new Promise(function (resolve, reject) {
            if (json == undefined) {
                self.storageWrapper.ready().then(function (data) {
                    self.storageWrapper.get(self.getPersistanceIdentifier(model)).then(function (json) {
                        if (json) {
                            model.loadJson(json).then(function (model) {
                                resolve(model.emit());
                            }).catch(function (error) {
                                reject(error);
                            });
                        }
                        else {
                            resolve(model.emit());
                        }
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            }
            else {
                model.loadJson(json).then(function (model) {
                    resolve(model.emit());
                }).catch(function (error) {
                    reject(error);
                });
            }
        });
    };
    /**
     * delete one model from storage
     * @param {?} model
     * @return {?}
     */
    PersistenceManager.prototype.delete = function (model) {
        var /** @type {?} */ self = this;
        return new Promise(function (resolve, reject) {
            self.storageWrapper.ready().then(function (data) {
                self.storageWrapper.remove(self.getPersistanceIdentifier(model)).then(function () {
                    var /** @type {?} */ m = new model.constructor(model.getObserver(), model.getObservable());
                    model = m;
                    m.emit();
                    resolve(m);
                }).catch(function (error) {
                    reject(error);
                });
            });
        });
    };
    /**
     * Clear the entire key value store. WARNING: HOT!
     * @return {?}
     */
    PersistenceManager.prototype.clear = function () {
        var /** @type {?} */ self = this;
        return new Promise(function (resolve, reject) {
            self.storageWrapper.ready().then(function (data) {
                self.storageWrapper.clear().then(function () {
                    resolve(true);
                }).catch(function (error) {
                    resolve(error);
                });
            });
        });
    };
    /**
     * work pending changes
     * @param {?} model
     * @return {?}
     */
    PersistenceManager.prototype.workOnPendingChanges = function (model) {
        var /** @type {?} */ self = this;
        return new Promise(function (resolve, reject) {
            if (Object.keys(self._pendingChangesModels).length === 0) {
                resolve();
                return null;
            }
            Object.keys(self._pendingChangesModels).forEach(function (object) {
                if (self._pendingChangesModels[object]) {
                    self.storageWrapper.get(object).then(function (json) {
                        var /** @type {?} */ o = json;
                        try {
                            delete o._hasPendingChanges;
                        }
                        catch (e) {
                            // e
                        }
                        var /** @type {?} */ d = {
                            'data': o,
                            'action': self._pendingChangesModels[object].action == undefined ? null : self._pendingChangesModels[object].action
                        };
                        if (self._pendingChangesModels[object].firebase.path) {
                            try {
                                model.getFirebaseDatabase().object(self._pendingChangesModels[object].firebase.path).set(d).then(function (data) {
                                    try {
                                        delete self._pendingChangesModels[object];
                                    }
                                    catch (e) {
                                        // e
                                    }
                                    self.updatePropertyFromLocalStorage('_hasPendingChanges', false, object).then(function (o) {
                                        resolve(o);
                                    }).catch(function (error) {
                                        console.log(error);
                                    });
                                }).catch(function (error) {
                                    reject(error);
                                });
                            }
                            catch (e) {
                                reject(e);
                            }
                        }
                        else {
                            delete self._pendingChangesModels[object];
                        }
                    });
                }
            });
        });
    };
    /**
     * mark model as has pending changes state
     * @param {?} model
     * @param {?=} action
     * @return {?}
     */
    PersistenceManager.prototype.addPendingChanges = function (model, action) {
        var _this = this;
        var /** @type {?} */ self = this;
        var /** @type {?} */ i = this.getPersistanceIdentifier(model);
        if (this._pendingChangesModels[i] === undefined) {
            this._pendingChangesModels[i] = {};
        }
        if (this._pendingChangesModels[i]['action'] === undefined) {
            this._pendingChangesModels[i]['action'] = {};
        }
        if (action) {
            Object.keys(action).forEach(function (key) {
                _this._pendingChangesModels[i]['action'][key] = action[key];
            });
        }
        this._pendingChangesModels[i]['constructor'] = model.constructor.name;
        this._pendingChangesModels[i]['firebase'] = {
            'path': self.getFirebasePath(model)
        };
        if (model.isOnline() === false) {
            self.storageWrapper.set('_pendingChanges', this._pendingChangesModels).then(function (m) {
                //
            }).catch(function (e) {
                console.log(e);
            });
        }
    };
    /**
     * update property from local storage
     * @param {?} property
     * @param {?} value
     * @param {?} identifier
     * @return {?}
     */
    PersistenceManager.prototype.updatePropertyFromLocalStorage = function (property, value, identifier) {
        var /** @type {?} */ self = this;
        return new Promise(function (resolve, reject) {
            self.storageWrapper.get(identifier).then(function (json) {
                if (json) {
                    json[property] = value;
                    self.storageWrapper.set(identifier, json).then(function (object) {
                        resolve(object);
                    });
                }
                else {
                    reject(identifier);
                }
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    /**
     * mark model as has pending changes state
     * @param {?} model
     * @return {?}
     */
    PersistenceManager.prototype.removePendingChanges = function (model) {
        try {
            delete this._pendingChangesModels[this.getPersistanceIdentifier(model)];
        }
        catch (e) {
            // skipp
        }
        if (Object.keys(this._pendingChangesModels).length) {
            this.storageWrapper.set('_pendingChanges', this._pendingChangesModels).then(function () {
            }).catch(function (e) {
                console.log(e);
            });
        }
        else {
            this.storageWrapper.remove('_pendingChanges').then(function () {
            }).catch(function (e) {
                console.log(e);
            });
        }
    };
    /**
     * get persistence identifier from model
     * @param {?} model
     * @return {?}
     */
    PersistenceManager.prototype.getPersistanceIdentifier = function (model) {
        return "_" + model.getObjectIdentifier() + "_" + model.getUuid();
    };
    /**
     * get firebase path
     * @param {?} model
     * @return {?}
     */
    PersistenceManager.prototype.getFirebasePath = function (model) {
        if (model.getUuid() && this.getFirebaseUserId()) {
            return model.getFirebaseDatabaseRoot() + '/' + this.getFirebaseUserId() + '/project/' + model.getObjectIdentifier() + "/" + model.getUuid();
        }
        else {
            return null;
        }
    };
    return PersistenceManager;
}());
export { PersistenceManager };
PersistenceManager.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
PersistenceManager.ctorParameters = function () { return []; };
function PersistenceManager_tsickle_Closure_declarations() {
    /** @type {?} */
    PersistenceManager.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    PersistenceManager.ctorParameters;
    /** @type {?} */
    PersistenceManager.prototype.storageWrapper;
    /** @type {?} */
    PersistenceManager.prototype.firebaseDatabase;
    /** @type {?} */
    PersistenceManager.prototype.firebaseModel;
    /** @type {?} */
    PersistenceManager.prototype.observer;
    /** @type {?} */
    PersistenceManager.prototype.observable;
    /** @type {?} */
    PersistenceManager.prototype._pendingChangesModels;
}
