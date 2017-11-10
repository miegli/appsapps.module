import 'rxjs/add/operator/map';
import { AngularFireDatabase } from "angularfire2/database";
import { Observer } from "rxjs/Observer";
import { FirebaseModel } from "../models/firebase";
export declare class PersistenceManager {
    storageWrapper: any;
    private firebaseDatabase;
    private firebaseModel;
    private observer;
    private observable;
    private _pendingChangesModels;
    constructor();
    /**
     * get persistence managers oberserver
     * @returns {Observer<any>}
     */
    getObserver(): Observer<any>;
    /**
     * connect with firebaseModel
     * @param {FirebaseModel} firebaseModel
     */
    setFirebase(firebaseModel: any): this;
    /**
     * get firebase
     * @returns {FirebaseModel}
     */
    getFirebase(): FirebaseModel;
    /**
     * get firebase user uuid
     * return string|null
     */
    getFirebaseUserId(): string;
    /**
     * get firebase database
     * @returns {AngularFireDatabase}
     */
    getFirebaseDatabase(): AngularFireDatabase;
    /**
     * storage ready promise
     * @returns {Promise<any>}
     */
    ready(): any;
    private initModelForFirebaseDatabase(model);
    /**
     * save one model to storage
     * @param model
     * @param {any} action
     * @param {any} localStorageOnly
     * @returns {Promise<any>}
     */
    save(model: any, action?: any, localStorageOnly?: any): Promise<{}>;
    /**
     * load and autsave data model
     * @param model
     * @returns {PersistenceManager}
     */
    initAndload(model: any): this;
    /**
     * load one model from storage
     * @param model
     * @param json
     * @returns {Promise<any>}
     */
    load(model: any, json?: any): Promise<{}>;
    /**
     * delete one model from storage
     * @param model
     * @returns {Promise<any>}
     */
    delete(model: any): Promise<{}>;
    /**
     * Clear the entire key value store. WARNING: HOT!
     * @returns {Promise<any>}
     */
    clear(): Promise<{}>;
    /**
     * work pending changes
     * @param model
     * @returns {Promise<any>}
     */
    workOnPendingChanges(model: any): Promise<{}>;
    /**
     * mark model as has pending changes state
     * @param {any} action
     * @param model
     */
    addPendingChanges(model: any, action?: any): void;
    /**
     * update property from local storage
     * @param property
     * @param value
     * @param identifier
     * @returns {Promise<any>}
     */
    updatePropertyFromLocalStorage(property: any, value: any, identifier: any): Promise<{}>;
    /**
     * mark model as has pending changes state
     * @param model
     */
    removePendingChanges(model: any): void;
    /**
     * get persistence identifier from model
     * @param model
     * @returns {string}
     */
    private getPersistanceIdentifier(model);
    /**
     * get firebase path
     * @param model
     * @returns {any}
     */
    private getFirebasePath(model);
}
