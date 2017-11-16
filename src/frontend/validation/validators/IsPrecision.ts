import {registerDecorator, ValidationOptions, ValidationArguments} from "class-validator";

export function IsPrecision(precision: number, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isPrecision",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [{'type': 'isPrecision', 'value': precision}],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return true;
        }
      }
    });
  };
}
