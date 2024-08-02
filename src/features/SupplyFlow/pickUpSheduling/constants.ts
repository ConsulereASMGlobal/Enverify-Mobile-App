import dayjs from 'dayjs';

export const availableDate = [
  // {
  //   fullDate: dayjs().format('DD/MM/YYYY'),
  //   date: dayjs().format('D'),
  //   day: dayjs().format('ddd')
  // },
  {
    fullDate: dayjs().add(1, 'day').format('DD/MM/YYYY'),
    date: dayjs().add(1, 'day').format('D'),
    month: dayjs().add(1, 'day').format('MMMM'),
    day: dayjs().add(1, 'day').format('ddd')
  },
  {
    fullDate: dayjs().add(2, 'day').format('DD/MM/YYYY'),
    date: dayjs().add(2, 'day').format('D'),
    month: dayjs().add(2, 'day').format('MMMM'),
    day: dayjs().add(2, 'day').format('ddd')
  },
  {
    fullDate: dayjs().add(3, 'day').format('DD/MM/YYYY'),
    date: dayjs().add(3, 'day').format('D'),
    month: dayjs().add(3, 'day').format('MMMM'),
    day: dayjs().add(3, 'day').format('ddd')
  },
  {
    fullDate: dayjs().add(4, 'day').format('DD/MM/YYYY'),
    date: dayjs().add(4, 'day').format('D'),
    month: dayjs().add(4, 'day').format('MMMM'),
    day: dayjs().add(4, 'day').format('ddd')
  },
  {
    fullDate: dayjs().add(5, 'day').format('DD/MM/YYYY'),
    date: dayjs().add(5, 'day').format('D'),
    month: dayjs().add(5, 'day').format('MMMM'),
    day: dayjs().add(5, 'day').format('ddd')
  },
  {
    fullDate: dayjs().add(6, 'day').format('DD/MM/YYYY'),
    date: dayjs().add(6, 'day').format('D'),
    month: dayjs().add(6, 'day').format('MMMM'),
    day: dayjs().add(6, 'day').format('ddd')
  },
  {
    fullDate: dayjs().add(7, 'day').format('DD/MM/YYYY'),
    date: dayjs().add(7, 'day').format('D'),
    month: dayjs().add(7, 'day').format('MMMM'),
    day: dayjs().add(7, 'day').format('ddd')
  }
];
