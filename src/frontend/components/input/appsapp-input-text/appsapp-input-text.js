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
        _this.max = 0;
        return _this;
    }
    /**
     *
     * @param {ConfigModel} config
     */
    AppsappInputTextComponent.prototype.init = function (config) {
        if (this.model.getMetadata(this.property, 'maxLength').length) {
            this.max = this.model.getMetadataValue(this.property, 'maxLength');
        }
        if (this.max === null && this.model.getMetadata(this.property, 'length').length) {
            this.max = this.model.getMetadataValue(this.property, 'length')[1];
        }
    };
    __decorate([
        core_1.Output()
    ], AppsappInputTextComponent.prototype, "max");
    AppsappInputTextComponent = __decorate([
        core_1.Component({
            selector: 'appsapp-input-text',
            template: "\n\n      <mat-form-field style=\"width:100%\"\n                      [hideRequiredMarker]=\"formGroupOptions.value.hideRequired\"\n                      [floatLabel]=\"formGroupOptions.value.floatLabel\">\n          <input (ngModelChange)=\"modelChanges($event)\" [errorStateMatcher]=\"errorStateMatcher\" [maxlength]=\"max\" [ngModel]=\"_ngModelGettter | async\" matInput [placeholder]=\"placeholder\"  [required]=\"required\">\n          <mat-label>{{_label}}</mat-label>\n          <mat-hint align=\"start\" *ngIf=\"description.length\">{{description}}</mat-hint>\n          <mat-hint align=\"end\" *ngIf=\"max && model[property]\">{{model[property].length}} / {{max}}</mat-hint>\n          <mat-error *ngIf=\"_hasErrorsText.length\">{{_hasErrorsText}}</mat-error>\n          <button mat-button *ngIf=\"clearable &&  model[property] &&  model[property].length\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"clear()\">\n              <mat-icon>close</mat-icon>\n          </button>\n      </mat-form-field>\n\n  "
        })
    ], AppsappInputTextComponent);
    return AppsappInputTextComponent;
}(appsapp_input_abstract_1.AppsappInputAbstractComponent));
exports.AppsappInputTextComponent = AppsappInputTextComponent;
