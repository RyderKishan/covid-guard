import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import * as qs from 'qs';

import { FallBackContainer } from './styles';

const failureMessages = {
  BUILD: 'The page is under construction',
  NO_ACCESS: "You don't have acces to this page",
  NOT_VALID: 'Requested content is not valid',
  NOT_FOUND: 'Particular content is not found',
  LOGGED_OUT: 'You have been logged out successfully',
  SESSION_EXPIRED: 'Your session is expired! Please reload'
};

const getErrorMessage = (location) => {
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  if (params.error) {
    const failureMessage = failureMessages[params.error];
    if (failureMessage) {
      return {
        text: failureMessage,
        code: `ERRCODE: ${params.error}`
      };
    }
  }
  return {
    text: failureMessages.NOT_FOUND,
    code: 'ERRCODE: 404'
  };
};

const FallBack = () => {
  const history = useHistory();
  const message = getErrorMessage(history.location);
  return (
    <FallBackContainer>
      <div className="code">{message.code}</div>
      <div className="text">{message.text}</div>
    </FallBackContainer>
  );
};

FallBack.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  }).isRequired
};

export default FallBack;
