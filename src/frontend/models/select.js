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
        _this.parent = null;
        _this.url = '';
        _this.dataType = 'json';
        /**
         * match all in string
         * @param string
         * @param regexp
         * @returns {any[]}
         */
        _this.matchAll = function (string, regexp) {
            var matches = [];
            if (typeof string !== 'string') {
                string = '';
            }
            string.replace(regexp, function () {
                var arr = ([]).slice.call(arguments, 0);
                var extras = arr.splice(-2);
                arr.index = extras[0];
                arr.input = extras[1];
                matches.push(arr);
            });
            return matches.length ? matches : null;
        };
        return _this;
    }
    /**
     * Get options array as promise
     * @returns Observable<any>
     */
    SelectModel.prototype.getOptions = function () {
        var self = this;
        var lastHash = null;
        var regex = /(\$\w+)[\/]*/g;
        var fetchdata = function (url) {
            console.log(1, url);
            if (self.matchAll(url, regex)) {
                self.matchAll(url, regex).forEach(function (m) {
                    url = url.replace(m[1], self.parent.getPropertyValue(m[1].substr(1)));
                });
            }
            console.log(2, url);
            if (url.substr(0, 4) == 'http') {
                this.getHttpClient().get(url).subscribe(function (data) {
                    self.update('data', data);
                }, function (error) {
                    // skip error
                });
            }
            if (url.substr(0, 1) == '/') {
                self.getFirebaseData(url).subscribe(function (event) {
                    if (event) {
                        var data_1 = event.payload.val();
                        if (data_1) {
                            if (typeof data_1.forEach !== 'function') {
                                var tmp = [];
                                Object.keys(data_1).forEach(function (v) {
                                    tmp.push(data_1[v]);
                                });
                                self.update('data', tmp);
                            }
                            else {
                                self.update('data', data_1);
                            }
                        }
                    }
                });
            }
        };
        if (self.matchAll(this.url, regex)) {
            self.matchAll(this.url, regex).forEach(function (m) {
                self.parent.watch(m[1].substr(1), function (data) {
                    fetchdata(self.url);
                });
            });
        }
        else {
            fetchdata(this.url);
        }
        return new Observable_1.Observable(function (observer) {
            var o = observer;
            self.getProperty('data').subscribe(function (data) {
                var options = [];
                var currentHash = self.setHashedValue(data);
                if (currentHash !== lastHash) {
                    data.forEach(function (item) {
                        options.push({
                            value: self.mapping.value ? self.setHashedValue(self._getPropertyFromObject(item, self.mapping.value)) : self.setHashedValue(item),
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
                }
                lastHash = currentHash;
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
        if (typeof property == 'string' && property.indexOf(".") > 0) {
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
