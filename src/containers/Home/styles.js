import styled from 'styled-components';
import MuiCard from '@material-ui/core/Card';

export const HomeContainer = styled.section`
  display: flex;
  height: 100%;
  & > div:first-child {
    flex: 1;
    overflow: auto;
    margin-right: ${({ theme }) => theme.spacing(2)}px;
  }
`;

export const Card = styled(MuiCard)`
  width: ${({ theme }) => theme.spacing(40)}px;
  padding: ${({ theme }) => theme.spacing(2)}px;
`;

export const Center = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-content: center;
`;
