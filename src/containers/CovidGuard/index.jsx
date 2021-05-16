import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';

import FallBack from '../../components/Fallback';
import Home from '../Home';

const CovidGuard = () => (
  <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" noWrap>
          Covid Guard
        </Typography>
      </Toolbar>
    </AppBar>
    <article>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/new" exact render={() => <div>new</div>} />
        <Route component={FallBack} />
      </Switch>
    </article>
  </>
);

export default withRouter(CovidGuard);
