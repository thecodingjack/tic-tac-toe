import React from 'react'
import Board from './Board.jsx' 
export default class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      results: Array(9).fill(null),
      next: 0,
      O: [],
      X: [],
    }
    this.clickHandler = this.clickHandler.bind(this)
    this.determineWinner = this.determineWinner.bind(this)
  }

  determineWinner(){
    const victory = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    if(this.state.O.length<3 && this.state.X.length<3) return 
    if(this.state.O.length + this.state.X.length === 9) return 'TIE'

    for(let set of victory){
      if(set.every(num=>this.state.O.includes(num))) return 'O'
      if(set.every(num=>this.state.X.includes(num))) return 'X'
    }
  }

  clickHandler(i){
    if(this.state.winner || this.state.results[i]) return
    let clone = this.state.results.slice()
    let cloneX = this.state.X.slice()
    let cloneO = this.state.O.slice()
    if(this.state.next){
      clone[i] = 'X'
      cloneX.push(i)
    }else{
      clone[i] = 'O'
      cloneO.push(i)
    }

    this.setState({
      results: clone,
      next : this.state.next ^ 1,
      O: cloneO,
      X: cloneX,
    }, ()=>{
      this.setState({
        winner: this.determineWinner()
      })
    })
  }

  render(){
    return(
      <div>
        Winner = {this.state.winner}
        <Board
          results = {this.state.results}
          clickHandler = {this.clickHandler}
        />
      </div>
    )
  }
}