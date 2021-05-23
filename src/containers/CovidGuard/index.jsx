import React from 'react';
import styled from 'styled-components';
import { withRouter, Route, Switch, useHistory } from 'react-router-dom';
import MuiToolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import useLocalStorage from '../../hooks/useLocalStorage';
import Breadcrumbs from '../../components/Breadcrumbs';
import Snackbar from '../../components/Snackbar';
import FallBack from '../../components/Fallback';
import Home from '../Home';
import Monitor from '../Monitor';
import About from '../About';

const CovidGuard = () => {
  const [initialOpen, setInitialOpen] = useLocalStorage(
    'welcome-message',
    true
  );
  const { push } = useHistory();
  const [snackData, setSnack] = React.useState({});
  return (
    <>
      <Dialog
        onClose={() => setInitialOpen(false)}
        aria-labelledby="simple-dialog-title"
        open={initialOpen}
      >
        <DialogTitle id="simple-dialog-title">Welcome</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2">
            This site relies on <strong>https://www.cowin.gov.in/</strong> for
            availability. Please refer the about page for more information
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button>About Page</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setInitialOpen(false)}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar snack={snackData} />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap>
            Covid Guard
          </Typography>
          <Breadcrumbs />
          <div className="spacer" />
          <nav className="links">
            <li>
              <Typography onClick={() => push('/')}>Search</Typography>
            </li>
            <li>
              <Typography onClick={() => push('/about')}>About</Typography>
            </li>
          </nav>
        </Toolbar>
      </AppBar>
      <article>
        <Switch>
          <Route path="/" exact render={() => <Home setSnack={setSnack} />} />
          <Route path="/about" exact component={About} />
          <Route
            path="/monitor"
            exact
            render={() => <Monitor setSnack={setSnack} />}
          />
          <Route component={FallBack} />
        </Switch>
      </article>
    </>
  );
};

export default withRouter(CovidGuard);

const Toolbar = styled(MuiToolbar)`
  display: flex;
  & > nav.links {
    display: flex;
    align-items: center;
    & > li {
      cursor: pointer;
      :hover {
        text-decoration: underline;
      }
      display: block;
    }
    & > :not(:last-child) {
      margin-right: ${({ theme }) => theme.spacing(2)}px;
    }
  }
  & > div.spacer {
    flex: 1;
  }
`;
