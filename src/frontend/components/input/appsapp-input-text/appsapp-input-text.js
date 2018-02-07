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
 * Generated class for the AppsappInputTextComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var AppsappInputTextComponent = /** @class */ (function (_super) {
    __extends(AppsappInputTextComponent, _super);
    function AppsappInputTextComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.max = null;
        _this.lastvalue = null;
        return _this;
    }
    /**
     *
     * @param {ConfigModel} config
     */
    AppsappInputTextComponent.prototype.afterInit = function (config) {
        if (this.model.getMetadata(this.property, 'maxLength').length) {
            this.max = this.model.getMetadataValue(this.property, 'maxLength');
        }
        if (this.max === null && this.model.getMetadata(this.property, 'length').length) {
            this.max = this.model.getMetadataValue(this.property, 'length')[1];
        }
    };
    /**
     *
     * @param model
     * @param property
     * @param value
     */
    AppsappInputTextComponent.prototype.beforeModelChanges = function (model, property, value) {
        var self = this;
        var changed = false;
        if (this.max !== null && value.length > this.max) {
            value = this.lastvalue;
            changed = true;
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
    AppsappInputTextComponent = __decorate([
        core_1.Component({
            selector: 'appsapp-input-text',
            template: "\n    \n      <mbsc-input [error]=\"validator | async\" [placeholder]=\"placeholder\" [ngModel]=\"_ngModelGettter | async\"\n                  (ngModelChange)=\"modelChanges($event)\">{{_label}}\n      </mbsc-input>\n  \n\n  "
        })
    ], AppsappInputTextComponent);
    return AppsappInputTextComponent;
}(appsapp_input_abstract_1.AppsappInputAbstractComponent));
exports.AppsappInputTextComponent = AppsappInputTextComponent;
