import React from 'react';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import Collapse from '@material-ui/core/Collapse';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MuiTable from '@material-ui/core/Table';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import HeightIcon from '@material-ui/icons/Height';

import {
  DailySessions,
  TablePagination,
  SessionCard,
  CenterDetails,
  TableContainer,
  Center
} from './styles';
import { stableSort, getSorting, getFiltering, getRows } from './utils';

const paginationOptions = [10, 20, 50, 100];

const Table = (props) => {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  const { rows, columns, initialExpand, pageable, showFilter } = props;
  const [modRows, setModRows] = React.useState(rows);
  const [collapsibleRows, setCollapsibleRows] = React.useState({});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [filter, setFilter] = React.useState({});

  const accessorRows = getRows(rows, columns);

  const createSortHandler = (property) => (event) => {
    event.preventDefault();
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const clearAllFilters = () => {
    const newPage = Math.ceil(accessorRows.length / rowsPerPage) - 1;
    if (newPage >= 0 && newPage < page) {
      setPage(newPage);
    }
    setModRows(accessorRows);
    setFilter({});
  };

  const handleFilterChange = (event, filterId) => {
    const { value } = event.target;
    const newFilter = { ...filter };
    newFilter[filterId] = value;
    const filteredRows = getFiltering(accessorRows, newFilter);
    const newPage = Math.ceil(filteredRows.length / rowsPerPage) - 1;
    if (newPage >= 0 && newPage < page) {
      setPage(newPage);
    }
    setFilter(newFilter);
    setModRows(filteredRows);
  };

  const handleExpandAll = () => {
    const expanded = {};
    rows.forEach((r) => {
      expanded[r.center_id] = true;
    });
    setCollapsibleRows(expanded);
  };

  React.useEffect(() => {
    if (initialExpand && rows && rows.length > 0) {
      handleExpandAll();
    }
  }, [initialExpand]);

  React.useEffect(() => {
    const newPage = Math.ceil(rows.length / rowsPerPage) - 1;
    if (newPage >= 0 && newPage < page) {
      setPage(newPage);
    }
    setModRows(getRows(rows, columns));
  }, [rows]);

  return (
    <>
      <TableContainer>
        {accessorRows.length > 0 ? (
          <MuiTable stickyHeader padding="none" size="medium">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <span>No</span>
                </TableCell>
                <TableCell padding="default" align="left">
                  <Tooltip
                    title="Expand all"
                    placement="bottom"
                    enterDelay={100}
                  >
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => handleExpandAll()}
                    >
                      <HeightIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.field}
                    align={column.numeric ? 'right' : 'left'}
                    padding={column.disablePadding ? 'none' : 'default'}
                    sortDirection={orderBy === column.field ? order : false}
                  >
                    {column.disableSorting ? (
                      <span>{column.headerName}</span>
                    ) : (
                      <TableSortLabel
                        active={orderBy === column.field}
                        direction={orderBy === column.field ? order : 'asc'}
                        onClick={createSortHandler(column.field)}
                      >
                        {column.headerName}
                      </TableSortLabel>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {showFilter && (
                <TableRow>
                  <TableCell align="center">
                    <Tooltip
                      title="Clear filters"
                      placement="right"
                      enterDelay={100}
                    >
                      <IconButton onClick={clearAllFilters}>
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center" />
                  {columns.map((column) => (
                    <TableCell key={column.field} scope="row" padding="default">
                      {!column.disableSorting && (
                        <TextField
                          variant="outlined"
                          onChange={(e) => handleFilterChange(e, column.field)}
                        />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              )}
              {Object.keys(filter).length > 0 && modRows.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + 2}
                    align="center"
                    padding="checkbox"
                  >
                    <Typography
                      align="center"
                      color="textPrimary"
                      variant="overline"
                    >
                      Nothing to filter
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {stableSort(modRows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <React.Fragment key={row.center_id}>
                    <TableRow hover key={row.id || row.center_id}>
                      <TableCell padding="checkbox" align="center">
                        <span>{index + 1}</span>
                      </TableCell>
                      <TableCell padding="default" align="center">
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() =>
                            setCollapsibleRows({
                              ...collapsibleRows,
                              [row.center_id]: !collapsibleRows[row.center_id]
                            })
                          }
                        >
                          {collapsibleRows[row.center_id] ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                      </TableCell>
                      {columns.map((column, cellIndex) => {
                        const cellValue = row[column.field] || '';
                        return (
                          <TableCell
                            id={`table-row-${index}-cell-${cellIndex}`}
                            key={column.field}
                            align={column.align || 'left'}
                            scope="row"
                            padding="default"
                          >
                            <span
                              className={`data-${column.field}`}
                              title={cellValue}
                            >
                              {cellValue}
                            </span>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                    {row.sessions && row.sessions.length > 0 && (
                      <TableRow>
                        <TableCell
                          style={{ paddingBottom: 0, paddingTop: 0 }}
                          colSpan={columns.length + 2}
                        >
                          <Collapse
                            in={collapsibleRows[row.center_id]}
                            timeout="auto"
                            unmountOnExit
                          >
                            <CenterDetails>
                              {`Address: ${row.address}`}
                            </CenterDetails>
                            <DailySessions>
                              {row.sessions.map((session) => (
                                <SessionCard key={session.session_id}>
                                  <Chip label={session.date} />
                                  <Chip
                                    label={session.available_capacity}
                                    className={
                                      session.available_capacity > 0
                                        ? 'available'
                                        : 'unavailable'
                                    }
                                    size="small"
                                  />
                                  <div className="vaccine">
                                    {session.vaccine}
                                  </div>
                                  <div className="age">
                                    Age {session.min_age_limit}+
                                  </div>
                                  <div className="sessions">
                                    {session.slots.map((slot) => (
                                      <div key={slot}>{slot}</div>
                                    ))}
                                  </div>
                                </SessionCard>
                              ))}
                            </DailySessions>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
            </TableBody>
          </MuiTable>
        ) : (
          <Center>
            <Typography align="center" color="textPrimary" variant="overline">
              Try a new search
            </Typography>
          </Center>
        )}
      </TableContainer>
      {pageable && (
        <TablePagination>
          <div>
            <Typography noWrap color="textPrimary" variant="caption">
              {`${modRows.length} centers`}
            </Typography>
          </div>
          <div className="actions">
            <Hidden smDown>
              {modRows.length > paginationOptions[0] && (
                <>
                  <Select
                    id="rowsPerPage"
                    name="rowsPerPage"
                    value={rowsPerPage}
                    autoWidth
                    onChange={(event) => {
                      setRowsPerPage(event.target.value);
                    }}
                  >
                    {paginationOptions.map((pg) => (
                      <MenuItem key={pg} value={pg}>
                        {pg}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography
                    align="center"
                    color="textPrimary"
                    variant="overline"
                  >
                    Per page
                  </Typography>
                </>
              )}
            </Hidden>
            <Pagination
              page={page + 1}
              siblingCount={matches ? 1 : 0}
              boundaryCount={matches ? 2 : 1}
              size={matches ? 'medium' : 'small'}
              count={Math.ceil(modRows.length / rowsPerPage)}
              color="secondary"
              onChange={(e, p) => setPage(p - 1)}
            />
          </div>
        </TablePagination>
      )}
    </>
  );
};

export default Table;

Table.defaultProps = {
  rows: [],
  showFilter: true,
  pageable: true,
  initialExpand: false,
  columns: []
};

Table.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape({})),
  showFilter: PropTypes.bool,
  pageable: PropTypes.bool,
  initialExpand: PropTypes.bool,
  columns: PropTypes.arrayOf(PropTypes.shape({}))
};
