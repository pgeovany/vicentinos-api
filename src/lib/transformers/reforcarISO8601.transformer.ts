import { Transform } from 'class-transformer';
import { parseISO, startOfDay, endOfDay } from 'date-fns';
import { toZonedTime, format } from 'date-fns-tz';

export function ReforcarISO8601(type: 'comeco' | 'fim' = 'comeco') {
  return Transform(({ value }) => {
    if (typeof value !== 'string') {
      return value;
    }

    try {
      const timeZone = 'America/Sao_Paulo';
      const dateWithoutTz = value.split('T')[0];
      const parsedDate = parseISO(dateWithoutTz ?? value);

      if (isNaN(parsedDate.getTime())) {
        return value;
      }

      const boundaryDate = type === 'comeco' ? startOfDay(parsedDate) : endOfDay(parsedDate);

      const utcDate = toZonedTime(boundaryDate, timeZone);

      return format(utcDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", { timeZone: 'UTC' });
    } catch {
      return value;
    }
  });
}
