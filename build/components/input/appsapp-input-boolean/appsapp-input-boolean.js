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
 * Generated class for the AppsappInputBooleanComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var AppsappInputBooleanComponent = (function (_super) {
    __extends(AppsappInputBooleanComponent, _super);
    function AppsappInputBooleanComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AppsappInputBooleanComponent;
}(AppsappInputAbstractComponent));
export { AppsappInputBooleanComponent };
AppsappInputBooleanComponent.decorators = [
    { type: Component, args: [{
                selector: 'appsapp-input-boolean',
                template: "\n        <mbsc-form #mbscInstanceForm=\"mobiscroll\">\n            <mbsc-switch [ngModel]=\"_ngModelGettter | async\" (ngModelChange)=\"modelChanges($event)\">{{_label}}\n                <span class=\"mbsc-desc\">{{_description}}</span>\n            </mbsc-switch>\n        </mbsc-form>\n\n            "
            },] },
];
/**
 * @nocollapse
 */
AppsappInputBooleanComponent.ctorParameters = function () { return []; };
function AppsappInputBooleanComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    AppsappInputBooleanComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    AppsappInputBooleanComponent.ctorParameters;
}
