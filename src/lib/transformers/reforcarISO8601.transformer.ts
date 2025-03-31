import { Transform } from 'class-transformer';
import { parseISO, startOfDay, endOfDay } from 'date-fns';
import { toZonedTime, format } from 'date-fns-tz';

export function ReforcarISO8601(tipo?: 'comeco' | 'fim') {
  return Transform(({ value }) => {
    if (typeof value !== 'string') {
      return value;
    }

    try {
      const timeZone = 'America/Sao_Paulo';
      const dataSemTz = value.split('T')[0];
      const dataParseada = parseISO(dataSemTz ?? value);

      if (isNaN(dataParseada.getTime())) {
        return value;
      }

      let dataFormatada = dataParseada;

      if (tipo) {
        dataFormatada = tipo === 'comeco' ? startOfDay(dataParseada) : endOfDay(dataParseada);
      }

      const dataUTC = toZonedTime(dataFormatada, timeZone);

      return format(dataUTC, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", { timeZone: 'UTC' });
    } catch {
      return value;
    }
  });
}
