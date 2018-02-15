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
 * Generated class for the AppsappInputBirthdayComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var AppsappInputBirthdayComponent = /** @class */ (function (_super) {
    __extends(AppsappInputBirthdayComponent, _super);
    function AppsappInputBirthdayComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isInline = false;
        return _this;
    }
    AppsappInputBirthdayComponent.prototype.beforeModelChanges = function (model, property, value) {
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
    AppsappInputBirthdayComponent.prototype.afterInit = function (config) {
        if (this.model.getMetadataValue(this.property, 'maxDate')) {
            var maxDate = this.model.getMetadataValue(this.property, 'maxDate');
            this.setMbscOption({ max: maxDate });
        }
        else {
            var maxDate = new Date();
            this.setMbscOption({ max: maxDate });
        }
        var options = this.model.getMetadataValue(this.property, 'isBirthday');
        if (options) {
            if (options.display && options.display == 'inline') {
                this.isInline = true;
            }
        }
        if (this.model.getMetadataValue(this.property, 'minDate')) {
            var minDate = this.model.getMetadataValue(this.property, 'minDate');
            this.setMbscOption({ min: minDate });
        }
        this.setMbscOption({
            display: config.getOs() !== 'desktop' ? 'bottom' : 'center'
        });
    };
    AppsappInputBirthdayComponent = __decorate([
        core_1.Component({
            selector: 'appsapp-input-birthday',
            template: "\n\n        <mbsc-input [ngClass]=\"{isInline: isInline}\" [error]=\"validator | async\" #mbscInstance=\"mobiscroll\" mbsc-date\n                    [ngModel]=\"_ngModelGettter | async\"\n                    (ngModelChange)=\"modelChanges($event)\">{{_label}}\n        </mbsc-input>\n\n\n    "
        })
    ], AppsappInputBirthdayComponent);
    return AppsappInputBirthdayComponent;
}(appsapp_input_abstract_1.AppsappInputAbstractComponent));
exports.AppsappInputBirthdayComponent = AppsappInputBirthdayComponent;
