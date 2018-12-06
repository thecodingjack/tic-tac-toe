import React from 'react' 
import Tile from './Tile.jsx'

export default class Board extends React.Component{
  renderTile(i){
    return (
      <Tile
        value = {this.props.results[i]}
        clickHandler = {() => this.props.clickHandler(i)}
      />
    )
  }

  render(){
    return(
      <div>
        <div style={{display:'flex', flexDirection:'row'}}>
          {this.renderTile(0)}
          {this.renderTile(1)}
          {this.renderTile(2)}
        </div>
        <div style={{display:'flex', flexDirection:'row'}}>
          {this.renderTile(3)}
          {this.renderTile(4)}
          {this.renderTile(5)}
        </div>
        <div style={{display:'flex', flexDirection:'row'}}>
          {this.renderTile(6)}
          {this.renderTile(7)}
          {this.renderTile(8)}
        </div>
      </div>
    )
  }
}