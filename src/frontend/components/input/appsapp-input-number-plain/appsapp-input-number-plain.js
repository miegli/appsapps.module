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
var appsapp_input_abstract_1 = require("../appsapp-input-abstract");
/**
 * Generated class for the AppsappInputNumberComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var AppsappInputNumberPlainComponent = (function (_super) {
    __extends(AppsappInputNumberPlainComponent, _super);
    function AppsappInputNumberPlainComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.precision = 0;
        _this.isInt = false;
        _this.max = null;
        _this.lastvalue = null;
        return _this;
    }
    /**
     *
     * @param {ConfigModel} config
     */
    AppsappInputNumberPlainComponent.prototype.afterInit = function (config) {
        if (this.model.getMetadata(this.property, 'isPrecision').length) {
            this.precision = this.model.getMetadataValue(this.property, 'isPrecision');
        }
        if (this.model.getMetadata(this.property, 'isInt').length) {
            this.isInt = true;
        }
        if (this.model.getMetadata(this.property, 'max').length) {
            this.max = this.model.getMetadataValue(this.property, 'max');
        }
    };
    /**
     *
     * @param model
     * @param property
     * @param value
     */
    AppsappInputNumberPlainComponent.prototype.beforeModelChanges = function (model, property, value) {
        var changed = false;
        if (this.isInt) {
            var v = parseInt(value);
            if (v && v !== NaN && typeof v == 'number') {
                value = v;
            }
            else {
                value = null;
            }
            changed = true;
        }
        if (this.max !== null && value > this.max) {
            value = this.lastvalue;
            changed = true;
        }
        if (this.precision) {
            var v = parseFloat(value);
            var c = v.toFixed(this.precision);
            if (c.toString().length < v.toString().length) {
                changed = true;
                value = c;
            }
        }
        this.lastvalue = value;
        if (changed) {
            this.update(value);
            return false;
        }
        else {
            return true;
        }
    };
    return AppsappInputNumberPlainComponent;
}(appsapp_input_abstract_1.AppsappInputAbstractComponent));
AppsappInputNumberPlainComponent = __decorate([
    core_1.Component({
        selector: 'appsapp-input-number-plain',
        template: "\n      \n        <mbsc-input [error]=\"validator | async\" [ngModel]=\"_ngModelGettter | async\" type=\"number\" (ngModelChange)=\"modelChanges($event)\">{{_label}}</mbsc-input>\n   \n    "
    })
], AppsappInputNumberPlainComponent);
exports.AppsappInputNumberPlainComponent = AppsappInputNumberPlainComponent;
