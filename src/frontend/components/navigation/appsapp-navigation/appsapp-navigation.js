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
/**
 * Generate d class for the AppsappInputComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var AppsappNavigationComponent = /** @class */ (function (_super) {
    __extends(AppsappNavigationComponent, _super);
    function AppsappNavigationComponent(appsappModuleProvider) {
        var _this = _super.call(this, appsappModuleProvider) || this;
        _this.appsappModuleProvider = appsappModuleProvider;
        _this.children = [];
        _this.options = {};
        _this.type = 'hamburger';
        _this.layout = 'liquid';
        _this.display = 'inline';
        return _this;
    }
    AppsappNavigationComponent.prototype.ngOnInit = function () {
        var _this = this;
        var self = this;
        this.options = {
            type: this.type,
            layout: this.layout,
            display: this.display,
            snap: this.snap,
            menuIcon: this.menuIcon,
            menuText: this.menuText
        };
        if (this.model) {
            this.model.getPropertiesKeys().forEach(function (property) {
                if (_this.model.getMetadataValue(property, 'hasIcon')) {
                    _this.model.watch(property, function (value) {
                        self.icon = value;
                    });
                }
                if (_this.model.getMetadataValue(property, 'hasName')) {
                    _this.model.watch(property, function (value) {
                        self.name = value;
                    });
                }
                if (_this.model.getMetadataValue(property, 'hasBadge')) {
                    _this.model.watch(property, function (value) {
                        self.badge = value;
                    });
                }
                if (_this.model.getMetadataValue(property, 'isList')) {
                    var constructor = _this.model.getMetadataValue(property, 'isList');
                    var hasNavigationElements = false;
                    var tempModel = new constructor();
                    Object.keys(tempModel).forEach(function (p) {
                        if (!hasNavigationElements) {
                            if (tempModel.getMetadataValue(p, 'hasIcon') && tempModel.getMetadataValue(p, 'hasName') && tempModel.getMetadataValue(p, 'hasBadge')) {
                                hasNavigationElements = true;
                            }
                        }
                    });
                    _this.model.watch(property, function (value) {
                        self.children = value;
                    });
                }
            });
        }
    };
    __decorate([
        core_1.Input()
    ], AppsappNavigationComponent.prototype, "model");
    __decorate([
        core_1.Input()
    ], AppsappNavigationComponent.prototype, "type");
    __decorate([
        core_1.Input()
    ], AppsappNavigationComponent.prototype, "layout");
    __decorate([
        core_1.Input()
    ], AppsappNavigationComponent.prototype, "display");
    __decorate([
        core_1.Input()
    ], AppsappNavigationComponent.prototype, "snap");
    __decorate([
        core_1.Input()
    ], AppsappNavigationComponent.prototype, "menuIcon");
    __decorate([
        core_1.Input()
    ], AppsappNavigationComponent.prototype, "menuText");
    AppsappNavigationComponent = __decorate([
        core_1.Component({
            selector: 'appsapp-navigation',
            template: "\n .\n    "
        })
    ], AppsappNavigationComponent);
    return AppsappNavigationComponent;
}(abstractComponent_1.AbstractComponent));
exports.AppsappNavigationComponent = AppsappNavigationComponent;
