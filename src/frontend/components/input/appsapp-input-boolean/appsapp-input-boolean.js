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
 * Generated class for the AppsappInputBooleanComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var AppsappInputBooleanComponent = /** @class */ (function (_super) {
    __extends(AppsappInputBooleanComponent, _super);
    function AppsappInputBooleanComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        core_1.Input('aria-label')
    ], AppsappInputBooleanComponent.prototype, "ariaLabel");
    __decorate([
        core_1.Input('aria-labelledby')
    ], AppsappInputBooleanComponent.prototype, "ariaLabelledby");
    __decorate([
        core_1.Input()
    ], AppsappInputBooleanComponent.prototype, "color");
    __decorate([
        core_1.Input()
    ], AppsappInputBooleanComponent.prototype, "disableRipple");
    __decorate([
        core_1.Input()
    ], AppsappInputBooleanComponent.prototype, "disabled");
    __decorate([
        core_1.Input()
    ], AppsappInputBooleanComponent.prototype, "labelPosition");
    __decorate([
        core_1.Input()
    ], AppsappInputBooleanComponent.prototype, "name");
    __decorate([
        core_1.Input()
    ], AppsappInputBooleanComponent.prototype, "required");
    AppsappInputBooleanComponent = __decorate([
        core_1.Component({
            selector: 'appsapp-input-boolean',
            template: "\n        <div class=\"mat-form-field-wrapper\" style=\"width:100%\">\n            <mat-slide-toggle style=\"width:100%\" [ngModel]=\"_ngModelGettter | async\"\n                              (ngModelChange)=\"modelChanges($event)\" [checked]=\"_ngModelGettter | async\"\n                              [color]=\"_color\" [labelPosition]=\"_labelPosition\">{{_label}}\n            </mat-slide-toggle>\n        </div>\n    "
        })
    ], AppsappInputBooleanComponent);
    return AppsappInputBooleanComponent;
}(appsapp_input_abstract_1.AppsappInputAbstractComponent));
exports.AppsappInputBooleanComponent = AppsappInputBooleanComponent;
