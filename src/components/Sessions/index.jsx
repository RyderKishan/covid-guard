import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';

import { DailySessions, SessionCard } from './styles';

const Sessions = (props) => {
  const { collapsibleRows, row } = props;

  return (
    <Collapse in={collapsibleRows[row.center_id]} timeout="auto" unmountOnExit>
      <DailySessions>
        <Typography variant="caption">{`Address: ${row.address}`}</Typography>
      </DailySessions>
      <DailySessions>
        {row.sessions.map((session) => (
          <SessionCard key={session.session_id}>
            <div className="row">
              <Chip label={session.date} />
              <Chip color="primary" label={session.vaccine} />
            </div>
            <div className="row">
              <Typography variant="caption">D1</Typography>
              <Chip
                label={session.available_capacity_dose1}
                className={
                  session.available_capacity_dose1 > 0
                    ? 'available'
                    : 'unavailable'
                }
                size="small"
              />
              <Typography variant="caption">+ D2</Typography>
              <Chip
                label={session.available_capacity_dose2}
                className={
                  session.available_capacity_dose2 > 0
                    ? 'available'
                    : 'unavailable'
                }
                size="small"
              />
              <Typography variant="caption">=</Typography>
              <Chip
                label={session.available_capacity}
                className={
                  session.available_capacity > 0 ? 'available' : 'unavailable'
                }
                size="small"
              />
            </div>
            <Chip color="secondary" label={`Age ${session.min_age_limit}+`} />
            <div className="sessions">
              {session.slots.map((slot) => (
                <div key={slot}>{slot}</div>
              ))}
            </div>
          </SessionCard>
        ))}
      </DailySessions>
    </Collapse>
  );
};

Sessions.defaultProps = {
  row: {},
  collapsibleRows: {}
};

Sessions.propTypes = {
  row: PropTypes.any,
  collapsibleRows: PropTypes.any
};

export default Sessions;
