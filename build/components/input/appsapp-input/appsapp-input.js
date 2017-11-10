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
import { AbstractComponent } from '../../abstractComponent';
import { AppsappModuleProvider } from '../../../providers/appsapp-module-provider';
import { Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
/**
 * Generate d class for the AppsappInputComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var AppsappInputComponent = (function (_super) {
    __extends(AppsappInputComponent, _super);
    /**
     * @param {?} appsappModuleProvider
     */
    function AppsappInputComponent(appsappModuleProvider) {
        var _this = _super.call(this, appsappModuleProvider) || this;
        _this.appsappModuleProvider = appsappModuleProvider;
        _this.options = {};
        _this._inputs = [];
        _this.hidden = false;
        return _this;
    }
    /**
     * @return {?}
     */
    AppsappInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        var /** @type {?} */ self = this;
        if (this.model) {
            if (this.property) {
                this._inputs.push({ type: this.model.getType(this.property), property: this.property, label: this.label, hidden: new Observable(function (observer) {
                        self.model.getCondition(self.property).subscribe(function (c) {
                            observer.next(self.isHidden(c));
                        });
                    }) });
            }
            else {
                Object.keys(this.model).forEach(function (property) {
                    if (property.substr(0, 1) !== "_") {
                        _this._inputs.push({
                            type: _this.model.getType(property), property: property, hidden: new Observable(function (observer) {
                                self.model.getCondition(property).subscribe(function (c) {
                                    observer.next(self.isHidden(c));
                                });
                            })
                        });
                    }
                });
            }
        }
    };
    /**
     * get is hidden from condition action
     * @param {?} condition
     * @return {?}
     */
    AppsappInputComponent.prototype.isHidden = function (condition) {
        var /** @type {?} */ hidden = false;
        switch (condition.action) {
            case 'hide':
                hidden = !condition.state;
                break;
            case 'show':
                hidden = condition.state;
                break;
            default:
                hidden = false;
        }
        return hidden;
    };
    return AppsappInputComponent;
}(AbstractComponent));
export { AppsappInputComponent };
AppsappInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'appsapp-input',
                template: "\n      <ng-container [ngSwitch]=\"input.type\" *ngFor=\"let input of _inputs\">\n          <ng-container *ngSwitchCase=\"'text'\">\n              <appsapp-input-text [model]=\"model\" [property]=\"input.property\" [label]=\"input.label\" [hidden]=\"input.hidden | async\"></appsapp-input-text>\n          </ng-container>\n          <ng-container *ngSwitchCase=\"'number'\">\n              <appsapp-input-number [model]=\"model\" [property]=\"input.property\" [label]=\"input.label\" [hidden]=\"input.hidden | async\"></appsapp-input-number>\n          </ng-container>\n          <ng-container *ngSwitchCase=\"'integer'\">\n              <appsapp-input-integer [model]=\"model\" [property]=\"input.property\" [label]=\"input.label\" [hidden]=\"input.hidden | async\"></appsapp-input-integer>\n          </ng-container>\n          <ng-container *ngSwitchCase=\"'tel'\">\n              <appsapp-input-tel [model]=\"model\" [property]=\"input.property\" [label]=\"input.label\" [hidden]=\"input.hidden | async\"></appsapp-input-tel>\n          </ng-container>\n          <ng-container *ngSwitchCase=\"'password'\">\n              <appsapp-input-password [model]=\"model\" [property]=\"input.property\" [label]=\"input.label\" [hidden]=\"input.hidden | async\"></appsapp-input-password>\n          </ng-container>\n          <ng-container *ngSwitchCase=\"'email'\">\n              <appsapp-input-email [model]=\"model\" [property]=\"input.property\" [label]=\"input.label\" [hidden]=\"input.hidden | async\"></appsapp-input-email>\n          </ng-container>\n          <ng-container *ngSwitchCase=\"'url'\">\n              <appsapp-input-url [model]=\"model\" [property]=\"input.property\" [label]=\"input.label\" [hidden]=\"input.hidden | async\"></appsapp-input-url>\n          </ng-container>\n          <ng-container *ngSwitchCase=\"'textarea'\">\n              <appsapp-input-textarea [model]=\"model\" [property]=\"input.property\" [label]=\"input.label\" [hidden]=\"input.hidden | async\"></appsapp-input-textarea>\n          </ng-container>\n          <ng-container *ngSwitchCase=\"'date'\">\n              <appsapp-input-date [model]=\"model\" [property]=\"input.property\" [label]=\"input.label\" [hidden]=\"input.hidden | async\"></appsapp-input-date>\n          </ng-container>\n          <ng-container *ngSwitchCase=\"'dates'\">\n              <appsapp-input-dates [model]=\"model\" [property]=\"input.property\" [label]=\"input.label\" [hidden]=\"input.hidden | async\"></appsapp-input-dates>\n          </ng-container>\n          <ng-container *ngSwitchCase=\"'boolean'\">\n              <appsapp-input-boolean [model]=\"model\" [property]=\"input.property\" [label]=\"input.label\" [hidden]=\"input.hidden | async\"></appsapp-input-boolean>\n          </ng-container>\n          <ng-container *ngSwitchCase=\"'rating'\">\n              <appsapp-input-rating [model]=\"model\" [property]=\"input.property\" [label]=\"input.label\" [hidden]=\"input.hidden | async\"></appsapp-input-rating>\n          </ng-container>\n          <ng-container *ngSwitchCase=\"'birthday'\">\n              <appsapp-input-birthday [model]=\"model\" [property]=\"input.property\" [label]=\"input.label\" [hidden]=\"input.hidden | async\"></appsapp-input-birthday>\n          </ng-container>\n      </ng-container>\n\n  "
            },] },
];
/**
 * @nocollapse
 */
AppsappInputComponent.ctorParameters = function () { return [
    { type: AppsappModuleProvider, },
]; };
AppsappInputComponent.propDecorators = {
    'property': [{ type: Input },],
    'model': [{ type: Input },],
    'label': [{ type: Input },],
    'options': [{ type: Output },],
    '_inputs': [{ type: Output },],
    'hidden': [{ type: Output },],
};
function AppsappInputComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    AppsappInputComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    AppsappInputComponent.ctorParameters;
    /** @type {?} */
    AppsappInputComponent.propDecorators;
    /** @type {?} */
    AppsappInputComponent.prototype.property;
    /** @type {?} */
    AppsappInputComponent.prototype.model;
    /** @type {?} */
    AppsappInputComponent.prototype.label;
    /** @type {?} */
    AppsappInputComponent.prototype.options;
    /** @type {?} */
    AppsappInputComponent.prototype._inputs;
    /** @type {?} */
    AppsappInputComponent.prototype.hidden;
    /** @type {?} */
    AppsappInputComponent.prototype.appsappModuleProvider;
}
