import {Observer} from "rxjs/Observer";
import {Observable} from "rxjs/Observable";
import {AngularFireDatabase, AngularFireObject} from "angularfire2/database";
import {validate} from "class-validator";
import {plainToClass, serialize} from "class-transformer";
import {AngularFireAuth} from "angularfire2/auth";
import {getFromContainer} from "class-validator";
import {MetadataStorage} from "class-validator";


export abstract class PersistableModel {


    private __observer: Observer<any>;
    private __observable: Observable<any>;
    private __uuid: string = 'test';
    private __firebaseDatabase: AngularFireDatabase;
    private __firebaseDatabasePath: string;
    private __firebaseDatabaseRoot: string = 'session';
    private __angularFireObject: AngularFireObject<any>;
    private __bindings = {};
    private __bindingsObserver = {};
    private __validator = {};
    private __validatorObserver = {};
    private __edited = {};
    private __temp = {};
    private __forceUpdateProperty = {};
    private __persistenceManager: any;
    private __isOnline: boolean = false;
    private __validationErrors: any = {};
    private __metadata = [];
    private _hasPendingChanges: boolean = false;
    private __conditionBindings: any = {};
    private __conditionActionIfMatches: any = {};
    private __conditionActionIfMatchesAction: any = {};
    private __conditionActionIfMatchesObserver: any = {};
    private __conditionActionIfMatchesRemovedProperties: any = {};
    private __conditionContraintsProperties: any = {};
    private __conditionContraintsPropertiesValue: any = {};
    private __conditionContraintsAffectedProperties: any = {};

    /**
     * PersistanceManager as an optional argument when changes were persisted to stable database
     */
    constructor() {


        this.__metadata = getFromContainer(MetadataStorage).getTargetValidationMetadatas(this.constructor, '');

        // check if all loaded metadata has corresponding properties
        this.__metadata.forEach((metadata) => {
            if (this[metadata.propertyName] == undefined) {
                this[metadata.propertyName] = null;
            }
        });

        this.__init();

    }

    /**
     *
     * @private
     */
    private __init() {


        let self = this;

        /**
         * create observerable and observer for handling the models data changes
         */
        this.__observable = new Observable<any>((observer: Observer<any>) => {
            self.__observer = observer;
            self.__observer.next(this);
        });

        this.__observable.share();

        /**
         * creates and update bindings for getProperty()-Method
         */
        this.__observable.subscribe((next) => {

            if (!self.hasPendingChanges() || self.getFirebaseDatabase() === undefined) {

                if (self.__bindingsObserver) {
                    Object.keys(self.__bindingsObserver).forEach((property) => {
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


    }

    /**
     * update property
     * @param property
     * @param value
     */
    public update(property, value) {

        let observer = this.setProperty(property, value).setHasNoChanges(property).getPropertyObserver(property);
        if (observer) {
            observer.next(value);
        }


        try {
            delete this.__bindings[property];
        } catch (e) {
            // e
        }


        return this;

    }

    /**
     * call next method on observer
     * @returns {PersistableModel}
     */
    public emit() {
        if (this.__observer) {
            this.__observer.next(this);
        }
        return this;
    }

    /**
     * save model and persist if is persistable
     * @param {any} action as an optinal argument for transmitting additional action metadata
     * @returns {PersistableModel}
     */
    public save(action?) {

        let self = this;

        Object.keys(self.__edited).forEach((property) => {
            self[property] = self.__edited[property];
        });


        return new Promise(function (resolve, reject) {



            self.validate().then(() => {

                self.setHasPendingChanges(true, action);

                if (self.__persistenceManager) {
                    self.__persistenceManager.save(self, action).then((success) => {
                        self.__edited = {};
                        resolve(self);
                    }).catch((error) => {
                        console.log(error);
                        self.__edited = {};
                        reject(error);
                    });

                } else {
                    reject('No persistence Manger provided');
                    self.__edited = {};
                }


            }).catch((error) => {
                reject(error);
            });


        });


    }

    /**
     * resets to previous data
     * @returns {PersistableModel}
     */
    public reset() {

        let self = this;

        self.__edited = {};
        self.emit();

        if (this.__persistenceManager) {
            this.__persistenceManager.load(self).then((model: any) => {
                self.emit();
            }).catch((error) => {
                console.log(error);
            });

        }
        return this;


    }

    /**
     * get models observer
     * @returns {Observer<any>}
     */
    public getObserver() {
        return this.__observer;
    }

    /**
     * get models obervable
     * @returns {Observable<any>}
     */
    public getObservable() {
        return this.__observable;
    }

    /**
     * set uuid
     * @param uuid
     * @returns {PersistableModel}
     */
    public setUuid(uuid) {
        this.__uuid = uuid;
        return this;
    }

    /**
     * get uuid
     * @returns {string}
     */
    public getUuid() {
        return this.__uuid;
    }

    /**
     * get models constructors name as an object identifier
     * return {string}
     */
    public getObjectIdentifier() {
        return this.constructor.name;
    }

    /**
     * set firebaseDatabase
     * @param {AngularFireDatabase}
     * @returns {PersistableModel}
     */
    public setFirebaseDatabase(firebaseDatabase) {

        this.__firebaseDatabase = firebaseDatabase;
        let self = this;


        let connectedRef = this.__firebaseDatabase.app.database().ref(".info/connected");
        connectedRef.on("value", (snap) => {
            self.__isOnline = snap.val();
            if (self.__persistenceManager && self.__isOnline) {
                self.__persistenceManager.getObserver().next({'action': 'connected'});
            }

        });


        this.getPersistanceManager().getFirebase().getAuth().then((auth: AngularFireAuth) => {
            auth.authState.subscribe((user) => {
                self.emit();
            });
        });


        return this;

    }


    /**
     * get firebase database
     * @returns {AngularFireDatabase}
     */
    public getFirebaseDatabase() {
        return this.__firebaseDatabase;
    }

    /**
     * set firebase database path
     * @param path
     * @returns {PersistableModel}
     */
    public setFirebaseDatabasePath(path) {
        this.__firebaseDatabasePath = path;
        this.registerConditionValidators(false);
        return this;
    }


    /**
     * get firebase database path
     * @returns {string}
     */
    public getFirebaseDatabasePath() {
        return this.__firebaseDatabasePath;
    }


    /**
     * set firebaseDatabaseObject
     * @param firebaseDatabaseObject
     * @returns {PersistableModel}
     */
    public setFirebaseDatabaseObject(firebaseDatabaseObject) {
        this.__angularFireObject = firebaseDatabaseObject;
        return this;
    }


    /**
     * get firebaseDatabaseObject
     * @returns {AngularFireObject<any>}
     */
    public getFirebaseDatabaseObject() {
        return this.__angularFireObject;

    }

    /**
     * get firebaseDatabase prefix
     * @returns string
     */
    public getFirebaseDatabaseRoot() {
        return this.__firebaseDatabaseRoot;
    }


    /**
     * set firebase databse path prefix
     * @param path
     * @returns {PersistableModel}
     */
    public setFirebaseDatabaseRoot(path) {

        this.__firebaseDatabaseRoot = path;

        return this;

    }

    /**
     * get obervable property for using as an binding variable
     * @returns {Observable<any>}
     */
    public getProperty(property) {

        let self = this;


        if (!self.__bindings[property]) {

            self.__bindings[property] = new Observable<any>((observer: Observer<any>) => {
                self.__bindingsObserver[property] = observer;
            });

            window.setTimeout(() => {
                if (self.__bindingsObserver[property] !== undefined) {
                    self.__bindingsObserver[property].next(self[property]);
                }
            });

        }


        return self.__bindings[property];

    }


    /**
     * get observer property for using as an binding variable
     * @returns {Observer<any>}
     */
    private getPropertyObserver(property) {


        if (this.__bindingsObserver[property]) {
            return this.__bindingsObserver[property];
        } else {
            return null;
        }


    }


    /**
     * set property value for using as an binding variable
     * @param {string} property
     * @param {any} value
     * @returns {PersistableModel}
     */
    public setProperty(property, value) {

        this[property] = value;
        this.__edited[property] = value;
        this.executeConditionValidator(property);
        return this;
    }


    /**
     * return current property value
     * @param property
     * @param {boolean} get value is in editing mode
     * @returns {any}
     */
    public getPropertyValue(property, editing?) {

        if (editing) {
            return this.__edited[property] ? this.__edited[property] : this[property];
        } else {
            return this[property];
        }

    }

    /**
     * set persistenceManager
     * @param persistenceManager
     * @returns {PersistableModel}
     */
    public setPersistanceManager(persistenceManager) {
        this.__persistenceManager = persistenceManager;
        this.__uuid = "1";
        return this;
    }


    /**
     * valid this object
     * @param {boolean} softcheck
     * @returns {Promise<any>}
     */
    public validate(softcheck?) {

        let self = this;
        return new Promise(function (resolve, reject) {

            self.removeConditionProperties();

            validate(self, {skipMissingProperties: true}).then(errors => { // errors is an array of validation errors


                if (errors.length > 0) {

                    if (softcheck) {
                        resolve();
                    } else {
                        reject(errors);
                    }

                    self.__validationErrors = {};
                    errors.forEach((error) => {
                        self.__validationErrors[error.property] = error;
                    });

                } else {
                    resolve();
                    self.__validationErrors = {};
                }

                Object.keys(self.__validatorObserver).forEach((property) => {

                    if (self.__validationErrors[property] === undefined) {
                        self.__validatorObserver[property].next(false);
                    } else {
                        self.__validatorObserver[property].next(self.__validationErrors[property]);
                    }

                });


            });


        });


    }


    /**
     * remove properties with invalid condition validators
     * @returns {PersistableModel}
     */
    private removeConditionProperties() {

        let self = this;

        if (self.__conditionActionIfMatchesRemovedProperties) {
            Object.keys(self.__conditionActionIfMatchesRemovedProperties).forEach((property) => {
                if (self.__conditionActionIfMatchesRemovedProperties[property]) {
                    if (self[property] !== undefined) {
                        self.__temp[property] = self[property];
                        delete self[property];
                    }
                }
            });
        }

        return this;
    }


    /**
     * get validation observable for given property
     * @param {string} property
     * @return {boolean}
     */
    public getValidation(property) {

        let self = this;

        if (self.__validator[property] === undefined) {
            self.__validator[property] = new Observable<any>((observer: Observer<any>) => {
                self.__validatorObserver[property] = observer;
            });
        }

        return self.__validator[property];

    }


    /**
     * get condition observable for given property
     * @param property
     * @returns {Observable}
     */
    public getCondition(property) {

        if (this.__conditionActionIfMatches[property] == undefined) {

            if (Object.keys(this.__conditionActionIfMatches).length) {
                this.registerConditionValidators(true);
            }

            if (this.__conditionActionIfMatches[property] === undefined) {
                this.__conditionActionIfMatches[property] = new Observable<any>((observer: Observer<any>) => {
                    this.__conditionActionIfMatchesObserver[property] = observer;
                });
            }

        }

        return this.__conditionActionIfMatches[property];

    }


    /**
     * is the object/property on editing state
     * @param {string} property as an optional argument
     * @returns {boolean}
     */
    public hasChanges(property?) {

        if (property) {

            return !(this.__edited[property] === undefined);

        } else {

            return (Object.keys(this.__edited).length)

        }


    }

    /**
     * remove changes state
     * @param {string} property as an optional argument
     * @returns {boolean}
     */
    private setHasNoChanges(property?) {

        if (property) {
            this.__forceUpdateProperty[property] = true;

            if (this.__edited[property]) {
                try {
                    delete this.__edited[property];
                } catch (e) {
                    //
                }
            }
        } else {
            this.__edited = {};
        }

        return this;


    }


    /**
     * load json data
     * @param {object|string} stringified or real json object
     * @returns {Promise<any>}
     */
    public loadJson(json) {

        let self = this;

        let model = <any>plainToClass(<any>this.constructor, typeof json == 'string' ? JSON.parse(json) : json, {excludePrefixes: ["__"]});


        return new Promise(function (resolve, reject) {

            if (model) {


                let propertiesWithValidationError = {};
                model.validate().then((success) => {
                }).catch((error) => {
                    Object.keys(error).forEach((e: any) => {
                        propertiesWithValidationError[e.property] = true;
                    });
                });


                // all properties without validation error
                Object.keys(json).forEach((property) => {
                    if (property.substr(0, 2) !== '__' && propertiesWithValidationError[property] === undefined) {
                        if (Object.keys(self).indexOf(property) >= 0) {
                            self[property] = self.transformTypeFromMetadata(property, model[property]);
                        }
                    }
                });


                resolve(self);

            } else {
                resolve(self);
            }

        });

    }

    /**
     * transform type from metadata to avoid non matching data types
     * @param property
     * @param value
     * @returns {any}
     */
    private transformTypeFromMetadata(property, value) {

        if (this.getMetadata(property, 'isDate').length) {
            return value ? new Date(value) : null;
        }

        if (this.getMetadata(property, 'calendar').length) {
            return value ? new Date(value) : null;
        }

        if (this.getMetadata(property, 'birthday').length) {
            return value ? new Date(value) : null;
        }

        if (this.getMetadata(property, 'dateRange').length) {
            return typeof value == 'object' ? value : [];
        }

        return value;

    }

    /**
     * has model pending changes that are not synchronised yet or not
     * @returns {boolean}
     */
    public hasPendingChanges() {

        return this._hasPendingChanges;
    }

    /**
     * set pending changes state
     * @param {boolean} state
     * @param {any} action as an optional argument
     * @returns {PersistableModel}
     */
    public setHasPendingChanges(state, action?) {

        if (state && this.__persistenceManager) {
            this.__persistenceManager.addPendingChanges(this, action);
        }

        if (!state && this.__persistenceManager) {
            this.__persistenceManager.removePendingChanges(this);
        }

        this._hasPendingChanges = state;

        return this;
    }

    /**
     * serialize this object
     * @param {boolean} noUnderScoreData
     * @param {boolean} force returning as an real object, otherwise return stringified object
     * @returns {any}
     */
    public serialize(noUnderScoreData?, asObject?) {

        let json = '';

        if (noUnderScoreData) {
            json = serialize(this, {excludePrefixes: ["__", "_"]});
        } else {
            json = serialize(this, {excludePrefixes: ["__"]});
        }


        if (asObject) {
            return JSON.parse(json);
        } else {
            return json;
        }


    }


    /**
     * get the persistence manger
     * @returns {PersistenceManager}
     */
    public getPersistanceManager() {

        return this.__persistenceManager;

    }

    /**
     * check if current network state is online
     * @returns {boolean}
     */
    public isOnline() {
        return this.__isOnline;

    }

    /**
     * set if model is connected to internet
     * @param state
     */
    public setIsOnline(state) {
        this.__isOnline = state;
        return this;
    }

    /**
     * get properties metatadata
     * @param {string} property
     * @param {string} type
     * @returns {Array}
     */
    public getMetadata(property?: string, type?: string) {

        let validationMetadata = [];

        this.__metadata.forEach((metadata) => {
            if (!property || metadata.propertyName == property) {

                if (!type || metadata.type == type || (metadata.type == 'customValidation' && metadata.constraints && metadata.constraints[0].type == type)) {
                    validationMetadata.push(metadata);
                }

            }
        });

        return validationMetadata;

    }


    /**
     * get metadata contraints value
     * @param property
     * @param type
     * @returns {any}
     */
    public getMetadataValue(property, type) {

        if (this.getMetadata(property, type)[0] && this.getMetadata(property, type)[0].constraints) {

            if (this.getMetadata(property, type)[0].constraints.length == 1) {

                if (this.getMetadata(property, type)[0].constraints[0].type && Object.keys(this.getMetadata(property, type)[0].constraints[0]).indexOf('value')) {
                    return this.getMetadata(property, type)[0].constraints[0].value == undefined ? true : this.getMetadata(property, type)[0].constraints[0].value;
                }

                return this.getMetadata(property, type)[0].constraints[0];

            } else {
                return this.getMetadata(property, type)[0].constraints;
            }

        }

        if (this.getMetadata(property, type)[0] && this.getMetadata(property, type)[0].validationTypeOptions) {

            if (this.getMetadata(property, type)[0].validationTypeOptions.length == 1) {
                return this.getMetadata(property, type)[0].validationTypeOptions[0];
            } else {
                return this.getMetadata(property, type)[0].validationTypeOptions;
            }

        }


        return null;

    }


    /**
     * resolves input type for given property
     * @param {string} property
     * @returns {any}
     */
    public getType(property) {

        let type = null;

        const excludeForTypeDefinition = {

            'condition': true,
            'description': true,
            'label': true,
            'precision': true,

        }

        const typeMappings = {

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
            'rating': 'rating',
            'birthday': 'birthday',
            'dateRange': 'dates',
            'calendar': 'date',
            'customValidation': (metadata) => {


                if (metadata.constraints[0].type && metadata.constraints[0].type && excludeForTypeDefinition[metadata.constraints[0].type] == undefined) {
                    return typeMappings[metadata.constraints[0].type] !== undefined ? typeMappings[metadata.constraints[0].type] : metadata.constraints[0].type;
                }
                return null;
            }

        }


        this.getMetadata(property).forEach((metadata) => {

            if (type == null && typeMappings[metadata.type] !== undefined) {

                if (typeof typeMappings[metadata.type] == 'string') {
                    type = typeMappings[metadata.type];
                } else if (typeof typeMappings[metadata.type] == 'function') {
                    type = typeMappings[metadata.type](metadata);
                }
            }

        });

        return type ? type : 'text';


    }


    /**
     * registers condition validators
     * @param {boolean} prepare
     * @returns {PersistableModel}
     */
    private registerConditionValidators(prepare: boolean) {

        let self = this;


        self.__conditionBindings = {'request': {}, 'properties': {}};


        this.getMetadata(null, 'condition').forEach((validator) => {

            let hasRealtimeTypes = false;


            self.__conditionActionIfMatchesRemovedProperties[validator.propertyName] = true;

            if (self.__conditionActionIfMatches[validator.propertyName] == undefined) {
                self.__conditionActionIfMatches[validator.propertyName] = new Observable<any>((observer: Observer<any>) => {
                    self.__conditionActionIfMatchesObserver[validator.propertyName] = observer;
                    self.__conditionActionIfMatchesObserver[validator.propertyName].next({
                        'action': self.__conditionActionIfMatchesAction[validator.propertyName],
                        'state': true
                    });

                });

                self.__conditionActionIfMatches[validator.propertyName].subscribe(() => {
                    //
                });
                self.__conditionActionIfMatches[validator.propertyName].share();
            }


            if (!prepare) {


                if (self.__conditionActionIfMatchesObserver && self.__conditionActionIfMatchesAction[validator.propertyName] === undefined && self.__conditionActionIfMatchesObserver[validator.propertyName]) {
                    self.__conditionActionIfMatchesAction[validator.propertyName] = validator.constraints[0].actionIfMatches;
                    self.__conditionActionIfMatchesObserver[validator.propertyName].next({
                        'action': self.__conditionActionIfMatchesAction[validator.propertyName],
                        'state': true
                    });
                }


                validator.constraints[0].value.forEach((v) => {

                    if (v.type == 'limit') {
                        hasRealtimeTypes = true;
                    }

                    if (self.__conditionContraintsProperties[v.property] === undefined) {
                        self.__conditionContraintsProperties[v.property] = {}
                    }
                    self.__conditionContraintsProperties[v.property][v.type] = true;

                    if (self.__conditionContraintsAffectedProperties[v.property] === undefined) {
                        self.__conditionContraintsAffectedProperties[v.property] = {}
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
            Object.keys(self.__conditionContraintsProperties).forEach((property) => {
                if (self.__conditionContraintsProperties[property]['limit'] !== undefined) {
                    self.__conditionBindings['properties'][property] = self.getFirebaseDatabase().object(self.getFirebaseDatabasePath() + "/condition/properties/" + property);
                }
            });
        }


        return this;

    }

    /**
     *
     * @param property
     * @returns {PersistableModel}
     */
    private executeConditionValidator(property) {

        let self = this;


        if (self.__conditionContraintsProperties[property] !== undefined) {
            self.__conditionContraintsPropertiesValue[property] = self.getPropertyValue(property, true);
            if (self.__conditionBindings['properties'][property] !== undefined) {
                self.__conditionBindings['properties'][property].set(self.__conditionContraintsPropertiesValue[property]);
            }

        }

        if (this.__conditionContraintsAffectedProperties[property] !== undefined) {

            Object.keys(this.__conditionContraintsAffectedProperties[property]).forEach((affectedProperty) => {
                validate(self, {groups: ["condition_" + affectedProperty]}).then((result) => {


                    self.__conditionActionIfMatchesObserver[affectedProperty].next({
                        action: self.__conditionActionIfMatchesAction[affectedProperty],
                        state: result.length ? true : false
                    });

                    self.recoverMissingProperty(affectedProperty);

                    self.__conditionActionIfMatchesRemovedProperties[affectedProperty] = result.length ? true : false;
                    self.__validatorObserver[affectedProperty].next(result.length ? true : false);

                }).catch((error) => {
                    // error
                })

            });

        }

        return this;

    }

    /**
     * recovers a missing property
     * @param property
     * @returns {PersistableModel}
     */
    private recoverMissingProperty(property) {

        if (Object.keys(this).indexOf(property) == -1) {
            if (this.__temp[property] == undefined) {
                let tmpmodel = <any>plainToClass(<any>this.constructor, {}, {excludePrefixes: ["__"]});
                this[property] = tmpmodel[property];
            } else {
                this[property] = this.__temp[property];
            }
        }

        return this;

    }


}
