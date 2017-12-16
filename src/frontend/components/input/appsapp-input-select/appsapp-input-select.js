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
var select_1 = require("../../../models/select");
/**
 * Generated class for the AppsappInputSelectComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var AppsappInputSelectComponent = (function (_super) {
    __extends(AppsappInputSelectComponent, _super);
    function AppsappInputSelectComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.options = [];
        return _this;
    }
    AppsappInputSelectComponent.prototype.ngAfterContentInit = function () {
        var self = this;
        var data = this.model.getMetadataValue(this.property, 'isSelect');
        if (data) {
            if (data.options && typeof data.options == 'object') {
                this.options = data.options;
            }
            if (data.source) {
                this.appsappModuleProvider["new"](select_1.SelectModel, this.appsappModuleProvider.getPersistenceManager().getHash(data.source.url), { url: data.source.url, mapping: data.source.mapping }).loaded().then(function (select) {
                    select.getOptions().subscribe(function (options) {
                        self.options = options;
                        self.mbsc.instance.refresh(options);
                    });
                });
            }
        }
    };
    /**
     *
     * @param {ConfigModel} config
     */
    AppsappInputSelectComponent.prototype.afterInit = function (config) {
        var self = this;
        var groups = {};
        if (typeof this.options.length == 'number') {
            this.options.forEach(function (item) {
                if (item.group !== undefined) {
                    groups[item.group] = true;
                }
            });
        }
        this.setMbscOption({
            group: self.options.length <= 20 ? {
                groupWheel: Object.keys(groups).length > 5,
                header: Object.keys(groups).length > 0,
                clustered: Object.keys(groups).length > 2
            } : null,
            filter: self.options.length > 20,
            display: 'center',
            data: self.options,
            select: self.model.getMetadataValue(self.property, 'arrayMaxSize') ? self.model.getMetadataValue(self.property, 'arrayMaxSize') : (self.model.isArray(self.property) ? 'multiple' : 'single')
        });
    };
    return AppsappInputSelectComponent;
}(appsapp_input_abstract_1.AppsappInputAbstractComponent));
__decorate([
    core_1.Output()
], AppsappInputSelectComponent.prototype, "options");
AppsappInputSelectComponent = __decorate([
    core_1.Component({
        selector: 'appsapp-input-select',
        template: "\n        <mbsc-form #mbscInstanceForm=\"mobiscroll\">\n            <mbsc-input mbsc-select [error]=\"validator | async\" #mbscInstance=\"mobiscroll\"\n                        [ngModel]=\"_ngModelGettter | async\" (ngModelChange)=\"modelChanges($event)\">{{_label}}\n            </mbsc-input>\n        </mbsc-form>\n    "
    })
], AppsappInputSelectComponent);
exports.AppsappInputSelectComponent = AppsappInputSelectComponent;
