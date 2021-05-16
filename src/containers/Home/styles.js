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
