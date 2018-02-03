"use strict";
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
exports.__esModule = true;
var appsapp_cli_1 = require("appsapp-cli");
var ConfigModel = (function (_super) {
    __extends(ConfigModel, _super);
    function ConfigModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.firebaseProjectId = '';
        _this.firebaseApiKey = '';
        _this.authenticationMethod = 'mail';
        _this.projectLabel = 'm';
        _this.firebaseUserName = '';
        _this.firebaseUserPassword = '';
        return _this;
    }
    /**
     * set operating system
     * @param os
     * @returns {ConfigModel}
     */
    ConfigModel.prototype.setOs = function (os) {
        this._os = os;
        return this;
    };
    /**
     * get operating system
     * @returns {string}
     */
    ConfigModel.prototype.getOs = function () {
        return this._os;
    };
    /**
     * get operating system
     * @returns {string}
     */
    ConfigModel.prototype.getTheme = function () {
        var theme = 'material';
        if (this.getOs() == 'ios') {
            theme = 'ios';
        }
        if (this.getOs() == 'windows') {
            theme = 'wp';
        }
        if (this.getOs() == 'desktop') {
            theme = 'material';
        }
        return theme;
    };
    /**
     * get firebase users password
     * @returns {string}
     */
    ConfigModel.prototype.getFirebaseUserPassword = function () {
        return this.firebaseUserPassword;
    };
    /**
     * set firebases user password
     * @param firebaseUserPassword
     * @returns {ConfigModel}
     */
    ConfigModel.prototype.setFirebaseUserPassword = function (firebaseUserPassword) {
        this.firebaseUserPassword = firebaseUserPassword;
        return this;
    };
    /**
     * get firebase username
     * @returns {string}
     */
    ConfigModel.prototype.getFirebaseUserName = function () {
        return this.firebaseUserName;
    };
    /**
     * set firebase username
     * @param firebaseUserName
     * @returns {ConfigModel}
     */
    ConfigModel.prototype.setFirebaseUserName = function (firebaseUserName) {
        this.firebaseUserName = firebaseUserName;
        return this;
    };
    /**
     * set project label
     * @param projectLabel
     */
    ConfigModel.prototype.setProjectLabel = function (projectLabel) {
        this.projectLabel = projectLabel;
        return this;
    };
    /**
     * set firebase api key
     * @param firebaseApiKey
     * @returns {ConfigModel}
     */
    ConfigModel.prototype.setFirebaseApiKey = function (firebaseApiKey) {
        this.firebaseApiKey = firebaseApiKey;
        return this;
    };
    /**
     * get project label
     * @returns {string}
     */
    ConfigModel.prototype.getProjectLabel = function () {
        return this.projectLabel;
    };
    /**
     * set authenticationMethod
     * @param authenticationMethod
     * @returns {ConfigModel}
     */
    ConfigModel.prototype.setAuthenticationMethod = function (authenticationMethod) {
        this.authenticationMethod = authenticationMethod;
        return this;
    };
    /**
     * get authenticationMethod
     * @returns {string}
     */
    ConfigModel.prototype.getAuthenticationMethod = function () {
        return this.authenticationMethod;
    };
    /**
     * get firebase project id
     * @returns {string}
     */
    ConfigModel.prototype.getFirebaseProjectId = function () {
        return this.firebaseProjectId;
    };
    /**
     * get firebase database url
     * @returns {string}
     */
    ConfigModel.prototype.getFirebaseDatabaseURL = function () {
        return 'https://' + this.firebaseProjectId + '.firebaseio.com/';
    };
    /**
     * get firebase auth domain
     * @returns {string}
     */
    ConfigModel.prototype.getFirebaseAuthDomain = function () {
        return this.firebaseProjectId + '.firebaseio.com';
    };
    /**
     * get firebase database url
     * @returns {string}
     */
    ConfigModel.prototype.getFirebaseApiKey = function () {
        return this.firebaseApiKey;
    };
    /**
     * set firebase project id
     * @param firebaseProjectId
     * @returns {ConfigModel}
     */
    ConfigModel.prototype.setFirebaseProjectId = function (firebaseProjectId) {
        this.firebaseProjectId = firebaseProjectId;
        return this;
    };
    return ConfigModel;
}(appsapp_cli_1.PersistableModel));
exports.ConfigModel = ConfigModel;
