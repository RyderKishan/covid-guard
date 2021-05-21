import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import MuiSnackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const Snackbar = (props) => {
  const { snack } = props;
  const [snackData, setSnack] = React.useState({});

  const handleClose = (event, reason = '') => {
    switch (reason) {
      case 'clickaway':
      case 'timeout':
        setSnack({
          ...snack,
          id: undefined
        });
        break;
      default:
        setSnack({
          ...snack,
          id: undefined
        });
    }
  };

  React.useEffect(() => {
    if (snack.message)
      setSnack({
        ...snack,
        id: uuid()
      });
  }, [snack]);

  return (
    <MuiSnackbar
      anchorOrigin={{
        vertical: snackData.vertical || 'bottom',
        horizontal: snackData.horizontal || 'center'
      }}
      open={Boolean(snackData.id)}
      onClose={handleClose}
      autoHideDuration={snackData.autoHideDuration || 6000}
    >
      <Alert onClose={handleClose} severity={snackData.severity}>
        {snackData.message}
      </Alert>
    </MuiSnackbar>
  );
};

Snackbar.defaultProps = {
  snack: {}
};

Snackbar.propTypes = {
  snack: PropTypes.any
};

export default Snackbar;
