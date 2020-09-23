import React, { ReactFragment } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import logoImg from '../../assets/images/logo-top-header.svg';
import backIcon from '../../assets/images/icons/back.svg';

interface PageHeaderProps {
  topTitle: string;
  title: string;
  description?: string;
  icon?: string;
  label?: string;
  iconLabel?: ReactFragment;
}

const PageHeader: React.FC<PageHeaderProps> = ({ topTitle, title, description, icon, label, iconLabel, children }) => {

  return (
    <>
      <header className="page-header">
        <div className="top-bar">
          <div className="top-bar-container">
            <Link to="/">
              <img src={backIcon} alt="Voltar" />
            </Link>
            <p>{topTitle}</p>
            <img src={logoImg} alt="Proffy" />
          </div>
        </div>

        <div className="header-content">
          <div className="header-content-inner">
            <strong>{title}</strong>
            {description && <p>{description}</p>}
          </div>
          <div className="header-content-icon">
            {icon && <img src={icon} alt={label} />}
            {iconLabel && <p>{iconLabel}</p>}
          </div>

          <div className="header-children">
            {children}
          </div>
        </div>
      </header>
    </>
  );
};

export default PageHeader;
