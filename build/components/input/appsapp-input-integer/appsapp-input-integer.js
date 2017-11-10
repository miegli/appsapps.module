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
import { Component, Output } from '@angular/core';
import { AppsappInputAbstractComponent } from '../appsapp-input-abstract';
/**
 * Generated class for the AppsappInputNumberComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var AppsappInputIntegerComponent = (function (_super) {
    __extends(AppsappInputIntegerComponent, _super);
    function AppsappInputIntegerComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.__type = 'default';
        _this.__min = 0;
        _this.__max = 0;
        return _this;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    AppsappInputIntegerComponent.prototype.modelChanges = function (event) {
        this.model.setProperty(this.property, parseInt(event));
    };
    /**
     * trigger befor init method
     * @return {?}
     */
    AppsappInputIntegerComponent.prototype.beforeInit = function () {
        if (this.model.getMetadataValue(this.property, 'max') <= 25) {
            this.__type = 'stepper';
            this.__min = this.model.getMetadataValue(this.property, 'min') ? this.model.getMetadataValue(this.property, 'min') : 0;
            this.__max = this.model.getMetadataValue(this.property, 'max') ? this.model.getMetadataValue(this.property, 'max') : 999999999;
        }
        else {
            this.setMbscOption({
                scale: 0,
                max: this.model.getMetadataValue(this.property, 'max') ? this.model.getMetadataValue(this.property, 'max') : 999999999,
                min: this.model.getMetadataValue(this.property, 'min') ? this.model.getMetadataValue(this.property, 'min') : 0
            });
        }
    };
    /**
     *
     * @param {?} config
     * @return {?}
     */
    AppsappInputIntegerComponent.prototype.afterInit = function (config) {
    };
    return AppsappInputIntegerComponent;
}(AppsappInputAbstractComponent));
export { AppsappInputIntegerComponent };
AppsappInputIntegerComponent.decorators = [
    { type: Component, args: [{
                selector: 'appsapp-input-integer',
                template: "\n        <mbsc-form #mbscInstanceForm=\"mobiscroll\">\n            <ng-container [ngSwitch]=\"__type\">\n                <mbsc-input [error]=\"validator | async\"  *ngSwitchCase=\"'default'\" #mbscInstance=\"mobiscroll\" mbsc-numpad-decimal [ngModel]=\"_ngModelGettter | async\" (ngModelChange)=\"modelChanges($event)\">{{_label}}</mbsc-input>\n                <mbsc-stepper *ngSwitchCase=\"'stepper'\" #mbscInstance=\"mobiscroll\" [min]=\"__min\" [max]=\"__max\" [ngModel]=\"_ngModelGettter | async\" (ngModelChange)=\"modelChanges($event)\">{{_label}}\n                    <span class=\"mbsc-desc\">{{_description}}</span>\n                </mbsc-stepper>\n            </ng-container>\n        </mbsc-form>\n\n    "
            },] },
];
/**
 * @nocollapse
 */
AppsappInputIntegerComponent.ctorParameters = function () { return []; };
AppsappInputIntegerComponent.propDecorators = {
    '___type': [{ type: Output },],
    '___min': [{ type: Output },],
    '___max': [{ type: Output },],
};
function AppsappInputIntegerComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    AppsappInputIntegerComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    AppsappInputIntegerComponent.ctorParameters;
    /** @type {?} */
    AppsappInputIntegerComponent.propDecorators;
    /** @type {?} */
    AppsappInputIntegerComponent.prototype.__type;
    /** @type {?} */
    AppsappInputIntegerComponent.prototype.__min;
    /** @type {?} */
    AppsappInputIntegerComponent.prototype.__max;
}
