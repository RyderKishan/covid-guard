import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useFormik } from 'formik';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { FilterContainer } from './styles';

const dateRanges = [
  {
    value: `${moment(new Date()).format('DD-MM-YYYY')}`,
    label: `${moment(new Date()).format('DD-MM-YYYY')} to ${moment(new Date())
      .add(6, 'days')
      .format('DD-MM-YYYY')}`
  },
  {
    value: `${moment(new Date()).add(7, 'days').format('DD-MM-YYYY')}`,
    label: `${moment(new Date())
      .add(7, 'days')
      .format('DD-MM-YYYY')} to ${moment(new Date())
      .add(13, 'days')
      .format('DD-MM-YYYY')}`
  },
  {
    value: `${moment(new Date()).add(14, 'days').format('DD-MM-YYYY')}`,
    label: `${moment(new Date())
      .add(14, 'days')
      .format('DD-MM-YYYY')} to ${moment(new Date())
      .add(20, 'days')
      .format('DD-MM-YYYY')}`
  }
];

const Filter = (props) => {
  const { states, isLoading } = props;

  const onFilter = () => {};

  const formik = useFormik({
    initialValues: {
      state: '',
      district: '',
      dateRange: ''
    },
    onSubmit: onFilter
  });

  console.log('formik.values', formik.values);

  return (
    <FilterContainer>
      <FormControl disabled={isLoading}>
        <InputLabel shrink id="state-label">
          State
        </InputLabel>
        <Select
          labelId="state-label"
          id="state"
          name="state"
          value={formik.values.state}
          onChange={(event) => {
            formik.handleChange(event);
          }}
          displayEmpty
        >
          {states.map(({ state_name: sN, state_id: sI }) => (
            <MenuItem key={sI} value={sI}>
              {sN}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Select a state</FormHelperText>
      </FormControl>
      <FormControl disabled={isLoading}>
        <InputLabel shrink id="district-label">
          District
        </InputLabel>
        <Select
          labelId="district-label"
          id="district"
          name="district"
          value={formik.values.district}
          onChange={(event) => {
            formik.handleChange(event);
          }}
          displayEmpty
        >
          {states.map(({ state_name: sN, state_id: sI }) => (
            <MenuItem key={sI} value={sI}>
              {sN}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Select a district</FormHelperText>
      </FormControl>
      <FormControl disabled={isLoading}>
        <InputLabel shrink id="dateRange-label">
          Date Range
        </InputLabel>
        <Select
          labelId="dateRange-label"
          id="dateRange"
          name="dateRange"
          value={formik.values.dateRange}
          onChange={(event) => {
            formik.handleChange(event);
          }}
          displayEmpty
        >
          {dateRanges.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Select a date range</FormHelperText>
      </FormControl>
    </FilterContainer>
  );
};

export default Filter;

Filter.defaultProps = {
  isLoading: false,
  states: []
};

Filter.propTypes = {
  isLoading: PropTypes.bool,
  states: PropTypes.arrayOf(PropTypes.shape({}))
};
