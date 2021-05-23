import React from 'react';
import PropTypes from 'prop-types';
import EventIcon from '@material-ui/icons/Event';
import MapIcon from '@material-ui/icons/Map';
import RoomIcon from '@material-ui/icons/Room';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PersonIcon from '@material-ui/icons/Person';
import Tooltip from '@material-ui/core/Tooltip';

import { ChipData, TombstoneContainer } from '../styles';
import {
  feeTypes,
  minAgeLimits,
  vaccines
} from '../../../components/Filter/constants';
import { dateRanges } from '../../Home/constants';

const Filters = (props) => {
  const { allStates, allDistricts, values } = props;
  return (
    <TombstoneContainer>
      <ChipData>
        <RoomIcon />
        <div className="details">
          <div className="key" color="textSecondary">
            State
          </div>
          <div className="value" variant="overline">
            {allStates[values.state]
              ? allStates[values.state].state_name
              : '--- ---'}
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
              .map((d) =>
                allDistricts[d] ? allDistricts[d].district_name : ''
              )
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
    </TombstoneContainer>
  );
};

Filters.defaultProps = {
  allDistricts: [],
  allStates: [],
  values: {}
};

Filters.propTypes = {
  allDistricts: PropTypes.array,
  allStates: PropTypes.array,
  values: PropTypes.any
};

export default Filters;
