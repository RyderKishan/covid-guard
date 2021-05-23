import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Zoom from '@material-ui/core/Zoom';
import ErrorIcon from '@material-ui/icons/Error';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import TimerIcon from '@material-ui/icons/Timer';
import ScheduleIcon from '@material-ui/icons/Schedule';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import StopIcon from '@material-ui/icons/Stop';

import { ChipData, TombstoneContainer } from '../styles';
import { botStatuses } from '../constants';

const Status = (props) => {
  const { isVaccineFound, botStatus, startDate, dataUpdatedAt, values } = props;
  return (
    <TombstoneContainer>
      <ChipData>
        {isVaccineFound ? <CheckCircleIcon /> : <CancelIcon />}
        <div className="details">
          <div className="key" color="textSecondary">
            Vaccine
          </div>
          <div className="value" variant="overline">
            {isVaccineFound ? 'Available' : 'Unavailable'}
          </div>
        </div>
      </ChipData>
      <ChipData>
        {botStatus === 'error' && <ErrorIcon />}
        {botStatus === 'resume' && (
          <Zoom in>
            <AutorenewIcon />
          </Zoom>
        )}
        {botStatus === 'pause' && <PauseCircleFilledIcon />}
        {botStatus === 'stop' && <StopIcon />}
        {botStatus === 'found' && <CheckCircleIcon />}
        <div className="details">
          <div className="key" color="textSecondary">
            Status
          </div>
          <div className="value" variant="overline">
            {botStatuses[botStatus]}
          </div>
        </div>
      </ChipData>
      <ChipData>
        <ScheduleIcon />
        <div className="details">
          <div className="key" color="textSecondary">
            Started
          </div>
          <div className="value" variant="overline">
            {moment(startDate).format('D MMM h:mm A')}
          </div>
        </div>
      </ChipData>
      {isVaccineFound && (
        <ChipData>
          <WatchLaterIcon />
          <div className="details">
            <div className="key" color="textSecondary">
              Completed
            </div>
            <div className="value" variant="overline">
              {moment(new Date(dataUpdatedAt)).format('D MMM h:mm A')}
            </div>
          </div>
        </ChipData>
      )}
      <ChipData>
        <TimerIcon />
        <div className="details">
          <div className="key" color="textSecondary">
            Monitor Interval
          </div>
          <div className="value" variant="overline">
            {`${values.monitorInterval} Seconds`}
          </div>
        </div>
      </ChipData>
    </TombstoneContainer>
  );
};

Status.defaultProps = {
  isVaccineFound: false,
  botStatus: 'resume',
  startDate: new Date(),
  dataUpdatedAt: 0,
  values: {}
};

Status.propTypes = {
  isVaccineFound: PropTypes.bool,
  botStatus: PropTypes.string,
  startDate: PropTypes.any,
  dataUpdatedAt: PropTypes.number,
  values: PropTypes.any
};

export default Status;
