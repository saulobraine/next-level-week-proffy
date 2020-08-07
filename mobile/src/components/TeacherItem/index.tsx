import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import api from '../../services/api';

import styles from './styles';

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface TeacherItemProps {
  teacher: Teacher;
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {

  const [isFavorited, setIsFavorited] = useState(favorited);

  const handleLinkToWhatsApp = () => {

    api.post('connections', {
      user_id: teacher.id
    });

    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}&text=Olá%20*${teacher.name}*,%20gostaria%20de%20fazer%20uma%20aula%20com%20você.%0A%0ATenho%20interesse%20na%20matéria%20de%20*${teacher.subject}*.%0A%0AVocê%20tem%20algum%20horário disponível?%0A%0AFico%20no%20aguardo.`);
  }

  const handleToggleFavorite = async () => {

    const favorites = await AsyncStorage.getItem('favorites');

    let favoritesArray = [];

    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    }

    if (isFavorited) {
      const favoriteIndex = favoritesArray.findIndex((TeacherItem: Teacher) => {
        return TeacherItem.id === teacher.id
      })

      favoritesArray.splice(favoriteIndex, 1);
      setIsFavorited(false);

    } else {

      favoritesArray.push(teacher);
      setIsFavorited(true);
    }

    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
  }

  return <>
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{ uri: teacher.avatar }}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>
        {teacher.bio}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora &nbsp;
          <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            onPress={handleToggleFavorite}
            style={[
              styles.favoriteButton,
              isFavorited ? styles.favorited : {},
            ]}
          >
            {isFavorited
              ? <Image source={unfavoriteIcon}></Image>
              : <Image source={heartOutlineIcon}></Image>
            }

          </RectButton>

          <RectButton style={styles.contactButton} onPress={handleLinkToWhatsApp}>
            <Image source={whatsappIcon}></Image>
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  </>
}

export default TeacherItem;