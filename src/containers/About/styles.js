import styled from 'styled-components';
import MuiPaper from '@material-ui/core/Paper';

export const Paper = styled(MuiPaper)`
  padding: ${({ theme }) => theme.spacing(2)}px;
`;

export const AboutContainer = styled.section`
  max-width: ${({ theme }) => theme.breakpoints.values.md}px;
  margin: 0 auto;
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  }
`;
