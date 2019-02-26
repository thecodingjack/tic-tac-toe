import { StyleSheet } from 'react-native'
module.exports = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    paddingTop: 40
  },
  flexBox: {
    flex: 1,
  },
  stretchBox:{
    alignItems: 'stretch'
  },
  centerBox: {
    alignItems: 'center'
  },
  squareRow: {
    flexDirection:'row',
    height:'25%'
  }
});
