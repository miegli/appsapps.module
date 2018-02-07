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
var AppsappInputTimeComponent = /** @class */ (function (_super) {
    __extends(AppsappInputTimeComponent, _super);
    function AppsappInputTimeComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isInline = false;
        return _this;
    }
    /**
     * trigger befor init method
     */
    AppsappInputTimeComponent.prototype.beforeInit = function () {
        this.model[this.property] = typeof this.model[this.property] == 'string' ? new Date(this.model[this.property]) : this.model[this.property];
    };
    AppsappInputTimeComponent.prototype.beforeModelChanges = function (model, property, value) {
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
    AppsappInputTimeComponent.prototype.afterInit = function (config) {
        if (this.model.getMetadataValue(this.property, 'max')) {
            var max = this.model.getMetadataValue(this.property, 'max');
            this.setMbscOption({ max: max });
        }
        if (this.model.getMetadataValue(this.property, 'min')) {
            var min = this.model.getMetadataValue(this.property, 'min');
            this.setMbscOption({ min: min });
        }
        var options = this.model.getMetadataValue(this.property, 'isTime');
        if (options) {
            if (options.invalid) {
                this.setMbscOption({ invalid: options.invalid });
            }
            if (options.steps) {
                this.setMbscOption({ steps: options.steps });
            }
            if (options.timeFormat) {
                this.setMbscOption({ timeFormat: options.timeFormat });
            }
            if (options.display == 'inline') {
                this.isInline = true;
            }
        }
        this.setMbscOption({
            display: options && options.display ? options.display : (config.getOs() !== 'desktop' ? 'bottom' : 'center')
        });
    };
    __decorate([
        core_1.Output()
    ], AppsappInputTimeComponent.prototype, "isInline");
    AppsappInputTimeComponent = __decorate([
        core_1.Component({
            selector: 'appsapp-input-time',
            template: "\n     \n            <mbsc-input [ngClass]=\"{isInline: isInline}\" [error]=\"validator | async\"  #mbscInstance=\"mobiscroll\" mbsc-time [ngModel]=\"_ngModelGettter | async\"\n                        (ngModelChange)=\"modelChanges($event)\">{{_label}}</mbsc-input>\n   \n\n    "
        })
    ], AppsappInputTimeComponent);
    return AppsappInputTimeComponent;
}(appsapp_input_abstract_1.AppsappInputAbstractComponent));
exports.AppsappInputTimeComponent = AppsappInputTimeComponent;
