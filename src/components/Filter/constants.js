import moment from 'moment';

const dateFormat = 'DD-MM-YYYY';
const dateDisplayFormat = 'Do MMM';
const allDates = {};

export const dateRanges = [
  {
    value: `${moment(new Date()).format(dateFormat)}`,
    label: 'This week'
  },
  {
    value: `${moment(new Date()).add(7, 'days').format(dateFormat)}`,
    label: 'Next week'
  },
  {
    value: `${moment(new Date()).add(14, 'days').format(dateFormat)}`,
    label: '3rd week'
  }
];

dateRanges.forEach((dateRange, ind) => {
  const weekDays = [];
  for (let i = 0; i < 7; i += 1) {
    weekDays.push({
      value: `${moment(new Date())
        .add(ind * 7 + i, 'days')
        .format(dateFormat)}`,
      label: `${moment(new Date())
        .add(ind * 7 + i, 'days')
        .format(dateDisplayFormat)}`
    });
  }
  allDates[dateRange.value] = weekDays;
});

export const vaccines = [
  {
    value: 'COVAXIN',
    label: 'Covaxin'
  },
  {
    value: 'COVISHIELD',
    label: 'Covishield'
  },
  {
    value: 'SPUTNIKV',
    label: 'Sputnik V'
  }
];

export const feeTypes = [
  {
    value: 'Free',
    label: 'Free'
  },
  {
    value: 'Paid',
    label: 'Paid'
  }
];

export const minAgeLimits = [
  {
    value: 18,
    label: '18+'
  },
  {
    value: 45,
    label: '45+'
  }
];

export { allDates };
