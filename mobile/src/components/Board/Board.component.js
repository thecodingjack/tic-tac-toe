import React from 'react' 
import { View } from 'react-native';
import Tile from '../Tile/Tile.component'
import styles from '../../styles/main.style'

export default class Board extends React.Component{
  renderTile(i, terrain){
    return (
      <Tile
        value = {this.props.results[i]}
        terrain = {terrain}
        clickHandler = {() => this.props.clickHandler(i,terrain)}
      />
    )
  }

  render(){
    return(
      <View style={[styles.flexBox,styles.centerBox]}>
        <View style={styles.squareRow}>
          {this.renderTile(0,this.props.terrain[0])}
          {this.renderTile(1,this.props.terrain[1])}
          {this.renderTile(2,this.props.terrain[2])}
        </View>
        <View style={styles.squareRow}>
          {this.renderTile(3,this.props.terrain[3])}
          {this.renderTile(4,this.props.terrain[4])}
          {this.renderTile(5,this.props.terrain[5])}
        </View>
        <View style={styles.squareRow}>
          {this.renderTile(6,this.props.terrain[6])}
          {this.renderTile(7,this.props.terrain[7])}
          {this.renderTile(8,this.props.terrain[8])}
        </View>
      </View>
    )
  }
}