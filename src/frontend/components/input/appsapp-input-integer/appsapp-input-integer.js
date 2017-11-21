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
var AppsappInputIntegerComponent = (function (_super) {
    __extends(AppsappInputIntegerComponent, _super);
    function AppsappInputIntegerComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.__type = 'default';
        _this.__min = 0;
        _this.__max = 0;
        return _this;
    }
    AppsappInputIntegerComponent.prototype.modelChanges = function (event) {
        this.model.setProperty(this.property, parseInt(event));
    };
    /**
     * trigger befor init method
     */
    AppsappInputIntegerComponent.prototype.beforeInit = function () {
        if (this.model.getMetadataValue(this.property, 'max') <= 25) {
            this.__type = 'stepper';
            this.__min = this.model.getMetadataValue(this.property, 'min') ? this.model.getMetadataValue(this.property, 'min') : 0;
            this.__max = this.model.getMetadataValue(this.property, 'max') ? this.model.getMetadataValue(this.property, 'max') : 999999999;
        }
        else {
            this.setMbscOption({
                scale: 0,
                max: this.model.getMetadataValue(this.property, 'max') ? this.model.getMetadataValue(this.property, 'max') : 999999999,
                min: this.model.getMetadataValue(this.property, 'min') ? this.model.getMetadataValue(this.property, 'min') : 0
            });
        }
    };
    /**
     *
     * @param {ConfigModel} config
     */
    AppsappInputIntegerComponent.prototype.afterInit = function (config) {
    };
    return AppsappInputIntegerComponent;
}(appsapp_input_abstract_1.AppsappInputAbstractComponent));
__decorate([
    core_1.Output()
], AppsappInputIntegerComponent.prototype, "__type");
__decorate([
    core_1.Output()
], AppsappInputIntegerComponent.prototype, "__min");
__decorate([
    core_1.Output()
], AppsappInputIntegerComponent.prototype, "__max");
AppsappInputIntegerComponent = __decorate([
    core_1.Component({
        selector: 'appsapp-input-integer',
        template: "\n        <mbsc-form #mbscInstanceForm=\"mobiscroll\">\n            <ng-container [ngSwitch]=\"__type\">\n                <mbsc-input [error]=\"validator | async\"  *ngSwitchCase=\"'default'\" #mbscInstance=\"mobiscroll\" mbsc-numpad-decimal [ngModel]=\"_ngModelGettter | async\" (ngModelChange)=\"modelChanges($event)\">{{_label}}</mbsc-input>\n                <mbsc-stepper *ngSwitchCase=\"'stepper'\" #mbscInstance=\"mobiscroll\" [min]=\"__min\" [max]=\"__max\" [ngModel]=\"_ngModelGettter | async\" (ngModelChange)=\"modelChanges($event)\">{{_label}}\n                    <span class=\"mbsc-desc\">{{_description}}</span>\n                </mbsc-stepper>\n            </ng-container>\n        </mbsc-form>\n\n    "
    })
], AppsappInputIntegerComponent);
exports.AppsappInputIntegerComponent = AppsappInputIntegerComponent;
