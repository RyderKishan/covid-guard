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
  const { formik, isLoading, isFetching, row, onFilter, filters } = props;
  if (isLoading)
    return (
      <FilterContainer>
        <Center>
          <CircularProgress color="secondary" />
        </Center>
      </FilterContainer>
    );

  return (
    <FilterContainer row={row} id="Filter">
      <FormControl component="fieldset" disabled={isFetching}>
        <FormGroup row>
          {vaccines.map(({ value, label }) => (
            <FormControlLabel
              key={value}
              control={
                <Checkbox
                  checked={(filters.vaccine || []).includes(value)}
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
      <FormControl component="fieldset" disabled={isFetching}>
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
                  name={`${value}`}
                />
              }
              label={label}
            />
          ))}
        </FormGroup>
      </FormControl>
      <FormControl component="fieldset" disabled={isFetching}>
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
                  name={`${value}`}
                />
              }
              label={label}
            />
          ))}
        </FormGroup>
      </FormControl>
      <FormControl component="fieldset" disabled={isFetching}>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={Boolean(filters.onlyAvailable)}
                onChange={(event) => {
                  onFilter({
                    ...filters,
                    onlyAvailable: event.target.checked
                  });
                }}
                name="onlyAvailable"
              />
            }
            label="Only Available"
          />
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
            readOnly: isFetching
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
  row: true,
  isFetching: false,
  onFilter: () => {},
  filters: {},
  formik: {}
};

Filter.propTypes = {
  isLoading: PropTypes.bool,
  row: PropTypes.bool,
  isFetching: PropTypes.bool,
  onFilter: PropTypes.func,
  filters: PropTypes.any,
  formik: PropTypes.any
};
