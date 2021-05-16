import React from 'react';
import { Helmet } from 'react-helmet';

import Table from '../../components/Table';
import Filter from '../../components/Filter';

import { useStates } from '../../hooks';
import { HomeContainer, Card } from './styles';
import { columns, centersMock } from './constants';

const Home = () => {
  const { data: states = [], isLoading: isLoadingStates } = useStates();
  return (
    <HomeContainer>
      <Helmet>
        <title>Covid Guard</title>
      </Helmet>
      <div>
        <Table rows={centersMock} columns={columns} />
      </div>
      <Card>
        <Filter states={states} isLoading={isLoadingStates} />
      </Card>
    </HomeContainer>
  );
};

export default Home;
