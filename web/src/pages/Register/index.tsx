import React, { useEffect, FormEvent, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import Input from '../../components/Input';

import logo from '../../assets/images/logo.svg';
import background from '../../assets/images/login-background.svg';
import purpleBackIcon from '../../assets/images/icons/back-purple.svg';
import './styles.css';

import successBackground from '../../assets/images/success-background.svg';
import successIcon from '../../assets/images/icons/success.svg';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const buttonRef = useRef<HTMLButtonElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const handleRegisterSubmit = (e: FormEvent) => {

    successRef.current?.classList.remove("success-hidden");

    e.preventDefault();
  };

  useEffect(() => {
    document.title = 'Proffy - Cadastro';
  }, []);

  useEffect(() => {

    if (name.length && surname && email.length && password.length > 0) {
      buttonRef.current?.removeAttribute('disabled');
    } else {
      buttonRef.current?.setAttribute('disabled', 'disabled');
    }

  }, [name, surname, email, password]);

  return (
    <>
      <div id="page-register">

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



        <div className="register">

          <div className="back">
            <Link to="/" className="btn-back"><img src={purpleBackIcon} alt="Voltar" /></Link>
          </div>

          <div className="register-container">
            <div className="register-container-content">
              <h1>Cadastro</h1>
              <p>Preencha os dados abaixo para começar.</p>
              <form onSubmit={handleRegisterSubmit}>
                <div>
                  <Input
                    label="Nome"
                    name="name"
                    type="text"
                    value={name}
                    autoComplete="name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    required
                  />
                  <Input
                    label="Sobrenome"
                    name="surname"
                    type="text"
                    value={surname}
                    autoComplete="surname"
                    onChange={(e) => {
                      setSurname(e.target.value);
                    }}
                    required
                  />
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

                <button type="submit" ref={buttonRef} disabled>Concluir cadastro</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
