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
 * Generated class for the AppsappInputBirthdayComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var AppsappInputBirthdayComponent = (function (_super) {
    __extends(AppsappInputBirthdayComponent, _super);
    function AppsappInputBirthdayComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} model
     * @param {?} property
     * @param {?} value
     * @return {?}
     */
    AppsappInputBirthdayComponent.prototype.beforeModelChanges = function (model, property, value) {
        // create iso date
        var /** @type {?} */ date = Date.parse(value);
        value = !isNaN(date) ? new Date(date) : null;
        model.setProperty(property, value);
        return false;
    };
    /**
     *
     * @param {?} config
     * @return {?}
     */
    AppsappInputBirthdayComponent.prototype.afterInit = function (config) {
        if (this.model.getMetadataValue(this.property, 'maxDate')) {
            var /** @type {?} */ maxDate = this.model.getMetadataValue(this.property, 'maxDate');
            this.setMbscOption({ max: maxDate });
        }
        else {
            var /** @type {?} */ maxDate = new Date();
            this.setMbscOption({ max: maxDate });
        }
        if (this.model.getMetadataValue(this.property, 'minDate')) {
            var /** @type {?} */ minDate = this.model.getMetadataValue(this.property, 'minDate');
            this.setMbscOption({ min: minDate });
        }
        this.setMbscOption({
            display: config.getOs() !== 'desktop' ? 'bottom' : 'center',
        });
    };
    return AppsappInputBirthdayComponent;
}(AppsappInputAbstractComponent));
export { AppsappInputBirthdayComponent };
AppsappInputBirthdayComponent.decorators = [
    { type: Component, args: [{
                selector: 'appsapp-input-birthday',
                template: "\n        <mbsc-form #mbscInstanceForm=\"mobiscroll\">\n            <mbsc-input [error]=\"validator | async\" #mbscInstance=\"mobiscroll\" mbsc-date [ngModel]=\"_ngModelGettter | async\"\n                        (ngModelChange)=\"modelChanges($event)\">{{_label}}</mbsc-input>\n        </mbsc-form>\n\n    "
            },] },
];
/**
 * @nocollapse
 */
AppsappInputBirthdayComponent.ctorParameters = function () { return []; };
function AppsappInputBirthdayComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    AppsappInputBirthdayComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    AppsappInputBirthdayComponent.ctorParameters;
}
