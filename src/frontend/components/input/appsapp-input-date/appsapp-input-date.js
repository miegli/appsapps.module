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
 * Generated class for the AppsappInputDateComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var AppsappInputDateComponent = (function (_super) {
    __extends(AppsappInputDateComponent, _super);
    function AppsappInputDateComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppsappInputDateComponent.prototype.beforeModelChanges = function (model, property, value) {
        // create iso date
        var date = Date.parse(value);
        value = !isNaN(date) ? new Date(date) : null;
        console.log(property, value);
        model.setProperty(property, value);
        return false;
    };
    /**
     *
     * @param {ConfigModel} config
     */
    AppsappInputDateComponent.prototype.afterInit = function (config) {
        if (this.model.getMetadataValue(this.property, 'maxDate')) {
            var maxDate = this.model.getMetadataValue(this.property, 'maxDate');
            this.setMbscOption({ max: maxDate });
        }
        if (this.model.getMetadataValue(this.property, 'minDate')) {
            var minDate = this.model.getMetadataValue(this.property, 'minDate');
            this.setMbscOption({ min: minDate });
        }
        var options = this.model.getMetadataValue(this.property, 'calendar');
        if (options) {
            if (options.maxDate) {
                this.setMbscOption({ max: options.maxDate });
            }
            if (options.minDate) {
                this.setMbscOption({ min: options.minDate });
            }
            if (options.invalid) {
                this.setMbscOption({ invalid: options.invalid });
            }
            if (options.controls) {
                this.setMbscOption({ controls: options.controls });
            }
            if (options.steps) {
                this.setMbscOption({ steps: options.steps });
            }
        }
        this.setMbscOption({
            display: options && options.display ? options.display : (config.getOs() !== 'desktop' ? 'bottom' : 'center')
        });
    };
    return AppsappInputDateComponent;
}(appsapp_input_abstract_1.AppsappInputAbstractComponent));
AppsappInputDateComponent = __decorate([
    core_1.Component({
        selector: 'appsapp-input-date',
        template: "\n        <mbsc-form #mbscInstanceForm=\"mobiscroll\">\n            <mbsc-input [error]=\"validator | async\"  #mbscInstance=\"mobiscroll\" mbsc-calendar [ngModel]=\"_ngModelGettter | async\"\n                        (ngModelChange)=\"modelChanges($event)\">{{_label}}</mbsc-input>\n        </mbsc-form>\n\n    "
    })
], AppsappInputDateComponent);
exports.AppsappInputDateComponent = AppsappInputDateComponent;