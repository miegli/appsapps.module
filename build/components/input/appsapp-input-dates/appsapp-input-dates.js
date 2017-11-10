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
import { Component, Input } from '@angular/core';
import { AppsappInputAbstractComponent } from '../appsapp-input-abstract';
/**
 * Generated class for the AppsappInputDatesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var AppsappInputDatesComponent = (function (_super) {
    __extends(AppsappInputDatesComponent, _super);
    function AppsappInputDatesComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.range = [];
        _this.locked = false;
        return _this;
    }
    /**
     *
     * @param {?} config
     * @return {?}
     */
    AppsappInputDatesComponent.prototype.afterInit = function (config) {
        var /** @type {?} */ self = this;
        this.get().subscribe(function (value) {
            if (!self.locked && value && value.length == 2) {
                self.range = [new Date(value[0]), new Date(value[1])];
            }
        });
        this.setMbscOption({
            onShow: function (event, inst) {
                self.locked = true;
                console.log(this);
            },
            onCancel: function (event, inst) {
                self.locked = false;
                console.log(this);
            },
            onSet: function (event, inst) {
                var /** @type {?} */ from = new Date(inst._startDate);
                var /** @type {?} */ to = new Date(inst._endDate);
                self.model.setProperty(self.property, [from, to]);
                self.locked = false;
            }
        });
        var /** @type {?} */ options = this.model.getMetadataValue(this.property, 'dateRange');
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
    /**
     * @param {?} model
     * @param {?} property
     * @param {?} value
     * @return {?}
     */
    AppsappInputDatesComponent.prototype.beforeModelChanges = function (model, property, value) {
        return false;
    };
    return AppsappInputDatesComponent;
}(AppsappInputAbstractComponent));
export { AppsappInputDatesComponent };
AppsappInputDatesComponent.decorators = [
    { type: Component, args: [{
                selector: 'appsapp-input-dates',
                template: "\n        <mbsc-form #mbscInstanceForm=\"mobiscroll\">\n            <mbsc-input [error]=\"validator | async\"  #mbscInstance=\"mobiscroll\" mbsc-range [ngModel]=\"range\"\n                        (ngModelChange)=\"modelChanges($event)\">{{_label}}\n            </mbsc-input>\n        </mbsc-form>\n\n    "
            },] },
];
/**
 * @nocollapse
 */
AppsappInputDatesComponent.ctorParameters = function () { return []; };
AppsappInputDatesComponent.propDecorators = {
    'range': [{ type: Input },],
};
function AppsappInputDatesComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    AppsappInputDatesComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    AppsappInputDatesComponent.ctorParameters;
    /** @type {?} */
    AppsappInputDatesComponent.propDecorators;
    /** @type {?} */
    AppsappInputDatesComponent.prototype.range;
    /** @type {?} */
    AppsappInputDatesComponent.prototype.locked;
}
