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
var AppsappInputDateComponent = /** @class */ (function (_super) {
    __extends(AppsappInputDateComponent, _super);
    function AppsappInputDateComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isInline = false;
        return _this;
    }
    AppsappInputDateComponent.prototype.beforeModelChanges = function (model, property, value) {
        // create iso date
        var date = Date.parse(value);
        value = !isNaN(date) ? new Date(date) : null;
        model.setProperty(property, value);
        return false;
    };
    /**
     *
     * @param {ConfigModel} config
     */
    AppsappInputDateComponent.prototype.init = function (config) {
        if (this.model) {
            if (this.model.getMetadataValue(this.property, 'maxDate')) {
                var maxDate = this.model.getMetadataValue(this.property, 'maxDate');
                this.setMbscOption({ max: maxDate });
            }
            if (this.model.getMetadataValue(this.property, 'minDate')) {
                var minDate = this.model.getMetadataValue(this.property, 'minDate');
                this.setMbscOption({ min: minDate });
            }
            var options = this.model.getMetadataValue(this.property, 'isCalendar');
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
                if (options.weeks) {
                    this.setMbscOption({ weeks: options.weeks });
                }
                if (options.display == 'inline') {
                    this.isInline = true;
                }
            }
            this.setMbscOption({
                display: options && options.display ? options.display : (config.getOs() !== 'desktop' ? 'bottom' : 'center')
            });
        }
    };
    __decorate([
        core_1.Output()
    ], AppsappInputDateComponent.prototype, "isInline");
    AppsappInputDateComponent = __decorate([
        core_1.Component({
            selector: 'appsapp-input-date',
            template: "\n        <mbsc-input [ngClass]=\"{isInline: isInline}\" [error]=\"validator | async\" #mbscInstance=\"mobiscroll\"\n                    mbsc-calendar [ngModel]=\"_ngModelGettter \"\n                    (ngModelChange)=\"modelChanges($event)\"><span *ngIf=\"!isInline\">{{_label}}</span></mbsc-input>\n\n\n    "
        })
    ], AppsappInputDateComponent);
    return AppsappInputDateComponent;
}(appsapp_input_abstract_1.AppsappInputAbstractComponent));
exports.AppsappInputDateComponent = AppsappInputDateComponent;
