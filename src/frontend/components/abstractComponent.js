"use strict";
exports.__esModule = true;
var Observable_1 = require("rxjs/Observable");
var AbstractComponent = (function () {
    function AbstractComponent(appFrameworkProvider) {
        this.appFrameworkProvider = appFrameworkProvider;
        if (appFrameworkProvider) {
            this.config = appFrameworkProvider.config;
        }
    }
    AbstractComponent.prototype.observer = function () {
        var _this = this;
        return new Observable_1.Observable(function (observer) {
            _this.stateObserver = observer;
        });
    };
    AbstractComponent.prototype.complete = function () {
        if (this.stateObserver) {
            this.stateObserver.complete();
        }
    };
    return AbstractComponent;
}());
exports.AbstractComponent = AbstractComponent;
