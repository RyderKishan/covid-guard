import styled from 'styled-components';

export const TableContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
  & > table {
    flex: 1;
    overflow: auto;
  }
  td > span.data-fee_type {
    overflow: hidden;
    white-space: nowrap;
    border-radius: ${({ theme }) => theme.spacing(2)}px;
    padding: ${({ theme }) => theme.spacing(1)}px
      ${({ theme }) => theme.spacing(2)}px;
  }
  td > span.data-fee_type[title='Free'] {
    background-color: ${({ theme }) => theme.palette.success.main};
    color: ${({ theme }) => theme.palette.success.contrastText};
  }
  td > span.data-fee_type[title='Paid'] {
    background-color: ${({ theme }) => theme.palette.error.main};
    color: ${({ theme }) => theme.palette.error.contrastText};
  }
`;

export const DailySessions = styled.div`
  min-height: ${({ theme }) => theme.spacing(4)}px;
  margin: ${({ theme }) => theme.spacing(2)}px;
  display: flex;
  width: calc(100vw - ${({ theme }) => theme.spacing(8)}px);
  overflow: auto;
  & > :not(:last-child) {
    margin-right: ${({ theme }) => theme.spacing(4)}px;
  }
`;

export const StatusBar = styled.div`
  margin: 0 ${({ theme }) => theme.spacing(2)}px;
  & > div {
    white-space: nowrap;
  }
  & > div:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacing(2)}px;
  }
`;

export const StatusText = styled.div`
  position: absolute;
`;

export const SessionCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > :not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  }
  & > div.available {
    background-color: ${({ theme }) => theme.palette.success.main};
  }
  & > div.unavailable {
    background-color: ${({ theme }) => theme.palette.error.main};
  }
  & > div.age {
    font-size: ${({ theme }) => theme.typography.caption.fontSize};
    font-weight: ${({ theme }) => theme.typography.caption.fontWeight};
    line-height: ${({ theme }) => theme.typography.caption.lineHeight};
    letter-spacing: ${({ theme }) => theme.typography.caption.letterSpacing};
  }
  & > div.vaccine {
    font-size: ${({ theme }) => theme.typography.overline.fontSize};
    font-weight: ${({ theme }) => theme.typography.overline.fontWeight};
    line-height: ${({ theme }) => theme.typography.overline.lineHeight};
    letter-spacing: ${({ theme }) => theme.typography.overline.letterSpacing};
    text-transform: ${({ theme }) => theme.typography.overline.textTransform};
  }
  & > div.sessions {
    font-size: 0.75rem;
  }
`;
