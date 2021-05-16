import React from 'react';
import { useQueryClient } from 'react-query';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import LinearProgress from '@material-ui/core/LinearProgress';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import SearchIcon from '@material-ui/icons/Search';

import { CowinContainer, MainSection, Card } from './styles';
import { columns } from './constants';
import { useWidth, useStates, useCenters, useDistricts } from '../../hooks';
import Table from '../../components/Table';

const Cowin = () => {
  const width = useWidth();
  const queryClient = useQueryClient();
  const [stateId, setStateId] = React.useState('');
  const [showResults, setShowResults] = React.useState(false);
  const [districtIds, setDistrictIds] = React.useState([]);
  const [centers, setCenters] = React.useState([]);
  const [districtIdToFetch, selectDistrictIdToFetch] = React.useState('');
  const { data: districtCenters = [], isLoading: isLoadingCenters } =
    useCenters(districtIdToFetch);
  const { data: states = [], isLoading: isLoadingStates } = useStates();
  const { data: districts = [], isLoading: isLoadingDistricts } =
    useDistricts(stateId);

  const handleSearch = () => {
    const allCenters = [];
    districtIds.forEach((d) => {
      const data = queryClient.getQueryData(['centers', d.district_id]);
      allCenters.push(...(data || []));
    });
    setCenters(allCenters);
    setShowResults(true);
  };

  React.useEffect(() => {
    if (districtCenters && districtCenters.length > 0)
      selectDistrictIdToFetch('');
  }, [districtCenters]);

  return (
    <CowinContainer>
      {(isLoadingCenters || isLoadingDistricts) && <LinearProgress />}
      <MainSection width={width}>
        <Card>
          <div className="heading">
            Check your nearest vaccination center and slots availability
          </div>
          <div className="select">
            <FormControl disabled={isLoadingStates}>
              <InputLabel shrink id="state-dropdown-label">
                State
              </InputLabel>
              <Select
                labelId="state-dropdown-label"
                id="state-dropdown"
                value={stateId}
                onChange={(event) => {
                  setStateId(event.target.value);
                  setDistrictIds([]);
                  setShowResults(false);
                }}
                displayEmpty
              >
                {states.map(({ state_name: sN, state_id: sI }) => (
                  <MenuItem key={sI} value={sI}>
                    {sN}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select a state</FormHelperText>
            </FormControl>
            <FormControl disabled={isLoadingStates || districts.length === 0}>
              <InputLabel shrink id="district-dropdown-label">
                District
              </InputLabel>
              <Select
                labelId="district-dropdown-label"
                id="district-dropdown"
                multiple
                value={districtIds}
                onChange={(event) => setDistrictIds(event.target.value)}
                input={<Input />}
                renderValue={(selected) =>
                  selected.map((d) => d.district_name).join(', ')
                }
              >
                {districts.map((district) => (
                  <MenuItem
                    key={district.district_id}
                    value={district}
                    onClick={() => {
                      selectDistrictIdToFetch(district.district_id);
                    }}
                  >
                    <Checkbox
                      checked={Boolean(
                        districtIds.find(
                          (d) => d.district_id === district.district_id
                        )
                      )}
                    />
                    <ListItemText primary={district.district_name} />
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select a district</FormHelperText>
            </FormControl>
            <IconButton aria-label="search" onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </div>
        </Card>
        {centers &&
          showResults &&
          centers.length > 0 &&
          districtIds &&
          districtIds.length > 0 && <Table rows={centers} columns={columns} />}
      </MainSection>
    </CowinContainer>
  );
};

export default Cowin;
