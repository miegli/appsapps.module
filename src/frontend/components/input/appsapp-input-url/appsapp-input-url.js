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
 * Generated class for the AppsappInputUrlComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var AppsappInputUrlComponent = /** @class */ (function (_super) {
    __extends(AppsappInputUrlComponent, _super);
    function AppsappInputUrlComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppsappInputUrlComponent = __decorate([
        core_1.Component({
            selector: 'appsapp-input-url',
            template: "\n        \n            <mbsc-input [error]=\"validator | async\" [placeholder]=\"placeholder\" type=\"url\" [ngModel]=\"_ngModelGettter \" (ngModelChange)=\"modelChanges($event)\">{{_label}}</mbsc-input>\n       \n\n    "
        })
    ], AppsappInputUrlComponent);
    return AppsappInputUrlComponent;
}(appsapp_input_abstract_1.AppsappInputAbstractComponent));
exports.AppsappInputUrlComponent = AppsappInputUrlComponent;
