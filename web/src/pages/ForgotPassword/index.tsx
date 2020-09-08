import React, { useEffect, FormEvent, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import Input from '../../components/Input';

import logo from '../../assets/images/logo.svg';
import background from '../../assets/images/login-background.svg';
import purpleBackIcon from '../../assets/images/icons/back-purple.svg';
import './styles.css';

import successBackground from '../../assets/images/success-background.svg';
import successIcon from '../../assets/images/icons/success.svg';

const ForgotPassword: React.FC = () => {

  const [email, setEmail] = useState('');

  const buttonRef = useRef<HTMLButtonElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const handleForgotPasswordSubmit = (e: FormEvent) => {

    successRef.current?.classList.remove("success-hidden");

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
          className="success success-hidden"
          ref={successRef}
          style={{
            backgroundImage: `url(${successBackground})`,
          }}
        >
          <div className="success-content">
            <img src={successIcon} alt="" />
            <h1>Redefinição enviada!</h1>
            <p>Boa, agora é só checar o e-mail que foi enviado para você
redefinir sua senha e aproveitar os estudos.</p>
            <Link to="/" className="success-button" title="Voltar ao login">Voltar ao login</Link>
          </div>
        </div>

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
            <div className="forgot-password-container-content">
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
      </div>
    </>
  );
};

export default ForgotPassword;
