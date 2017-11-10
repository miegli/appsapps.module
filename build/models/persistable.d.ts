import { Observer } from "rxjs/Observer";
import { Observable } from "rxjs/Observable";
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
export declare abstract class PersistableModel {
    private __observer;
    private __observable;
    private __uuid;
    private __firebaseDatabase;
    private __firebaseDatabasePath;
    private __firebaseDatabaseRoot;
    private __angularFireObject;
    private __bindings;
    private __bindingsObserver;
    private __validator;
    private __validatorObserver;
    private __edited;
    private __temp;
    private __forceUpdateProperty;
    private __persistenceManager;
    private __isOnline;
    private __validationErrors;
    private __metadata;
    private _hasPendingChanges;
    private __conditionBindings;
    private __conditionActionIfMatches;
    private __conditionActionIfMatchesAction;
    private __conditionActionIfMatchesObserver;
    private __conditionActionIfMatchesRemovedProperties;
    private __conditionContraintsProperties;
    private __conditionContraintsPropertiesValue;
    private __conditionContraintsAffectedProperties;
    /**
     * PersistanceManager as an optional argument when changes were persisted to stable database
     */
    constructor();
    /**
     *
     * @private
     */
    private __init();
    /**
     * update property
     * @param property
     * @param value
     */
    update(property: any, value: any): this;
    /**
     * call next method on observer
     * @returns {PersistableModel}
     */
    emit(): this;
    /**
     * save model and persist if is persistable
     * @param {any} action as an optinal argument for transmitting additional action metadata
     * @returns {PersistableModel}
     */
    save(action?: any): Promise<{}>;
    /**
     * resets to previous data
     * @returns {PersistableModel}
     */
    reset(): this;
    /**
     * get models observer
     * @returns {Observer<any>}
     */
    getObserver(): Observer<any>;
    /**
     * get models obervable
     * @returns {Observable<any>}
     */
    getObservable(): Observable<any>;
    /**
     * set uuid
     * @param uuid
     * @returns {PersistableModel}
     */
    setUuid(uuid: any): this;
    /**
     * get uuid
     * @returns {string}
     */
    getUuid(): string;
    /**
     * get models constructors name as an object identifier
     * return {string}
     */
    getObjectIdentifier(): string;
    /**
     * set firebaseDatabase
     * @param {AngularFireDatabase}
     * @returns {PersistableModel}
     */
    setFirebaseDatabase(firebaseDatabase: any): this;
    /**
     * get firebase database
     * @returns {AngularFireDatabase}
     */
    getFirebaseDatabase(): AngularFireDatabase;
    /**
     * set firebase database path
     * @param path
     * @returns {PersistableModel}
     */
    setFirebaseDatabasePath(path: any): this;
    /**
     * get firebase database path
     * @returns {string}
     */
    getFirebaseDatabasePath(): string;
    /**
     * set firebaseDatabaseObject
     * @param firebaseDatabaseObject
     * @returns {PersistableModel}
     */
    setFirebaseDatabaseObject(firebaseDatabaseObject: any): this;
    /**
     * get firebaseDatabaseObject
     * @returns {AngularFireObject<any>}
     */
    getFirebaseDatabaseObject(): AngularFireObject<any>;
    /**
     * get firebaseDatabase prefix
     * @returns string
     */
    getFirebaseDatabaseRoot(): string;
    /**
     * set firebase databse path prefix
     * @param path
     * @returns {PersistableModel}
     */
    setFirebaseDatabaseRoot(path: any): this;
    /**
     * get obervable property for using as an binding variable
     * @returns {Observable<any>}
     */
    getProperty(property: any): any;
    /**
     * get observer property for using as an binding variable
     * @returns {Observer<any>}
     */
    private getPropertyObserver(property);
    /**
     * set property value for using as an binding variable
     * @param {string} property
     * @param {any} value
     * @returns {PersistableModel}
     */
    setProperty(property: any, value: any): this;
    /**
     * return current property value
     * @param property
     * @param {boolean} get value is in editing mode
     * @returns {any}
     */
    getPropertyValue(property: any, editing?: any): any;
    /**
     * set persistenceManager
     * @param persistenceManager
     * @returns {PersistableModel}
     */
    setPersistanceManager(persistenceManager: any): this;
    /**
     * valid this object
     * @param {boolean} softcheck
     * @returns {Promise<any>}
     */
    validate(softcheck?: any): Promise<{}>;
    /**
     * remove properties with invalid condition validators
     * @returns {PersistableModel}
     */
    private removeConditionProperties();
    /**
     * get validation observable for given property
     * @param {string} property
     * @return {boolean}
     */
    getValidation(property: any): any;
    /**
     * get condition observable for given property
     * @param property
     * @returns {Observable}
     */
    getCondition(property: any): any;
    /**
     * is the object/property on editing state
     * @param {string} property as an optional argument
     * @returns {boolean}
     */
    hasChanges(property?: any): number | boolean;
    /**
     * remove changes state
     * @param {string} property as an optional argument
     * @returns {boolean}
     */
    private setHasNoChanges(property?);
    /**
     * load json data
     * @param {object|string} stringified or real json object
     * @returns {Promise<any>}
     */
    loadJson(json: any): Promise<{}>;
    /**
     * transform type from metadata to avoid non matching data types
     * @param property
     * @param value
     * @returns {any}
     */
    private transformTypeFromMetadata(property, value);
    /**
     * has model pending changes that are not synchronised yet or not
     * @returns {boolean}
     */
    hasPendingChanges(): boolean;
    /**
     * set pending changes state
     * @param {boolean} state
     * @param {any} action as an optional argument
     * @returns {PersistableModel}
     */
    setHasPendingChanges(state: any, action?: any): this;
    /**
     * serialize this object
     * @param {boolean} noUnderScoreData
     * @param {boolean} force returning as an real object, otherwise return stringified object
     * @returns {any}
     */
    serialize(noUnderScoreData?: any, asObject?: any): any;
    /**
     * get the persistence manger
     * @returns {PersistenceManager}
     */
    getPersistanceManager(): any;
    /**
     * check if current network state is online
     * @returns {boolean}
     */
    isOnline(): boolean;
    /**
     * set if model is connected to internet
     * @param state
     */
    setIsOnline(state: any): this;
    /**
     * get properties metatadata
     * @param {string} property
     * @param {string} type
     * @returns {Array}
     */
    getMetadata(property?: string, type?: string): any[];
    /**
     * get metadata contraints value
     * @param property
     * @param type
     * @returns {any}
     */
    getMetadataValue(property: any, type: any): any;
    /**
     * resolves input type for given property
     * @param {string} property
     * @returns {any}
     */
    getType(property: any): any;
    /**
     * registers condition validators
     * @param {boolean} prepare
     * @returns {PersistableModel}
     */
    private registerConditionValidators(prepare);
    /**
     *
     * @param property
     * @returns {PersistableModel}
     */
    private executeConditionValidator(property);
    /**
     * recovers a missing property
     * @param property
     * @returns {PersistableModel}
     */
    private recoverMissingProperty(property);
}
