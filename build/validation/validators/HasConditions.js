import { registerDecorator } from 'class-validator';
import { Observable } from 'rxjs/Observable';
import { Validator } from 'class-validator';
/**
 * @param {?} options
 * @param {?=} actionIfMatches
 * @param {?=} validationOptions
 * @return {?}
 */
export function HasConditions(options, actionIfMatches, validationOptions) {
    return function (object, propertyName) {
        var /** @type {?} */ self = this;
        if (actionIfMatches == undefined) {
            actionIfMatches = 'show';
        }
        options.forEach(function (option) {
            if (option.property == undefined) {
                option.property = propertyName;
            }
            if (option.validator == undefined) {
                option.validator = 'equals';
            }
            if (option.type == undefined) {
                option.type = 'condition';
            }
            if (option.value == undefined) {
                option.value = true;
            }
        });
        registerDecorator({
            name: "hasConditions",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [{ 'type': 'hasConditions', 'value': options, 'actionIfMatches': actionIfMatches }],
            options: { groups: ['condition_' + propertyName] },
            validator: {
                /**
                 * @param {?} value
                 * @param {?} args
                 * @return {?}
                 */
                validate: function (value, args) {
                    var /** @type {?} */ validator = new Validator();
                    return new Promise(function (resolve, reject) {
                        var /** @type {?} */ observerable = new Observable(function (observer) {
                            /**
                             * apply calculated rule
                             * @param state
                             */
                            var applyRule = function (state) {
                                if (state) {
                                    observer.next(); // if true
                                }
                                else {
                                    resolve(false); // if false
                                }
                            };
                            /**
                             * iterates over all rules
                             */
                            if (options) {
                                options.forEach(function (condition) {
                                    switch (condition.type) {
                                        case 'condition':
                                            applyRule(validator[condition.validator](args.object.__conditionContraintsPropertiesValue[condition.property] === undefined ? args.object[condition.property] : args.object.__conditionContraintsPropertiesValue[condition.property], condition.value, condition.validatorAdditionalArgument));
                                            break;
                                        default:
                                            observer.next();
                                    }
                                });
                            }
                            else {
                                resolve(true);
                            }
                        });
                        /**
                         * apply rules result
                         */
                        var calculated = 0;
                        observerable.subscribe(function () {
                            calculated++;
                            if (calculated >= options.length) {
                                resolve(true);
                            }
                        });
                    });
                }
            }
        });
    };
}
