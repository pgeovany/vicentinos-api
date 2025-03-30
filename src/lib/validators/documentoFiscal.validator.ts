import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsDocumentoFiscal(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isDocumentoFiscal',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        ...validationOptions,
        message:
          validationOptions?.message || `Documento fiscal inválido. Insira um CPF ou CPNJ válido.`,
      },
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') return false;

          const isNumeric = /^\d+$/.test(value);
          if (!isNumeric) return false;

          const length = value.length;
          if (length === 11 || length === 14) {
            return true;
          }

          return false;
        },
      },
    });
  };
}

function IsCPFOrCNPJ(type: 'CPF' | 'CNPJ', validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsCPFOrCNPJ',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        ...validationOptions,
        message: validationOptions?.message || `${type} inválido.`,
      },
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') return false;

          const isNumeric = /^\d+$/.test(value);
          if (!isNumeric) return false;

          if (type === 'CPF' && value.length === 11) {
            return true;
          }

          if (type === 'CNPJ' && value.length === 14) {
            return true;
          }

          return false;
        },
      },
    });
  };
}

export function IsCPF(validationOptions?: ValidationOptions) {
  return IsCPFOrCNPJ('CPF', validationOptions);
}

export function IsCNPJ(validationOptions?: ValidationOptions) {
  return IsCPFOrCNPJ('CNPJ', validationOptions);
}
