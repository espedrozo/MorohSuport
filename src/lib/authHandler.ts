import Cookies from 'js-cookie';

export const isLogged = () => {
  let token = Cookies.get('@moroh-suport-v1.0.2:token');
  return (token) ? true : false;
}

export const fazerLogin = (token: string, rememberPassword = false) => {

  if (rememberPassword) {
    Cookies.set('@moroh-suport-v1.0.2:token', token, { expires: 90 })
  } else {
    Cookies.set('@moroh-suport-v1.0.2:token', token);
  }
}

export const fazerLogout = () => {
  Cookies.remove('@moroh-suport-v1.0.2:token');
  localStorage.removeItem('@moroh-suport-v1.0.2:userName');
  // localStorage.removeItem('@moroh-suport-v1.0.2:publicado');
  localStorage.removeItem('@moroh-suport-v1.0.2:idRecentes');
}
