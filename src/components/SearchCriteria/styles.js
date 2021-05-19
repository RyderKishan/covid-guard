import styled from 'styled-components';

export const SearchCriteriaFields = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  & > * {
    width: ${({ fullWidth }) => (fullWidth ? '100%' : 'unset')};
    min-width: ${({ theme }) => theme.spacing(20)}px;
    max-width: ${({ theme }) => theme.spacing(40)}px;
    margin: ${({ theme }) => theme.spacing(2)}px;
  }
`;

export const Center = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-content: center;
`;
