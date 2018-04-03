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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var appsapp_input_1 = require("./appsapp-input/appsapp-input");
/**
 * Generated class for the AppsappInputAbstractComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var AppsappInputAbstractComponent = /** @class */ (function (_super) {
    __extends(AppsappInputAbstractComponent, _super);
    function AppsappInputAbstractComponent(appsappModuleProvider, fb) {
        var _this = _super.call(this, appsappModuleProvider, fb) || this;
        _this.appsappModuleProvider = appsappModuleProvider;
        _this._name = '';
        _this._label = '';
        _this._labelPosition = '';
        _this._color = '';
        _this._description = '';
        _this._validationMetadata = {};
        _this._options = {};
        _this._hasErrors = false;
        _this._hasErrorsText = '';
        _this.errorStateMatcher = {
            isErrorState: function () {
                return _this._hasErrors;
            }
        };
        _this.hidden = false;
        _this.clearable = false;
        _this.errormsg = '';
        _this.placeholder = '';
        _this.description = '';
        _this.required = false;
        return _this;
    }
    /**.
     * init with config model
     * @param {ConfigModel} config
     */
    AppsappInputAbstractComponent.prototype.init = function (config) {
    };
    /**.
     * priviate init with config model
     * @param {ConfigModel} config
     */
    AppsappInputAbstractComponent.prototype._init = function (config) {
        var _this = this;
        var self = this;
        this._options['lang'] = this.appsappModuleProvider.getLang();
        if (this.property) {
            if (!this.validator) {
                this.validator = this.model.getValidation(this.property);
                this.validator.subscribe(function (next) {
                    _this._hasErrors = next ? true : false;
                    if (!_this._hasErrors) {
                        _this._hasErrorsText = '';
                    }
                    else {
                        var m = '';
                        var validationError = next;
                        if (validationError.property == _this.property) {
                            Object.keys(validationError.constraints).forEach(function (constraint) {
                                if (m.length) {
                                    m += ', ';
                                }
                                m += validationError.constraints[constraint];
                            });
                        }
                        _this._hasErrorsText = m;
                    }
                });
            }
            var p = self.model.getMetadataValue(self.property, 'hasPlaceholder');
            this.placeholder = p ? p : '';
            var d = self.model.getMetadataValue(self.property, 'hasDescription');
            this.description = d ? d : '';
            if (self.model.getMetadataValue(self.property, 'hasClearable')) {
                this.clearable = true;
            }
            if (self.model.getMetadata(self.property).length) {
                if (self.model[self.property] === undefined || self.model[self.property] === null) {
                    self.model[self.property] = self.model.transformTypeFromMetadata[self.property];
                }
                if (self.model[self.property] === undefined) {
                    self.model[self.property] = '';
                }
                if (self.model.hasMetadata('isRequired')) {
                    this.required = true;
                }
            }
            this._ngModelGettter = self.model.getProperty(self.property);
        }
    };
    /**
     * clear properties value
     */
    AppsappInputAbstractComponent.prototype.clear = function () {
        this.model.clear(this.property);
        console.log(this.property, this.model);
        return this;
    };
    /**
     * get observable getter method
     * @returns {any}
     */
    AppsappInputAbstractComponent.prototype.get = function () {
        return this._ngModelGettter;
    };
    /**
     * set Mbsc Option
     * @param {Object} options
     */
    AppsappInputAbstractComponent.prototype.setMbscOption = function (options) {
    };
    /**
     * event before model changes
     * @param model
     * @param property
     * @param value
     * @returns {boolean} false, then model changes will not be executed
     */
    AppsappInputAbstractComponent.prototype.beforeModelChanges = function (model, property, value) {
        return true;
    };
    /**
     * model changes event
     * @param event
     */
    AppsappInputAbstractComponent.prototype.modelChanges = function (event) {
        if (this.beforeModelChanges(this.model, this.property, event)) {
            this.model.setProperty(this.property, event);
        }
    };
    AppsappInputAbstractComponent.prototype._beforeinit = function () {
        this._validationMetadata = this.model.getMetadata(this.property);
        this._name = this.property;
        this._label = this.label ? this.label : (this.model.getMetadataValue(this.property, 'hasLabel') ? this.model.getMetadataValue(this.property, 'hasLabel').label : (this._name ? this._name.toUpperCase() : ''));
        this._labelPosition = this.model.getMetadataValue(this.property, 'hasLabel') ? this.model.getMetadataValue(this.property, 'hasLabel').labelPosition : 'after';
        this._description = this.model.getMetadataValue(this.property, 'hasDescription');
        this._color = this.model.getMetadataValue(this.property, 'hasColor');
    };
    /**
     * ngAfterViewInit
     */
    AppsappInputAbstractComponent.prototype.ngOnInit = function () {
        this._beforeinit();
        this._init(this.config);
    };
    /**
     * ngAfterViewInit
     */
    AppsappInputAbstractComponent.prototype.ngAfterViewInit = function () {
        this.init(this.config);
    };
    /**
     * update property of the main model and main property
     * @param property
     * @param newvalue
     * @returns {any}
     */
    AppsappInputAbstractComponent.prototype.update = function (value) {
        var self = this;
        if (this.model) {
            self.model.setProperty(self.property, value);
            return this.model;
        }
        else {
            return null;
        }
    };
    __decorate([
        core_1.Output()
    ], AppsappInputAbstractComponent.prototype, "_hasErrorsText");
    __decorate([
        core_1.Output()
    ], AppsappInputAbstractComponent.prototype, "validator");
    __decorate([
        core_1.Output()
    ], AppsappInputAbstractComponent.prototype, "errorStateMatcher");
    __decorate([
        core_1.Output()
    ], AppsappInputAbstractComponent.prototype, "hidden");
    __decorate([
        core_1.Output()
    ], AppsappInputAbstractComponent.prototype, "clearable");
    __decorate([
        core_1.Output()
    ], AppsappInputAbstractComponent.prototype, "errormsg");
    __decorate([
        core_1.Output()
    ], AppsappInputAbstractComponent.prototype, "placeholder");
    __decorate([
        core_1.Output()
    ], AppsappInputAbstractComponent.prototype, "description");
    __decorate([
        core_1.Output()
    ], AppsappInputAbstractComponent.prototype, "required");
    AppsappInputAbstractComponent = __decorate([
        core_1.Component({
            template: ''
        })
    ], AppsappInputAbstractComponent);
    return AppsappInputAbstractComponent;
}(appsapp_input_1.AppsappInputComponent));
exports.AppsappInputAbstractComponent = AppsappInputAbstractComponent;
