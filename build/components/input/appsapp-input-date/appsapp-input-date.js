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
 * Generated class for the AppsappInputDateComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var AppsappInputDateComponent = (function (_super) {
    __extends(AppsappInputDateComponent, _super);
    function AppsappInputDateComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} model
     * @param {?} property
     * @param {?} value
     * @return {?}
     */
    AppsappInputDateComponent.prototype.beforeModelChanges = function (model, property, value) {
        // create iso date
        var /** @type {?} */ date = Date.parse(value);
        value = !isNaN(date) ? new Date(date) : null;
        console.log(property, value);
        model.setProperty(property, value);
        return false;
    };
    /**
     *
     * @param {?} config
     * @return {?}
     */
    AppsappInputDateComponent.prototype.afterInit = function (config) {
        if (this.model.getMetadataValue(this.property, 'maxDate')) {
            var /** @type {?} */ maxDate = this.model.getMetadataValue(this.property, 'maxDate');
            this.setMbscOption({ max: maxDate });
        }
        if (this.model.getMetadataValue(this.property, 'minDate')) {
            var /** @type {?} */ minDate = this.model.getMetadataValue(this.property, 'minDate');
            this.setMbscOption({ min: minDate });
        }
        var /** @type {?} */ options = this.model.getMetadataValue(this.property, 'calendar');
        if (options) {
            if (options.maxDate) {
                this.setMbscOption({ max: options.maxDate });
            }
            if (options.minDate) {
                this.setMbscOption({ min: options.minDate });
            }
            if (options.invalid) {
                this.setMbscOption({ invalid: options.invalid });
            }
            if (options.controls) {
                this.setMbscOption({ controls: options.controls });
            }
            if (options.steps) {
                this.setMbscOption({ steps: options.steps });
            }
        }
        this.setMbscOption({
            display: options && options.display ? options.display : (config.getOs() !== 'desktop' ? 'bottom' : 'center')
        });
    };
    return AppsappInputDateComponent;
}(AppsappInputAbstractComponent));
export { AppsappInputDateComponent };
AppsappInputDateComponent.decorators = [
    { type: Component, args: [{
                selector: 'appsapp-input-date',
                template: "\n        <mbsc-form #mbscInstanceForm=\"mobiscroll\">\n            <mbsc-input [error]=\"validator | async\"  #mbscInstance=\"mobiscroll\" mbsc-calendar [ngModel]=\"_ngModelGettter | async\"\n                        (ngModelChange)=\"modelChanges($event)\">{{_label}}</mbsc-input>\n        </mbsc-form>\n\n    "
            },] },
];
/**
 * @nocollapse
 */
AppsappInputDateComponent.ctorParameters = function () { return []; };
function AppsappInputDateComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    AppsappInputDateComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    AppsappInputDateComponent.ctorParameters;
}
