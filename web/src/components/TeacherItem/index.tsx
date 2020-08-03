import React from 'react';

import './styles.css';

import wppIcon from '../../assets/images/icons/whatsapp.svg';

const TeacherItem: React.FC = () => {
  return <>
    <article className="teacher-item">
      <header>
        <img src="https://api.adorable.io/avatars/200/abott@adorable.png" alt="Avatar Aleatório" />
        <div>
          <strong>Saulo Braine</strong>
          <span>Desenvolvedor Web</span>
        </div>
      </header>

      <p>
        Bacon ipsum dolor amet meatball pork loin chislic landjaeger, doner short ribs ham porchetta turducken boudin. Buffalo swine chislic sausage turkey ham hock.
          </p>

      <footer>
        <p>
          Preço/hora
              <strong>R$ 90,00</strong>
        </p>
        <button type="button"><img src={wppIcon} alt="Whatsapp" /> Entrar em contato</button>
      </footer>
    </article>
  </>;
}

export default TeacherItem;