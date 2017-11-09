import {registerDecorator, ValidationOptions, ValidationArguments} from "class-validator";

export function Label(label: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "label",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [{'type': 'label', 'value': label}],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return true;
        }
      }
    });
  };
}
