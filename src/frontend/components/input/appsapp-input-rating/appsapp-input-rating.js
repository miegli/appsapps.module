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
var appsapp_input_abstract_1 = require("../appsapp-input-abstract");
/**
 * Generated class for the AppsappInputNumberComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var AppsappInputRatingComponent = (function (_super) {
    __extends(AppsappInputRatingComponent, _super);
    function AppsappInputRatingComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.locked = false;
        _this.isInline = false;
        _this.__label = '';
        return _this;
    }
    AppsappInputRatingComponent.prototype.modelChanges = function (event) {
        this.model.setProperty(this.property, parseInt(event));
    };
    /**
     *
     * @param {ConfigModel} config
     */
    AppsappInputRatingComponent.prototype.afterInit = function (config) {
        var self = this;
        var ratingoptions = this.model.getMetadataValue(this.property, 'rating');
        var values = [];
        var min = this.model.getMetadataValue(this.property, 'min') ? this.model.getMetadataValue(this.property, 'min') : 1;
        var max = this.model.getMetadataValue(this.property, 'max') ? this.model.getMetadataValue(this.property, 'max') : 5;
        if (ratingoptions && ratingoptions.values) {
            ratingoptions.values.forEach(function (value) {
                values.push(value);
            });
            this.setMbscOption({
                showText: true
            });
        }
        else {
            for (var i = min; i <= max; i++) {
                values.push(i);
            }
            this.setMbscOption({
                display: config.getOs() !== 'desktop' ? 'bottom' : 'center'
            });
        }
        this.setMbscOption({
            values: values
        });
        if (this._description) {
            this.setMbscOption({
                headerText: self._description
            });
        }
        if (ratingoptions && ratingoptions.style) {
            this.setMbscOption({
                style: ratingoptions.style
            });
        }
        if (ratingoptions && ratingoptions.display) {
            this.setMbscOption({
                display: ratingoptions.display
            });
            if (ratingoptions.display == 'inline') {
                self.isInline = true;
            }
        }
        this.setMbscOption({
            icon: ratingoptions && ratingoptions.icon ? ratingoptions.icon : { filled: 'star3', empty: 'star3' },
            onInit: function (event, inst) {
                self.get().subscribe(function (value) {
                    if (!self.locked) {
                        self.rating = value;
                    }
                });
            },
            onShow: function (event, inst) {
                self.locked = true;
            },
            onCancel: function (event, inst) {
                self.locked = false;
            },
            onSet: function (event, inst) {
                self.model.setProperty(self.property, inst.getVal());
                self.locked = false;
            }
        });
    };
    AppsappInputRatingComponent.prototype.beforeModelChanges = function (model, property, value) {
        return false;
    };
    return AppsappInputRatingComponent;
}(appsapp_input_abstract_1.AppsappInputAbstractComponent));
__decorate([
    core_1.Input()
], AppsappInputRatingComponent.prototype, "rating");
__decorate([
    core_1.Output()
], AppsappInputRatingComponent.prototype, "isInline");
__decorate([
    core_1.Output()
], AppsappInputRatingComponent.prototype, "__label");
AppsappInputRatingComponent = __decorate([
    core_1.Component({
        selector: 'appsapp-input-rating',
        template: "\n        <mbsc-form #mbscInstanceForm=\"mobiscroll\">\n            <div class=\"mbsc-form-group-title\" *ngIf=\"isInline\">{{_label}}</div>\n            <mbsc-input [error]=\"validator | async\" #mbscInstance=\"mobiscroll\" mbsc-rating [ngModel]=\"rating\" [type]=\"isInline ? 'hidden' : 'text'\">{{_label}}</mbsc-input>\n        </mbsc-form>\n\n    "
    })
], AppsappInputRatingComponent);
exports.AppsappInputRatingComponent = AppsappInputRatingComponent;
