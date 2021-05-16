import styled from 'styled-components';

export const FilterContainer = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Filters = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  & > div {
    margin: ${({ theme }) => theme.spacing(1)}px;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  & > div:first-child {
    flex: 1;
  }
  & button:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacing(2)}px;
  }
`;

export const CardList = styled.div`
  display: flex;
  & > div {
    margin: ${({ theme }) => theme.spacing(1)}px;
  }
`;
