import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import DistrictSelect from '../DistrictSelect';
import { dateRanges } from '../../containers/Home/constants';
import { SearchCriteriaFields } from './styles';

const SearchCriteria = (props) => {
  const { states, formik, fullWidth } = props;
  return (
    <SearchCriteriaFields fullWidth={fullWidth}>
      <FormControl
        error={Boolean(formik.submitCount > 0 && formik.errors.state)}
      >
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
            formik.setFieldValue('district', [], true);
          }}
          displayEmpty
        >
          {states.map(({ state_name: sN, state_id: sI }) => (
            <MenuItem key={sI} value={sI}>
              {sN}
            </MenuItem>
          ))}
        </Select>
        {Boolean(formik.submitCount > 0 && formik.errors.state) && (
          <FormHelperText>{formik.errors.state}</FormHelperText>
        )}
      </FormControl>
      <DistrictSelect formik={formik} />
      <FormControl
        error={Boolean(formik.submitCount > 0 && formik.errors.dateRange)}
      >
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
        {Boolean(formik.submitCount > 0 && formik.errors.dateRange) && (
          <FormHelperText>{formik.errors.dateRange}</FormHelperText>
        )}
      </FormControl>
    </SearchCriteriaFields>
  );
};

SearchCriteria.defaultProps = {
  fullWidth: false,
  formik: {},
  states: []
};

SearchCriteria.propTypes = {
  fullWidth: PropTypes.bool,
  formik: PropTypes.any,
  states: PropTypes.array
};

export default SearchCriteria;
