import React, { useState } from 'react';
import { View, Text, Picker } from 'react-native';
import { ScrollView, TextInput, RectButton, BorderlessButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import { Feather } from '@expo/vector-icons';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import api from '../../services/api';

import styles from './styles';

const TeacherList: React.FC = () => {

  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [toggleFilter, setToggleFilter] = useState(true);

  const [subject, setSubject] = useState("Artes");
  const [week_day, setWeek_day] = useState("0");
  const [time, setTime] = useState("");

  const loadFavorites = () => {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {

        const favoritedTeachers = JSON.parse(response);

        const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
          return teacher.id
        });

        console.log(favoritedTeachers);


        setFavorites(favoritedTeachersIds);
      }
    });
  }

  const handleToggleFilter = () => {
    loadFavorites();
    setToggleFilter(!toggleFilter);
  }

  const handleFiltersSubmit = async () => {

    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    });

    if (response.data.length > 0) {
      handleToggleFilter();
    }

    setTeachers(response.data);
  }

  return <>
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        filterButton={(
          <BorderlessButton onPress={handleToggleFilter}>
            {toggleFilter ? (
              <Feather name="x" size={24} color="white" />
            ) : (
                <Feather name="filter" size={24} color="white" />
              )
            }
          </BorderlessButton>
        )}>

        {toggleFilter && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={subject}
                style={styles.pickerInput}
                onValueChange={itemValue => setSubject(itemValue)}
                itemStyle={styles.pickerItemStyle} >
                <Picker.Item label="Artes" color='#8257e5' value="Artes" />
                <Picker.Item label="Biologia" color='#8257e5' value="Biologia" />
                <Picker.Item label="Ciências" color='#8257e5' value="Ciências" />
                <Picker.Item label="Educação Física" color='#8257e5' value="Educação Física" />
                <Picker.Item label="Português" color='#8257e5' value="Português" />
                <Picker.Item label="Matemática" color='#8257e5' value="Matemática" />
                <Picker.Item label="Química" color='#8257e5' value="Química" />
              </Picker>
              <Feather name="chevron-down" style={styles.pickerIcon} />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={week_day}
                    style={styles.pickerInput}
                    onValueChange={itemValue => setWeek_day(itemValue)}
                    itemStyle={styles.pickerItemStyle} >
                    <Picker.Item label="Domingo" color='#8257e5' value="0" />
                    <Picker.Item label="Segunda-feira" color='#8257e5' value="1" />
                    <Picker.Item label="Terça-feira" color='#8257e5' value="2" />
                    <Picker.Item label="Quarta-feira" color='#8257e5' value="3" />
                    <Picker.Item label="Quinta-feira" color='#8257e5' value="4" />
                    <Picker.Item label="Sexta-feira" color='#8257e5' value="5" />
                    <Picker.Item label="Sábado" color='#8257e5' value="6" />
                  </Picker>
                  <Feather name="chevron-down" style={styles.pickerIcon} />
                </View>
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  value={time}
                  onChangeText={text => setTime(text)}
                  placeholder="Horário"
                  placeholderTextColor="#c1bccc"
                />
              </View>
            </View>

            <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>

          </View>

        )}

      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favorited={favorites.includes(teacher.id)}
          />
        })}

      </ScrollView>
    </View>
  </>;
}

export default TeacherList;