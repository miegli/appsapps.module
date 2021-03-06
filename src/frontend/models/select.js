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
var SelectModel = /** @class */ (function (_super) {
    __extends(SelectModel, _super);
    function SelectModel() {
        var _this = _super.call(this) || this;
        _this.options = [];
        _this.data = [];
        _this.dataCached = {};
        _this.parent = null;
        _this.parentProperty = null;
        _this.url = '';
        _this.dataType = 'json';
        _this.__regex = /(\$\w+)[\/]*/g;
        _this.__currentUrl = '';
        _this.__registeredUrls = {};
        _this.__lastHash = '';
        _this.__dataTmpValues = {};
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
    SelectModel.prototype.init = function () {
        var self = this;
        if (self.url !== undefined) {
            if (self.matchAll(this.url, this.__regex)) {
                if (self.parent) {
                    self.matchAll(this.url, this.__regex).forEach(function (m) {
                        self.parent.watch(m[1].substr(1), function (data) {
                            self.fetchdata(self.url, m[1].substr(1), data);
                        });
                    });
                }
            }
            if (self.url.length) {
                self.fetchdata(self.url);
            }
            self.parent.watch(self.parentProperty, function (value) {
                if (value && value.length) {
                    self.__dataTmpValues[self.__currentUrl] = value;
                }
            });
        }
    };
    SelectModel.prototype.fetchdata = function (url, property, data) {
        var finalurl = url, self = this;
        this.setProperty('data', []);
        if (this.matchAll(url, this.__regex)) {
            this.matchAll(url, this.__regex).forEach(function (m) {
                var d = property == m[1].substr(1) ? data : self.parent[m[1].substr(1)];
                d = d === undefined || d === null ? null : d.toString();
                if (d && typeof d == 'string' && d.length) {
                    finalurl = finalurl.replace(m[1], d);
                }
                else {
                    finalurl = '';
                }
            });
        }
        if (finalurl.length) {
            this.__currentUrl = finalurl;
            var finalurlHash = self.getAppsAppModuleProvider().getPersistenceManager().getHash(finalurl);
            this.__updateFromLocalStorage(finalurlHash);
            if (finalurl.substr(0, 4) == 'http') {
                this.getHttpClient().get(finalurl).subscribe(function (data) {
                    self.dataCached[finalurlHash] = JSON.stringify(data);
                    self.setProperty('data', data);
                }, function (error) {
                    // skip error
                });
            }
            if (finalurl.substr(0, 1) == '/') {
                var path = self.getFirebaseDatabaseSessionPath(finalurl);
                if (self.__registeredUrls[finalurl] === undefined) {
                    self.__registeredUrls[finalurl] = path;
                    if (self.getFirebaseDatabase() !== undefined) {
                        self.getFirebaseDatabase().object(path).query.on('value', function (event) {
                            self.updateFromFirebase(event, finalurlHash);
                        });
                    }
                }
                else {
                    if (self.getFirebaseDatabase() !== undefined) {
                        self.getFirebaseDatabase().object(path).query.once('value', function (event) {
                            self.updateFromFirebase(event, finalurlHash);
                        });
                    }
                }
            }
        }
        else {
            self.setProperty('data', []);
        }
    };
    SelectModel.prototype.__updateFromLocalStorage = function (finalurlHash) {
        if (this.dataCached[finalurlHash] !== undefined) {
            this.setProperty('data', JSON.parse(this.dataCached[finalurlHash]));
        }
    };
    /**
     *
     * @param event
     * @param finalurlHash
     */
    SelectModel.prototype.updateFromFirebase = function (event, finalurlHash) {
        var self = this;
        if (event && event.ref.path.toString().indexOf(self.__registeredUrls[self.__currentUrl]) >= 0) {
            this.setProperty('data', []);
            var data_1 = event.val();
            if (data_1) {
                if (typeof data_1.forEach !== 'function') {
                    var tmp = [];
                    Object.keys(data_1).forEach(function (v) {
                        tmp.push(data_1[v]);
                    });
                    self.dataCached[finalurlHash] = JSON.stringify(tmp);
                    self.setProperty('data', tmp);
                }
                else {
                    self.dataCached[finalurlHash] = JSON.stringify(data_1);
                    self.setProperty('data', data_1);
                }
            }
            else {
                try {
                    delete self.dataCached[finalurlHash];
                }
                catch (e) {
                    //
                }
                self.setProperty('data', []);
            }
        }
    };
    /**
     * Get options array as promise
     * @returns Observable<any>
     */
    SelectModel.prototype.getOptions = function () {
        var self = this;
        return new Observable_1.Observable(function (observer) {
            self.__optionObserver = observer;
            self.loaded().then(function () {
                self.parent.loaded().then(function () {
                    self.watch('data', function (data) {
                        self.applyData(data);
                    });
                });
            });
        });
    };
    SelectModel.prototype.applyData = function (data) {
        var self = this;
        var options = [];
        var allOptions = {};
        data.forEach(function (item) {
            var v = self.mapping.value ? self.setHashedValue(self._getPropertyFromObject(item, self.mapping.value)) : self.setHashedValue(item);
            allOptions[v] = true;
            options.push({
                value: v,
                text: self._getPropertyFromObject(item, self.mapping.text),
                disabled: self.mapping.disabled !== undefined ? self._getPropertyFromObject(item, self.mapping.disabled) : false
            });
        });
        self.setProperty('options', options);
        // reset temp values
        if (self.parent[self.parentProperty] !== undefined && self.parent[self.parentProperty].length == 0 && self.__dataTmpValues[self.__currentUrl]) {
            self.parent.setProperty(self.parentProperty, self.__dataTmpValues[self.__currentUrl]);
        }
        // remove non valid select options from current value
        if (Object.keys(allOptions).length && self.parent[self.parentProperty] !== undefined) {
            var tmp = [];
            self.parent[self.parentProperty].forEach(function (v) {
                if (allOptions[v] === true) {
                    tmp.push(v);
                }
            });
            if (self.parent[self.parentProperty] !== undefined && self.parent.__isPersistableModel) {
                self.parent.setProperty(self.parentProperty, tmp);
            }
        }
        else {
            if (self.parent[self.parentProperty] !== undefined && self.parent.__isPersistableModel) {
                self.parent.setProperty(self.parentProperty, []);
            }
        }
        if (self.__optionObserver) {
            self.__optionObserver.next(options);
        }
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
