import { Transform } from 'class-transformer';
import { parseISO, startOfDay, endOfDay, formatISO } from 'date-fns';
// import { toZonedTime, format } from 'date-fns-tz';

// export function ReforcarISO8601(tipo?: 'comeco' | 'fim') {
//   return Transform(({ value }) => {
//     if (typeof value !== 'string') {
//       return value;
//     }

//     try {
//       const timeZone = 'America/Sao_Paulo';
//       const dataSemTz = value.split('T')[0];
//       const dataParseada = parseISO(dataSemTz ?? value);

//       if (isNaN(dataParseada.getTime())) {
//         return value;
//       }

//       let dataFormatada = dataParseada;

//       if (tipo) {
//         dataFormatada = tipo === 'comeco' ? startOfDay(dataParseada) : endOfDay(dataParseada);
//       }

//       const dataUTC = toZonedTime(dataFormatada, timeZone);

//       return format(dataUTC, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", { timeZone: 'UTC' });
//     } catch {
//       return value;
//     }
//   });
// }

const SERVER_TZ_OFFSET_MIN = 180;

function localDateToUtc(date: Date) {
  return new Date(date.getTime() - SERVER_TZ_OFFSET_MIN * 60_000);
}

export function ReforcarISO8601(tipo?: 'comeco' | 'fim') {
  return Transform(({ value }) => {
    if (typeof value !== 'string') return value;

    if (/([zZ]|[+-]\d\d:\d\d)$/.test(value)) return value;

    try {
      const raw = value.includes('T') ? value : `${value}T00:00:00`;

      let local = parseISO(raw);
      if (tipo) local = tipo === 'comeco' ? startOfDay(local) : endOfDay(local);

      const utc = localDateToUtc(local);

      return formatISO(utc);
    } catch {
      return value;
    }
  });
}
