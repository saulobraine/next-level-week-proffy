import React, { useState, useEffect } from 'react';
import CountTo from 'react-count-to';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import logoutIcon from '../../assets/images/icons/logout.svg';

import './styles.css';

const Landing: React.FC = () => {
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get('connections').then((response) => {
      setTotalConnections(response.data.total);
    });
  }, []);

  useEffect(() => {
    document.title = 'Proffy - Landing';
  }, []);

  return (
    <>
      <div id="page-landing">
        <div className="hero">
          <div id="page-landing-content" className="container">
            <div className="user">
              <Link to="/profile" className="user-info">
                <img src="https://avatars3.githubusercontent.com/u/18134442?s=460&u=5a1b544a465b6ffdb08cca4dd3948bd59730f151&v=4" alt="Saulo Braine" />
                Saulo Braine
            </Link>
              <button className="logout"><img src={logoutIcon} alt="Sair" /></button>
            </div>


            <div className="landing-logo-container">
              <img src={logoImg} alt="Logo Proffy" />
              <h2>Sua plataforma de estudos online.</h2>
            </div>

            <img
              src={landingImg}
              alt="Plataforma de estudos"
              className="hero-image"
            />

          </div>
        </div>

        <div className="actions">
          <div id="page-landing-actions" className="container">

            <h2>
              Seja bem-vindo. <br />
              <strong>O que deseja fazer?</strong>
            </h2>

            <div className="buttons-container">
              <Link to="/study" className="study">
                <img src={studyIcon} alt="Estudar" />
              Estudar
            </Link>

              <Link to="/give-classes" className="give-classes">
                <img src={giveClassesIcon} alt="Dar Aulas" />
              Dar Aulas
            </Link>
            </div>

            <div className="total-connections">
              Total de
            <CountTo to={Number(totalConnections)} speed={1000} />
            conexões já realizadas
            <img src={purpleHeartIcon} alt="Coração roxo" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
