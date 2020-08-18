import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#f0f0f7',
    flex: 1,
  },

  teacherList: {
    marginTop: -40,
  },

  searchForm: {
    marginBottom: 24,
  },

  label: {
    color: '#d4c2ff',
    fontFamily: 'Poppins_400Regular'
  },

  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8
  },

  inputBlock: {
    width: '48%'
  },

  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 4,
    overflow: 'hidden',
    paddingHorizontal: 16,
  },

  pickerInput: {
    height: 54,
    backgroundColor: '#fff',
    justifyContent: 'center',
    color: '#c1bccd',
    fontSize: 12,
  },

  pickerItemStyle: {
    color: '#8257e5',
    fontSize: 12,
  },

  pickerIcon: {
    position: 'absolute',
    right: 5,
    fontSize: 16,
    color: '#8257e5',
    top: 20

  },

  submitButton: {
    backgroundColor: '#04d361',
    height: 56,
    marginTop: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  submitButtonText: {
    color: '#fff',
    fontFamily: 'Archivo_700Bold',
    fontSize: 16
  },

});

export default styles;