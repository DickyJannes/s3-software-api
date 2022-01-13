import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee'
  },
  header: {
    backgroundColor: 'transparent',
    height: 56,
    width: 360,
    justifyContent: 'center',
    alignItems: 'center',
    left: -16,
    top: 0,
  },
  icon: {
    position: 'absolute',
    left: '4%',
  },
  headerIcon: {
    height: '80%',
    width: '75%',
    position: 'absolute',
    left: '15%',
    top: '10%'
  },
  drawerButton: {
      color: 'white',
      fontSize: 25,
      width: '80%',
      marginLeft: "2%"
  }
});