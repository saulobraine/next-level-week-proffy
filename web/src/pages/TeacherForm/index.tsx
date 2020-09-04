import React, { useState, FormEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';
import deleteIcon from '../../assets/images/icons/delete.svg';

import './styles.css';

const TeacherForm: React.FC = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' },
  ]);

  const addNewScheduleItem = () => {
    setScheduleItems([...scheduleItems, { week_day: 0, from: '', to: '' }]);
  };

  const handleCreateClass = (e: FormEvent) => {
    api
      .post('classes', {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems,
      })
      .then(() => {
        alert('Cadastro realizado com sucesso!');
        history.push('/');
      })
      .catch(() => {
        alert('Erro no cadastro!');
      });

    e.preventDefault();
  };

  const setScheduleItemValue = (
    position: number,
    field: string,
    value: string,
  ) => {
    const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(updateScheduleItems);
  };

  useEffect(() => {
    document.title = 'Proffy - Cadastro';
  }, []);

  const removeSchedule = (position: number) => {
    const updateScheduleItems = scheduleItems.filter((scheduleItem, index) => {
      return index !== position;
    });

    setScheduleItems(updateScheduleItems);
  };

  return (
    <>
      <div id="page-teacher-form" className="container">
        <PageHeader
          title="Que incrível que você quer dar aulas."
          description="O primeiro passo é preencher o formulário de inscrição"
        />
        <main>
          <form onSubmit={handleCreateClass}>
            <fieldset>
              <legend>Seus dados</legend>

              <Input
                type="text"
                name="name"
                label="Nome completo"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <Input
                type="text"
                name="avatar"
                label="Avatar"
                value={avatar}
                onChange={(e) => {
                  setAvatar(e.target.value);
                }}
              />
              <Input
                type="text"
                name="whatsapp"
                label="WhatsApp"
                value={whatsapp}
                onChange={(e) => {
                  setWhatsapp(e.target.value);
                }}
              />
              <Textarea
                name="bio"
                label="Biografia"
                value={bio}
                onChange={(e) => {
                  setBio(e.target.value);
                }}
              />
            </fieldset>

            <fieldset>
              <legend>Sobre a aula</legend>
              <Select
                name="subject"
                label="Matéria"
                options={[
                  { value: 'Artes', label: 'Artes' },
                  { value: 'Biologia', label: 'Biologia' },
                  { value: 'Ciências', label: 'Ciências' },
                  { value: 'Educação Física', label: 'Educação Física' },
                  { value: 'Portugues', label: 'Portugues' },
                  { value: 'Matemática', label: 'Matemática' },
                  { value: 'Química', label: 'Química' },
                ]}
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
                required
              />
              <Input
                type="number"
                name="cost"
                label="Custo da sua hora por aula"
                value={cost}
                onChange={(e) => {
                  setCost(e.target.value);
                }}
              />
            </fieldset>

            <fieldset className="fieldset-schedule">
              <legend>
                Horários disponíveis
                <button type="button" onClick={addNewScheduleItem}>
                  + Novo horário
                </button>
              </legend>

              {scheduleItems.map((scheduleItem, index) => {
                return (
                  <div className="schedule-item" key={index}>
                    <Select
                      name="week_day"
                      label="Dia da semana"
                      value={scheduleItem.week_day}
                      options={[
                        { value: '0', label: 'Domingo' },
                        { value: '1', label: 'Segunda-feira' },
                        { value: '2', label: 'Terça-feira' },
                        { value: '3', label: 'Quarta-feira' },
                        { value: '4', label: 'Quinta-feira' },
                        { value: '5', label: 'Sexta-feira' },
                        { value: '6', label: 'Sábado' },
                      ]}
                      onChange={(e) =>
                        setScheduleItemValue(index, 'week_day', e.target.value)
                      }
                    />

                    <Input
                      name="from"
                      label="Das"
                      type="time"
                      value={scheduleItem.from}
                      onChange={(e) =>
                        setScheduleItemValue(index, 'from', e.target.value)
                      }
                    />
                    <Input
                      name="to"
                      label="Até"
                      type="time"
                      value={scheduleItem.to}
                      onChange={(e) =>
                        setScheduleItemValue(index, 'to', e.target.value)
                      }
                    />

                    {index > 0 && (
                      <button
                        type="button"
                        title="Excluir horário"
                        className="removeSchedule"
                        onClick={() => removeSchedule(index)}
                      >
                        <span className="hide-md">Remover</span>
                        <img src={deleteIcon} alt="Remover" />
                      </button>
                    )}
                  </div>
                );
              })}
            </fieldset>

            <footer>
              <p>
                <img src={warningIcon} alt="Aviso important" />
                Importante
                <br />
                Preencha todos os dados
              </p>
              <button type="submit">Salvar cadastro</button>
            </footer>
          </form>
        </main>
      </div>
    </>
  );
};

export default TeacherForm;
