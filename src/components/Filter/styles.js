import styled from 'styled-components';

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  align-items: ${({ row }) => (row ? 'center' : 'start')};
  flex-direction: ${({ row }) => (row ? 'row' : 'column')};
  overflow: auto;
  padding: ${({ theme }) => theme.spacing(2)}px;
  & > * {
    min-width: ${({ theme }) => theme.spacing(20)}px;
  }
  & > *:not(:last-child) {
    margin-right: ${({ theme, row }) => (row ? theme.spacing(4) : '0')}px;
    margin-bottom: ${({ theme, row }) => (row ? '0' : theme.spacing(4))}px;
  }
`;

export const Center = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-content: center;
`;
