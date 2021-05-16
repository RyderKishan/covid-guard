import styled from 'styled-components';

export const FilterContainer = styled.form`
  display: flex;
  flex-direction: column;
  & > div {
    margin: ${({ theme }) => theme.spacing(2)}px;
  }
`;

export const Card = styled.div``;
