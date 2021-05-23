import React from 'react';
import PropTypes from 'prop-types';

import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { useDistricts } from '../../hooks';

const DistrictSelect = (props) => {
  const { formik, fullWidth, setSnack } = props;
  const { data: districts = [], isLoading: isLoadingDistricts } = useDistricts(
    formik.values.state,
    setSnack
  );
  const allDistricts = {};
  districts.forEach((district) => {
    allDistricts[district.district_id] = district;
  });

  const isSelectAll =
    formik.values.district &&
    formik.values.district.length === districts.length;
  return (
    <FormControl
      disabled={!formik.values.state}
      error={Boolean(formik.submitCount > 0 && formik.errors.district)}
    >
      <InputLabel shrink id="district-label">
        District
      </InputLabel>
      <Select
        labelId="district-label"
        id="district"
        name="district"
        multiple
        fullWidth={fullWidth}
        value={formik.values.district}
        inputProps={{ readOnly: isLoadingDistricts }}
        input={<Input />}
        renderValue={(selected) =>
          selected
            .map(
              (id) => (allDistricts[id] && allDistricts[id].district_name) || ''
            )
            .join(', ')
        }
        onChange={(event) => {
          const { value } = event.target;
          if (value && value.length > 0 && value[value.length - 1] === 'all') {
            let allValues = [];
            if (!isSelectAll) {
              allValues = districts.map(({ district_id: dI }) => dI);
            }
            formik.handleChange({
              ...event,
              target: { ...event.target, value: allValues }
            });
          } else {
            formik.handleChange(event);
          }
        }}
        displayEmpty
      >
        <MenuItem value="all">
          <Checkbox
            checked={isSelectAll}
            indeterminate={
              formik.values.district &&
              formik.values.district.length > 0 &&
              formik.values.district.length < districts.length
            }
          />
          <ListItemText primary="Select all" />
        </MenuItem>
        {districts.map(({ district_id: dI, district_name: dN }) => (
          <MenuItem key={dI} value={dI}>
            <Checkbox checked={(formik.values.district || []).includes(dI)} />
            <ListItemText primary={dN} />
          </MenuItem>
        ))}
      </Select>
      {Boolean(formik.submitCount > 0 && formik.errors.district) && (
        <FormHelperText>{formik.errors.district}</FormHelperText>
      )}
    </FormControl>
  );
};

DistrictSelect.defaultProps = {
  setSnack: () => {},
  fullWidth: false,
  formik: {}
};

DistrictSelect.propTypes = {
  setSnack: PropTypes.func,
  fullWidth: PropTypes.bool,
  formik: PropTypes.any
};

export default DistrictSelect;
