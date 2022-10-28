import { Router } from './Router';
import { GlobalStyle } from './styles/global';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/themes/default';
import { PostsProvider } from './contexts/PostsContext';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <PostsProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
        <GlobalStyle />
      </PostsProvider>
    </ThemeProvider>
  )
}