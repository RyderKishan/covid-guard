import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useQuery, useQueries, useMutation } from 'react-query';

import { filterCenters } from '../containers/Home/utils';

import { get } from '../api';

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

export const useCenters = (district = [], dateRange) => {
  const queries = district.map((districtId) => ({
    queryKey: ['calendarByDistrict', districtId, 'date', dateRange],
    queryFn: async () => {
      if (!districtId || !dateRange) return [];
      const response = await get(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${districtId}&date=${dateRange}`
      );
      return (response && response.centers) || [];
    }
  }));
  return useQueries(queries);
};

export const useMonitorCenters = (filters, isMonitoring) => {
  const { district = [], dateRange = '', monitorInterval = 30 } = filters;
  return useQuery(
    ['monitor', dateRange],
    async () => {
      if (!dateRange || (district && district.length === 0))
        return { id: uuid(), centers: [] };
      const allResponse = await Promise.all(
        district.map((dI) =>
          get(
            `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${dI}&date=${dateRange}`
          )
        )
      );
      const allCenters = [];
      allResponse.forEach((resp) => {
        allCenters.push(...(resp.centers || []));
      });
      const filteredCenters = filterCenters(allCenters, filters);
      return {
        id: uuid(),
        centers: filteredCenters
      };
    },
    {
      enabled: Boolean(dateRange) && isMonitoring,
      refetchInterval: monitorInterval * 1000,
      refetchIntervalInBackground: true
    }
  );
};

export const useSearchCenters = (setSnack = () => {}) =>
  useMutation(
    async ({ payload }) => {
      const { district = [], dateRange = '' } = payload;
      if (!dateRange || (district && district.length === 0)) return [];
      const allResponse = await Promise.all(
        district.map((dI) =>
          get(
            `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${dI}&date=${dateRange}`
          )
        )
      );
      const allCenters = [];
      allResponse.forEach((resp) => {
        allCenters.push(...(resp.centers || []));
      });
      return allCenters;
    },
    {
      onSuccess: (response, { actions }) => {
        actions.setSubmitting(false);
        if (response && response.length > 0) {
          setSnack({
            severity: 'success',
            message: `${response.length} results found`
          });
        } else {
          setSnack({
            severity: 'warning',
            message: 'No data available'
          });
        }
        return response;
      },
      onError: (error, { actions }) => {
        actions.setSubmitting(false);
        setSnack({
          severity: 'error',
          message: 'Failed to fetch'
        });
      }
    }
  );
