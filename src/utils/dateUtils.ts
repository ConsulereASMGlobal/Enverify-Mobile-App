import dayjs from 'dayjs';

export const customParseFormat = require('dayjs/plugin/customParseFormat');

export function epochToHumanReadable(epochTimestamp: number) {
  if (!!!epochTimestamp) {
    return 'DD/MM/YYYY';
  }
  const dateObj = new Date(Number(epochTimestamp));
  const humanReadable = dateObj.toLocaleString(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  return dayjs.unix(Number(epochTimestamp / 1000)).format('DD/MM/YYYY');
  // return humanReadable ?? 'n/a';
}
export function epochToHumanReadableYear(epochTimestamp: number) {
  if (!!!epochTimestamp) {
    return 'DD/MM/YYYY';
  }
  const dateObj = new Date(Number(epochTimestamp));
  const humanReadable = dateObj.toLocaleString(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  return dayjs.unix(Number(epochTimestamp / 1000)).format('YYYY');
  // return humanReadable ?? 'n/a';
}

export const dateTOepoch = (date: any): number => {
  dayjs.extend(customParseFormat);
  const _date = new Date(dayjs(date, 'DD/MM/YYYY').toDate()).getTime();
  return _date;
};

export function epochToHumanReadableTime(epochTimestamp: number) {
  if (!!!epochTimestamp) {
    return '00:00';
  }
  const dateObj = new Date(Number(epochTimestamp));
  const humanReadable = dateObj.toLocaleString(undefined, {
    hour: '2-digit',
    minute: '2-digit'
  });
  return dayjs.unix(Number(epochTimestamp / 1000)).format('hh:mm A');
  // return humanReadable ?? 'n/a';
}
