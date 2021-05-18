import React from 'react';
import queryString from 'query-string';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';
import Collapse from '@material-ui/core/Collapse';
import LinearProgress from '@material-ui/core/LinearProgress';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Table from '../../components/Table';
import Filter from '../../components/Filter';
import DistrictSelect from '../../components/DistrictSelect';

import { useStates, useSearchCenters } from '../../hooks';
import { filterCenters, getParamsFromSearch } from './utils';
import { HomeContainer, Paper, SearchCriteriaFields } from './styles';
import {
  columns,
  dateRanges,
  defaultFilters,
  defaultSearchCriteria
} from './constants';

const setUrlParams = (searchCriteria, filters, push, pathname) => {
  const paramString = queryString.stringify(
    { ...searchCriteria, ...filters },
    {
      arrayFormat: 'index',
      skipEmptyString: true,
      skipNull: true
    }
  );
  push(`${pathname}?${paramString}`);
};

const Home = () => {
  const {
    location: { pathname, search },
    push
  } = useHistory();

  const { data: states = [], isLoading: isLoadingStates } = useStates();

  const {
    data: centers,
    mutate: searchCenters,
    isLoading: isLoadingCenters
  } = useSearchCenters();

  const [showFilter, toggleFilter] = React.useState(false);
  const [filters, setFilters] = React.useState(defaultFilters);
  const [searchCriteria, setSearchCriteria] = React.useState(
    defaultSearchCriteria
  );
  const [filteredCenters, setFilteredCenters] = React.useState([]);

  const onSearch = (newCriteria, actions) => {
    setUrlParams(newCriteria, filters, push, pathname);
    searchCenters({ payload: newCriteria, actions });
    actions.setSubmitting(false);
  };

  const onFilter = (f) => {
    setUrlParams(searchCriteria, f, push, pathname);
    const filtered = filterCenters(centers, f);
    setFilteredCenters(filtered);
    setFilters(f);
  };

  const formik = useFormik({
    validationSchema: Yup.object().shape({
      state: Yup.number().required('State is required'),
      district: Yup.number().required('District is required'),
      dateRange: Yup.string().required('Date range is required')
    }),
    enableReinitialize: true,
    initialValues: searchCriteria,
    onSubmit: onSearch
  });

  React.useEffect(() => {
    const { searchCriteria: sC, filter: f } = getParamsFromSearch(search);
    setSearchCriteria(sC);
    setFilters(f);
  }, []);

  React.useEffect(() => {
    const filtered = filterCenters(centers, filters);
    setFilteredCenters(filtered);
  }, [centers]);

  return (
    <HomeContainer>
      <Helmet>
        <title>Covid Guard</title>
      </Helmet>
      <Paper>
        {isLoadingStates && <LinearProgress />}
        <Toolbar className="toolbar">
          <SearchCriteriaFields>
            <FormControl
              error={Boolean(formik.submitCount > 0 && formik.errors.state)}
            >
              <InputLabel shrink id="state-label">
                State
              </InputLabel>
              <Select
                labelId="state-label"
                id="state"
                name="state"
                value={formik.values.state}
                onChange={(event) => {
                  formik.handleChange(event);
                  formik.setFieldValue('district', '', true);
                }}
                displayEmpty
              >
                {states.map(({ state_name: sN, state_id: sI }) => (
                  <MenuItem key={sI} value={sI}>
                    {sN}
                  </MenuItem>
                ))}
              </Select>
              {Boolean(formik.submitCount > 0 && formik.errors.state) && (
                <FormHelperText>{formik.errors.state}</FormHelperText>
              )}
            </FormControl>
            <DistrictSelect formik={formik} />
            <FormControl
              error={Boolean(formik.submitCount > 0 && formik.errors.dateRange)}
            >
              <InputLabel shrink id="dateRange-label">
                Date Range
              </InputLabel>
              <Select
                labelId="dateRange-label"
                id="dateRange"
                name="dateRange"
                value={formik.values.dateRange}
                onChange={(event) => {
                  formik.handleChange(event);
                }}
                displayEmpty
              >
                {dateRanges.map(({ value, label }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
              {Boolean(formik.submitCount > 0 && formik.errors.dateRange) && (
                <FormHelperText>{formik.errors.dateRange}</FormHelperText>
              )}
            </FormControl>
          </SearchCriteriaFields>
          <div>
            <IconButton
              onClick={formik.handleSubmit}
              disabled={
                formik.isSubmitting ||
                (formik.submitCount > 0 && !formik.isValid)
              }
            >
              <SearchIcon />
            </IconButton>
            <IconButton onClick={() => toggleFilter(!showFilter)}>
              <FilterListIcon />
            </IconButton>
          </div>
        </Toolbar>
        <Collapse in={showFilter} timeout="auto" unmountOnExit>
          <Filter
            formik={formik}
            isLoading={isLoadingStates}
            isFetching={isLoadingCenters}
            filters={filters}
            onFilter={onFilter}
          />
        </Collapse>
        <Table rows={filteredCenters} columns={columns} />
      </Paper>
    </HomeContainer>
  );
};

export default Home;
