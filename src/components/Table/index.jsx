import React from 'react';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
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
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SettingsIcon from '@material-ui/icons/Settings';

import {
  TablePagination,
  TableSettings,
  TableContainer,
  Center
} from './styles';
import { stableSort, getSorting, getFiltering, getRows } from './utils';
import useLocalStorage from '../../hooks/useLocalStorage';
import Sessions from '../Sessions';

const paginationOptions = [10, 20, 50, 100];

const Table = (props) => {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const {
    rows,
    columns,
    initialExpand,
    pageable,
    showFilter,
    showNumbers,
    totalCount
  } = props;
  const [selectedColumns, setColumns] = useLocalStorage('columns', {});
  const [tablePadding, setTablePadding] = useLocalStorage('padding', 'default');
  const [modRows, setModRows] = React.useState(rows);
  const [collapsibleRows, setCollapsibleRows] = React.useState({});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [anchorEl, setAnchorEl] = React.useState(null);
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

  const selectColumns = (col) => {
    const newColumns = { ...selectedColumns };
    if (newColumns[col]) {
      newColumns[col] = false;
    } else {
      newColumns[col] = true;
    }
    setColumns(newColumns);
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
                {showNumbers && (
                  <TableCell align="center" padding={tablePadding}>
                    <Tooltip title="Column Settings" enterDelay={100}>
                      <IconButton
                        aria-haspopup="true"
                        onClick={(event) => setAnchorEl(event.currentTarget)}
                      >
                        <SettingsIcon />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={() => setAnchorEl(null)}
                    >
                      {columns.map((nm) => (
                        <MenuItem
                          key={nm.field}
                          value={nm.field}
                          onClick={() => selectColumns(nm.field)}
                        >
                          <Checkbox checked={!selectedColumns[nm.field]} />
                          <ListItemText primary={nm.headerName} />
                        </MenuItem>
                      ))}
                    </Menu>
                  </TableCell>
                )}
                <TableCell padding={tablePadding} align="left">
                  <Tooltip
                    title="Expand all"
                    placement="bottom"
                    enterDelay={100}
                  >
                    <IconButton
                      aria-label="expand row"
                      onClick={() => handleExpandAll()}
                    >
                      <HeightIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                {columns.map(
                  (column) =>
                    !selectedColumns[column.field] && (
                      <TableCell
                        key={column.field}
                        align={column.alignHeader || 'left'}
                        padding={tablePadding}
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
                    )
                )}
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
                  {columns.map(
                    (column) =>
                      !selectedColumns[column.field] && (
                        <TableCell
                          key={column.field}
                          scope="row"
                          padding={tablePadding}
                        >
                          {!column.disableSorting && (
                            <TextField
                              fullWidth
                              variant="outlined"
                              onChange={(e) =>
                                handleFilterChange(e, column.field)
                              }
                            />
                          )}
                        </TableCell>
                      )
                  )}
                  <TableCell align="center" />
                </TableRow>
              )}
              {Object.keys(filter).length > 0 && modRows.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + (showNumbers ? 2 : 1)}
                    align="center"
                    padding={tablePadding}
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
                      {showNumbers && (
                        <TableCell padding={tablePadding} align="center">
                          <span>{index + 1}</span>
                        </TableCell>
                      )}
                      <TableCell padding={tablePadding} align="center">
                        <IconButton
                          aria-label="expand row"
                          size={tablePadding === 'none' ? 'small' : 'medium'}
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
                        if (selectedColumns[column.field]) return null;
                        const cellValue = row[column.field] || '';
                        if (column.field === 'center_id')
                          return (
                            <TableCell
                              id={`table-row-${index}-cell-${cellIndex}`}
                              key={column.field}
                              align={column.alignValue || 'left'}
                              scope="row"
                              padding={tablePadding}
                            >
                              <Tooltip
                                title="Open in google maps"
                                placement="bottom"
                                // enterDelay={100}
                              >
                                <IconButton
                                  aria-label="expand row"
                                  size={
                                    tablePadding === 'none' ? 'small' : 'medium'
                                  }
                                  className="map-icon"
                                  onClick={() =>
                                    window.open(
                                      `https://www.google.co.in/maps/search/${`${row.name} ${row.block_name}`.replace(
                                        ' ',
                                        '+'
                                      )}`
                                    )
                                  }
                                >
                                  <LocationOnIcon />
                                </IconButton>
                              </Tooltip>
                              {cellValue}
                            </TableCell>
                          );
                        return (
                          <TableCell
                            id={`table-row-${index}-cell-${cellIndex}`}
                            key={column.field}
                            align={column.alignValue || 'left'}
                            scope="row"
                            padding={tablePadding}
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
                          colSpan={columns.length + (showNumbers ? 2 : 1)}
                        >
                          <Sessions
                            row={row}
                            collapsibleRows={collapsibleRows}
                          />
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
              {totalCount > 0
                ? 'No results for this filter'
                : 'Try a new search'}
            </Typography>
          </Center>
        )}
      </TableContainer>
      <Hidden smUp>
        <TableSettings>
          <div>
            <FormControlLabel
              control={
                <Switch
                  checked={tablePadding === 'default'}
                  onChange={(event) =>
                    setTablePadding(event.target.checked ? 'default' : 'none')
                  }
                  name="tablePadding"
                  color="secondary"
                />
              }
              label="Dense"
            />
          </div>
        </TableSettings>
      </Hidden>
      {pageable && (
        <TablePagination>
          <div className="status">
            {modRows.length > 0 && (
              <Typography noWrap color="textPrimary" variant="caption">
                {`${modRows.length} centers`}
              </Typography>
            )}
            <Hidden xsDown>
              <TableSettings>
                <div>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={tablePadding === 'default'}
                        onChange={(event) =>
                          setTablePadding(
                            event.target.checked ? 'default' : 'none'
                          )
                        }
                        name="tablePadding"
                        color="secondary"
                      />
                    }
                    label="Dense"
                  />
                </div>
              </TableSettings>
            </Hidden>
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
  totalCount: 0,
  showNumbers: true,
  showFilter: true,
  pageable: true,
  initialExpand: false,
  columns: []
};

Table.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape({})),
  totalCount: PropTypes.number,
  showNumbers: PropTypes.bool,
  showFilter: PropTypes.bool,
  pageable: PropTypes.bool,
  initialExpand: PropTypes.bool,
  columns: PropTypes.arrayOf(PropTypes.shape({}))
};
