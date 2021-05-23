import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import { Paper } from '../styles';

const Stop = (props) => {
  const { values } = props;
  return (
    <Paper className="stop">
      <Typography paragraph>
        {values.name}, The monitoring was stopped
      </Typography>
      <Typography paragraph>
        We have stopped the bot to monitor the vaccines. Hope we served your
        need!
      </Typography>
      <Typography variant="caption" paragraph>
        (Note): Reload the page or go to search page to create a new monitoring
      </Typography>
    </Paper>
  );
};

Stop.defaultProps = {
  values: {}
};

Stop.propTypes = {
  values: PropTypes.any
};

export default Stop;
