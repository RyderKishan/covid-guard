import React from 'react';
import PropTypes from 'prop-types';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { useDistricts } from '../../hooks';

const DistrictSelect = (props) => {
  const { formik } = props;
  const { data: districts = [], isLoading: isLoadingDistricts } = useDistricts(
    formik.values.state
  );
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
        value={formik.values.district}
        inputProps={{ readOnly: isLoadingDistricts }}
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
      {Boolean(formik.submitCount > 0 && formik.errors.district) && (
        <FormHelperText>{formik.errors.district}</FormHelperText>
      )}
    </FormControl>
  );
};

DistrictSelect.defaultProps = {
  formik: {}
};

DistrictSelect.propTypes = {
  formik: PropTypes.any
};

export default DistrictSelect;