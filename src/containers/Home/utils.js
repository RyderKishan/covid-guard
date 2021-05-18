import queryString from 'query-string';

import { dateRanges, defaultFilters } from './constants';

export const filterCenters = (centers = [], filters = defaultFilters) => {
  const {
    minAgeLimit = [],
    feeType = [],
    vaccine = [],
    date = '',
    onlyAvailable = false
  } = filters;
  const filteredCenters = centers
    .filter((c) => (feeType.length > 0 ? feeType.includes(c.fee_type) : true))
    .map((c) => {
      const filteredSessions = (c.sessions || []).filter(
        (s) =>
          (date ? s.date === date : true) &&
          (minAgeLimit.length > 0
            ? minAgeLimit.includes(s.min_age_limit)
            : true) &&
          (vaccine.length > 0 ? vaccine.includes(s.vaccine) : true) &&
          (onlyAvailable ? s.available_capacity > 0 : true)
      );
      return { ...c, sessions: filteredSessions };
    })
    .filter((c) => c.sessions && c.sessions.length > 0);
  return filteredCenters;
};

export const getParamsFromSearch = (search = '') => {
  const { state, district, dateRange, minAgeLimit, feeType, vaccine, date } =
    queryString.parse(search, {
      arrayFormat: 'index',
      parseBooleans: true,
      parseNumbers: true
    });
  const searchCriteria = {
    state: state || '',
    district: district || [],
    dateRange: dateRange || dateRanges[0].value
  };
  const filter = {
    minAgeLimit: minAgeLimit || defaultFilters.minAgeLimit,
    feeType: feeType || defaultFilters.feeType,
    date: date || defaultFilters.date,
    vaccine: vaccine || defaultFilters.vaccine
  };
  return { searchCriteria, filter };
};
