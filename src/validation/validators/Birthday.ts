import {registerDecorator, ValidationOptions, ValidationArguments} from "class-validator";

export function Birthday(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "Birthday",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [{'type': 'birthday', 'value': true}],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return true;
        }
      }
    });
  };
}
