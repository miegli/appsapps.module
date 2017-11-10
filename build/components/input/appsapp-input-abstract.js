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
import { Component, Output, ViewChild } from '@angular/core';
import { AppsappInputComponent } from './appsapp-input/appsapp-input';
import { AppsappModuleProvider } from '../../providers/appsapp-module-provider';
/**
 * Generated class for the AppsappInputAbstractComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var AppsappInputAbstractComponent = (function (_super) {
    __extends(AppsappInputAbstractComponent, _super);
    /**
     * @param {?} appsappModuleProvider
     */
    function AppsappInputAbstractComponent(appsappModuleProvider) {
        var _this = _super.call(this, appsappModuleProvider) || this;
        _this.appsappModuleProvider = appsappModuleProvider;
        _this._name = '';
        _this._label = '';
        _this._description = '';
        _this._validationMetadata = {};
        _this.hidden = false;
        _this.errormsg = '';
        _this.init();
        return _this;
    }
    /**
     * init with config model
     * @param {?=} config
     * @return {?}
     */
    AppsappInputAbstractComponent.prototype.init = function (config) {
        if (this.property) {
            if (!this.validator) {
                this.validator = this.model.getValidation(this.property);
            }
            if (!this._ngModelGettter) {
                this._ngModelGettter = this.model.getProperty(this.property);
            }
        }
        if (config) {
            var /** @type {?} */ theme = 'material';
            if (config.getOs() == 'ios') {
                theme = 'ios';
            }
            if (config.getOs() == 'windows') {
                theme = 'wp';
            }
            if (config.getOs() == 'desktop') {
                theme = 'material';
            }
            var /** @type {?} */ option = {
                theme: theme,
                lang: 'de'
            };
            if (this.mbsc) {
                this.mbsc.instance.option(option);
            }
            if (this.mbscForm) {
                this.mbscForm.instance.option(option);
            }
            this.afterInit(config);
            this._config = config;
        }
    };
    /**
     * trigger befor init method
     * @return {?}
     */
    AppsappInputAbstractComponent.prototype.beforeInit = function () {
    };
    /**
     * trigger after init method
     * @param {?} options
     * @return {?}
     */
    AppsappInputAbstractComponent.prototype.afterInit = function (options) {
    };
    /**
     * get observable getter method
     * @return {?}
     */
    AppsappInputAbstractComponent.prototype.get = function () {
        return this._ngModelGettter;
    };
    /**
     * set Mbsc Option
     * @param {?} option
     * @return {?}
     */
    AppsappInputAbstractComponent.prototype.setMbscOption = function (option) {
        if (this.mbsc !== undefined) {
            this.mbsc.instance.option(option);
        }
    };
    /**
     * event before model changes
     * @param {?} model
     * @param {?} property
     * @param {?} value
     * @return {?}
     */
    AppsappInputAbstractComponent.prototype.beforeModelChanges = function (model, property, value) {
        return true;
    };
    /**
     * call after constructor
     * @return {?}
     */
    AppsappInputAbstractComponent.prototype.afterConstructor = function () {
    };
    /**
     * model changes event
     * @param {?} event
     * @return {?}
     */
    AppsappInputAbstractComponent.prototype.modelChanges = function (event) {
        if (this.beforeModelChanges(this.model, this.property, event)) {
            this.model.setProperty(this.property, event);
        }
    };
    /**
     * @return {?}
     */
    AppsappInputAbstractComponent.prototype.ngOnInit = function () {
        var /** @type {?} */ self = this;
        this.afterConstructor();
        this._validationMetadata = this.model.getMetadata(this.property);
        this._name = this.property;
        this._label = this.label ? this.label : (this.model.getMetadataValue(this.property, 'hasLabel') ? this.model.getMetadataValue(this.property, 'hasLabel') : (this._name ? this._name.toUpperCase() : ''));
        this._description = this.model.getMetadataValue(this.property, 'hasDescription');
    };
    /**
     * ngAfterViewInit
     * @return {?}
     */
    AppsappInputAbstractComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var /** @type {?} */ self = this;
        if (this.config) {
            this.config.getObservable().subscribe(function (config) {
                _this.beforeInit();
                _this.init(config);
            });
        }
    };
    return AppsappInputAbstractComponent;
}(AppsappInputComponent));
export { AppsappInputAbstractComponent };
AppsappInputAbstractComponent.decorators = [
    { type: Component, args: [{
                template: ''
            },] },
];
/**
 * @nocollapse
 */
AppsappInputAbstractComponent.ctorParameters = function () { return [
    { type: AppsappModuleProvider, },
]; };
AppsappInputAbstractComponent.propDecorators = {
    'validator': [{ type: Output },],
    'hidden': [{ type: Output },],
    'errormsg': [{ type: Output },],
    'mbsc': [{ type: ViewChild, args: ['mbscInstance',] },],
    'mbscForm': [{ type: ViewChild, args: ['mbscInstanceForm',] },],
};
function AppsappInputAbstractComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    AppsappInputAbstractComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    AppsappInputAbstractComponent.ctorParameters;
    /** @type {?} */
    AppsappInputAbstractComponent.propDecorators;
    /** @type {?} */
    AppsappInputAbstractComponent.prototype._name;
    /** @type {?} */
    AppsappInputAbstractComponent.prototype._label;
    /** @type {?} */
    AppsappInputAbstractComponent.prototype._description;
    /** @type {?} */
    AppsappInputAbstractComponent.prototype._ngModelGettter;
    /** @type {?} */
    AppsappInputAbstractComponent.prototype._validationMetadata;
    /** @type {?} */
    AppsappInputAbstractComponent.prototype._config;
    /** @type {?} */
    AppsappInputAbstractComponent.prototype.validator;
    /** @type {?} */
    AppsappInputAbstractComponent.prototype.hidden;
    /** @type {?} */
    AppsappInputAbstractComponent.prototype.errormsg;
    /** @type {?} */
    AppsappInputAbstractComponent.prototype.mbsc;
    /** @type {?} */
    AppsappInputAbstractComponent.prototype.mbscForm;
    /** @type {?} */
    AppsappInputAbstractComponent.prototype.appsappModuleProvider;
}
