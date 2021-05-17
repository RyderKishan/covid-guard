import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { vaccines, feeTypes, minAgeLimits, allDates } from './constants';
import { FilterContainer, Center } from './styles';

const Filter = (props) => {
  const { formik, isLoading, isFetching, onFilter, filters } = props;

  const formReadonly = isFetching;

  if (isLoading)
    return (
      <FilterContainer>
        <Center>
          <CircularProgress color="secondary" />
        </Center>
      </FilterContainer>
    );

  return (
    <FilterContainer>
      <FormControl component="fieldset">
        <FormGroup row>
          {vaccines.map(({ value, label }) => (
            <FormControlLabel
              key={value}
              control={
                <Checkbox
                  checked={(filters.vaccine || []).includes(value)}
                  inputProps={{
                    readOnly: formReadonly
                  }}
                  onChange={(event) => {
                    const newValue = [
                      ...new Set([...(filters.vaccine || []), value])
                    ];
                    onFilter({
                      ...filters,
                      vaccine: event.target.checked
                        ? newValue
                        : newValue.filter((v) => v !== value)
                    });
                  }}
                  name={`${value}`}
                />
              }
              label={label}
            />
          ))}
        </FormGroup>
      </FormControl>
      <FormControl component="fieldset">
        <FormGroup row>
          {feeTypes.map(({ value, label }) => (
            <FormControlLabel
              key={value}
              control={
                <Checkbox
                  checked={(filters.feeType || []).includes(value)}
                  onChange={(event) => {
                    const newValue = [
                      ...new Set([...(filters.feeType || []), value])
                    ];
                    onFilter({
                      ...filters,
                      feeType: event.target.checked
                        ? newValue
                        : newValue.filter((v) => v !== value)
                    });
                  }}
                  inputProps={{
                    readOnly: formReadonly
                  }}
                  name={`${value}`}
                />
              }
              label={label}
            />
          ))}
        </FormGroup>
      </FormControl>
      <FormControl component="fieldset">
        <FormGroup row>
          {minAgeLimits.map(({ value, label }) => (
            <FormControlLabel
              key={value}
              control={
                <Checkbox
                  checked={(filters.minAgeLimit || []).includes(value)}
                  onChange={(event) => {
                    const newValue = [
                      ...new Set([...(filters.minAgeLimit || []), value])
                    ];
                    onFilter({
                      ...filters,
                      minAgeLimit: event.target.checked
                        ? newValue
                        : newValue.filter((v) => v !== value)
                    });
                  }}
                  inputProps={{
                    readOnly: formReadonly
                  }}
                  name={`${value}`}
                />
              }
              label={label}
            />
          ))}
        </FormGroup>
      </FormControl>
      <FormControl
        error={Boolean(formik.submitCount > 0 && formik.errors.date)}
      >
        <Select
          labelId="date-label"
          id="date"
          name="date"
          value={filters.date || ''}
          onChange={(event) => {
            onFilter({
              ...filters,
              date: event.target.value
            });
          }}
          inputProps={{
            readOnly: formReadonly
          }}
          displayEmpty
        >
          <MenuItem value="">All Dates</MenuItem>
          {(
            (formik.values.dateRange && allDates[formik.values.dateRange]) ||
            []
          ).map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </FilterContainer>
  );
};

export default Filter;

Filter.defaultProps = {
  isLoading: false,
  isFetching: false,
  onFilter: () => {},
  filters: {},
  formik: {}
};

Filter.propTypes = {
  isLoading: PropTypes.bool,
  isFetching: PropTypes.bool,
  onFilter: PropTypes.func,
  filters: PropTypes.any,
  formik: PropTypes.any
};
