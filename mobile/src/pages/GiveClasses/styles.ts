import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#8257e5',
    justifyContent: 'center',
    padding: 40
  },

  content: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    fontFamily: 'Archivo_700Bold',
    color: "white",
    fontSize: 32,
    lineHeight: 40,
    maxWidth: 180
  },

  description: {
    marginTop: 15,
    color: '#d4c2ff',
    lineHeight: 20,
    fontFamily: 'Poppins_400Regular',
    maxWidth: 240
  },

  okButton: {
    marginVertical: 40,
    backgroundColor: '#04d361',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },

  okButtonText: {
    fontFamily: 'Archivo_700Bold',
    color: "white",
    fontSize: 16
  }

});

export default styles;