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
var AppsappInputSelectComponent = /** @class */ (function (_super) {
    __extends(AppsappInputSelectComponent, _super);
    function AppsappInputSelectComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectoptions = [];
        _this.isUnique = false;
        return _this;
    }
    /**
     * set selectoptions
     * @param values
     */
    AppsappInputSelectComponent.prototype.setOptions = function (values) {
    };
    AppsappInputSelectComponent.prototype.applyselectoptionsPostprocess = function () {
        var self = this;
        if (this.isUnique) {
            this.model.getParent().getChangesWithCallback(function (event) {
                if (event.property == self.parentProperty) {
                    self.setOptions(event.value);
                }
            });
        }
    };
    AppsappInputSelectComponent.prototype.init = function (config) {
        var _this = this;
        var self = this;
        var data = this.model.getMetadataValue(this.property, 'isSelect');
        if (this.parentPropertyMetadata) {
            this.isUnique = this.model.getMetadataValue(null, 'isList', this.parentPropertyMetadata, 'uniqueItems');
        }
        self.applyselectoptionsPostprocess();
        if (data) {
            if (data.options && typeof data.options == 'object') {
                this.selectoptions = data.options;
            }
            if (data.source) {
                self.select = this.appsappModuleProvider["new"](select_1.SelectModel, this.appsappModuleProvider.getPersistenceManager().getHash(data.source.url));
                self.select.autosave();
                self.select.loaded().then(function (m) {
                    self.select.setProperty('mapping', data.source.mapping);
                    self.select.setProperty('parent', self.model);
                    self.select.setProperty('parentProperty', _this.property);
                    self.select.setProperty('url', data.source.url);
                    self.select.init();
                    self.select.getOptions().subscribe(function (selectoptions) {
                        self.selectoptions = selectoptions;
                        if (self.isUnique) {
                            self.setOptions();
                        }
                        else {
                            //self.mbsc.instance.refresh(selectoptions);
                        }
                        self.select.getHashedValues().forEach(function (v) {
                            self.model.addHashedValue(v.value, v.hash);
                        });
                        var hashedValues = [];
                        if (self.model.getPropertyValue(self.property, true)) {
                            self.model.getPropertyValue(self.property, true).forEach(function (value) {
                                hashedValues.push(self.model.setHashedValue(value));
                            });
                        }
                        //self.update(hashedValues);
                        // self.mbsc.instance.setVal(hashedValues, true, false);
                    });
                });
            }
        }
        var groups = {};
        if (this.selectoptions && typeof this.selectoptions.length == 'number') {
            this.selectoptions.forEach(function (item) {
                if (item.group !== undefined) {
                    groups[item.group] = true;
                }
            });
        }
        if (this.model) {
            var options = this.model.getMetadataValue(this.property, 'isSelect');
            var buttons = [];
            if (self.model.getMetadataValue(self.property, 'arrayMaxSize') !== 1) {
                buttons.push('set');
            }
            buttons.push('cancel');
            this.setMbscOption({
                onChange: function (event, inst) {
                    if (self.model.getMetadataValue(self.property, 'arrayMaxSize') === 1) {
                        if (!self.model.getMetadataValue(self.property, 'arrayMinSize') || event.valueText.length) {
                            inst.hide();
                        }
                    }
                },
                group: self.selectoptions.length <= 20 ? {
                    groupWheel: Object.keys(groups).length > 5,
                    header: Object.keys(groups).length > 0,
                    clustered: Object.keys(groups).length > 2
                } : null,
                buttons: buttons,
                counter: self.model.getMetadataValue(self.property, 'arrayMinSize') > 1 ? true : false,
                filter: self.selectoptions.length > 20,
                display: options && options.display ? options.display : (config.getOs() !== 'desktop' ? 'bottom' : 'center'),
                data: self.selectoptions,
                select: self.model.getMetadataValue(self.property, 'arrayMaxSize') ? self.model.getMetadataValue(self.property, 'arrayMaxSize') : (self.model.isArray(self.property) ? 'multiple' : 'single')
            });
        }
    };
    AppsappInputSelectComponent = __decorate([
        core_1.Component({
            selector: 'appsapp-input-select',
            template: "\n       \n\n    "
        })
    ], AppsappInputSelectComponent);
    return AppsappInputSelectComponent;
}(appsapp_input_abstract_1.AppsappInputAbstractComponent));
exports.AppsappInputSelectComponent = AppsappInputSelectComponent;
