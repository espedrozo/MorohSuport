import Cookies from 'js-cookie';

// Verifica se o o usuario esta logado
export const isLogged = () => {
  let token = Cookies.get('@moroh-suport:token-1.0.0');
  return (token) ? true : false;
}

// Processo de Login
export const fazerLogin = (token: string, rememberPassword = false) => {
  if (rememberPassword) {
    Cookies.set('@moroh-suport:token-1.0.0', token, { expires: 90 })
  } else {
    Cookies.set('@moroh-suport:token-1.0.0', token);
  }
}

// Faz o processo de deslogar
export const fazerLogout = () => {
  Cookies.remove('@moroh-suport:token-1.0.0');
}




/* 


  const storedStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0',
      )

      if (storedStateAsJSON !== null) {
        return JSON.parse(storedStateAsJSON)
      }
*/