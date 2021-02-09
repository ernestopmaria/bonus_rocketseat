/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../features/userSlice';
import Button from '../../../styles/components/Button';
import { Container, SignInForm } from '../styles';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({
      email,
      password,
      loggedIn: true,
    }));
  };

  return (
    <Container>
      <SignInForm onSubmit={(e) => handleSubmit(e)}>
        <h1>Boas Vindas</h1>
        <span>E-MAIL</span>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <span>SENHA</span>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button size="big" type="submit" color="default">Entrar</Button>
      </SignInForm>

    </Container>
  );
};
export default SignIn;
