/* eslint-disable consistent-return */
import React from 'react';

export default (enabled = true, message) => {
  const onbeforeunloadHandler = React.useCallback(
    (event) => {
      if (!enabled) return;
      event.preventDefault();
      // eslint-disable-next-line no-param-reassign
      event.returnValue = message;
    },
    [enabled, message]
  );

  React.useEffect(() => {
    if (!enabled) return;
    window.addEventListener('beforeunload', onbeforeunloadHandler);
    return () =>
      window.removeEventListener('beforeunload', onbeforeunloadHandler);
  }, [enabled, onbeforeunloadHandler]);
};
