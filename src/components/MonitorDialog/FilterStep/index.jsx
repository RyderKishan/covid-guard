import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

import { StepContent } from '../styles';
import DistrictSelect from '../../DistrictSelect';

const FilterStep = (props) => {
  const { formik, monitorFormik, states } = props;

  const apiCalls =
    monitorFormik.values.monitorInterval < 1
      ? 0
      : Math.ceil(
          formik.values.district.length *
            (300 / monitorFormik.values.monitorInterval)
        );
  return (
    <StepContent>
      <div className="field">
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
      </div>
      <div className="field">
        <DistrictSelect fullWidth formik={formik} />
      </div>
      <div className="field">
        <TextField
          id="monitorInterval"
          idname="monitorInterval"
          label="Monitor Interval (Secs)"
          type="number"
          fullWidth
          value={`${monitorFormik.values.monitorInterval}`}
          onChange={(event) => {
            monitorFormik.setFieldValue(
              'monitorInterval',
              Number(event.target.value),
              true
            );
            monitorFormik.setFieldTouched('monitorInterval', true, true);
          }}
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
      </div>
      <Typography variant="caption" paragraph>
        {formik.values.district.length} districts have been selected. We
        recommend to select districts only around you. This will make is easy
        for the system to give more accurate results
      </Typography>
      <div className="field">
        <span>Api calls:</span>
        <Chip
          label={apiCalls}
          className={apiCalls < 100 ? 'available' : 'unavailable'}
          size="small"
        />
        <span>of 100</span>
      </div>
      {apiCalls >= 100 && (
        <Fade in>
          <Typography variant="caption" paragraph>
            (Note): No of api calls can&apos;t exceed 100 in 300 seconds. Reduce
            the number of districts or increase the monitoring interval. For
            better results make the number near 100
          </Typography>
        </Fade>
      )}
    </StepContent>
  );
};

FilterStep.defaultProps = {
  states: [],
  formik: {},
  monitorFormik: {}
};

FilterStep.propTypes = {
  states: PropTypes.arrayOf(PropTypes.any),
  monitorFormik: PropTypes.any,
  formik: PropTypes.any
};

export default FilterStep;
