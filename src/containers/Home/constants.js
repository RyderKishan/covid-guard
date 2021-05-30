import moment from 'moment';

export const columns = [
  { field: 'center_id', headerName: 'Center Id', alignHeader: 'center' },
  { field: 'fee_type', headerName: 'Type', alignHeader: 'center' },
  {
    field: 'district_name',
    headerName: 'District Name',
    alignHeader: 'center'
  },
  { field: 'block_name', headerName: 'Block Name', alignHeader: 'center' },
  { field: 'name', headerName: 'Center Name', alignHeader: 'center' },
  {
    field: 'pincode',
    headerName: 'Pincode',
    type: 'number',
    alignHeader: 'center'
  },
  {
    field: 'noOfSessions',
    headerName: 'No of sessions',
    disableSorting: true,
    valueGetter: (row) => `${(row.sessions || []).length}`,
    alignHeader: 'center'
  }
];

export const dateFormat = 'DD-MM-YYYY';
export const dateDisplayFormat = 'Do MMM';

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

export const defaultFilters = {
  minAgeLimit: [],
  feeType: [],
  vaccine: [],
  date: ''
};

export const defaultSearchCriteria = {
  state: '',
  district: [],
  dateRange: dateRanges[0].value
};
