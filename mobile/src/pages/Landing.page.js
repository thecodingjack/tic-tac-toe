import React, {Component} from 'react' 
import { View, Text, Button } from 'react-native'
export default class Landing extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return(
      <View style={{paddingTop:20}}>
        <Text>Tic Tac Hero</Text>
        <Button 
          title = 'Start Game'
          onPress = {()=>this.props.navigation.navigate('Home')}
        >
        </Button>
      </View>
      
    )
  }
}