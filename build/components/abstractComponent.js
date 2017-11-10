import { Observable } from 'rxjs/Observable';
/**
 * @abstract
 */
var AbstractComponent = (function () {
    /**
     * @param {?} appFrameworkProvider
     */
    function AbstractComponent(appFrameworkProvider) {
        this.appFrameworkProvider = appFrameworkProvider;
        if (appFrameworkProvider) {
            this.config = appFrameworkProvider.config;
        }
    }
    /**
     * @return {?}
     */
    AbstractComponent.prototype.observer = function () {
        var _this = this;
        return new Observable(function (observer) {
            _this.stateObserver = observer;
        });
    };
    /**
     * @return {?}
     */
    AbstractComponent.prototype.complete = function () {
        if (this.stateObserver) {
            this.stateObserver.complete();
        }
    };
    return AbstractComponent;
}());
export { AbstractComponent };
function AbstractComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    AbstractComponent.prototype.stateObserver;
    /** @type {?} */
    AbstractComponent.prototype.config;
    /** @type {?} */
    AbstractComponent.prototype.appFrameworkProvider;
}
