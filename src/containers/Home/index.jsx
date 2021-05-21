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
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import PostAddIcon from '@material-ui/icons/PostAdd';

import MonitorDialog from '../../components/MonitorDialog';
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

  const [showMonitorDialog, toggleMonitoDialog] = React.useState(false);
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
    if (!sC.state && sC.district && sC.district.length === 0)
      toggleSearch(true);
    setSearchCriteria(sC);
    setFilters(f);
  }, []);

  const centers = [];
  (allCenters || []).forEach(({ data, isLoading }) => {
    if (isLoading) isLoadingCenters = true;
    centers.push(...(data || []));
  });
  const filteredCenters = filterCenters(centers, filters);

  const isFilterApplied =
    filters.date ||
    filters.onlyAvailable ||
    filters.feeType.length > 0 ||
    filters.vaccine.length > 0 ||
    filters.minAgeLimit.length > 0;

  return (
    <HomeContainer>
      <Helmet>
        <title>Covid Guard</title>
      </Helmet>
      <MonitorDialog
        formik={formik}
        states={states}
        filters={filters}
        showMonitorDialog={showMonitorDialog}
        toggleMonitoDialog={toggleMonitoDialog}
      />
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
                  <ExpandMoreIcon />
                </IconButton>
              </Tooltip>
            </div>
          </Hidden>
          <div className="actions">
            <Hidden mdUp>
              <Tooltip
                title="Create monitor"
                placement="bottom"
                enterDelay={100}
              >
                <div>
                  <IconButton onClick={() => toggleMonitoDialog(true)}>
                    <PostAddIcon />
                  </IconButton>
                </div>
              </Tooltip>
            </Hidden>
            <Hidden smDown>
              <Button color="primary" onClick={() => toggleMonitoDialog(true)}>
                Create monitor
              </Button>
            </Hidden>
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
                  <Badge
                    variant="dot"
                    invisible={!isFilterApplied}
                    color="secondary"
                  >
                    <FilterListIcon />
                  </Badge>
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
