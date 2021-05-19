import styled from 'styled-components';
import MuiPaper from '@material-ui/core/Paper';

export const Paper = styled(MuiPaper)`
  height: 100%;
  display: flex;
  flex-direction: column;
  & > .toolbar {
    & > .actions {
      margin: ${({ theme }) => theme.spacing(2)}px;
      display: flex;
    }
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0;
  }
  & td,
  th {
    white-space: nowrap;
  }
`;

export const SearchCriteriaFields = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  & > * {
    min-width: ${({ theme }) => theme.spacing(20)}px;
    max-width: ${({ theme }) => theme.spacing(40)}px;
    margin: ${({ theme }) => theme.spacing(2)}px;
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

export const Center = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-content: center;
`;

export const ModalContent = styled(MuiPaper)`
  height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => theme.palette.background.paper};
  & > div.header {
    & > :first-child {
      padding-left: ${({ theme }) => theme.spacing(2)}px;
    }
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${({ theme }) => theme.spacing(2)}px;
  }
  & > div.content {
    padding: ${({ theme }) => theme.spacing(2)}px;
  }
`;
