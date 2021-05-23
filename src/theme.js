import { createMuiTheme } from '@material-ui/core/styles';
import { blue, orange } from '@material-ui/core/colors';

const createTheme = (type) =>
  createMuiTheme({
    palette: {
      type,
      primary: blue,
      secondary: orange
    }
  });

export default createTheme;
