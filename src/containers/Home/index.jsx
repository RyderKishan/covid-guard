import React from 'react';
import { Helmet } from 'react-helmet';
import CircularProgress from '@material-ui/core/CircularProgress';
import qs from 'qs';
import { useHistory } from 'react-router-dom';

import Table from '../../components/Table';
import Filter from '../../components/Filter';

import { useStates, useSearchCenters } from '../../hooks';
import { HomeContainer, Card, Center } from './styles';
import { columns } from './constants';

const Home = () => {
  const { data: states = [], isLoading: isLoadingStates } = useStates();
  const {
    data: centers = [],
    mutate: searchCenters,
    isLoadingCenters
  } = useSearchCenters();
  const {
    location: { pathname },
    push
  } = useHistory();
  return (
    <HomeContainer>
      <Helmet>
        <title>Covid Guard</title>
      </Helmet>
      <div>
        <Table rows={centers} columns={columns} />
      </div>
      <Card>
        {isLoadingStates ? (
          <Center>
            <CircularProgress color="secondary" />
          </Center>
        ) : (
          <Filter
            states={states}
            isLoading={isLoadingStates || isLoadingCenters}
            onSearch={(f) => {
              push(`${pathname}?${qs.stringify(f)}`);
              searchCenters(f);
            }}
          />
        )}
      </Card>
    </HomeContainer>
  );
};

export default Home;
