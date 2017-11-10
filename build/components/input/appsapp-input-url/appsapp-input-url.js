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
 * Generated class for the AppsappInputUrlComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var AppsappInputUrlComponent = (function (_super) {
    __extends(AppsappInputUrlComponent, _super);
    function AppsappInputUrlComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AppsappInputUrlComponent;
}(AppsappInputAbstractComponent));
export { AppsappInputUrlComponent };
AppsappInputUrlComponent.decorators = [
    { type: Component, args: [{
                selector: 'appsapp-input-url',
                template: "\n        <mbsc-form #mbscInstanceForm=\"mobiscroll\">\n            <mbsc-input [error]=\"validator | async\" type=\"url\" [ngModel]=\"_ngModelGettter | async\" (ngModelChange)=\"modelChanges($event)\">{{_label}}</mbsc-input>\n        </mbsc-form>\n\n    "
            },] },
];
/**
 * @nocollapse
 */
AppsappInputUrlComponent.ctorParameters = function () { return []; };
function AppsappInputUrlComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    AppsappInputUrlComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    AppsappInputUrlComponent.ctorParameters;
}
