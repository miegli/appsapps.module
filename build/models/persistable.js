import { Observable } from 'rxjs/Observable';
import { validate } from 'class-validator';
import { plainToClass, serialize } from 'class-transformer';
import { getFromContainer } from 'class-validator';
import { MetadataStorage } from 'class-validator';
/**
 * @abstract
 */
var PersistableModel = (function () {
    /**
     * PersistanceManager as an optional argument when changes were persisted to stable database
     */
    function PersistableModel() {
        var _this = this;
        this.__uuid = 'test';
        this.__firebaseDatabaseRoot = 'session';
        this.__bindings = {};
        this.__bindingsObserver = {};
        this.__validator = {};
        this.__validatorObserver = {};
        this.__edited = {};
        this.__temp = {};
        this.__forceUpdateProperty = {};
        this.__isOnline = false;
        this.__validationErrors = {};
        this.__metadata = [];
        this._hasPendingChanges = false;
        this.__conditionBindings = {};
        this.__conditionActionIfMatches = {};
        this.__conditionActionIfMatchesAction = {};
        this.__conditionActionIfMatchesObserver = {};
        this.__conditionActionIfMatchesRemovedProperties = {};
        this.__conditionContraintsProperties = {};
        this.__conditionContraintsPropertiesValue = {};
        this.__conditionContraintsAffectedProperties = {};
        this.__metadata = getFromContainer(MetadataStorage).getTargetValidationMetadatas(this.constructor, '');
        // check if all loaded metadata has corresponding properties
        this.__metadata.forEach(function (metadata) {
            if (_this[metadata.propertyName] == undefined) {
                _this[metadata.propertyName] = null;
            }
        });
        this.__init();
    }
    /**
     *
     * @return {?}
     */
    PersistableModel.prototype.__init = function () {
        var _this = this;
        var /** @type {?} */ self = this;
        /**
         * create observerable and observer for handling the models data changes
         */
        this.__observable = new Observable(function (observer) {
            self.__observer = observer;
            self.__observer.next(_this);
        });
        /**
         * creates and update bindings for getProperty()-Method
         */
        this.__observable.subscribe(function (next) {
            if (!self.hasPendingChanges() || self.getFirebaseDatabase() === undefined) {
                if (self.__bindingsObserver) {
                    Object.keys(self.__bindingsObserver).forEach(function (property) {
                        if (!self.hasChanges(property) || self.__forceUpdateProperty[property] !== undefined) {
                            if (next[property] !== undefined) {
                                self.executeConditionValidator(property);
                                self.__bindingsObserver[property].next(next[property]);
                            }
                        }
                    });
                }
            }
        });
    };
    /**
     * update property
     * @param {?} property
     * @param {?} value
     * @return {?}
     */
    PersistableModel.prototype.update = function (property, value) {
        var /** @type {?} */ observer = this.setProperty(property, value).setHasNoChanges(property).getPropertyObserver(property);
        if (observer) {
            observer.next(value);
        }
        try {
            delete this.__bindings[property];
        }
        catch (e) {
            // e
        }
        return this;
    };
    /**
     * call next method on observer
     * @return {?}
     */
    PersistableModel.prototype.emit = function () {
        if (this.__observer) {
            this.__observer.next(this);
        }
        return this;
    };
    /**
     * save model and persist if is persistable
     * @param {?=} action
     * @return {?}
     */
    PersistableModel.prototype.save = function (action) {
        var /** @type {?} */ self = this;
        Object.keys(self.__edited).forEach(function (property) {
            self[property] = self.__edited[property];
        });
        return new Promise(function (resolve, reject) {
            self.validate().then(function () {
                self.setHasPendingChanges(true, action);
                if (self.__persistenceManager) {
                    self.__persistenceManager.save(self, action).then(function (success) {
                        self.__edited = {};
                        resolve(self);
                    }).catch(function (error) {
                        console.log(error);
                        self.__edited = {};
                        reject(error);
                    });
                }
                else {
                    reject('No persistence Manger provided');
                    self.__edited = {};
                }
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    /**
     * resets to previous data
     * @return {?}
     */
    PersistableModel.prototype.reset = function () {
        var /** @type {?} */ self = this;
        self.__edited = {};
        self.emit();
        if (this.__persistenceManager) {
            this.__persistenceManager.load(self).then(function (model) {
                self.emit();
            }).catch(function (error) {
                console.log(error);
            });
        }
        return this;
    };
    /**
     * get models observer
     * @return {?}
     */
    PersistableModel.prototype.getObserver = function () {
        return this.__observer;
    };
    /**
     * get models obervable
     * @return {?}
     */
    PersistableModel.prototype.getObservable = function () {
        return this.__observable;
    };
    /**
     * set uuid
     * @param {?} uuid
     * @return {?}
     */
    PersistableModel.prototype.setUuid = function (uuid) {
        this.__uuid = uuid;
        return this;
    };
    /**
     * get uuid
     * @return {?}
     */
    PersistableModel.prototype.getUuid = function () {
        return this.__uuid;
    };
    /**
     * get models constructors name as an object identifier
     * return {string}
     * @return {?}
     */
    PersistableModel.prototype.getObjectIdentifier = function () {
        return this.constructor.name;
    };
    /**
     * set firebaseDatabase
     * @param {?} firebaseDatabase
     * @return {?}
     */
    PersistableModel.prototype.setFirebaseDatabase = function (firebaseDatabase) {
        this.__firebaseDatabase = firebaseDatabase;
        var /** @type {?} */ self = this;
        var /** @type {?} */ connectedRef = this.__firebaseDatabase.app.database().ref(".info/connected");
        connectedRef.on("value", function (snap) {
            self.__isOnline = snap.val();
            if (self.__persistenceManager && self.__isOnline) {
                self.__persistenceManager.getObserver().next({ 'action': 'connected' });
            }
        });
        this.getPersistanceManager().getFirebase().getAuth().then(function (auth) {
            auth.authState.subscribe(function (user) {
                self.emit();
            });
        });
        return this;
    };
    /**
     * get firebase database
     * @return {?}
     */
    PersistableModel.prototype.getFirebaseDatabase = function () {
        return this.__firebaseDatabase;
    };
    /**
     * set firebase database path
     * @param {?} path
     * @return {?}
     */
    PersistableModel.prototype.setFirebaseDatabasePath = function (path) {
        this.__firebaseDatabasePath = path;
        this.registerConditionValidators(false);
        return this;
    };
    /**
     * get firebase database path
     * @return {?}
     */
    PersistableModel.prototype.getFirebaseDatabasePath = function () {
        return this.__firebaseDatabasePath;
    };
    /**
     * set firebaseDatabaseObject
     * @param {?} firebaseDatabaseObject
     * @return {?}
     */
    PersistableModel.prototype.setFirebaseDatabaseObject = function (firebaseDatabaseObject) {
        this.__angularFireObject = firebaseDatabaseObject;
        return this;
    };
    /**
     * get firebaseDatabaseObject
     * @return {?}
     */
    PersistableModel.prototype.getFirebaseDatabaseObject = function () {
        return this.__angularFireObject;
    };
    /**
     * get firebaseDatabase prefix
     * @return {?} string
     */
    PersistableModel.prototype.getFirebaseDatabaseRoot = function () {
        return this.__firebaseDatabaseRoot;
    };
    /**
     * set firebase databse path prefix
     * @param {?} path
     * @return {?}
     */
    PersistableModel.prototype.setFirebaseDatabaseRoot = function (path) {
        this.__firebaseDatabaseRoot = path;
        return this;
    };
    /**
     * get obervable property for using as an binding variable
     * @param {?} property
     * @return {?}
     */
    PersistableModel.prototype.getProperty = function (property) {
        var /** @type {?} */ self = this;
        if (!self.__bindings[property]) {
            self.__bindings[property] = new Observable(function (observer) {
                self.__bindingsObserver[property] = observer;
            });
            window.setTimeout(function () {
                if (self.__bindingsObserver[property] !== undefined) {
                    self.__bindingsObserver[property].next(self[property]);
                }
            });
        }
        return self.__bindings[property];
    };
    /**
     * get observer property for using as an binding variable
     * @param {?} property
     * @return {?}
     */
    PersistableModel.prototype.getPropertyObserver = function (property) {
        if (this.__bindingsObserver[property]) {
            return this.__bindingsObserver[property];
        }
        else {
            return null;
        }
    };
    /**
     * set property value for using as an binding variable
     * @param {?} property
     * @param {?} value
     * @return {?}
     */
    PersistableModel.prototype.setProperty = function (property, value) {
        this[property] = value;
        this.__edited[property] = value;
        this.executeConditionValidator(property);
        return this;
    };
    /**
     * return current property value
     * @param {?} property
     * @param {?=} editing
     * @return {?}
     */
    PersistableModel.prototype.getPropertyValue = function (property, editing) {
        if (editing) {
            return this.__edited[property] ? this.__edited[property] : this[property];
        }
        else {
            return this[property];
        }
    };
    /**
     * set persistenceManager
     * @param {?} persistenceManager
     * @return {?}
     */
    PersistableModel.prototype.setPersistanceManager = function (persistenceManager) {
        this.__persistenceManager = persistenceManager;
        this.__uuid = "1";
        return this;
    };
    /**
     * valid this object
     * @param {?=} softcheck
     * @return {?}
     */
    PersistableModel.prototype.validate = function (softcheck) {
        var /** @type {?} */ self = this;
        return new Promise(function (resolve, reject) {
            self.removeConditionProperties();
            validate(self, { skipMissingProperties: true }).then(function (errors) {
                if (errors.length > 0) {
                    if (softcheck) {
                        resolve();
                    }
                    else {
                        reject(errors);
                    }
                    self.__validationErrors = {};
                    errors.forEach(function (error) {
                        self.__validationErrors[error.property] = error;
                    });
                }
                else {
                    resolve();
                    self.__validationErrors = {};
                }
                Object.keys(self.__validatorObserver).forEach(function (property) {
                    if (self.__validationErrors[property] === undefined) {
                        self.__validatorObserver[property].next(false);
                    }
                    else {
                        self.__validatorObserver[property].next(self.__validationErrors[property]);
                    }
                });
            });
        });
    };
    /**
     * remove properties with invalid condition validators
     * @return {?}
     */
    PersistableModel.prototype.removeConditionProperties = function () {
        var /** @type {?} */ self = this;
        if (self.__conditionActionIfMatchesRemovedProperties) {
            Object.keys(self.__conditionActionIfMatchesRemovedProperties).forEach(function (property) {
                if (self.__conditionActionIfMatchesRemovedProperties[property]) {
                    if (self[property] !== undefined) {
                        self.__temp[property] = self[property];
                        delete self[property];
                    }
                }
            });
        }
        return this;
    };
    /**
     * get validation observable for given property
     * @param {?} property
     * @return {?}
     */
    PersistableModel.prototype.getValidation = function (property) {
        var /** @type {?} */ self = this;
        if (self.__validator[property] === undefined) {
            self.__validator[property] = new Observable(function (observer) {
                self.__validatorObserver[property] = observer;
            });
        }
        return self.__validator[property];
    };
    /**
     * get condition observable for given property
     * @param {?} property
     * @return {?}
     */
    PersistableModel.prototype.getCondition = function (property) {
        var _this = this;
        if (this.__conditionActionIfMatches[property] == undefined) {
            if (Object.keys(this.__conditionActionIfMatches).length) {
                this.registerConditionValidators(true);
            }
            if (this.__conditionActionIfMatches[property] === undefined) {
                this.__conditionActionIfMatches[property] = new Observable(function (observer) {
                    _this.__conditionActionIfMatchesObserver[property] = observer;
                });
            }
        }
        return this.__conditionActionIfMatches[property];
    };
    /**
     * is the object/property on editing state
     * @param {?=} property
     * @return {?}
     */
    PersistableModel.prototype.hasChanges = function (property) {
        if (property) {
            return !(this.__edited[property] === undefined);
        }
        else {
            return (Object.keys(this.__edited).length);
        }
    };
    /**
     * remove changes state
     * @param {?=} property
     * @return {?}
     */
    PersistableModel.prototype.setHasNoChanges = function (property) {
        if (property) {
            this.__forceUpdateProperty[property] = true;
            if (this.__edited[property]) {
                try {
                    delete this.__edited[property];
                }
                catch (e) {
                    //
                }
            }
        }
        else {
            this.__edited = {};
        }
        return this;
    };
    /**
     * load json data
     * @param {?} json
     * @return {?}
     */
    PersistableModel.prototype.loadJson = function (json) {
        var /** @type {?} */ self = this;
        var /** @type {?} */ model = (plainToClass(/** @type {?} */ (this.constructor), typeof json == 'string' ? JSON.parse(json) : json, { excludePrefixes: ["__"] }));
        return new Promise(function (resolve, reject) {
            if (model) {
                var /** @type {?} */ propertiesWithValidationError_1 = {};
                model.validate().then(function (success) {
                }).catch(function (error) {
                    Object.keys(error).forEach(function (e) {
                        propertiesWithValidationError_1[e.property] = true;
                    });
                });
                // all properties without validation error
                Object.keys(json).forEach(function (property) {
                    if (property.substr(0, 2) !== '__' && propertiesWithValidationError_1[property] === undefined) {
                        if (Object.keys(self).indexOf(property) >= 0) {
                            self[property] = self.transformTypeFromMetadata(property, model[property]);
                        }
                    }
                });
                resolve(self);
            }
            else {
                resolve(self);
            }
        });
    };
    /**
     * transform type from metadata to avoid non matching data types
     * @param {?} property
     * @param {?} value
     * @return {?}
     */
    PersistableModel.prototype.transformTypeFromMetadata = function (property, value) {
        if (this.getMetadata(property, 'isDate').length) {
            return value ? new Date(value) : null;
        }
        if (this.getMetadata(property, 'isCalendar').length) {
            return value ? new Date(value) : null;
        }
        if (this.getMetadata(property, 'isBirthDate').length) {
            return value ? new Date(value) : null;
        }
        if (this.getMetadata(property, 'isDateRange').length) {
            return typeof value == 'object' ? value : [];
        }
        return value;
    };
    /**
     * has model pending changes that are not synchronised yet or not
     * @return {?}
     */
    PersistableModel.prototype.hasPendingChanges = function () {
        return this._hasPendingChanges;
    };
    /**
     * set pending changes state
     * @param {?} state
     * @param {?=} action
     * @return {?}
     */
    PersistableModel.prototype.setHasPendingChanges = function (state, action) {
        if (state && this.__persistenceManager) {
            this.__persistenceManager.addPendingChanges(this, action);
        }
        if (!state && this.__persistenceManager) {
            this.__persistenceManager.removePendingChanges(this);
        }
        this._hasPendingChanges = state;
        return this;
    };
    /**
     * serialize this object
     * @param {?=} noUnderScoreData
     * @param {?=} asObject
     * @return {?}
     */
    PersistableModel.prototype.serialize = function (noUnderScoreData, asObject) {
        var /** @type {?} */ json = '';
        if (noUnderScoreData) {
            json = serialize(this, { excludePrefixes: ["__", "_"] });
        }
        else {
            json = serialize(this, { excludePrefixes: ["__"] });
        }
        if (asObject) {
            return JSON.parse(json);
        }
        else {
            return json;
        }
    };
    /**
     * get the persistence manger
     * @return {?}
     */
    PersistableModel.prototype.getPersistanceManager = function () {
        return this.__persistenceManager;
    };
    /**
     * check if current network state is online
     * @return {?}
     */
    PersistableModel.prototype.isOnline = function () {
        return this.__isOnline;
    };
    /**
     * set if model is connected to internet
     * @param {?} state
     * @return {?}
     */
    PersistableModel.prototype.setIsOnline = function (state) {
        this.__isOnline = state;
        return this;
    };
    /**
     * get properties metatadata
     * @param {?=} property
     * @param {?=} type
     * @return {?}
     */
    PersistableModel.prototype.getMetadata = function (property, type) {
        var /** @type {?} */ validationMetadata = [];
        this.__metadata.forEach(function (metadata) {
            if (!property || metadata.propertyName == property) {
                if (!type || metadata.type == type || (metadata.type == 'customValidation' && metadata.constraints && metadata.constraints[0].type == type)) {
                    validationMetadata.push(metadata);
                }
            }
        });
        return validationMetadata;
    };
    /**
     * get metadata contraints value
     * @param {?} property
     * @param {?} type
     * @return {?}
     */
    PersistableModel.prototype.getMetadataValue = function (property, type) {
        if (this.getMetadata(property, type)[0] && this.getMetadata(property, type)[0].constraints) {
            if (this.getMetadata(property, type)[0].constraints.length == 1) {
                if (this.getMetadata(property, type)[0].constraints[0].type && Object.keys(this.getMetadata(property, type)[0].constraints[0]).indexOf('value')) {
                    return this.getMetadata(property, type)[0].constraints[0].value == undefined ? true : this.getMetadata(property, type)[0].constraints[0].value;
                }
                return this.getMetadata(property, type)[0].constraints[0];
            }
            else {
                return this.getMetadata(property, type)[0].constraints;
            }
        }
        if (this.getMetadata(property, type)[0] && this.getMetadata(property, type)[0].validationTypeOptions) {
            if (this.getMetadata(property, type)[0].validationTypeOptions.length == 1) {
                return this.getMetadata(property, type)[0].validationTypeOptions[0];
            }
            else {
                return this.getMetadata(property, type)[0].validationTypeOptions;
            }
        }
        return null;
    };
    /**
     * resolves input type for given property
     * @param {?} property
     * @return {?}
     */
    PersistableModel.prototype.getType = function (property) {
        var /** @type {?} */ type = null;
        var /** @type {?} */ typeMappings = {
            'isString': 'text',
            'isNumber': 'number',
            'isInt': 'integer',
            'isPhoneNumber': 'tel',
            'isPassword': 'password',
            'isEmail': 'email',
            'isUrl': 'url',
            'isText': 'textarea',
            'isDate': 'date',
            'isDates': 'dates',
            'isBoolean': 'boolean',
            'isRating': 'rating',
            'isBirthDate': 'birthday',
            'isDateRange': 'dates',
            'isCalendar': 'date',
            'customValidation': function (metadata) {
                if (metadata.constraints[0].type && metadata.constraints[0].type && metadata.constraints[0].type.substr(0, 3) !== 'has') {
                    return typeMappings[metadata.constraints[0].type] !== undefined ? typeMappings[metadata.constraints[0].type] : metadata.constraints[0].type;
                }
                return null;
            }
        };
        this.getMetadata(property).forEach(function (metadata) {
            if (type == null && typeMappings[metadata.type] !== undefined) {
                if (typeof typeMappings[metadata.type] == 'string') {
                    type = typeMappings[metadata.type];
                }
                else if (typeof typeMappings[metadata.type] == 'function') {
                    type = typeMappings[metadata.type](metadata);
                }
            }
        });
        return type ? type : 'text';
    };
    /**
     * registers condition validators
     * @param {?} prepare
     * @return {?}
     */
    PersistableModel.prototype.registerConditionValidators = function (prepare) {
        var /** @type {?} */ self = this;
        self.__conditionBindings = { 'request': {}, 'properties': {} };
        this.getMetadata(null, 'hasConditions').forEach(function (validator) {
            var /** @type {?} */ hasRealtimeTypes = false;
            self.__conditionActionIfMatchesRemovedProperties[validator.propertyName] = true;
            if (self.__conditionActionIfMatches[validator.propertyName] == undefined) {
                self.__conditionActionIfMatches[validator.propertyName] = new Observable(function (observer) {
                    self.__conditionActionIfMatchesObserver[validator.propertyName] = observer;
                    self.__conditionActionIfMatchesObserver[validator.propertyName].next({
                        'action': self.__conditionActionIfMatchesAction[validator.propertyName],
                        'state': true
                    });
                });
                // self.__conditionActionIfMatches[validator.propertyName].subscribe(() => {
                // });
                // self.__conditionActionIfMatches[validator.propertyName].share();
                //
            }
            if (!prepare) {
                if (self.__conditionActionIfMatchesObserver && self.__conditionActionIfMatchesAction[validator.propertyName] === undefined && self.__conditionActionIfMatchesObserver[validator.propertyName]) {
                    self.__conditionActionIfMatchesAction[validator.propertyName] = validator.constraints[0].actionIfMatches;
                    self.__conditionActionIfMatchesObserver[validator.propertyName].next({
                        'action': self.__conditionActionIfMatchesAction[validator.propertyName],
                        'state': true
                    });
                }
                validator.constraints[0].value.forEach(function (v) {
                    if (v.type == 'limit') {
                        hasRealtimeTypes = true;
                    }
                    if (self.__conditionContraintsProperties[v.property] === undefined) {
                        self.__conditionContraintsProperties[v.property] = {};
                    }
                    self.__conditionContraintsProperties[v.property][v.type] = true;
                    if (self.__conditionContraintsAffectedProperties[v.property] === undefined) {
                        self.__conditionContraintsAffectedProperties[v.property] = {};
                    }
                    self.__conditionContraintsAffectedProperties[v.property][validator.propertyName] = true;
                });
                if (hasRealtimeTypes) {
                    self.__conditionBindings['request'][validator.propertyName] = self.getFirebaseDatabase().object(self.getFirebaseDatabasePath() + "/condition/request/" + validator.propertyName);
                    self.__conditionBindings['request'][validator.propertyName].set(validator.constraints[0].value);
                }
            }
        });
        if (!prepare) {
            Object.keys(self.__conditionContraintsProperties).forEach(function (property) {
                if (self.__conditionContraintsProperties[property]['limit'] !== undefined) {
                    self.__conditionBindings['properties'][property] = self.getFirebaseDatabase().object(self.getFirebaseDatabasePath() + "/condition/properties/" + property);
                }
            });
        }
        return this;
    };
    /**
     *
     * @param {?} property
     * @return {?}
     */
    PersistableModel.prototype.executeConditionValidator = function (property) {
        var _this = this;
        var /** @type {?} */ self = this;
        if (self.__conditionContraintsProperties[property] !== undefined) {
            self.__conditionContraintsPropertiesValue[property] = self.getPropertyValue(property, true);
            if (self.__conditionBindings['properties'][property] !== undefined) {
                self.__conditionBindings['properties'][property].set(self.__conditionContraintsPropertiesValue[property]);
            }
        }
        if (this.__conditionContraintsAffectedProperties[property] !== undefined) {
            Object.keys(this.__conditionContraintsAffectedProperties[property]).forEach(function (affectedProperty) {
                validate(self, { groups: ["condition_" + affectedProperty] }).then(function (result) {
                    self.__conditionActionIfMatchesObserver[affectedProperty].next({
                        action: self.__conditionActionIfMatchesAction[affectedProperty],
                        state: result.length ? true : false
                    });
                    self.recoverMissingProperty(affectedProperty);
                    if (result.length) {
                        self.__conditionContraintsPropertiesValue[affectedProperty] = null;
                    }
                    else {
                        try {
                            delete self.__conditionContraintsPropertiesValue[affectedProperty];
                        }
                        catch (e) {
                            ///
                        }
                    }
                    // apply rules recursive
                    Object.keys(_this.__conditionContraintsAffectedProperties[affectedProperty]).forEach(function (affectedProperty2) {
                        validate(self, { groups: ["condition_" + affectedProperty2] }).then(function (result) {
                            self.__conditionActionIfMatchesObserver[affectedProperty2].next({
                                action: self.__conditionActionIfMatchesAction[affectedProperty2],
                                state: result.length ? true : false
                            });
                        });
                    });
                    self.__conditionActionIfMatchesRemovedProperties[affectedProperty] = result.length ? true : false;
                    self.__validatorObserver[affectedProperty].next(result.length ? true : false);
                }).catch(function (error) {
                    // error
                });
            });
        }
        return this;
    };
    /**
     * recovers a missing property
     * @param {?} property
     * @return {?}
     */
    PersistableModel.prototype.recoverMissingProperty = function (property) {
        if (Object.keys(this).indexOf(property) == -1) {
            if (this.__temp[property] == undefined) {
                var /** @type {?} */ tmpmodel = (plainToClass(/** @type {?} */ (this.constructor), {}, { excludePrefixes: ["__"] }));
                this[property] = tmpmodel[property];
            }
            else {
                this[property] = this.__temp[property];
            }
        }
        return this;
    };
    return PersistableModel;
}());
export { PersistableModel };
function PersistableModel_tsickle_Closure_declarations() {
    /** @type {?} */
    PersistableModel.prototype.__observer;
    /** @type {?} */
    PersistableModel.prototype.__observable;
    /** @type {?} */
    PersistableModel.prototype.__uuid;
    /** @type {?} */
    PersistableModel.prototype.__firebaseDatabase;
    /** @type {?} */
    PersistableModel.prototype.__firebaseDatabasePath;
    /** @type {?} */
    PersistableModel.prototype.__firebaseDatabaseRoot;
    /** @type {?} */
    PersistableModel.prototype.__angularFireObject;
    /** @type {?} */
    PersistableModel.prototype.__bindings;
    /** @type {?} */
    PersistableModel.prototype.__bindingsObserver;
    /** @type {?} */
    PersistableModel.prototype.__validator;
    /** @type {?} */
    PersistableModel.prototype.__validatorObserver;
    /** @type {?} */
    PersistableModel.prototype.__edited;
    /** @type {?} */
    PersistableModel.prototype.__temp;
    /** @type {?} */
    PersistableModel.prototype.__forceUpdateProperty;
    /** @type {?} */
    PersistableModel.prototype.__persistenceManager;
    /** @type {?} */
    PersistableModel.prototype.__isOnline;
    /** @type {?} */
    PersistableModel.prototype.__validationErrors;
    /** @type {?} */
    PersistableModel.prototype.__metadata;
    /** @type {?} */
    PersistableModel.prototype._hasPendingChanges;
    /** @type {?} */
    PersistableModel.prototype.__conditionBindings;
    /** @type {?} */
    PersistableModel.prototype.__conditionActionIfMatches;
    /** @type {?} */
    PersistableModel.prototype.__conditionActionIfMatchesAction;
    /** @type {?} */
    PersistableModel.prototype.__conditionActionIfMatchesObserver;
    /** @type {?} */
    PersistableModel.prototype.__conditionActionIfMatchesRemovedProperties;
    /** @type {?} */
    PersistableModel.prototype.__conditionContraintsProperties;
    /** @type {?} */
    PersistableModel.prototype.__conditionContraintsPropertiesValue;
    /** @type {?} */
    PersistableModel.prototype.__conditionContraintsAffectedProperties;
}
