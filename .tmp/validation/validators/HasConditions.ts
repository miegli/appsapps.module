import {registerDecorator, ValidationOptions, ValidationArguments} from "class-validator";
import {Observable} from "rxjs/Observable";
import {Validator} from "class-validator";

export function HasConditions(options: [{
    value?: any,
    property?: string,
    operand?: any,
    validator?: 'equals' | 'notEquals' | 'minLength' | 'maxLength' | 'matches' | 'isEmpty' | 'isNotEmpty' | 'isIn' | 'isNotIn' | 'isBoolean' | 'isDate' | 'isString' | 'isArray' | 'isNumber' | 'isInt' | 'isEnum' | 'isDivisibleBy' | 'isPositive' | 'isNegative' | 'max' | 'min' | 'minDate' | 'maxDate' | 'contains' | 'notContains' | 'isAlpha' | 'isAlphanumeric' | 'isAscii' | 'isBase64' | 'isCreditCard' | 'isCurrency' | 'isEmail' | 'isFQDN' | 'isHexColor' | 'isHexadecimal' | 'isIP' | 'isISBN' | 'isISIN' | 'isISO8601' | 'isJSON' | 'isLowercase' | 'isMobilePhone' | 'isURL' | 'isUUID' | 'isUppercase' | 'length' | 'isMilitaryTime' | 'arrayContains' | 'arrayNotContains' | 'arrayNotEmpty' | 'arrayMinSize' | 'arrayMaxSize' | 'arrayUnique',
    type?: 'condition' | 'limit'
    validatorAdditionalArgument?: any
}], actionIfMatches?: 'hide' | 'show', validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {


        let self = this;

        if (actionIfMatches == undefined) {
            actionIfMatches = 'show';
        }


        options.forEach((option) => {

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
            constraints: [{'type': 'hasConditions', 'value': options, 'actionIfMatches': actionIfMatches}],
            options: {groups: ['condition_' + propertyName]},
            validator: {
                validate(value: any, args: any) {

                    const validator = new Validator();

                    return new Promise(function (resolve, reject) {


                        let observerable = new Observable((observer) => {

                            /**
                             * apply calculated rule
                             * @param state
                             */
                            const applyRule = (state) => {
                                if (state) {
                                    observer.next(); // if true
                                } else {
                                    resolve(false); // if false
                                }
                            }


                            /**
                             * iterates over all rules
                             */
                            if (options) {
                                options.forEach((condition: any) => {

                                    switch (condition.type) {
                                        case 'condition':
                                            applyRule(validator[condition.validator](args.object.__conditionContraintsPropertiesValue[condition.property] === undefined ? args.object[condition.property] : args.object.__conditionContraintsPropertiesValue[condition.property], condition.value, condition.validatorAdditionalArgument));
                                            break;

                                        default:
                                            observer.next();
                                    }


                                });
                            } else {
                                resolve(true);
                            }
                        });

                        /**
                         * apply rules result
                         */
                        let calculated = 0;
                        observerable.subscribe(() => {
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
