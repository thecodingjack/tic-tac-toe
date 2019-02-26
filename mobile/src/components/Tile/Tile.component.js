import React from 'react' 
import { Text, TouchableOpacity } from 'react-native'

let theme = {
  0 : 'white',
  1 : 'red',
  2 : 'white',
  3 : 'white',
  4 : 'white'
}

const Tile = (props) => (
  <TouchableOpacity 
    style={{backgroundColor: theme[props.terrain], borderWidth: 1, borderColor: '#999', height: '100%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center'}} 
    onPress={props.clickHandler}
  >
    <Text style={{fontSize: 50}}>{props.value}</Text>
  </TouchableOpacity>
)

export default Tile;