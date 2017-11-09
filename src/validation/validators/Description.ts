import {registerDecorator, ValidationOptions, ValidationArguments} from "class-validator";

export function Description(description: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "description",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [{'type': 'description', 'value': description}],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return true;
        }
      }
    });
  };
}
