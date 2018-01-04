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
var appsapp_cli_1 = require("appsapp-cli");
/**
 * Generated class for the AppsappInputSelectComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var AppsappInputListComponent = (function (_super) {
    __extends(AppsappInputListComponent, _super);
    function AppsappInputListComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.options = [];
        return _this;
    }
    AppsappInputListComponent.prototype.afterInit = function (config) {
        this.updateConfig();
    };
    AppsappInputListComponent.prototype.reCalculateAfterSorting = function () {
        var self = this;
        if (self.mbsc && self.mbsc.element !== undefined && self.mbsc.element) {
            var valueAsObject_1 = {};
            var valueSorted = [];
            var value = self.model.getPropertyValue(self.property, true);
            if (typeof value !== 'object' && value.length == undefined) {
                value = [];
            }
            value.forEach(function (item) {
                valueAsObject_1[item.__uuid] = item;
            });
            for (var i = 0; i < self.mbsc.element.children.length; i++) {
                if (self.mbsc.element.children.item(i)) {
                    valueSorted.push(valueAsObject_1[self.mbsc.element.children.item(i).getAttribute('data-id')]);
                }
            }
            if (valueSorted.length) {
                self.model.update(self.property, valueSorted).setProperty(self.property, valueSorted);
                if (self.model.getParent()) {
                    self.model.getParent().setProperty(self.property, self.model.getPropertyValue(self.property, true));
                }
            }
        }
    };
    AppsappInputListComponent.prototype.updateConfig = function () {
        var _this = this;
        var self = this, value = this.model.getPropertyValue(this.property, true);
        if (typeof value !== 'object' && value.length == undefined) {
            value = [];
        }
        this.setMbscOption({
            onSortUpdate: function (event, inst) {
                self.reCalculateAfterSorting();
            },
            sortable: { handle: 'right' }, striped: false, stages: [{
                    percent: -10,
                    color: 'red',
                    icon: 'remove',
                    text: this.model.getMessage('delete'),
                    confirm: false,
                    disabled: !this.model.getMetadataValue(this.property, 'arrayMinSize') || this.model.getMetadataValue(this.property, 'arrayMinSize') < value.length ? false : true,
                    action: function (event, inst) {
                        _this.removeItem(event.index);
                        return false;
                    }
                },
                {
                    percent: 10,
                    color: 'green',
                    icon: 'plus',
                    text: this.model.getMessage('add'),
                    undo: false,
                    disabled: !this.model.getMetadataValue(this.property, 'arrayMaxSize') || this.model.getMetadataValue(this.property, 'arrayMaxSize') > value.length ? false : true,
                    action: function (event, inst) {
                        _this.addItem();
                    }
                }]
        });
    };
    AppsappInputListComponent.prototype.ngAfterContentInit = function () {
        if (this.model.getMetadataValue(this.property, 'arrayMinSize')) {
            for (var i = this.model.getPropertyValue(this.property, true).length; i < this.model.getMetadataValue(this.property, 'arrayMinSize'); i++) {
                this.addItem();
            }
        }
    };
    /**
     * remove by uuid or index
     * @param uuid
     */
    AppsappInputListComponent.prototype.removeItem = function (uuidOrIndex) {
        var value = this.model.getPropertyValue(this.property, true);
        if (typeof value !== 'object' && value.length == undefined) {
            value = [];
        }
        if (!this.model.getMetadataValue(this.property, 'arrayMinSize') || this.model.getMetadataValue(this.property, 'arrayMinSize') < value.length) {
            var index_1 = 0;
            var wasdeleted_1 = false;
            value.forEach(function (item) {
                if (!wasdeleted_1 && (item.getUuid() == uuidOrIndex || uuidOrIndex == index_1)) {
                    value.splice(index_1, 1);
                    wasdeleted_1 = true;
                }
                index_1++;
            });
        }
        this.model.setProperty(this.property, this.model.getPropertyValue(this.property, true));
        this.updateConfig();
    };
    AppsappInputListComponent.prototype.addItem = function () {
        var self = this, model = this.model.getMetadataValue(this.property, 'isList'), item = null;
        try {
            item = this.model.getAppsAppModuleProvider() ? this.model.getAppsAppModuleProvider()["new"](model) : new model();
        }
        catch (e) {
            item = new model.constructor();
        }
        var value = this.model.getPropertyValue(this.property, true);
        if (typeof value !== 'object' && value.length == undefined) {
            value = [];
        }
        if (item instanceof appsapp_cli_1.PersistableModel) {
            item.setParent(this.model);
            item.loaded().then(function (m) {
                item.getChangesObserverable().subscribe(function (next) {
                    if (next.model.getParent()) {
                        next.model.getParent().setProperty(self.property, self.model.getPropertyValue(self.property, true));
                    }
                });
            });
        }
        if (!this.model.getMetadataValue(this.property, 'arrayMaxSize') || this.model.getMetadataValue(this.property, 'arrayMaxSize') > value.length) {
            if (Object.keys(item).length == 0 || item instanceof appsapp_cli_1.PersistableModel == false) {
                item = new appsapp_cli_1.PersistableModel();
                item.importDynamicProperties(model);
            }
            item.setUuid();
            value.push(item);
        }
        this.model.setProperty(this.property, this.model.getPropertyValue(this.property, true));
        this.updateConfig();
    };
    return AppsappInputListComponent;
}(appsapp_input_abstract_1.AppsappInputAbstractComponent));
__decorate([
    core_1.Output()
], AppsappInputListComponent.prototype, "options");
AppsappInputListComponent = __decorate([
    core_1.Component({
        selector: 'appsapp-input-list',
        template: "\n\n        <mbsc-listview #mbscInstance=\"mobiscroll\">\n            <mbsc-listview-item *ngFor=\"let item of _ngModelGettter | async\" [id]=\"item.__uuid\">\n                <appsapp-input [model]=\"item\"></appsapp-input>\n            </mbsc-listview-item>\n        </mbsc-listview>\n\n    "
    })
], AppsappInputListComponent);
exports.AppsappInputListComponent = AppsappInputListComponent;
