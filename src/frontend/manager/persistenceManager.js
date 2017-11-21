"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
require("rxjs/add/operator/map");
var core_1 = require("@angular/core");
var angular_2_local_storage_1 = require("angular-2-local-storage");
var Observable_1 = require("rxjs/Observable");
var objectHash = require("object-hash");
var PersistenceManager = (function () {
    function PersistenceManager() {
        var _this = this;
        this._pendingChangesModels = {};
        var self = this;
        var storage = new angular_2_local_storage_1.LocalStorageService({ storageType: 'localStorage', prefix: 'appsapps-' });
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
        this.observable = new Observable_1.Observable(function (observer) {
            self.observer = observer;
        });
        self.storageWrapper.get('_pendingChanges').then(function (data) {
            _this._pendingChangesModels = data && Object.keys(data).length ? data : {};
        });
    }
    /**
     * get persistence managers oberserver
     * @returns {Observer<any>}
     */
    PersistenceManager.prototype.getObserver = function () {
        return this.observer;
    };
    /**
     * connect with firebaseModel
     * @param {FirebaseModel} firebaseModel
     */
    PersistenceManager.prototype.setFirebase = function (firebaseModel) {
        var self = this;
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
     * @returns {FirebaseModel}
     */
    PersistenceManager.prototype.getFirebase = function () {
        return this.firebaseModel;
    };
    /**
     * get firebase user uuid
     * return string|null
     */
    PersistenceManager.prototype.getFirebaseUserId = function () {
        if (this.getFirebaseDatabase() && this.getFirebaseDatabase().app && this.getFirebaseDatabase().app.auth().currentUser) {
            return this.getFirebaseDatabase().app.auth().currentUser.uid;
        }
        return null;
    };
    /**
     * get firebase database
     * @returns {AngularFireDatabase}
     */
    PersistenceManager.prototype.getFirebaseDatabase = function () {
        return this.firebaseDatabase;
    };
    /**
     * storage ready promise
     * @returns {Promise<any>}
     */
    PersistenceManager.prototype.ready = function () {
        return this.storageWrapper.ready();
    };
    PersistenceManager.prototype.initModelForFirebaseDatabase = function (model) {
        var _this = this;
        var self = this;
        if (!model.getPersistanceManager() || !model.getFirebaseDatabasePath()) {
            model.setPersistanceManager(this);
            this.observable.subscribe(function (data) {
                if (data.action == 'connected' && model.getFirebaseDatabase() && model.getFirebaseDatabasePath()) {
                    _this.workOnPendingChanges(model);
                }
                if (data.action == 'initFirebaseDatabase' && self.getFirebasePath(model)) {
                    model.setFirebaseDatabase(self.getFirebaseDatabase());
                    model.setFirebaseDatabasePath(self.getFirebasePath(model));
                }
                if (data.action == 'initFirebaseDatabase' && model.getFirebaseDatabase() && model.getFirebaseDatabasePath()) {
                    model.setFirebaseDatabaseObject(model.getFirebaseDatabase().object(model.getFirebaseDatabasePath() + "/data")).getFirebaseDatabaseObject().snapshotChanges().subscribe(function (action) {
                        if (model.hasPendingChanges()) {
                            window.setTimeout(function () {
                                self.workOnPendingChanges(model).then(function () {
                                    model.setHasPendingChanges(false).emit();
                                })["catch"]();
                            }, 2000);
                        }
                        else {
                            model.loadJson(action.payload.val()).then(function (m) {
                                m.emit();
                            })["catch"](function (error) {
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
     * @param model
     * @param {Observer} observer
     * @param action
     * @returns {Promise<any>}
     */
    PersistenceManager.prototype.action = function (model, observer, action) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.callAction(model, observer, action, resolve, reject);
        });
    };
    /**
     *
     * @param model
     * @param observer
     * @param action
     * @param resolve
     * @param reject
     * @returns void
     */
    PersistenceManager.prototype.callAction = function (model, observer, action, resolve, reject) {
        var self = this, c = self.getActionDataWithIdentifier(action, model);
        observer.next(model.getMessage('processing'));
        self.observable.subscribe(function (data) {
            var timeout = null;
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
        model.getFirebaseDatabase().object(model.getFirebaseDatabasePath() + '/action').set(c).then(function (data) {
            model.setHasPendingChanges(false);
            model.getFirebaseDatabase().object(model.getFirebaseDatabasePath() + '/action/' + Object.keys(c)[0]).snapshotChanges().subscribe(function (action) {
                var p = action.payload.val();
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
                        }
                        else {
                            observer.complete();
                        }
                    }
                }
            }, function (error) {
                // skip access denied
            });
        })["catch"](function (error) {
            reject(error);
        });
    };
    /**
     * save one model to storage
     * @param model
     * @param {Observer} observer
     * @param action
     * @param {boolean} localStorageOnly
     * @returns {Promise<any>}
     */
    PersistenceManager.prototype.save = function (model, observer, action, localStorageOnly) {
        var self = this;
        return new Promise(function (resolve, reject) {
            model.validate(localStorageOnly).then(function () {
                self.storageWrapper.set(self.getPersistanceIdentifier(model), model.serialize(false, true)).then(function (m) {
                    if (!localStorageOnly && model.getFirebaseDatabasePath() && model.getFirebaseDatabase()) {
                        resolve(model);
                        model.getFirebaseDatabase().object(model.getFirebaseDatabasePath() + '/data').set(model.serialize(true, true)).then(function (data) {
                            if (action) {
                                self.callAction(model, observer, action, resolve, reject);
                            }
                            else {
                                model.setHasPendingChanges(false);
                            }
                        })["catch"](function (error) {
                            reject(error);
                        });
                    }
                    else {
                        resolve(model);
                    }
                })["catch"](function (error) {
                    reject(error);
                });
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    /**
     * prepare action data for transmitting
     * @param action
     * @param model
     * @returns {any}
     */
    PersistenceManager.prototype.getActionDataWithIdentifier = function (action, model) {
        var d = {};
        action.state = 'requested';
        d[objectHash.sha1([model.serialize(true), action])] = action;
        return d;
    };
    /**
     * load and autsave data model
     * @param model
     * @returns {PersistenceManager}
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
     * @param model
     * @param json
     * @returns {Promise<any>}
     */
    PersistenceManager.prototype.load = function (model, json) {
        var self = this;
        return new Promise(function (resolve, reject) {
            if (json == undefined) {
                self.storageWrapper.ready().then(function (data) {
                    self.storageWrapper.get(self.getPersistanceIdentifier(model)).then(function (json) {
                        if (json) {
                            model.loadJson(json).then(function (model) {
                                resolve(model.emit());
                            })["catch"](function (error) {
                                reject(error);
                            });
                        }
                        else {
                            resolve(model.emit());
                        }
                    })["catch"](function (error) {
                        reject(error);
                    });
                });
            }
            else {
                model.loadJson(json).then(function (model) {
                    resolve(model.emit());
                })["catch"](function (error) {
                    reject(error);
                });
            }
        });
    };
    /**
     * delete one model from storage
     * @param model
     * @returns {Promise<any>}
     */
    PersistenceManager.prototype["delete"] = function (model) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.storageWrapper.ready().then(function (data) {
                self.storageWrapper.remove(self.getPersistanceIdentifier(model)).then(function () {
                    var m = new model.constructor(model.getObserver(), model.getObservable());
                    model = m;
                    m.emit();
                    resolve(m);
                })["catch"](function (error) {
                    reject(error);
                });
            });
        });
    };
    /**
     * Clear the entire key value store. WARNING: HOT!
     * @returns {Promise<any>}
     */
    PersistenceManager.prototype.clear = function () {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.storageWrapper.ready().then(function (data) {
                self.storageWrapper.clear().then(function () {
                    resolve(true);
                })["catch"](function (error) {
                    resolve(error);
                });
            });
        });
    };
    /**
     * work pending changes
     * @param model
     * @returns {Promise<any>}
     */
    PersistenceManager.prototype.workOnPendingChanges = function (model) {
        var self = this;
        return new Promise(function (resolve, reject) {
            if (Object.keys(self._pendingChangesModels).length === 0) {
                resolve();
                return null;
            }
            Object.keys(self._pendingChangesModels).forEach(function (object) {
                if (self._pendingChangesModels[object]) {
                    self.storageWrapper.get(object).then(function (json) {
                        var o = json;
                        try {
                            delete o._hasPendingChanges;
                        }
                        catch (e) {
                            // e
                        }
                        if (self._pendingChangesModels[object].firebase.path) {
                            try {
                                model.getFirebaseDatabase().object(self._pendingChangesModels[object].firebase.path + "/data").set(o).then(function (data) {
                                    if (self._pendingChangesModels[object] && self._pendingChangesModels[object].action) {
                                        model.getFirebaseDatabase().object(self._pendingChangesModels[object].firebase.path + "/action").update(self._pendingChangesModels[object].action).then(function (data) {
                                            try {
                                                delete self._pendingChangesModels[object];
                                            }
                                            catch (e) {
                                                // e
                                            }
                                            self.updatePropertyFromLocalStorage('_hasPendingChanges', false, object).then(function (o) {
                                                resolve(o);
                                            })["catch"](function (error) {
                                                reject(error);
                                            });
                                        })["catch"](function (error) {
                                            reject(error);
                                        });
                                    }
                                    else {
                                        try {
                                            delete self._pendingChangesModels[object];
                                        }
                                        catch (e) {
                                            // e
                                        }
                                        self.updatePropertyFromLocalStorage('_hasPendingChanges', false, object).then(function (o) {
                                            resolve(o);
                                        })["catch"](function (error) {
                                            reject(error);
                                        });
                                    }
                                })["catch"](function (error) {
                                    try {
                                        delete self._pendingChangesModels[object];
                                    }
                                    catch (e) {
                                        //
                                    }
                                    self.storageWrapper.set('_pendingChanges', self._pendingChangesModels).then(function (m) {
                                        resolve(o);
                                    })["catch"](function (e) {
                                        reject(error);
                                    });
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
     * @param {any} action
     * @param model
     */
    PersistenceManager.prototype.addPendingChanges = function (model, action) {
        var self = this;
        var i = this.getPersistanceIdentifier(model);
        if (this._pendingChangesModels[i] === undefined) {
            this._pendingChangesModels[i] = {};
        }
        if (this._pendingChangesModels[i]['action'] === undefined) {
            this._pendingChangesModels[i]['action'] = {};
        }
        if (action) {
            var a = this.getActionDataWithIdentifier(action, model);
            this._pendingChangesModels[i]['action'][Object.keys(a)[0]] = a[Object.keys(a)[0]];
        }
        this._pendingChangesModels[i]['constructor'] = model.constructor.name;
        this._pendingChangesModels[i]['firebase'] = {
            'path': self.getFirebasePath(model)
        };
        if (model.isOnline() === false) {
            self.storageWrapper.set('_pendingChanges', this._pendingChangesModels).then(function (m) {
                //
            })["catch"](function (e) {
                console.log(e);
            });
        }
    };
    /**
     * update property from local storage
     * @param property
     * @param value
     * @param identifier
     * @returns {Promise<any>}
     */
    PersistenceManager.prototype.updatePropertyFromLocalStorage = function (property, value, identifier) {
        var self = this;
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
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    /**
     * mark model as has pending changes state
     * @param model
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
            })["catch"](function (e) {
                console.log(e);
            });
        }
        else {
            this.storageWrapper.remove('_pendingChanges').then(function () {
            })["catch"](function (e) {
                console.log(e);
            });
        }
    };
    /**
     * get persistence identifier from model
     * @param model
     * @returns {string}
     */
    PersistenceManager.prototype.getPersistanceIdentifier = function (model) {
        return "_" + model.getObjectIdentifier() + "_" + model.getUuid();
    };
    /**
     * get firebase path
     * @param model
     * @returns {any}
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
PersistenceManager = __decorate([
    core_1.Injectable()
], PersistenceManager);
exports.PersistenceManager = PersistenceManager;