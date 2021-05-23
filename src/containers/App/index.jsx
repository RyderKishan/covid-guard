import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import {
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle
} from 'styled-components';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';

import { useMediaQuery } from '@material-ui/core';
import CovidGuard from '../CovidGuard';
import createTheme from '../../theme';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({
      theme: {
        palette: {
          background: { default: d }
        }
      }
    }) => d};
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  }
  main#root {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    & > article {
      flex: 1;
      overflow: auto;
      padding: ${({ theme }) => theme.spacing(2)}px;
    }
  }
`;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 300000,
      cacheTime: 300000
    }
  }
});

const App = () => {
  const mode = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light';
  return (
    <ThemeProvider theme={createTheme(mode)}>
      <QueryClientProvider client={queryClient}>
        <StyledThemeProvider theme={createTheme(mode)}>
          <BrowserRouter>
            <CovidGuard />
          </BrowserRouter>
          <GlobalStyle />
        </StyledThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
