import styled from 'styled-components';
import MuiPaper from '@material-ui/core/Paper';

export const Paper = styled(MuiPaper)`
  height: 100%;
  display: flex;
  flex-direction: column;
  & > .toolbar {
    & > .actions {
      .up {
        transform: rotate(-180deg);
        transition: transform
          ${({ theme }) => theme.transitions.duration.standard}ms
          ${({ theme }) => theme.transitions.easing.easeIn};
      }
      .down {
        transform: rotate(0deg);
        transition: transform
          ${({ theme }) => theme.transitions.duration.standard}ms
          ${({ theme }) => theme.transitions.easing.easeIn};
      }
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

export const HomeContainer = styled.section`
  height: 100%;
  & > .fab {
    bottom: ${({ theme }) => theme.spacing(11)}px;
    right: ${({ theme }) => theme.spacing(4)}px;
  }
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
