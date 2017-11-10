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
import { Component } from '@angular/core';
import { AppsappInputAbstractComponent } from '../appsapp-input-abstract';
/**
 * Generated class for the AppsappInputPasswordComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var AppsappInputPasswordComponent = (function (_super) {
    __extends(AppsappInputPasswordComponent, _super);
    function AppsappInputPasswordComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AppsappInputPasswordComponent;
}(AppsappInputAbstractComponent));
export { AppsappInputPasswordComponent };
AppsappInputPasswordComponent.decorators = [
    { type: Component, args: [{
                selector: 'appsapp-input-password',
                template: "\n        <mbsc-form #mbscInstanceForm=\"mobiscroll\">\n            <mbsc-input [error]=\"validator | async\" type=\"password\" [password-toggle]=\"true\" [ngModel]=\"_ngModelGettter | async\" (ngModelChange)=\"modelChanges($event)\">{{_label}}</mbsc-input>\n        </mbsc-form>\n\n    "
            },] },
];
/**
 * @nocollapse
 */
AppsappInputPasswordComponent.ctorParameters = function () { return []; };
function AppsappInputPasswordComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    AppsappInputPasswordComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    AppsappInputPasswordComponent.ctorParameters;
}
