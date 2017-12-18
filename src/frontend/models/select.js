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
exports.__esModule = true;
var appsapp_cli_1 = require("appsapp-cli");
var Observable_1 = require("rxjs/Observable");
var SelectModel = (function (_super) {
    __extends(SelectModel, _super);
    function SelectModel() {
        var _this = _super.call(this) || this;
        _this.options = [];
        _this.data = [];
        _this.url = '';
        _this.dataType = 'json';
        return _this;
    }
    /**
     * Get options array as promise
     * @returns Observable<any>
     */
    SelectModel.prototype.getOptions = function () {
        var self = this;
        this.getHttpClient().get(this.url).subscribe(function (data) {
            self.update('data', data);
        }, function (error) {
            // skip error
        });
        return new Observable_1.Observable(function (observer) {
            var o = observer;
            self.getProperty('data').subscribe(function (data) {
                var options = [];
                data.forEach(function (item) {
                    options.push({
                        value: self.setHashedValue(self._getPropertyFromObject(item, self.mapping.value)),
                        text: self._getPropertyFromObject(item, self.mapping.text),
                        disabled: self.mapping.disabled !== undefined ? self._getPropertyFromObject(item, self.mapping.disabled) : false
                    });
                });
                self.update('options', options).saveWithPromise().then(function () {
                    //
                })["catch"](function (e) {
                    console.log(e);
                });
                o.next(options);
            });
        });
    };
    /**
     * get property from object
     * @param inputObject
     * @param property
     */
    SelectModel.prototype._getPropertyFromObject = function (inputObject, property) {
        var self = this;
        if (typeof property == 'function') {
            return inputObject !== undefined ? property(inputObject) : null;
        }
        if (property.indexOf(".") > 0) {
            return self._getPropertyFromObject(inputObject[property.substr(0, property.indexOf("."))], property.substr(property.indexOf(".") + 1));
        }
        else {
            return inputObject[property];
        }
    };
    ;
    return SelectModel;
}(appsapp_cli_1.PersistableModel));
exports.SelectModel = SelectModel;
