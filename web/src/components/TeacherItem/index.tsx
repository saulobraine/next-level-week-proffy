import React from 'react';

import './styles.css';

import wppIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
  class_schedule: Array<{
    id: number;
    week_day: number;
    from: number;
    to: number;
    class_id: number;
  }>
}

interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  const createNewConnection = () => {
    api.post('connections', {
      user_id: teacher.id,
    });
  };

  const getNameWeekDay = (day: number) => {
    const days = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado"
    ];
    return days[day];
  }

  const minutesToHours = (minutes: number) => {
    return minutes / 60 + "h";
  }

  return (
    <>
      <article className="teacher-item">
        <header>
          <img src={teacher.avatar} alt={teacher.name} />
          <div>
            <strong>{teacher.name}</strong>
            <span>{teacher.subject}</span>
          </div>
        </header>

        <p>{teacher.bio}</p>

        <section className="teacher-schedules">
          {teacher.class_schedule.map(schedule => {
            return <div className="schedule">
              <span>Dia</span>
              <p>{getNameWeekDay(schedule.week_day)}</p>
              <span>Horário</span>
              <p>{minutesToHours(schedule.from)} - {minutesToHours(schedule.to)}</p>

            </div>
          })}
        </section>

        <footer>
          <p>
            Preço/hora
            <strong>{Number(teacher.cost).toLocaleString('pt-br', {
            style: "currency",
            currency: "BRL"
          })}</strong>
          </p>


          <a
            href={`https://api.whatsapp.com/send?phone=${teacher.whatsapp}&text=Ol%C3%A1+${teacher.name}%21%0D%0AGostaria+de+agendar+uma+aula+na+mat%C3%A9ria+de+%2A${teacher.subject}%2A%0D%0APoderia+me+informar+quais+hor%C3%A1rios+voc%C3%AA+ainda+tem+dispon%C3%ADvel%3F%0D%0A%0D%0A_Mensagem+gerada+automaticamente+pela+plataforma+Proffy_%0D%0A%0D%0AAguardo+seu+contato%2C%0D%0AObrigado.%0D%0A`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={createNewConnection}
          >
            <img src={wppIcon} alt="Whatsapp" />
            Entrar em contato
          </a>
        </footer>
      </article>
    </>
  );
};

export default TeacherItem;
