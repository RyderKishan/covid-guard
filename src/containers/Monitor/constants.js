import * as Yup from 'yup';

export const schema = Yup.object().shape({
  state: Yup.number().required(),
  name: Yup.string().required(),
  dateRange: Yup.string().required().length(10),
  monitorInterval: Yup.number().required().min(30),
  district: Yup.array().of(Yup.number()).required().min(1),
  date: Yup.string().default(''),
  minAgeLimit: Yup.array().of(Yup.number()).nullable().default([]),
  feeType: Yup.array().of(Yup.string()).nullable().default([]),
  vaccine: Yup.array().of(Yup.string()).nullable().default([])
});

export const filterFields = [
  'state',
  'district',
  'dateRange',
  'minAgeLimit',
  'feeType',
  'vaccine',
  'date',
  'name',
  'monitorInterval'
];

export const botStatuses = {
  error: 'Error',
  resume: 'Monitoring',
  pause: 'Paused',
  found: 'Found',
  stop: 'Stopped'
};
