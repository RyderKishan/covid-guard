import React from 'react';
import Typography from '@material-ui/core/Typography';

import { AboutContainer, Paper } from './styles';

const About = () => (
  <AboutContainer>
    <Paper>
      <Typography variant="h4" paragraph>
        About
      </Typography>
      <Typography variant="h6" paragraph>
        Covid Guard
      </Typography>
      <Typography variant="body2" paragraph align="justify">
        This website replicates most of the features of{' '}
        <strong>https://www.cowin.gov.in</strong>. This adds more features over
        the base website. We rely on the data from cowin. This is not a
        profitable website.
      </Typography>
      <Typography variant="h6" paragraph>
        Co-WIN Public APIs
      </Typography>
      <Typography variant="body2" paragraph align="justify">
        Co-WIN Public APIs to find appointment availabilty and to download
        vaccination certificates. These APIs are available for use by all third
        party applications. The appointment availability data is cached and may
        be upto 30 minutes old. Further, these APIs are subject to a rate limit
        of 100 API calls per 5 minutes per IP. Please consider these points
        while using the APIs in your application.
      </Typography>
      <Typography variant="h6" paragraph>
        Developers
      </Typography>
      <Typography variant="body2" paragraph align="justify">
        This is developed by a group of developers who are interested in a
        public contribution.
      </Typography>
    </Paper>
  </AboutContainer>
);

export default About;
