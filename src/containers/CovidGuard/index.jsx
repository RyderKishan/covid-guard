import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import {
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle
} from 'styled-components';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter } from 'react-router-dom';

import { useMediaQuery } from '@material-ui/core';
import App from '../App';
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
`;

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, staleTime: 60000, cacheTime: 300000 } }
});

const CovidGuard = () => {
  const mode = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light';
  return (
    <ThemeProvider theme={createTheme(mode)}>
      <QueryClientProvider client={queryClient}>
        <StyledThemeProvider theme={createTheme(mode)}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
          <GlobalStyle />
        </StyledThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default CovidGuard;
