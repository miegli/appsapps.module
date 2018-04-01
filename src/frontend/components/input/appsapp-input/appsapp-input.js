"use strict";
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var abstractComponent_1 = require("../../abstractComponent");
var core_2 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
/**
 * Generate d class for the AppsappInputComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var AppsappInputComponent = /** @class */ (function (_super) {
    __extends(AppsappInputComponent, _super);
    function AppsappInputComponent(appsappModuleProvider) {
        var _this = _super.call(this, appsappModuleProvider) || this;
        _this.appsappModuleProvider = appsappModuleProvider;
        _this.parentPropertyMetadata = null;
        _this.parentProperty = null;
        _this.options = {};
        _this._inputs = [];
        _this._inputsRegistered = {};
        _this.hidden = false;
        return _this;
    }
    AppsappInputComponent.prototype.registerConditions = function (property, model) {
        var self = this;
        this._inputs.push({
            type: model.getType(property),
            property: property,
            parentPropertyMetadata: this.parentPropertyMetadata,
            parentProperty: this.parentProperty,
            hidden: new Observable_1.Observable(function (observer) {
                var isConditionValue = false;
                if (model.getMetadataValue(property, 'isHidden') === true) {
                    observer.next(true);
                }
                else {
                    if (typeof model.getMetadataValue(property, 'isHidden') == 'object') {
                        model.getCondition('__isHidden__' + property).subscribe(function (c) {
                            if (isConditionValue && !c.state) {
                                observer.next(isConditionValue);
                            }
                            else {
                                observer.next(!c.state);
                            }
                        });
                    }
                    model.getCondition(property).subscribe(function (c) {
                        observer.next(self.isHidden(c));
                        isConditionValue = self.isHidden(c);
                    });
                }
            })
        });
    };
    AppsappInputComponent.prototype.ngOnInitExecute = function (model) {
        var self = this;
        this._inputs = [];
        if (this.property) {
            this._inputs.push({
                type: model.getType(this.property),
                property: this.property,
                parentPropertyMetadata: this.parentPropertyMetadata,
                parentProperty: this.parentProperty,
                label: this.label,
                hidden: new Observable_1.Observable(function (observer) {
                    var isConditionValue = false;
                    if (model.getMetadataValue(self.property, 'isHidden') === true) {
                        observer.next(true);
                    }
                    else {
                        if (typeof model.getMetadataValue(self.property, 'isHidden') == 'object') {
                            model.getCondition('__isHidden__' + self.property).subscribe(function (c) {
                                if (isConditionValue && !c.state) {
                                    observer.next(isConditionValue);
                                }
                                else {
                                    observer.next(!c.state);
                                }
                            });
                        }
                        model.getCondition(self.property).subscribe(function (c) {
                            observer.next(self.isHidden(c));
                            isConditionValue = self.isHidden(c);
                        });
                    }
                })
            });
        }
        else {
            model.getPropertiesKeys().forEach(function (property) {
                self.registerConditions(property, model);
            });
        }
    };
    AppsappInputComponent.prototype.ngOnInit = function () {
        var self = this;
        if (this.model) {
            if (this.model instanceof Observable_1.Observable) {
                this._model = this.model;
                this._model.subscribe(function (model) {
                    self.model = model;
                    self.ngOnInitExecute(model);
                });
            }
            else {
                if (this.model.__isPersistableModel) {
                    self.ngOnInitExecute(this.model);
                }
                else {
                    this.model.forEach(function (vm) {
                        self._inputs.push({ type: 'model', model: vm });
                    });
                }
            }
        }
    };
    /**
     * get is hidden from condition action
     * @param condition
     * @returns {boolean}
     */
    AppsappInputComponent.prototype.isHidden = function (condition) {
        var hidden = false, self = this;
        switch (condition.action) {
            case 'hide':
                hidden = !condition.state;
                break;
            case 'show':
                hidden = condition.state;
                break;
            default:
                hidden = condition.state;
        }
        return hidden;
    };
    __decorate([
        core_1.Input()
    ], AppsappInputComponent.prototype, "property");
    __decorate([
        core_1.Input()
    ], AppsappInputComponent.prototype, "parentPropertyMetadata");
    __decorate([
        core_1.Input()
    ], AppsappInputComponent.prototype, "parentProperty");
    __decorate([
        core_1.Input()
    ], AppsappInputComponent.prototype, "model");
    __decorate([
        core_1.Input()
    ], AppsappInputComponent.prototype, "label");
    __decorate([
        core_2.Output()
    ], AppsappInputComponent.prototype, "options");
    __decorate([
        core_2.Output()
    ], AppsappInputComponent.prototype, "_inputs");
    __decorate([
        core_2.Output()
    ], AppsappInputComponent.prototype, "hidden");
    AppsappInputComponent = __decorate([
        core_1.Component({
            selector: 'appsapp-input',
            template: "\n        \n            <ng-container [ngSwitch]=\"input.type\" *ngFor=\"let input of _inputs\">\n                <ng-container *ngSwitchCase=\"'text'\">\n                    <appsapp-input-text [model]=\"model\" [property]=\"input.property\" [label]=\"input.label\"\n                                        [hidden]=\"input.hidden | async\"\n                                        [parentPropertyMetadata]=\"input.parentPropertyMetadata\"\n                                        [parentProperty]=\"input.parentProperty\"></appsapp-input-text>\n                </ng-container>\n                <ng-container *ngSwitchCase=\"'number'\">\n                    <appsapp-input-number [model]=\"model\" [property]=\"input.property\" [label]=\"input.label\"\n                                          [hidden]=\"input.hidden | async\"\n                                          [parentPropertyMetadata]=\"input.parentPropertyMetadata\"\n                                          [parentProperty]=\"input.parentProperty\"></appsapp-input-number>\n                </ng-container>\n                <ng-container *ngSwitchCase=\"'numberplain'\">\n                    <appsapp-input-number-plain [model]=\"model\" [property]=\"input.property\" [label]=\"input.label\"\n                                                [hidden]=\"input.hidden | async\"\n                                                [parentPropertyMetadata]=\"input.parentPropertyMetadata\"\n                                                [parentProperty]=\"input.parentProperty\"></appsapp-input-number-plain>\n                </ng-container>\n                <ng-container *ngSwitchCase=\"'integer'\">\n                    <appsapp-input-integer [model]=\"model\" [property]=\"input.property\" [label]=\"input.label\"\n                                           [hidden]=\"input.hidden | async\"\n                                           [parentPropertyMetadata]=\"input.parentPropertyMetadata\"\n                                           [parentProperty]=\"input.parentProperty\"></appsapp-input-integer>\n                </ng-container>\n                <ng-container *ngSwitchCase=\"'tel'\">\n                    <appsapp-input-tel [model]=\"model\" [property]=\"input.property\" [label]=\"input.label\"\n                                       [hidden]=\"input.hidden | async\"\n                                       [parentPropertyMetadata]=\"input.parentPropertyMetadata\"\n                                       [parentProperty]=\"input.parentProperty\"></appsapp-input-tel>\n                </ng-container>\n                <ng-container *ngSwitchCase=\"'password'\">\n                    <appsapp-input-password [model]=\"model\" [property]=\"input.property\" [label]=\"input.label\"\n                                            [hidden]=\"input.hidden | async\"\n                                            [parentPropertyMetadata]=\"input.parentPropertyMetadata\"\n                                            [parentProperty]=\"input.parentProperty\"></appsapp-input-password>\n                </ng-container>\n                <ng-container *ngSwitchCase=\"'email'\">\n                    <appsapp-input-email [model]=\"model\" [property]=\"input.property\" [label]=\"input.label\"\n                                         [hidden]=\"input.hidden | async\"\n                                         [parentPropertyMetadata]=\"input.parentPropertyMetadata\"\n                                         [parentProperty]=\"input.parentProperty\"></appsapp-input-email>\n                </ng-container>\n                <ng-container *ngSwitchCase=\"'url'\">\n                    <appsapp-input-url [model]=\"model\" [property]=\"input.property\" [label]=\"input.label\"\n                                       [hidden]=\"input.hidden | async\"\n                                       [parentPropertyMetadata]=\"input.parentPropertyMetadata\"\n                                       [parentProperty]=\"input.parentProperty\"></appsapp-input-url>\n                </ng-container>\n                <ng-container *ngSwitchCase=\"'textarea'\">\n                    <appsapp-input-textarea [model]=\"model\" [property]=\"input.property\" [label]=\"input.label\"\n                                            [hidden]=\"input.hidden | async\"\n                                            [parentPropertyMetadata]=\"input.parentPropertyMetadata\"\n                                            [parentProperty]=\"input.parentProperty\"></appsapp-input-textarea>\n                </ng-container>\n                <ng-container *ngSwitchCase=\"'time'\">\n                    <appsapp-input-time [model]=\"model\" [property]=\"input.property\" [label]=\"input.label\"\n                                        [hidden]=\"input.hidden | async\"\n                                        [parentPropertyMetadata]=\"input.parentPropertyMetadata\"\n                                        [parentProperty]=\"input.parentProperty\"></appsapp-input-time>\n                </ng-container>\n                <ng-container *ngSwitchCase=\"'date'\">\n                    <appsapp-input-date [model]=\"model\" [property]=\"input.property\" [label]=\"input.label\"\n                                        [hidden]=\"input.hidden | async\"\n                                        [parentPropertyMetadata]=\"input.parentPropertyMetadata\"\n                                        [parentProperty]=\"input.parentProperty\"></appsapp-input-date>\n                </ng-container>\n                <ng-container *ngSwitchCase=\"'dates'\">\n                    <appsapp-input-dates [model]=\"model\" [property]=\"input.property\" [label]=\"input.label\"\n                                         [hidden]=\"input.hidden | async\"\n                                         [parentPropertyMetadata]=\"input.parentPropertyMetadata\"\n                                         [parentProperty]=\"input.parentProperty\"></appsapp-input-dates>\n                </ng-container>\n                <ng-container *ngSwitchCase=\"'boolean'\">\n                    <appsapp-input-boolean [model]=\"model\" [property]=\"input.property\" [label]=\"input.label\"\n                                           [hidden]=\"input.hidden | async\"\n                                           [parentPropertyMetadata]=\"input.parentPropertyMetadata\"\n                                           [parentProperty]=\"input.parentProperty\"></appsapp-input-boolean>\n                </ng-container>\n                <ng-container *ngSwitchCase=\"'birthday'\">\n                    <appsapp-input-birthday [model]=\"model\" [property]=\"input.property\" [label]=\"input.label\"\n                                            [hidden]=\"input.hidden | async\"\n                                            [parentPropertyMetadata]=\"input.parentPropertyMetadata\"\n                                            [parentProperty]=\"input.parentProperty\"></appsapp-input-birthday>\n                </ng-container>\n                <ng-container *ngSwitchCase=\"'select'\">\n                    <appsapp-input-select [model]=\"model\" [property]=\"input.property\" [label]=\"input.label\"\n                                          [hidden]=\"input.hidden | async\"\n                                          [parentPropertyMetadata]=\"input.parentPropertyMetadata\"\n                                          [parentProperty]=\"input.parentProperty\"></appsapp-input-select>\n                </ng-container>\n                <ng-container *ngSwitchCase=\"'list'\">\n                    <appsapp-input-list [model]=\"model\" [property]=\"input.property\" [label]=\"input.label\"\n                                        [hidden]=\"input.hidden | async\"\n                                        [parentPropertyMetadata]=\"input.parentPropertyMetadata\"\n                                        [parentProperty]=\"input.parentProperty\"></appsapp-input-list>\n                </ng-container>\n                <ng-container *ngSwitchCase=\"'model'\">\n                    <appsapp-input [model]=\"input.model\"></appsapp-input>\n                </ng-container>\n            </ng-container>\n       \n\n    "
        })
    ], AppsappInputComponent);
    return AppsappInputComponent;
}(abstractComponent_1.AbstractComponent));
exports.AppsappInputComponent = AppsappInputComponent;
