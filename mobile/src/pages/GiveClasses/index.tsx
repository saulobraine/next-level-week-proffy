import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import giveClassesBgImage from '../../assets/images/give-classes-background.png';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const GiveClasses: React.FC = () => {

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  }

  return <>
    <View style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        source={giveClassesBgImage}
        style={styles.content}>

        <Text style={styles.title}>Quer ser um Proffy?</Text>
        <Text style={styles.description}>Para se cadastrar você precisa acessar pela nossa plataforma web</Text>

      </ImageBackground>

      <RectButton onPress={handleGoBack} style={styles.okButton}>
        <Text style={styles.okButtonText}>Tudo bem</Text>
      </RectButton>
    </View>
  </>;
}

export default GiveClasses;