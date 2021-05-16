import { useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useQuery, useMutation } from 'react-query';

import { get } from '../api';

export const useWidth = () => {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output, key) => {
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
};

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return initialValue;
    }
  });
  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  return [storedValue, setValue];
};

export const useStates = () =>
  useQuery('states', async () => {
    const response = await get(
      'https://cdn-api.co-vin.in/api/v2/admin/location/states'
    );
    return (response && response.states) || [];
  });

export const useDistricts = (stateId) =>
  useQuery(
    ['districts', stateId],
    async () => {
      if (!stateId) return [];
      const response = await get(
        `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateId}`
      );
      return (response && response.districts) || [];
    },
    { enabled: Boolean(stateId) }
  );

export const useCenters = (districtId) =>
  useQuery(
    ['centers', districtId],
    async () => {
      if (!districtId) return [];
      const response = await get(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${districtId}&date=${new Date()
          .toLocaleDateString()
          .replaceAll('/', '-')}`
      );
      return (response && response.centers) || [];
    },
    { enabled: Boolean(districtId) }
  );

export const useSearchCenters = () =>
  useMutation(
    async ({
      minAgeLimit = [],
      district = '',
      date = '',
      feeType = [],
      dateRange = '',
      vaccine = []
    }) => {
      // const centers = centersMock;
      const { centers = [] } = await get(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district}&date=${dateRange}`
      );
      const filtered = centers
        .filter((c) =>
          feeType.length > 0 ? feeType.includes(c.fee_type) : true
        )
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
      return filtered;
    },
    {
      onSuccess: (response) => response,
      onError: () => {},
      onMutate: () => {}
    }
  );
