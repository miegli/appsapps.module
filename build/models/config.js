var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { PersistableModel } from './persistable';
var ConfigModel = (function (_super) {
    __extends(ConfigModel, _super);
    function ConfigModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.firebaseProjectId = 'test-32b81';
        _this.firebaseApiKey = 'AIzaSyBEsibRXWWJrtSQ0SSKf7z8V9HpjdsnOF8';
        _this.authenticationMethod = 'mail';
        _this.projectLabel = 'm';
        _this.firebaseUserName = 'info@assoftware.ch';
        _this.firebaseUserPassword = '123456';
        return _this;
    }
    /**
     * set operating system
     * @param {?} os
     * @return {?}
     */
    ConfigModel.prototype.setOs = function (os) {
        this._os = os;
        return this;
    };
    /**
     * get operating system
     * @return {?}
     */
    ConfigModel.prototype.getOs = function () {
        return this._os;
    };
    /**
     * get firebase users password
     * @return {?}
     */
    ConfigModel.prototype.getFirebaseUserPassword = function () {
        return this.firebaseUserPassword;
    };
    /**
     * set firebases user password
     * @param {?} firebaseUserPassword
     * @return {?}
     */
    ConfigModel.prototype.setFirebaseUserPassword = function (firebaseUserPassword) {
        this.firebaseUserPassword = firebaseUserPassword;
        return this;
    };
    /**
     * get firebase username
     * @return {?}
     */
    ConfigModel.prototype.getFirebaseUserName = function () {
        return this.firebaseUserName;
    };
    /**
     * set firebase username
     * @param {?} firebaseUserName
     * @return {?}
     */
    ConfigModel.prototype.setFirebaseUserName = function (firebaseUserName) {
        this.firebaseUserName = firebaseUserName;
        return this;
    };
    /**
     * set project label
     * @param {?} projectLabel
     * @return {?}
     */
    ConfigModel.prototype.setProjectLabel = function (projectLabel) {
        this.projectLabel = projectLabel;
        return this;
    };
    /**
     * set firebase api key
     * @param {?} firebaseApiKey
     * @return {?}
     */
    ConfigModel.prototype.setFirebaseApiKey = function (firebaseApiKey) {
        this.firebaseApiKey = firebaseApiKey;
        return this;
    };
    /**
     * get project label
     * @return {?}
     */
    ConfigModel.prototype.getProjectLabel = function () {
        return this.projectLabel;
    };
    /**
     * set authenticationMethod
     * @param {?} authenticationMethod
     * @return {?}
     */
    ConfigModel.prototype.setAuthenticationMethod = function (authenticationMethod) {
        this.authenticationMethod = authenticationMethod;
        return this;
    };
    /**
     * get authenticationMethod
     * @return {?}
     */
    ConfigModel.prototype.getAuthenticationMethod = function () {
        return this.authenticationMethod;
    };
    /**
     * get firebase project id
     * @return {?}
     */
    ConfigModel.prototype.getFirebaseProjectId = function () {
        return this.firebaseProjectId;
    };
    /**
     * get firebase database url
     * @return {?}
     */
    ConfigModel.prototype.getFirebaseDatabaseURL = function () {
        return 'https://' + this.firebaseProjectId + '.firebaseio.com/';
    };
    /**
     * get firebase auth domain
     * @return {?}
     */
    ConfigModel.prototype.getFirebaseAuthDomain = function () {
        return this.firebaseProjectId + '.firebaseio.com';
    };
    /**
     * get firebase database url
     * @return {?}
     */
    ConfigModel.prototype.getFirebaseApiKey = function () {
        return this.firebaseApiKey;
    };
    /**
     * set firebase project id
     * @param {?} firebaseProjectId
     * @return {?}
     */
    ConfigModel.prototype.setFirebaseProjectId = function (firebaseProjectId) {
        this.firebaseProjectId = firebaseProjectId;
        return this;
    };
    return ConfigModel;
}(PersistableModel));
export { ConfigModel };
function ConfigModel_tsickle_Closure_declarations() {
    /** @type {?} */
    ConfigModel.prototype.firebaseProjectId;
    /** @type {?} */
    ConfigModel.prototype.firebaseApiKey;
    /** @type {?} */
    ConfigModel.prototype.authenticationMethod;
    /** @type {?} */
    ConfigModel.prototype.projectLabel;
    /** @type {?} */
    ConfigModel.prototype.firebaseUserName;
    /** @type {?} */
    ConfigModel.prototype.firebaseUserPassword;
    /** @type {?} */
    ConfigModel.prototype._os;
}
