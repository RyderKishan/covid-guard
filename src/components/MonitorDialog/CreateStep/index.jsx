import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { StepContent } from '../styles';

const CreateStep = (props) => {
  const { monitorFormik, formik, filters } = props;

  const paramString = queryString.stringify(
    { ...formik.values, ...filters, ...monitorFormik.values },
    {
      arrayFormat: 'index',
      skipEmptyString: true,
      skipNull: true
    }
  );

  return (
    <StepContent>
      <Typography variant="body1" paragraph>
        How can we call you?
      </Typography>
      <div className="field">
        <TextField
          id="name"
          name="name"
          value={monitorFormik.values.name}
          onChange={(event) => monitorFormik.handleChange(event)}
          label="Name"
          variant="outlined"
        />
      </div>
      <Typography variant="body1" paragraph>
        Click the button or copy paste the link in a new tab. You can bookmark
        this to get immediate access anytime
      </Typography>
      <Button
        variant="contained"
        color="primary"
        target="_blank"
        disabled={!monitorFormik.values.name}
        href={`/monitor?${paramString}`}
      >
        Open in new tab!
      </Button>
      {monitorFormik.values.name && (
        <Typography className="link" variant="caption" paragraph>
          {`${window.location.origin}/monitor?${paramString}`}
        </Typography>
      )}
    </StepContent>
  );
};

CreateStep.defaultProps = {
  formik: {},
  filters: {},
  monitorFormik: {}
};

CreateStep.propTypes = {
  formik: PropTypes.any,
  filters: PropTypes.any,
  monitorFormik: PropTypes.any
};

export default CreateStep;
