import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsPhoneNumber(type: 'telefone' | 'celular', validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPhoneNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        ...validationOptions,
        message:
          validationOptions?.message ||
          `${type} inválido. Insira um número de ${type} válido, incluindo DDD.`,
      },
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') return false;

          const isNumeric = /^\d+$/.test(value);
          if (!isNumeric) return false;

          const length = value.length;
          if (type === 'telefone' && length === 10) {
            return true;
          }

          if (type === 'celular' && length === 11) {
            return true;
          }

          return false;
        },
      },
    });
  };
}

export function IsTelefone(validationOptions?: ValidationOptions) {
  return IsPhoneNumber('telefone', validationOptions);
}

export function IsCelular(validationOptions?: ValidationOptions) {
  return IsPhoneNumber('celular', validationOptions);
}
