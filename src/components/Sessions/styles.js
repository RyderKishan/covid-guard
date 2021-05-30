import styled from 'styled-components';

export const DailySessions = styled.div`
  position: sticky;
  left: ${({ theme }) => theme.spacing(2)}px;
  min-height: ${({ theme }) => theme.spacing(4)}px;
  margin: ${({ theme }) => theme.spacing(2)}px;
  display: flex;
  width: calc(100vw - ${({ theme }) => theme.spacing(8)}px);
  overflow: auto;
  & > :not(:last-child) {
    margin-right: ${({ theme }) => theme.spacing(4)}px;
  }
`;

export const SessionCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > :not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  }
  & > div.row {
    display: flex;
    align-items: center;
    & > :not(:last-child) {
      margin-right: ${({ theme }) => theme.spacing(1)}px;
    }
    & > div.available {
      background-color: ${({ theme }) => theme.palette.success.main};
    }
    & > div.unavailable {
      background-color: ${({ theme }) => theme.palette.error.main};
    }
  }
  & > div.sessions {
    font-size: 0.75rem;
    letter-spacing: ${({ theme }) => theme.typography.overline.letterSpacing};
  }
`;
