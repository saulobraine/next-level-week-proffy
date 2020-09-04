import React, { useEffect, FormEvent, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import Input from '../../components/Input';
import Checkbox from '../../components/Checkbox';

import logo from '../../assets/images/logo.svg';
import background from '../../assets/images/login-background.svg';
import purpleHeart from '../../assets/images/icons/purple-heart.svg';

import './styles.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    document.title = 'Proffy - Login';
  }, []);

  useEffect(() => {

    if(email.length && password.length > 0) {
      buttonRef.current?.removeAttribute('disabled');
    } else {
      buttonRef.current?.setAttribute('disabled', 'disabled');
    }

  }, [email, password]);

  return (
    <>
      <div id="page-login">

        <div
          className="logo"
          style={{
            backgroundImage: `url(${background})`,
          }}
        >
          <div className="logo-container">
            <img src={logo} alt="Logo Proffy" />
            <h2>Sua plataforma de estudos online.</h2>
          </div>
        </div>

        <div className="login">
          <div className="login-container">
            <h1>Fazer login</h1>
            <form onSubmit={handleLoginSubmit}>
              <div>
                <Input
                  label="E-mail"
                  name="email"
                  type="email"
                  value={email}
                  autoComplete="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
                <Input
                  label="Senha"
                  name="password"
                  type="password"
                  value={password}
                  autoComplete="current-password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              </div>

              <div className="login-options">
                <Checkbox name="remember" label="Lembrar-me" />
                <Link to="/forgot-password" className="forgot-password">Esqueci minha senha</Link>
              </div>

              <button type="submit" ref={buttonRef} disabled>Entrar</button>
            </form>
          </div>
          <div className="login-footer">
            <div className="login-footer-grid">
              <div className="register">
                <p>Não tem conta?</p>
                <Link to="/register" className="register-link">
                  Cadastre-se
                </Link>
              </div>
              <div className="free">
                <small>
                  É de graça
                  <img src={purpleHeart} alt="Coração roxo" />
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
