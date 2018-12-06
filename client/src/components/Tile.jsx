import React from 'react' 

const Tile = (props) => (
  <button 
    style={{background: '#fff', border: '1px solid #999', padding: 0, height: '34px', width: '34px', fontSize: '24px'}} 
    onClick={props.clickHandler}>
  {props.value}
  </button>
)

export default Tile;