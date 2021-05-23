import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import { Paper } from '../styles';

const Pause = (props) => {
  const { values } = props;
  return (
    <Paper className="pause">
      <Typography paragraph>
        {values.name}, The monitoring was paused
      </Typography>
      <Typography paragraph>
        The bot will not check for any availability now. You can continue to
        monitor by clicking on the play icon.
      </Typography>
      <Typography variant="caption" paragraph>
        (Note): Reload the page or go to search page to create a new monitoring
      </Typography>
    </Paper>
  );
};

Pause.defaultProps = {
  values: {}
};

Pause.propTypes = {
  values: PropTypes.any
};

export default Pause;
