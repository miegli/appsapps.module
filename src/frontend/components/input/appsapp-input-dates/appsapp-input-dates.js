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
 * Generated class for the AppsappInputDatesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var AppsappInputDatesComponent = /** @class */ (function (_super) {
    __extends(AppsappInputDatesComponent, _super);
    function AppsappInputDatesComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.range = [];
        _this.locked = false;
        _this.isInline = false;
        return _this;
    }
    /**
     *
     * @param {ConfigModel} config
     */
    AppsappInputDatesComponent.prototype.init = function (config) {
        var self = this;
        this.get().subscribe(function (value) {
            if (!self.locked && value && value.length == 2) {
                self.range = [new Date(value[0]), new Date(value[1])];
            }
        });
        this.setMbscOption({
            onShow: function (event, inst) {
                self.locked = true;
            },
            onCancel: function (event, inst) {
                self.locked = false;
            },
            onSet: function (event, inst) {
                var from = new Date(inst._startDate);
                var to = new Date(inst._endDate);
                self.model.setProperty(self.property, [from, to]);
                self.locked = false;
            }
        });
        var options = this.model.getMetadataValue(this.property, 'isDateRange');
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
            if (options.timeFormat) {
                this.setMbscOption({ timeFormat: options.timeFormat });
            }
            if (options.display && options.display == 'inline') {
                this.isInline = true;
            }
        }
        this.setMbscOption({
            display: options && options.display ? options.display : (config.getOs() !== 'desktop' ? 'bottom' : 'center')
        });
    };
    AppsappInputDatesComponent.prototype.beforeModelChanges = function (model, property, value) {
        return false;
    };
    __decorate([
        core_1.Input()
    ], AppsappInputDatesComponent.prototype, "range");
    AppsappInputDatesComponent = __decorate([
        core_1.Component({
            selector: 'appsapp-input-dates',
            template: "\n       \n            <mbsc-input [ngClass]=\"{isInline: isInline}\" [error]=\"validator | async\"  #mbscInstance=\"mobiscroll\" mbsc-range [ngModel]=\"range\"\n                        (ngModelChange)=\"modelChanges($event)\">{{_label}}\n            </mbsc-input>\n     \n\n    "
        })
    ], AppsappInputDatesComponent);
    return AppsappInputDatesComponent;
}(appsapp_input_abstract_1.AppsappInputAbstractComponent));
exports.AppsappInputDatesComponent = AppsappInputDatesComponent;
