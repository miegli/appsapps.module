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
 * Generated class for the AppsappInputTextareaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var AppsappInputTextareaComponent = (function (_super) {
    __extends(AppsappInputTextareaComponent, _super);
    function AppsappInputTextareaComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.maxLength = 0;
        _this.currentLength = 0;
        return _this;
    }
    /**
     *
     * @param {?} config
     * @return {?}
     */
    AppsappInputTextareaComponent.prototype.afterInit = function (config) {
        var /** @type {?} */ self = this;
        this.maxLength = this.model.getMetadataValue(this.property, 'isText') ? this.model.getMetadataValue(this.property, 'isText') : 0;
        this.label = this._label;
    };
    /**
     * event before model changes
     * @param {?} model
     * @param {?} property
     * @param {?} value
     * @return {?}
     */
    AppsappInputTextareaComponent.prototype.beforeModelChanges = function (model, property, value) {
        if (this.maxLength) {
            this.currentLength = value.length;
            this._label = this.label + ' (' + (this.currentLength < this.maxLength ? this.currentLength : this.maxLength) + " / " + this.maxLength + ")";
            if (value.length > this.maxLength) {
                value = value.substr(0, this.maxLength);
                this._ngModelGettter = this.model.update(this.property, value).getProperty(this.property);
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return true;
        }
    };
    return AppsappInputTextareaComponent;
}(AppsappInputAbstractComponent));
export { AppsappInputTextareaComponent };
AppsappInputTextareaComponent.decorators = [
    { type: Component, args: [{
                selector: 'appsapp-input-textarea',
                template: "\n        <mbsc-form #mbscInstanceForm=\"mobiscroll\">\n            <mbsc-textarea [error]=\"validator | async\" [ngModel]=\"_ngModelGettter | async\" (ngModelChange)=\"modelChanges($event)\">{{_label}}</mbsc-textarea>\n        </mbsc-form>\n\n    "
            },] },
];
/**
 * @nocollapse
 */
AppsappInputTextareaComponent.ctorParameters = function () { return []; };
function AppsappInputTextareaComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    AppsappInputTextareaComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    AppsappInputTextareaComponent.ctorParameters;
    /** @type {?} */
    AppsappInputTextareaComponent.prototype.maxLength;
    /** @type {?} */
    AppsappInputTextareaComponent.prototype.currentLength;
    /** @type {?} */
    AppsappInputTextareaComponent.prototype.label;
}
