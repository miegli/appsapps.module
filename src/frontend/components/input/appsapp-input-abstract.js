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
var AppsappInputAbstractComponent = (function (_super) {
    __extends(AppsappInputAbstractComponent, _super);
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
     * @param {ConfigModel} config
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
            var theme = 'material';
            if (config.getOs() == 'ios') {
                theme = 'ios';
            }
            if (config.getOs() == 'windows') {
                theme = 'wp';
            }
            if (config.getOs() == 'desktop') {
                theme = 'material';
            }
            var option = {
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
     */
    AppsappInputAbstractComponent.prototype.beforeInit = function () {
    };
    /**
     * trigger after init method
     * @param {ConfigModel}
     */
    AppsappInputAbstractComponent.prototype.afterInit = function (options) {
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
    AppsappInputAbstractComponent.prototype.setMbscOption = function (option) {
        if (this.mbsc !== undefined && this.mbsc.instance) {
            this.mbsc.instance.option(option);
        }
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
     * call after constructor
     */
    AppsappInputAbstractComponent.prototype.afterConstructor = function () {
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
    AppsappInputAbstractComponent.prototype.ngOnInit = function () {
        var self = this;
        this.afterConstructor();
        this._validationMetadata = this.model.getMetadata(this.property);
        this._name = this.property;
        this._label = this.label ? this.label : (this.model.getMetadataValue(this.property, 'hasLabel') ? this.model.getMetadataValue(this.property, 'hasLabel') : (this._name ? this._name.toUpperCase() : ''));
        this._description = this.model.getMetadataValue(this.property, 'hasDescription');
    };
    /**
     * ngAfterViewInit
     */
    AppsappInputAbstractComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var self = this;
        if (this.config) {
            this.config.getObservable().subscribe(function (config) {
                _this.beforeInit();
                _this.init(config);
            });
        }
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
            window.setTimeout(function () {
                self._ngModelGettter = self.model.update(self.property, value).setProperty(self.property, value).getProperty(self.property);
            }, 1);
            return this.model;
        }
        else {
            return null;
        }
    };
    return AppsappInputAbstractComponent;
}(appsapp_input_1.AppsappInputComponent));
__decorate([
    core_1.Output()
], AppsappInputAbstractComponent.prototype, "validator");
__decorate([
    core_1.Output()
], AppsappInputAbstractComponent.prototype, "hidden");
__decorate([
    core_1.Output()
], AppsappInputAbstractComponent.prototype, "errormsg");
__decorate([
    core_1.ViewChild('mbscInstance')
], AppsappInputAbstractComponent.prototype, "mbsc");
__decorate([
    core_1.ViewChild('mbscInstanceForm')
], AppsappInputAbstractComponent.prototype, "mbscForm");
AppsappInputAbstractComponent = __decorate([
    core_1.Component({
        template: ''
    })
], AppsappInputAbstractComponent);
exports.AppsappInputAbstractComponent = AppsappInputAbstractComponent;
