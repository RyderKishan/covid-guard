import { useQuery } from 'react-query';
import { get } from '../../api';

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
