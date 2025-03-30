import { Transform } from 'class-transformer';

export function SanitizarStringNumerica() {
  return Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.replace(/\D+/g, '');
    }
    return value;
  });
}
