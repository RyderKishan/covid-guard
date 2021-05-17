import styled from 'styled-components';
import MuiPaper from '@material-ui/core/Paper';

export const Paper = styled(MuiPaper)`
  height: 100%;
  display: flex;
  flex-direction: column;
  & > .toolbar {
    display: flex;
    justify-content: space-between;
    padding: ${({ theme }) => theme.spacing(2)}px;
  }
  & td,
  th {
    white-space: nowrap;
  }
`;

export const SearchCriteriaFields = styled.div`
  flex: 1;
  overflow: auto;
  display: flex;
  & > * {
    min-width: ${({ theme }) => theme.spacing(20)}px;
  }
  & > *:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacing(4)}px;
  }
`;

export const HomeContainer = styled.section`
  height: 100%;
`;

export const DisplaySection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
