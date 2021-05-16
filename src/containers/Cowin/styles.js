import styled from 'styled-components';

export const CowinContainer = styled.article`
  height: 100vh;
  width: 100vw;
`;

export const MainSection = styled.section`
  margin: ${({ theme }) => theme.spacing(2)}px auto;
  padding: ${({ theme }) => theme.spacing(2)}px;
`;

export const Card = styled.div`
  padding: ${({ theme }) => theme.spacing(3)}px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  :not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing(4)}px;
  }
  & > div.heading {
    color: ${({ theme }) => theme.palette.text.primary};
    font-size: ${({ theme }) => theme.typography.h5.fontSize};
    margin-bottom: ${({ theme }) => theme.spacing(4)}px;
    text-align: center;
  }
  & > div.select {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    & > div {
      margin: ${({ theme }) => theme.spacing(2)}px;
      min-width: ${({ theme }) => theme.spacing(30)}px;
      flex: 1;
    }
  }
`;
