import React from 'react'
import Board from './Board.jsx' 
import Hero from '../units/hero.jsx'
import Enemy from '../units/enemy.jsx'
export default class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      results: Array(9).fill(null),
      next: 0,
      used: {},
      p1: new Hero('Jack','unemployed',{attack:100,hp:500}),
      p2: new Enemy('Boss', {attack:10,hp:200}),
      O: [],
      X: [],
      terrain: this.randomTerrain(),
      finish : false
    }
    this.clickHandler = this.clickHandler.bind(this)
    this.endTurn = this.endTurn.bind(this)
    this.enemyTurn = this.enemyTurn.bind(this)
    this.resetBoard = this.resetBoard.bind(this)
  }

  randomTerrain(){
    return [...Array(9)].map(el=>Math.floor(Math.random()*5))
  }

  resetBoard(){
    this.setState({
      results: Array(9).fill(null),
      used: {},
      O: [],
      X: [],
      terrain: this.randomTerrain()
    })
  }

  endTurn(i,terrain){
    this.attackPhase(i,terrain)
    setTimeout(()=>{
      if(!this.state.finish) this.enemyTurn()
    },100)
  }

  attackPhase(i,terrain){
    if(terrain === 1){
      if(this.state.results[i] === 'O') this.inflictDmgTo('X')
      else this.inflictDmgTo('O')
    }
    this.checkCombo()
    setTimeout(()=>{
      if(this.state.O.length + this.state.X.length === 9 && !this.state.finish){
        this.resetBoard()
      }
    },100) 
  }

  enemyTurn(){
    let [i,terrain] = this.makeRandomMove('X')
    this.attackPhase(i,terrain)
  }

  makeRandomMove(player){
    let available = []
    this.state.results.forEach((cell,idx)=>{
      if(cell === null) available.push(idx)
    })
    let i = Math.floor(Math.random()*available.length)
    let clone = this.state.results.slice()
    let cloneX = this.state.X.slice()
    let cloneO = this.state.O.slice()
    if(player === 'X'){
      clone[available[i]] = 'X'
      cloneX.push(available[i])
    }else{
      clone[available[i]] = 'O'
      cloneO.push(available[i])
    }
    this.setState({
      results: clone,
      next : this.state.next ^ 1,
      O: cloneO,
      X: cloneX,
    })
    return [available[i],this.state.terrain[available[i]]]
  }

  checkCombo(){
    const combo = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for(let set of combo){
      if(this.state.used[set]) continue
      if(set.every(num=>this.state.O.includes(num))){
        let cloneUsed = {...this.state.used}
        cloneUsed[set] = true
        this.setState({used: cloneUsed})
        return this.inflictDmgTo('X')
      }else if(set.every(num=>this.state.X.includes(num))){
        let cloneUsed = {...this.state.used}
        cloneUsed[set] = true
        this.setState({used: cloneUsed})
        return this.inflictDmgTo('O')
      }
    }
  }

  checkWinner(){
    if(this.state.p1.stats.hp === 0){
      return this.setState({finish:true, winner: 'Game Over'})
    }else if(this.state.p2.stats.hp === 0){
      let reward = this.state.p2.die()
      this.state.p1.victory(reward[0],reward[1])
      return this.setState({finish:true, winner: 'Victory'})
    }
  }

  inflictDmgTo(player){
    if(player === 'O'){
      this.state.p1.incomingAtk(this.state.p2.attack())
      this.setState({p1: this.state.p1},this.checkWinner)
    }else{
      this.state.p2.incomingAtk(this.state.p1.attack())
      this.setState(this.setState({p2: this.state.p2},this.checkWinner))
    }
  }

  clickHandler(i,terrain){
    if(this.state.finish || this.state.results[i]) return
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
    }, ()=> this.endTurn(i,terrain))
  }

  render(){
    return(
      <div>
        My HP = {this.state.p1.stats.hp} Enemy HP = {this.state.p2.stats.hp} {this.state.winner}
        <Board
          results = {this.state.results}
          terrain = {this.state.terrain}
          clickHandler = {this.clickHandler}
        />
      </div>
    )
  }
}