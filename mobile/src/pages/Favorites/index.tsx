import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';

const Favorites: React.FC = () => {

  const [favorites, setFavorites] = useState([]);

  const loadFavorites = () => {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        setFavorites(JSON.parse(response));
      }
    });
  }

  useFocusEffect(() => {
    loadFavorites();
  });

  return <>
    <View style={styles.container}>
      <PageHeader title="Meus Proffys favoritos" />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >

        {favorites.map((teacher: Teacher) => {
          return <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favorited={true}
          />
        })}

      </ScrollView>
    </View>
  </>;
}

export default Favorites;