import { useState } from "react";
import { api } from "../../lib/Api";
import { useNavigate } from "react-router-dom";
import {
  LoginForm,
  AreaButton,
  AreaCheckBox,
  AreaInput,
  Container,
  LoginButton,
  ErrorMessage,
  TextRecoverPassword
} from "./styles";

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fazerLogin } from "../../lib/authHandler";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Digite um email válido!" }),
  password: z.string().min(3, { message: "Digite no mínimo de 3 caracteres!" }),
  rememberPassword: z.boolean()
})

type loginFormInputs = z.infer<typeof loginFormSchema>

export function Login() {

  let navigate = useNavigate();

  const [errorLogin, setErrorLogin] = useState('');

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<loginFormInputs>({
    resolver: zodResolver(loginFormSchema)
  });

  async function handleLogin(data: loginFormInputs) {
    setErrorLogin('');

    const { email, password, rememberPassword } = data;

    const response = await api.login(email, password, rememberPassword);

    // setUsuario(response);

    if (response.status === 'error') {
      setErrorLogin(response.message);
    } else {
      fazerLogin(response.token, rememberPassword); // falta implementar o token na API
      navigate("/home");
    }
    //reset(); os dados do formulário
  }

  return (
    <Container>

      {errorLogin && <ErrorMessage>{errorLogin}</ErrorMessage>}

      <LoginForm onSubmit={handleSubmit(handleLogin)}>
        <h1>Login</h1>
        <AreaInput>
          <label>Endereço de email</label>
          <input
            type="email"
            disabled={isSubmitting}
            placeholder="Digite seu e-mail."
            {...register('email', { required: true })}
          />
          <ErrorMessage>
            {errors.email && errors.email?.message}
          </ErrorMessage>
        </AreaInput>

        <AreaInput>
          <label>Senha</label>
          <input
            type="password"
            disabled={isSubmitting}
            placeholder="Digite sua senha."
            {...register('password', { required: true })}
          />
          <ErrorMessage>
            {errors.password && errors.password?.message}
          </ErrorMessage>
        </AreaInput>
        <AreaCheckBox>
          <input
            type="checkbox"
            id="rememberPassword"
            disabled={isSubmitting}
            {...register('rememberPassword')}
          />
          <label htmlFor="rememberPassword">Lembrar Senha</label>
        </AreaCheckBox>
        <AreaButton>
          <LoginButton type="submit" disabled={isSubmitting}>
            Fazer Login
          </LoginButton>
        </AreaButton>
        <TextRecoverPassword>
          <a href='/recoverpassword'> Esqueceu senha?</a>
        </TextRecoverPassword>
      </LoginForm>
    </Container>
  )
}