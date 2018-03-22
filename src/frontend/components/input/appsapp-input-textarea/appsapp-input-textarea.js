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
 * Generated class for the AppsappInputTextareaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var AppsappInputTextareaComponent = /** @class */ (function (_super) {
    __extends(AppsappInputTextareaComponent, _super);
    function AppsappInputTextareaComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.maxLength = 0;
        _this.currentLength = 0;
        return _this;
    }
    /**
     *
     * @param {ConfigModel} config
     */
    AppsappInputTextareaComponent.prototype.init = function (config) {
        var self = this;
        this.maxLength = this.model.getMetadataValue(this.property, 'isText') ? this.model.getMetadataValue(this.property, 'isText') : 0;
        this.label = this._label;
    };
    /**
     * event before model changes
     * @param model
     * @param property
     * @param value
     * @returns {boolean} false, then model changes will not be executed
     */
    AppsappInputTextareaComponent.prototype.beforeModelChanges = function (model, property, value) {
        if (this.maxLength) {
            this.currentLength = value.length;
            this._label = this.label + ' (' + (this.currentLength < this.maxLength ? this.currentLength : this.maxLength) + " / " + this.maxLength + ")";
            if (value.length > this.maxLength) {
                this.update(value.substr(0, this.maxLength));
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return true;
        }
    };
    AppsappInputTextareaComponent = __decorate([
        core_1.Component({
            selector: 'appsapp-input-textarea',
            template: "\n       \n            <mbsc-textarea [error]=\"validator | async\" [ngModel]=\"_ngModelGettter \" [placeholder]=\"placeholder\" (ngModelChange)=\"modelChanges($event)\">{{_label}}</mbsc-textarea>\n   \n\n    "
        })
    ], AppsappInputTextareaComponent);
    return AppsappInputTextareaComponent;
}(appsapp_input_abstract_1.AppsappInputAbstractComponent));
exports.AppsappInputTextareaComponent = AppsappInputTextareaComponent;
