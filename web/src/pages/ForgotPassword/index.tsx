import React, { useEffect, FormEvent, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import Input from '../../components/Input';

import logo from '../../assets/images/logo.svg';
import background from '../../assets/images/login-background.svg';
import purpleBackIcon from '../../assets/images/icons/back-purple.svg';
import './styles.css';

const ForgotPassword: React.FC = () => {

  const [email, setEmail] = useState('');

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleForgotPasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    document.title = 'Proffy - Esqueci minha senha';
  }, []);

  useEffect(() => {

    if (email.length > 0) {
      buttonRef.current?.removeAttribute('disabled');
    } else {
      buttonRef.current?.setAttribute('disabled', 'disabled');
    }

  }, [email]);

  return (
    <>
      <div id="page-forgot-password">
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

        <div className="forgot-password">

          <div className="back">
            <Link to="/" className="btn-back"><img src={purpleBackIcon} alt="Voltar" /></Link>
          </div>

          <div className="forgot-password-container">
            <h1>Eita, esqueceu sua senha?</h1>
            <p>Não esquenta, vamos dar um jeito nisso.</p>
            <form onSubmit={handleForgotPasswordSubmit}>

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

              <button type="submit" ref={buttonRef} disabled>Enviar</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
