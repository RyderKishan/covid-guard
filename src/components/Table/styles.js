import styled from 'styled-components';
import MuiPaper from '@material-ui/core/Paper';

export const Paper = styled(MuiPaper)`
  & > .toolbar {
    display: flex;
    justify-content: space-between;
  }
  & td, th {
    white-space: nowrap;
  }
`;

export const DailySessions = styled.div`
  min-height: ${({ theme }) => theme.spacing(4)}px;
  padding: ${({ theme }) => theme.spacing(2)}px;
  display: flex;
  width: calc(100vw - 144px);
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
