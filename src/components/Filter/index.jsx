import React from 'react';
import qs from 'qs';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import { useDistricts } from '../../hooks';
import {
  dateRanges,
  vaccines,
  feeTypes,
  minAgeLimits,
  allDates
} from './constants';
import { FilterContainer, Actions, Filters } from './styles';

const DistrictSelect = (props) => {
  const { formDisabled, formik } = props;
  const { data: districts = [], isLoading: isLoadingDistricts } = useDistricts(
    formik.values.state
  );
  return (
    <FormControl
      disabled={formDisabled || isLoadingDistricts}
      error={Boolean(formik.submitCount > 0 && formik.errors.district)}
    >
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
        {districts.map(({ district_id: dI, district_name: dN }) => (
          <MenuItem key={dI} value={dI}>
            {dN}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{formik.errors.district}</FormHelperText>
    </FormControl>
  );
};

DistrictSelect.defaultProps = {
  formDisabled: false,
  formik: {}
};

DistrictSelect.propTypes = {
  formDisabled: PropTypes.bool,
  formik: PropTypes.any
};

const Filter = (props) => {
  const {
    location: { search }
  } = useHistory();
  const filters = qs.parse(search.replace('?', ''));

  const { states, isLoading, onSearch } = props;
  const [initialValues] = React.useState(
    Object.keys(filters).length > 0
      ? filters
      : {
          minAgeLimit: [],
          feeType: [],
          vaccine: [],
          state: '',
          district: '',
          date: '',
          dateRange: dateRanges[0].value
        }
  );

  const onFilter = (values) => {
    onSearch(values);
  };

  const formik = useFormik({
    validationSchema: Yup.object().shape({
      minAgeLimit: Yup.array(),
      feeType: Yup.array(),
      vaccine: Yup.array(),
      state: Yup.number().required(),
      district: Yup.number().required(),
      date: Yup.string(),
      dateRange: Yup.string().required('Date Range is required')
    }),
    initialValues,
    onSubmit: onFilter
  });

  React.useEffect(() => {
    if (Object.keys(filters).length > 0) onSearch(filters);
  }, []);

  const formDisabled = isLoading;

  return (
    <FilterContainer>
      <Filters>
        <FormControl
          disabled={formDisabled}
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
              formik.setFieldValue('district', '', true);
            }}
            displayEmpty
          >
            {states.map(({ state_name: sN, state_id: sI }) => (
              <MenuItem key={sI} value={sI}>
                {sN}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{formik.errors.state}</FormHelperText>
        </FormControl>
        <DistrictSelect formik={formik} formDisabled={formDisabled} />
        <FormControl
          disabled={formDisabled}
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
          <FormHelperText>{formik.errors.dateRange}</FormHelperText>
        </FormControl>
        <FormControl
          disabled={formDisabled}
          error={Boolean(formik.submitCount > 0 && formik.errors.date)}
        >
          <InputLabel shrink id="date-label">
            Date
          </InputLabel>
          <Select
            labelId="date-label"
            id="date"
            name="date"
            value={formik.values.date}
            onChange={(event) => {
              formik.handleChange(event);
            }}
            displayEmpty
          >
            <MenuItem value="">All</MenuItem>
            {(
              (formik.values.dateRange && allDates[formik.values.dateRange]) ||
              []
            ).map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{formik.errors.date}</FormHelperText>
        </FormControl>
        <FormControl
          disabled={formDisabled}
          error={Boolean(formik.submitCount > 0 && formik.errors.vaccine)}
        >
          <InputLabel shrink id="vaccine-label">
            Vaccine
          </InputLabel>
          <Select
            labelId="vaccine-label"
            id="vaccine"
            name="vaccine"
            value={formik.values.vaccine}
            multiple
            onChange={(event) => formik.handleChange(event)}
            input={<Input />}
            renderValue={(selected) =>
              selected
                .map((s) => {
                  const value = vaccines.find((m) => m.value === s);
                  return (value && value.label) || '';
                })
                .join(', ')
            }
          >
            {vaccines.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                <Checkbox
                  checked={(formik.values.vaccine || []).includes(value)}
                />
                <ListItemText primary={label} />
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{formik.errors.vaccine}</FormHelperText>
        </FormControl>
        <FormControl
          disabled={formDisabled}
          error={Boolean(formik.submitCount > 0 && formik.errors.feeType)}
        >
          <InputLabel shrink id="feeType-label">
            Fee Type
          </InputLabel>
          <Select
            labelId="feeType-label"
            id="feeType"
            name="feeType"
            value={formik.values.feeType}
            multiple
            onChange={(event) => formik.handleChange(event)}
            input={<Input />}
            renderValue={(selected) =>
              selected
                .map((s) => {
                  const value = feeTypes.find((m) => m.value === s);
                  return (value && value.label) || '';
                })
                .join(', ')
            }
          >
            {feeTypes.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                <Checkbox
                  checked={(formik.values.feeType || []).includes(value)}
                />
                <ListItemText primary={label} />
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{formik.errors.feeType}</FormHelperText>
        </FormControl>
        <FormControl
          disabled={formDisabled}
          error={Boolean(formik.submitCount > 0 && formik.errors.minAgeLimit)}
        >
          <InputLabel shrink id="minAgeLimit-label">
            Min Age Limit
          </InputLabel>
          <Select
            labelId="minAgeLimit-label"
            id="minAgeLimit"
            name="minAgeLimit"
            value={formik.values.minAgeLimit}
            multiple
            onChange={(event) => formik.handleChange(event)}
            input={<Input />}
            renderValue={(selected) =>
              selected
                .map((s) => {
                  const value = minAgeLimits.find((m) => m.value === s);
                  return (value && value.label) || '';
                })
                .join(', ')
            }
          >
            {minAgeLimits.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                <Checkbox
                  checked={(formik.values.minAgeLimit || []).includes(value)}
                />
                <ListItemText primary={label} />
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{formik.errors.minAgeLimit}</FormHelperText>
        </FormControl>
      </Filters>
      <Actions>
        <div />
        <div>
          <Button variant="contained" color="secondary">
            Cancel
          </Button>
          <Button
            onClick={formik.handleSubmit}
            variant="contained"
            color="primary"
            disabled={formik.submitCount > 0 && !formik.isValid}
          >
            Filter
          </Button>
        </div>
      </Actions>
    </FilterContainer>
  );
};

export default Filter;

Filter.defaultProps = {
  isLoading: false,
  onSearch: () => {},
  states: []
};

Filter.propTypes = {
  isLoading: PropTypes.bool,
  onSearch: PropTypes.func,
  states: PropTypes.arrayOf(
    PropTypes.shape({
      state_name: PropTypes.string,
      state_id: PropTypes.number
    })
  )
};
