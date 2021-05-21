import styled from 'styled-components';

export const DialogActions = styled.div`
  padding: ${({ theme }) => theme.spacing(2)}px;
  display: flex;
  justify-content: space-between;
  & button:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacing(2)}px;
  }
`;

export const StepContent = styled.div`
  padding: ${({ theme }) => theme.spacing(2)}px;
  & div.available {
    background-color: ${({ theme }) => theme.palette.success.main};
    margin: 0 ${({ theme }) => theme.spacing(1)}px;
  }
  & div.unavailable {
    background-color: ${({ theme }) => theme.palette.error.main};
    margin: 0 ${({ theme }) => theme.spacing(1)}px;
  }
  & .link {
    margin-top: ${({ theme }) => theme.spacing(2)}px;
    word-break: break-all;
  }
  & > div.field {
    :not(:last-child) {
      margin-bottom: ${({ theme }) => theme.spacing(4)}px;
    }
    display: flex;
    align-items: center;
    & > div:first-child {
      width: 100%;
    }
  }
`;
