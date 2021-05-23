import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import { Paper } from '../styles';

const Resume = (props) => {
  const { values } = props;
  return (
    <Paper>
      <Typography paragraph>Hi {values.name},</Typography>
      <Typography paragraph>
        Your browser bot will continue to monitor the vaccine availability and
        let you know. All you need is to just relax. Make sure to create an
        account in cowin. Once vaccines are available you have to register for
        your dose in cowin website.
      </Typography>
      <Typography variant="caption" paragraph>
        (Note): We will notify you once the vaccines are available. Please
        enable the notifications for this site. Click allow if it asks. You can
        trust the notifications from our site. Else you can check this tab
        regularly to see the availability.
      </Typography>
    </Paper>
  );
};

Resume.defaultProps = {
  values: {}
};

Resume.propTypes = {
  values: PropTypes.any
};

export default Resume;
