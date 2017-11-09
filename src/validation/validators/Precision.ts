import {registerDecorator, ValidationOptions, ValidationArguments} from "class-validator";

export function Precision(precision: number, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "precision",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [{'type': 'precision', 'value': precision}],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return true;
        }
      }
    });
  };
}
