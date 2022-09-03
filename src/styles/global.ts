import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  :focus{
    outline: 0;
  }
  body {
    -webkit-font-smoothing: antialiased;
    color: ${({ theme }) => theme['gray-700']};
    background-color: ${({ theme }) => theme.white};
  }
  body, input, textarea, button {
    font: 400 1rem Roboto, sans-serif;
  }
`