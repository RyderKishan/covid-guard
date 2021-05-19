import React from 'react';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';
import Collapse from '@material-ui/core/Collapse';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Hidden from '@material-ui/core/Hidden';
import Modal from '@material-ui/core/Modal';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import Snackbar from '@material-ui/core/Snackbar';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import Alert from '@material-ui/lab/Alert';

import Table from '../../components/Table';
import Filter from '../../components/Filter';
import SearchCriteria from '../../components/SearchCriteria';

import { useStates, useCenters } from '../../hooks';
import { filterCenters, getParamsFromSearch, setUrlParams } from './utils';
import { HomeContainer, Paper, Center, ModalContent } from './styles';
import { columns, defaultFilters, defaultSearchCriteria } from './constants';

const Home = () => {
  const {
    location: { pathname, search },
    push
  } = useHistory();

  const [snack, setSnack] = React.useState({});
  const [showSearch, toggleSearch] = React.useState(false);
  const [showFilter, toggleFilter] = React.useState(false);
  const [filters, setFilters] = React.useState(defaultFilters);
  const [searchCriteria, setSearchCriteria] = React.useState(
    defaultSearchCriteria
  );

  const allCenters = useCenters(
    searchCriteria.district,
    searchCriteria.dateRange
  );
  const { data: states = [], isLoading: isLoadingStates } = useStates();

  let isLoadingCenters = false;

  const handleClose = (event, reason = '') => {
    switch (reason) {
      case 'clickaway':
      case 'timeout':
        setSnack({
          ...snack,
          id: undefined
        });
        break;
      default:
        setSnack({
          ...snack,
          id: undefined
        });
    }
  };

  const onSearch = (newCriteria, actions) => {
    toggleSearch(false);
    setUrlParams(newCriteria, filters, push, pathname);
    setSearchCriteria(newCriteria);
    actions.setSubmitting(false);
  };

  const onFilter = (f) => {
    setUrlParams(searchCriteria, f, push, pathname);
    setFilters(f);
  };

  const clearFilters = () => {
    toggleSearch(true);
    setSearchCriteria(defaultSearchCriteria);
    setFilters(defaultFilters);
    setUrlParams(defaultSearchCriteria, defaultFilters, push, pathname);
  };

  const formik = useFormik({
    validationSchema: Yup.object().shape({
      state: Yup.number().required('State is required'),
      district: Yup.array()
        .of(Yup.number())
        .min(1, 'Select atlease one district')
        .required('District is required'),
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

  const centers = [];
  (allCenters || []).forEach(({ data, isLoading }) => {
    if (isLoading) isLoadingCenters = true;
    centers.push(...(data || []));
  });
  const filteredCenters = filterCenters(centers, filters);

  return (
    <HomeContainer>
      <Helmet>
        <title>Covid Guard</title>
      </Helmet>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={Boolean(snack.id)}
        onClose={handleClose}
        autoHideDuration={6000}
      >
        <Alert onClose={handleClose} severity={snack.severity}>
          {snack.message}
        </Alert>
      </Snackbar>
      <Paper>
        {isLoadingStates && <LinearProgress />}
        <Toolbar className="toolbar">
          <Hidden smDown>
            <SearchCriteria states={states} formik={formik} />
          </Hidden>
          <Hidden mdUp>
            <div className="actions">
              <Tooltip title="Show search" placement="bottom" enterDelay={100}>
                <IconButton
                  className={showSearch ? 'up' : 'down'}
                  onClick={() => toggleSearch(!showSearch)}
                >
                  {/* {showSearch ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />} */}
                  <ArrowDownwardIcon />
                </IconButton>
              </Tooltip>
            </div>
          </Hidden>
          <div className="actions">
            <Tooltip title="Search" placement="bottom" enterDelay={100}>
              <div>
                <IconButton
                  onClick={formik.handleSubmit}
                  disabled={
                    !formik.dirty ||
                    isLoadingCenters ||
                    (formik.submitCount > 0 && !formik.isValid)
                  }
                >
                  <SearchIcon />
                </IconButton>
              </div>
            </Tooltip>
            <Tooltip title="Show filters" placement="bottom" enterDelay={100}>
              <div>
                <IconButton onClick={() => toggleFilter(!showFilter)}>
                  <FilterListIcon />
                </IconButton>
              </div>
            </Tooltip>
            <Tooltip title="Clear filters" placement="bottom" enterDelay={100}>
              <div>
                <IconButton
                  disabled={isLoadingCenters}
                  onClick={() => clearFilters()}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            </Tooltip>
          </div>
        </Toolbar>
        <Hidden mdUp>
          <Collapse in={showSearch} timeout="auto" unmountOnExit>
            <SearchCriteria fullWidth states={states} formik={formik} />
          </Collapse>
        </Hidden>
        <Hidden smDown>
          <Collapse in={showFilter} timeout="auto" unmountOnExit>
            <Filter
              formik={formik}
              isLoading={isLoadingStates}
              isFetching={isLoadingCenters}
              filters={filters}
              onFilter={onFilter}
            />
          </Collapse>
        </Hidden>
        <Hidden mdUp>
          <Modal
            open={showFilter}
            onClose={() => toggleFilter(false)}
            aria-labelledby="filter-modal-title"
            aria-describedby="filter-modal-description"
          >
            <ModalContent>
              <div className="header">
                <Typography variant="h6">Filters</Typography>
                <div>
                  <IconButton onClick={() => toggleFilter(false)}>
                    <DoneIcon />
                  </IconButton>
                </div>
              </div>
              <div className="content">
                <Filter
                  formik={formik}
                  row={false}
                  isLoading={isLoadingStates}
                  isFetching={isLoadingCenters}
                  filters={filters}
                  onFilter={onFilter}
                />
              </div>
            </ModalContent>
          </Modal>
        </Hidden>
        {isLoadingCenters ? (
          <Center>
            <CircularProgress color="secondary" />
          </Center>
        ) : (
          <Table rows={filteredCenters} columns={columns} />
        )}
      </Paper>
    </HomeContainer>
  );
};

export default Home;
