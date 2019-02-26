import React from 'react' 

let theme = {
  0 : 'white',
  1 : 'red',
  2 : 'white',
  3 : 'white',
  4 : 'white'
}

const Tile = (props) => (
  <button 
    style={{background: theme[props.terrain], border: '1px solid #999', padding: 0, height: '34px', width: '34px', fontSize: '24px'}} 
    onClick={props.clickHandler}>
  {props.value}
  </button>
)

export default Tile;