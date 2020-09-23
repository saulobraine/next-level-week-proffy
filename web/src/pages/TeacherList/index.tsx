import React, { useState, FormEvent, useEffect, useRef } from 'react';
import CountTo from 'react-count-to';
import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Select from '../../components/Select';

import happyIcon from '../../assets/images/icons/happy.svg';

import './styles.css';

const TeacherList: React.FC = () => {

  const formRef = useRef<HTMLFormElement>(null);

  const [teachers, setTeachers] = useState([]);

  const subject = useRef({ value: '' });
  const week_day = useRef({ value: '' });
  const time = useRef({ value: '' });

  const searchTeachers = async (e: FormEvent) => {
    e.preventDefault();

    const response = await api.get('classes', {
      params: {
        subject: subject.current.value,
        week_day: week_day.current.value,
        time: time.current.value,
      },
    });

    setTeachers(response.data);
  };

  useEffect(() => {
    document.title = 'Proffy - Proffys Disponíveis';

    api.get('classes', {
      params: {
        subject: subject.current.value,
        week_day: week_day.current.value,
        time: time.current.value,
      },
    }).then(response => {
      setTeachers(response.data);
    });

  }, []);

  return (
    <>
      <div id="page-teacher-list" className="container">
        <PageHeader
          topTitle="Estudar"
          title="Esses são os proffys disponíveis."
          icon={happyIcon}
          label="Estudar"
          iconLabel={<>Nós temos <CountTo to={Number(teachers.length)} speed={1000} /> proffys.</>}

        >
          <form id="search-teachers" ref={formRef} onSubmit={searchTeachers}>
            <Select
              name="subject"
              label="Matéria"
              onClickCapture={(e) => {
                subject.current.value = e.currentTarget.value;
                formRef.current?.requestSubmit();
              }}
              options={[
                { value: 'allSubjects', label: 'Todas as matérias' },
                { value: 'Artes', label: 'Artes' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Ciências', label: 'Ciências' },
                { value: 'Educação Física', label: 'Educação Física' },
                { value: 'Português', label: 'Português' },
                { value: 'Matemática', label: 'Matemática' },
                { value: 'Química', label: 'Química' },
              ]}
            />
            <Select
              name="week_day"
              label="Dia da semana"
              onChange={(e) => {
                week_day.current.value = e.currentTarget.value;
                formRef.current?.requestSubmit();
              }}
              options={[
                { value: 'allDays', label: 'Todos os dias' },
                { value: '0', label: 'Domingo' },
                { value: '1', label: 'Segunda-feira' },
                { value: '2', label: 'Terça-feira' },
                { value: '3', label: 'Quarta-feira' },
                { value: '4', label: 'Quinta-feira' },
                { value: '5', label: 'Sexta-feira' },
                { value: '6', label: 'Sábado' },
              ]}
            />

            <Select
              name="time"
              label="Selecione o horário"
              onChange={(e) => {
                time.current.value = e.currentTarget.value;
                formRef.current?.requestSubmit();
              }}
              options={[
                { value: 'allTimes', label: 'Todos os horários' },
                { value: '07:00', label: '07:00' },
                { value: '08:00', label: '08:00' },
                { value: '09:00', label: '09:00' },
                { value: '10:00', label: '10:00' },
              ]}
            />
          </form>
        </PageHeader>

        <main>
          {teachers.length > 0 ?
            teachers.map((teacher: Teacher) => {
              return <TeacherItem key={teacher.id} teacher={teacher} />;
            })
            :
            <div className="no-found">
              <p>
                Nenhum professor encontrado
                com sua pesquisa.
              </p>
            </div>

          }
        </main>
      </div>
    </>
  );
};

export default TeacherList;
