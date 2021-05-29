import { v4 as uuid } from 'uuid';
import { useQuery, useMutation } from 'react-query';
import queryString from 'query-string';

import { filterCenters } from '../containers/Home/utils';
import { get } from '../api';

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const useStates = (setSnack) =>
  useQuery(
    'states',
    async () => {
      const response = await get(
        `${process.env.REACT_APP_API_HOST}/cowin/states`
      );
      return (response && response.states) || [];
    },
    {
      onError: () => {
        if (setSnack)
          setSnack({
            severity: 'error',
            message: 'Failed to fetch states'
          });
      }
    }
  );

export const useDistricts = (stateId, setSnack) =>
  useQuery(
    ['districts', stateId],
    async () => {
      if (!stateId) return [];
      const url = queryString.stringifyUrl(
        {
          url: `${process.env.REACT_APP_API_HOST}/cowin/districts`,
          query: {
            state: stateId
          }
        },
        {
          arrayFormat: 'bracket-separator',
          skipEmptyString: true,
          skipNull: true
        }
      );
      const response = await get(url);
      return (response && response.districts) || [];
    },
    {
      onError: () => {
        if (setSnack)
          setSnack({
            severity: 'error',
            message: 'Failed to fetch districts'
          });
      },
      enabled: Boolean(stateId)
    }
  );

export const useCenters = (setSnack) =>
  useMutation(
    async ({ payload }) => {
      const { district = [], dateRange = '' } = payload;
      if (!dateRange || (district && district.length === 0)) return [];
      const url = queryString.stringifyUrl(
        {
          url: `${process.env.REACT_APP_API_HOST}/cowin/centers`,
          query: {
            district,
            dateRange
          }
        },
        {
          arrayFormat: 'bracket-separator',
          skipEmptyString: true,
          skipNull: true
        }
      );
      const allCenters = await get(url);
      return allCenters;
    },
    {
      onSuccess: (response, { actions, callback }) => {
        if (actions) actions.setSubmitting(false);
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
        if (callback) callback();
        return response;
      },
      onError: (error, { actions, callback }) => {
        if (actions) actions.setSubmitting(false);
        setSnack({
          severity: 'error',
          message: 'Failed to fetch'
        });
        if (callback) callback();
      }
    }
  );

export const useMonitorCenters = (filters, isMonitoring, setSnack) => {
  const { district = [], dateRange = '', monitorInterval = 30 } = filters;
  return useQuery(
    ['monitor', dateRange],
    async () => {
      if (!dateRange || (district && district.length === 0))
        return { id: uuid(), centers: [] };
      const url = queryString.stringifyUrl(
        {
          url: `${process.env.REACT_APP_API_HOST}/cowin/centers`,
          query: {
            district,
            dateRange
          }
        },
        {
          arrayFormat: 'bracket-separator',
          skipEmptyString: true,
          skipNull: true
        }
      );
      const allCenters = await get(url);
      const filteredCenters = filterCenters(allCenters, filters);
      return {
        id: uuid(),
        centers: filteredCenters
      };
    },
    {
      onError: () => {
        if (setSnack)
          setSnack({
            severity: 'error',
            message: 'Failed to fetch centers'
          });
        return {
          id: uuid()
        };
      },
      enabled: Boolean(dateRange) && isMonitoring,
      refetchInterval: monitorInterval * 1000,
      retry: 0,
      refetchIntervalInBackground: true
    }
  );
};
