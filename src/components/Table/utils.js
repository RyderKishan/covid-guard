import { mapObjIndexed, isEmpty, isNil, all } from 'ramda';

const isNull = (value) => isEmpty(value) || isNil(value);

const desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const checkIfMatches = (row, filter) => {
  const responses = [];
  mapObjIndexed((v, k) => {
    const str = row[k] && `${row[k]}`.toLowerCase();
    responses.push(str && str.includes(v.toLowerCase()));
  }, filter);
  return all((val) => val === true)(responses);
};

const getFiltering = (array, filter) => {
  if (isEmpty(filter)) return array;
  const positiveFilters = {};
  mapObjIndexed((val, key) => {
    if (!isNil(val) && !isEmpty(val)) {
      positiveFilters[key] = val;
    }
  }, filter);
  if (isEmpty(positiveFilters) || isEmpty(filter)) return array;
  return array.filter((row) => checkIfMatches(row, filter));
};

const getSorting = (order, orderBy) =>
  order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);

const getRows = (rows, columns) => {
  const accessorHeaders = columns.filter(
    (column) => !isNull(column.valueGetter)
  );
  if (isEmpty(accessorHeaders)) return rows;
  return rows.map((row) => {
    const newRow = { ...row };
    accessorHeaders.forEach((head) => {
      const val = head.valueGetter(row);
      newRow[head.field] = val;
    });
    return newRow;
  });
};

export { getRows, getFiltering, stableSort, getSorting };
