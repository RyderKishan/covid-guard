import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { pick } from 'ramda';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import ErrorIcon from '@material-ui/icons/Error';
import CancelIcon from '@material-ui/icons/Cancel';
import EventIcon from '@material-ui/icons/Event';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import TimerIcon from '@material-ui/icons/Timer';
import StopIcon from '@material-ui/icons/Stop';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import MapIcon from '@material-ui/icons/Map';
import RoomIcon from '@material-ui/icons/Room';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PersonIcon from '@material-ui/icons/Person';
import ScheduleIcon from '@material-ui/icons/Schedule';

import { notify } from '../../utils';
import { schema, filterFields, botStatuses } from './constants';
import {
  MonitorContainer,
  Paper,
  Center,
  Error,
  ChipData,
  Console
} from './styles';
import { useDistricts, useMonitorCenters, useStates } from '../../hooks';
import {
  feeTypes,
  minAgeLimits,
  vaccines
} from '../../components/Filter/constants';
import Table from '../../components/Table';
import { columns, dateRanges } from '../Home/constants';

const Monitor = (props) => {
  const { setSnack } = props;
  const { search } = useLocation();

  const [startDate] = React.useState(new Date());
  const [fetchResults, setFetchResults] = React.useState([]);
  const [isVaccineFound, setIsVaccineFound] = React.useState(false);
  const [botStatus, setBotStatus] = React.useState('resume');
  const [showNotification, toggleNotification] = React.useState(
    Notification.permission === 'granted'
  );
  const [isParamError, setIsParamError] = React.useState(false);
  const [isValidating, setValidating] = React.useState(true);
  const [values, setValues] = React.useState({});

  const {
    data = {},
    isLoading,
    isSuccess,
    isFetching,
    dataUpdatedAt
  } = useMonitorCenters(values, botStatus === 'resume' && !isVaccineFound);
  const { data: states = [], isLoading: isLoadingStates } = useStates();
  const { data: districts = [], isLoading: isLoadingDistricts } = useDistricts(
    values.state
  );

  const allDistricts = [];
  districts.forEach((district) => {
    allDistricts[district.district_id] = district;
  });

  const allStates = [];
  states.forEach((state) => {
    allStates[state.state_id] = state;
  });

  React.useEffect(async () => {
    const qParams = pick(
      filterFields,
      queryString.parse(search, {
        arrayFormat: 'index',
        parseBooleans: true,
        parseNumbers: true
      })
    );
    let newValues = {};
    let isValid = true;
    try {
      newValues = await schema.validateSync(qParams);
    } catch (error) {
      isValid = false;
    }
    if (!isValid) {
      setIsParamError(true);
    } else {
      const apiCalls =
        newValues.monitorInterval < 1
          ? 0
          : Math.ceil(
              newValues.district.length * (300 / newValues.monitorInterval)
            );
      if (apiCalls >= 100) {
        setSnack({
          severity: 'error',
          message: 'Invalid Monitoring Interval'
        });
        setIsParamError(true);
      } else {
        setIsParamError(false);
        setValues(newValues);
      }
    }
    setValidating(false);
    if (Notification.permission !== 'granted') Notification.requestPermission();
  }, []);

  const enableNofification = (isEnabled) => {
    if (Notification.permission !== 'granted' && isEnabled)
      Notification.requestPermission();
    toggleNotification(isEnabled);
  };

  React.useEffect(() => {
    if (!isLoading && !isFetching && dataUpdatedAt > 0) {
      const newData = [...fetchResults];
      newData.push({
        dataUpdatedAt,
        timeStamp: moment(new Date(dataUpdatedAt)).format(
          'DD-MM-YYYY hh:mm:ss A'
        ),
        message: `${isSuccess ? ' OK' : 'ERR'}`
      });
      setFetchResults(newData);
      if (data && data.centers && data.centers.length > 1) {
        setBotStatus('found');
        setIsVaccineFound(true);
        notify(
          'Vaccines found',
          'Covid Guard Bot has found a vaccine for you!'
        );
      }
    }
  }, [data]);

  if (isLoadingDistricts || isValidating || isLoadingStates)
    return (
      <Paper className="full-height">
        <Center>
          <CircularProgress color="secondary" />
        </Center>
      </Paper>
    );

  if (isParamError)
    return (
      <Paper className="full-height">
        <Center>
          <Error>
            <div>
              <InfoIcon />
            </div>
            <div>
              <Typography variant="body1" paragraph>
                Error - Link is invalid
              </Typography>
              <Typography variant="caption">
                (Note): Please genetare a new monitor from the search page
              </Typography>
            </div>
          </Error>
        </Center>
      </Paper>
    );

  return (
    <MonitorContainer>
      <Helmet>
        <title>{`Covid Guard Bot - ${botStatuses[botStatus]}`}</title>
      </Helmet>
      <Paper>
        <div className="top-bar">
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
            {botStatus === 'resume' && <AutorenewIcon />}
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
        </div>
      </Paper>
      <Paper>
        <div className="top-bar">
          <ChipData>
            <RoomIcon />
            <div className="details">
              <div className="key" color="textSecondary">
                State
              </div>
              <div className="value" variant="overline">
                {allStates[values.state].state_name}
              </div>
            </div>
          </ChipData>
          <ChipData>
            <MapIcon />
            <div className="details">
              <div className="key" color="textSecondary">
                Districts
              </div>
              <Tooltip
                title={values.district
                  .map((d) => allDistricts[d].district_name)
                  .join(', ')}
                placement="bottom"
                enterDelay={100}
              >
                <div className="value" variant="overline">
                  {values.district.length} Selected
                </div>
              </Tooltip>
            </div>
          </ChipData>
          {values.vaccine.length > 0 && (
            <ChipData>
              <LocalHospitalIcon />
              <div className="details">
                <div className="key" color="textSecondary">
                  Vaccines
                </div>
                <div className="value" variant="overline">
                  {vaccines
                    .filter((v) => values.vaccine.includes(v.value))
                    .map((v) => v.label)
                    .join(', ')}
                </div>
              </div>
            </ChipData>
          )}
          {values.minAgeLimit.length > 0 && (
            <ChipData>
              <PersonIcon />
              <div className="details">
                <div className="key" color="textSecondary">
                  Min Age Limit
                </div>
                <div className="value" variant="overline">
                  {minAgeLimits
                    .filter((v) => values.minAgeLimit.includes(v.value))
                    .map((v) => v.label)
                    .join(', ')}
                </div>
              </div>
            </ChipData>
          )}
          {values.feeType.length > 0 && (
            <ChipData>
              <AttachMoneyIcon />
              <div className="details">
                <div className="key" color="textSecondary">
                  Fee Type
                </div>
                <div className="value" variant="overline">
                  {feeTypes
                    .filter((v) => values.feeType.includes(v.value))
                    .map((v) => v.label)
                    .join(', ')}
                </div>
              </div>
            </ChipData>
          )}
          <ChipData>
            <EventIcon />
            <div className="details">
              <div className="key" color="textSecondary">
                Date Range
              </div>
              <div className="value" variant="overline">
                {dateRanges
                  .filter((v) => values.dateRange.includes(v.value))
                  .map((v) => v.label)
                  .join(', ')}
              </div>
            </div>
          </ChipData>
        </div>
      </Paper>
      {botStatus === 'stop' && (
        <Paper className="stop">
          <Typography paragraph>
            {values.name}, The monitoring was stopped
          </Typography>
          <Typography paragraph>
            We have stopped the bot to monitor the vaccines. Hope we served your
            need!
          </Typography>
          <Typography variant="caption" paragraph>
            (Note): Reload the page or go to search page to create a new
            monitoring
          </Typography>
        </Paper>
      )}
      {botStatus === 'pause' && !isVaccineFound && (
        <Paper className="pause">
          <Typography paragraph>
            {values.name}, The monitoring was paused
          </Typography>
          <Typography paragraph>
            The bot will not check for any availability now. You can continue to
            monitor by clicking on the play icon.
          </Typography>
          <Typography variant="caption" paragraph>
            (Note): Reload the page or go to search page to create a new
            monitoring
          </Typography>
        </Paper>
      )}
      {botStatus === 'resume' && !isVaccineFound && (
        <Paper>
          <Typography paragraph>Hi {values.name},</Typography>
          <Typography paragraph>
            Your browser bot will continue to monitor the vaccine availability
            and let you know. All you need is to just relax. Make sure to create
            an account in cowin. Once vaccines are available you have to
            register for your dose in cowin website.
          </Typography>
          <Typography variant="caption" paragraph>
            (Note): We will notify you once the vaccines are available. Please
            enable the notifications for this site. Click allow if it asks. You
            can trust the notifications from our site. Else you can check this
            tab regularly to see the availability.
          </Typography>
        </Paper>
      )}
      {botStatus === 'found' && isVaccineFound && (
        <Paper className="found">
          <Typography paragraph>Hi {values.name},</Typography>
          <Typography paragraph>
            Your browser bot has found a vaccine for you.
          </Typography>
          <Typography variant="caption" paragraph>
            (Note): Login to{' '}
            <a
              href="https://www.cowin.gov.in/"
              rel="noreferrer"
              target="_blank"
            >
              Cowin
            </a>{' '}
            immediately to book your slots
          </Typography>
        </Paper>
      )}
      {data.centers && data.centers.length > 0 && (
        <Paper>
          <Table
            rows={data.centers}
            columns={columns}
            showNumbers={false}
            showFilter={false}
          />
        </Paper>
      )}
      <Paper>
        {isFetching && <LinearProgress className="lp" color="secondary" />}
        <div className="control-actions">
          <Typography>Console</Typography>
          <div className="action-buttons">
            <Button color="primary" onClick={() => setFetchResults([])}>
              Clear
            </Button>
            <Tooltip title="Toggle Notification" placement="bottom">
              <IconButton onClick={() => enableNofification(!showNotification)}>
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
                  onClick={() => setBotStatus('stop')}
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
                  onClick={() => setBotStatus('pause')}
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
                  onClick={() => setBotStatus('resume')}
                >
                  <PlayArrowIcon />
                </IconButton>
              </div>
            </Tooltip>
          </div>
        </div>
        <Console>
          {fetchResults.map((fetchResult) => (
            <div className="row" key={fetchResult.dataUpdatedAt}>
              <span>{fetchResult.timeStamp}</span>
              <span>{fetchResult.message}</span>
            </div>
          ))}
        </Console>
      </Paper>
    </MonitorContainer>
  );
};

Monitor.defaultProps = {
  setSnack: () => {}
};

Monitor.propTypes = {
  setSnack: PropTypes.func
};

export default Monitor;
