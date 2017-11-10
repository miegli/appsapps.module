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
 * Generated class for the AppsappInputNumberComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var AppsappInputNumberComponent = (function (_super) {
    __extends(AppsappInputNumberComponent, _super);
    function AppsappInputNumberComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     *
     * @param {?} config
     * @return {?}
     */
    AppsappInputNumberComponent.prototype.afterInit = function (config) {
        this.setMbscOption({
            scale: this.model.getMetadataValue(this.property, 'hasPrecision') ? this.model.getMetadataValue(this.property, 'hasPrecision') : 2,
            max: this.model.getMetadataValue(this.property, 'max') ? this.model.getMetadataValue(this.property, 'max') : 999999999,
            min: this.model.getMetadataValue(this.property, 'min') ? this.model.getMetadataValue(this.property, 'min') : 0
        });
    };
    return AppsappInputNumberComponent;
}(AppsappInputAbstractComponent));
export { AppsappInputNumberComponent };
AppsappInputNumberComponent.decorators = [
    { type: Component, args: [{
                selector: 'appsapp-input-number',
                template: "\n        <mbsc-form #mbscInstanceForm=\"mobiscroll\">\n            <mbsc-input [error]=\"validator | async\"  #mbscInstance=\"mobiscroll\" mbsc-numpad-decimal [ngModel]=\"_ngModelGettter | async\" (ngModelChange)=\"modelChanges($event)\">{{_label}}</mbsc-input>\n        </mbsc-form>\n\n    "
            },] },
];
/**
 * @nocollapse
 */
AppsappInputNumberComponent.ctorParameters = function () { return []; };
function AppsappInputNumberComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    AppsappInputNumberComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    AppsappInputNumberComponent.ctorParameters;
}
