import styled from 'styled-components';

export const TablePagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: ${({ theme }) => theme.mixins.toolbar.minHeight}px;
  padding: 0 ${({ theme }) => theme.spacing(2)}px;
  & > div.status {
    display: flex;
    align-items: center;
    & > :not(:last-child) {
      margin-right: ${({ theme }) => theme.spacing(2)}px;
    }
  }
  & > div.actions {
    & > :first-child {
      min-width: ${({ theme }) => theme.spacing(6)}px;
    }
    & > :not(:last-child) {
      margin-right: ${({ theme }) => theme.spacing(2)}px;
    }
    align-items: center;
    display: flex;
  }
`;

export const TableContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
  & > table {
    flex: 1;
    overflow: auto;
  }
  th,
  td {
    white-space: nowrap;
  }
  td > button.map-icon {
    margin-right: ${({ theme }) => theme.spacing(1)}px;
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

export const Center = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-content: center;
`;

export const TableSettings = styled.div`
  padding: 0 ${({ theme }) => theme.spacing(2)}px;
`;
