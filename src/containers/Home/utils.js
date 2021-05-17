import qs from 'qs';

import { dateRanges, defaultFilters } from './constants';

export const filterCenters = (centers = [], filters = defaultFilters) => {
  const { minAgeLimit = [], feeType = [], vaccine = [], date = '' } = filters;
  const filteredCenters = centers
    .filter((c) => (feeType.length > 0 ? feeType.includes(c.fee_type) : true))
    .map((c) => {
      const filteredSessions = (c.sessions || []).filter(
        (s) =>
          (date ? s.date === date : true) &&
          (minAgeLimit.length > 0
            ? minAgeLimit.includes(s.min_age_limit)
            : true) &&
          (vaccine.length > 0 ? vaccine.includes(s.vaccine) : true)
      );
      return { ...c, sessions: filteredSessions };
    })
    .filter((c) => c.sessions && c.sessions.length > 0);
  return filteredCenters;
};

export const getSearchCriteriaFromUrl = (search = '') => {
  const { state, district, dateRange } = qs.parse(search, {
    ignoreQueryPrefix: true
  });
  return {
    state: state || '',
    district: district || '',
    dateRange: dateRange || dateRanges[0].value
  };
};

export const getFilterFromUrl = (search = '') => {
  const { minAgeLimit, feeType, vaccine, date } = qs.parse(search, {
    ignoreQueryPrefix: true,
    parseArrays: true
  });
  return {
    minAgeLimit: minAgeLimit || defaultFilters.minAgeLimit,
    feeType: feeType || defaultFilters.feeType,
    date: date || defaultFilters.date,
    vaccine: vaccine || defaultFilters.vaccine
  };
};
