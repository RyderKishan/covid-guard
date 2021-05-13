import { createMuiTheme } from '@material-ui/core/styles';
import { green, yellow } from '@material-ui/core/colors';

const createTheme = (type) =>
  createMuiTheme({
    palette: {
      type,
      primary: green,
      secondary: yellow
    }
  });

export default createTheme;
