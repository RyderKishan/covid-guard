import React from 'react';
// import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import { StepContent } from '../styles';

const InfoStep = () => (
  <StepContent>
    <Typography variant="body1" paragraph>
      Live monitors will check if the vaccine becomes available anytime. We will
      continue to monitor the vaccine based on the filters provided by you.
    </Typography>
    <Typography variant="caption">
      (Note): You need to keep the tab open and your machine running to continue
      the monitoring
    </Typography>
  </StepContent>
);

// InfoStep.defaultProps = {
//   formik: {}
// };

// InfoStep.propTypes = {
//   formik: PropTypes.any
// };

export default InfoStep;
