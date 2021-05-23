import styled from 'styled-components';
import MuiPaper from '@material-ui/core/Paper';

export const Paper = styled(MuiPaper)`
  position: relative;
  padding: ${({ theme }) => theme.spacing(2)}px;
  &.stop {
    background-color: ${({ theme }) => theme.palette.error.main};
    color: ${({ theme }) => theme.palette.error.contrastText};
  }
  &.pause {
    background-color: ${({ theme }) => theme.palette.warning.main};
    color: ${({ theme }) => theme.palette.warning.contrastText};
  }
  &.found {
    background-color: ${({ theme }) => theme.palette.success.main};
    color: ${({ theme }) => theme.palette.success.contrastText};
  }
  &.full-height {
    min-height: calc(100% - ${({ theme }) => theme.spacing(4)}px);
  }
  &.center {
    display: grid;
    place-content: center;
  }
  & > .lp {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
  }
  & > div.control-actions {
    & > div.action-buttons {
      display: flex;
      align-items: center;
    }
    overflow: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: ${({ theme }) => theme.spacing(2)}px;
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  }
`;

export const MonitorContainer = styled.section`
  max-width: ${({ theme }) => theme.breakpoints.values.md}px;
  margin: 0 auto;
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  }
`;

export const Error = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.spacing(2)}px;
  & > div:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacing(2)}px;
  }
`;

export const ConsoleContainer = styled.div`
  padding: ${({ theme }) => theme.spacing(2)}px;
  height: ${({ theme }) => theme.spacing(30)}px;
  font-family: monospace;
  overflow: auto;
  & > div.row {
    & > span {
      margin-right: ${({ theme }) => theme.spacing(1)}px;
    }
  }
`;

export const TombstoneContainer = styled.section`
  display: flex;
  overflow: auto;
  & > div:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacing(2)}px;
    border-right: 1px solid ${({ theme }) => theme.palette.divider};
  }
`;

export const ChipData = styled.div`
  display: flex;
  align-items: center;
  & > svg {
    font-size: xx-large;
  }
  & > div.details {
    display: flex;
    flex-direction: column;
    margin: 0 ${({ theme }) => theme.spacing(2)}px;
    & > div.key {
      white-space: nowrap;
      font-size: ${({ theme }) => theme.typography.caption.fontSize};
      font-weight: ${({ theme }) => theme.typography.caption.fontWeight};
      letter-spacing: ${({ theme }) =>
        theme.typography.caption.letterSpacing}em;
      line-height: ${({ theme }) => theme.typography.caption.lineHeight};
      color: ${({ theme }) => theme.palette.text.secondary};
    }
    & > div.value {
      white-space: nowrap;
      font-size: ${({ theme }) => theme.typography.overline.fontSize};
      font-weight: ${({ theme }) => theme.typography.overline.fontWeight};
      letter-spacing: ${({ theme }) =>
        theme.typography.overline.letterSpacing}em;
      text-transform: ${({ theme }) => theme.typography.overline.textTransform};
      color: ${({ theme }) => theme.palette.text.primary};
    }
  }
`;
