import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { pick } from 'ramda';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';

import { notify } from '../../utils';
import { schema, filterFields, botStatuses } from './constants';
import { MonitorContainer, Paper, Error } from './styles';
import { useDistricts, useMonitorCenters, useStates } from '../../hooks';
import useBeforeUnload from '../../hooks/useBeforeUnload';
import Table from '../../components/Table';
import { columns } from '../Home/constants';
import Status from './Tombstone/Status';
import Filters from './Tombstone/Filters';
import Found from './Cards/Found';
import Resume from './Cards/Resume';
import Pause from './Cards/Pause';
import Stop from './Cards/Stop';
import Console from './Console';

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

  useBeforeUnload(['resume', 'pause'].includes(botStatus));

  const useCenter = useMonitorCenters(
    values,
    botStatus === 'resume' && !isVaccineFound,
    setSnack
  );
  const {
    data: states = [],
    isLoading: isLoadingStates,
    isError: isStatesError
  } = useStates(setSnack);
  const {
    data: districts = [],
    isLoading: isLoadingDistricts,
    isError: isDistrictsError
  } = useDistricts(values.state, setSnack);
  const {
    data = {},
    error = {},
    isLoading,
    isSuccess,
    isError,
    isIdle,
    isFetching,
    errorUpdatedAt,
    dataUpdatedAt
  } = useCenter;

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
    } catch (err) {
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
    const isNotGranted = Notification.permission !== 'granted';
    const newData = [...fetchResults];
    if (isNotGranted) {
      Notification.requestPermission();
      newData.push({
        dataUpdatedAt,
        errorUpdatedAt,
        updatedAt: dataUpdatedAt || errorUpdatedAt,
        status: '---',
        message: 'Notification access requested'
      });
    }
    setFetchResults(newData);
  }, []);

  React.useEffect(() => {
    if (!isIdle && !isLoading && !isFetching && (isError || isSuccess)) {
      const {
        dataUpdatedAt: oldDataUpdatedAt,
        errorUpdatedAt: oldErrorUpdatedAt
      } = fetchResults.length > 0 ? fetchResults[fetchResults.length - 1] : {};
      if (
        oldDataUpdatedAt === dataUpdatedAt &&
        oldErrorUpdatedAt === errorUpdatedAt
      )
        return;
      const newData = [...fetchResults];
      newData.push({
        dataUpdatedAt,
        errorUpdatedAt,
        updatedAt: dataUpdatedAt || errorUpdatedAt,
        status: isSuccess ? 200 : error.status || 500,
        message: `${isSuccess ? 'SUCCESS' : 'FAILURE'}`
      });
      setFetchResults(newData);
      if (data && data.centers && data.centers.length > 1) {
        setBotStatus('found');
        setIsVaccineFound(true);
        notify('Vaccines found', 'we have found a vaccine for you!');
      }
    }
  }, [useCenter]);

  if (isLoadingDistricts || isValidating || isLoadingStates)
    return (
      <Paper className="full-height center">
        <CircularProgress color="secondary" />
      </Paper>
    );

  if (isStatesError || isDistrictsError)
    return (
      <Paper className="full-height center">
        <Error>
          <div>
            <InfoIcon />
          </div>
          <div>
            <Typography variant="body1" paragraph>
              Error - Too much request
            </Typography>
            <Typography variant="caption">
              (Note): The monitoring tool is unavailable right now. Please try
              after 10 minutes
            </Typography>
          </div>
        </Error>
      </Paper>
    );

  if (isParamError)
    return (
      <Paper className="full-height center">
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
      </Paper>
    );

  return (
    <MonitorContainer>
      <Helmet>
        <title>{`Covid Guard Bot - ${botStatuses[botStatus]}`}</title>
      </Helmet>
      <Paper>
        <Status
          isVaccineFound={isVaccineFound}
          botStatus={botStatus}
          startDate={startDate}
          dataUpdatedAt={dataUpdatedAt}
          values={values}
        />
      </Paper>
      <Paper>
        <Filters
          allStates={allStates}
          allDistricts={allDistricts}
          values={values}
        />
      </Paper>
      {botStatus === 'stop' && <Stop values={values} />}
      {botStatus === 'pause' && !isVaccineFound && <Pause values={values} />}
      {botStatus === 'resume' && !isVaccineFound && <Resume values={values} />}
      {botStatus === 'found' && isVaccineFound && <Found values={values} />}
      <Console
        isFetching={isFetching}
        setFetchResults={setFetchResults}
        fetchResults={fetchResults}
        botStatus={botStatus}
        setBotStatus={setBotStatus}
        showNotification={showNotification}
        toggleNotification={toggleNotification}
      />
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
