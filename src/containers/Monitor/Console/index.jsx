import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';

import { ConsoleContainer, Paper } from '../styles';

const Console = (props) => {
  const {
    isFetching,
    setFetchResults,
    fetchResults,
    botStatus,
    toggleNotification,
    setBotStatus,
    showNotification
  } = props;
  const enableNofification = (isEnabled) => {
    if (Notification.permission !== 'granted' && isEnabled)
      Notification.requestPermission();
    toggleNotification(isEnabled);
  };
  return (
    <Paper>
      {isFetching && <LinearProgress className="lp" color="secondary" />}
      <div className="control-actions">
        <Typography>Console</Typography>
        <div className="action-buttons">
          <Button color="primary" onClick={() => setFetchResults([])}>
            Clear
          </Button>
          <Tooltip title="Toggle Notification" placement="bottom">
            <IconButton
              onClick={() => {
                const newData = [...fetchResults];
                const {
                  dataUpdatedAt: oldDataUpdatedAt,
                  errorUpdatedAt: oldErrorUpdatedAt
                } = newData.length > 0 ? newData[newData.length - 1] : {};
                newData.push({
                  dataUpdatedAt: oldDataUpdatedAt,
                  errorUpdatedAt: oldErrorUpdatedAt,
                  updatedAt: new Date().valueOf(),
                  status: '---',
                  message: `Notification ${
                    showNotification ? 'disabled' : 'enabled'
                  }`
                });
                setFetchResults(newData);
                enableNofification(!showNotification);
              }}
            >
              {showNotification ? (
                <NotificationsActiveIcon />
              ) : (
                <NotificationsOffIcon />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Stop" placement="bottom">
            <div>
              <IconButton
                disabled={botStatus === 'stop' || botStatus === 'found'}
                onClick={() => {
                  const newData = [...fetchResults];
                  const {
                    dataUpdatedAt: oldDataUpdatedAt,
                    errorUpdatedAt: oldErrorUpdatedAt
                  } = newData.length > 0 ? newData[newData.length - 1] : {};
                  newData.push({
                    dataUpdatedAt: oldDataUpdatedAt,
                    errorUpdatedAt: oldErrorUpdatedAt,
                    updatedAt: new Date().valueOf(),
                    status: '---',
                    message: 'Monitoring stopped'
                  });
                  setFetchResults(newData);
                  setBotStatus('stop');
                }}
              >
                <StopIcon />
              </IconButton>
            </div>
          </Tooltip>
          <Tooltip title="Pause" placement="bottom">
            <div>
              <IconButton
                disabled={
                  botStatus === 'stop' ||
                  botStatus === 'pause' ||
                  botStatus === 'found'
                }
                onClick={() => {
                  const newData = [...fetchResults];
                  const {
                    dataUpdatedAt: oldDataUpdatedAt,
                    errorUpdatedAt: oldErrorUpdatedAt
                  } = newData.length > 0 ? newData[newData.length - 1] : {};
                  newData.push({
                    dataUpdatedAt: oldDataUpdatedAt,
                    errorUpdatedAt: oldErrorUpdatedAt,
                    updatedAt: new Date().valueOf(),
                    status: '---',
                    message: 'Monitoring paused'
                  });
                  setFetchResults(newData);
                  setBotStatus('pause');
                }}
              >
                <PauseCircleFilledIcon />
              </IconButton>
            </div>
          </Tooltip>
          <Tooltip title="Resume" placement="bottom">
            <div>
              <IconButton
                disabled={
                  botStatus === 'stop' ||
                  botStatus === 'resume' ||
                  botStatus === 'found'
                }
                onClick={() => {
                  const newData = [...fetchResults];
                  const {
                    dataUpdatedAt: oldDataUpdatedAt,
                    errorUpdatedAt: oldErrorUpdatedAt
                  } = newData.length > 0 ? newData[newData.length - 1] : {};
                  newData.push({
                    dataUpdatedAt: oldDataUpdatedAt,
                    errorUpdatedAt: oldErrorUpdatedAt,
                    updatedAt: new Date().valueOf(),
                    status: '---',
                    message: 'Monitoring resumed'
                  });
                  setFetchResults(newData);
                  setBotStatus('resume');
                }}
              >
                <PlayArrowIcon />
              </IconButton>
            </div>
          </Tooltip>
        </div>
      </div>
      <ConsoleContainer>
        {fetchResults.map((fetchResult, ind) => (
          <div className="row" key={`${fetchResult.updatedAt}${ind}`}>
            <span>
              {moment(new Date(fetchResult.updatedAt)).format(
                'DD-MM-YYYY hh:mm:ss A'
              )}
            </span>
            <span>{fetchResult.status}</span>
            <span>{fetchResult.message}</span>
          </div>
        ))}
      </ConsoleContainer>
    </Paper>
  );
};

Console.defaultProps = {
  isFetching: false,
  setFetchResults: () => {},
  fetchResults: [],
  botStatus: 'resume',
  setBotStatus: () => {},
  showNotification: Notification.permission === 'granted',
  toggleNotification: () => {}
};

Console.propTypes = {
  isFetching: PropTypes.bool,
  setFetchResults: PropTypes.func,
  fetchResults: PropTypes.array,
  botStatus: PropTypes.string,
  setBotStatus: PropTypes.func,
  showNotification: PropTypes.bool,
  toggleNotification: PropTypes.func
};

export default Console;
