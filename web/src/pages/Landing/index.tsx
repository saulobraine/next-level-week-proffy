import React, { useState, useEffect } from 'react';
import CountTo from 'react-count-to';
import { Link } from 'react-router-dom';
import './styles.css';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import api from '../../services/api';

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
        <div id="page-landing-content" className="container">
          <div className="landing-logo-container">
            <img src={logoImg} alt="Logo Proffy" />
            <h2>Sua plataforma de estudos online.</h2>
          </div>

          <img
            src={landingImg}
            alt="Plataforma de estudos"
            className="hero-image"
          />

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

          <span className="total-connections">
            Total de
            <CountTo to={totalConnections} speed={1000} />
            conexões já realizadas
            <img src={purpleHeartIcon} alt="Coração roxo" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Landing;
