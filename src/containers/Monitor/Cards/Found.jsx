import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import { Paper } from '../styles';

const Found = (props) => {
  const { values } = props;
  return (
    <Paper className="found">
      <Typography paragraph>Hi {values.name},</Typography>
      <Typography paragraph>We have found a vaccine for you.</Typography>
      <Typography variant="caption" paragraph>
        (Note): Login to{' '}
        <a href="https://www.cowin.gov.in/" rel="noreferrer" target="_blank">
          Cowin
        </a>{' '}
        immediately to book your slots
      </Typography>
    </Paper>
  );
};

Found.defaultProps = {
  values: {}
};

Found.propTypes = {
  values: PropTypes.any
};

export default Found;
