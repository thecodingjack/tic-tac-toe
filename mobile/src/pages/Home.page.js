import React, { Component } from 'react';
import { View, Text, Image, Modal, Button } from 'react-native';

import Board from '../components/Board/Board.component' 
import Hero from '../units/hero.js'
import Enemy from '../units/enemy.js'
import styles from '../styles/main.style'
import { combo, nonCombo, shuffle } from '../utils/allSets'
import sprite from '../assets/NinjaDS.png'

export default class Home extends Component{
  constructor(props){
    super(props)
    this.state = {
      results: Array(9).fill(null),
      next: 0,
      used: {},
      p1: new Hero('Jack','unemployed',{attack:20,hp:500},[1]),
      p2: new Enemy('Boss', {attack:10,hp:200},[2]),
      O: [],
      X: [],
      terrain: this.randomTerrain(),
      finish : false,
    }
    this.state.skillSets = this.randomSet()
    this.clickHandler = this.clickHandler.bind(this)
    this.endTurn = this.endTurn.bind(this)
    this.enemyTurn = this.enemyTurn.bind(this)
    this.resetBoard = this.resetBoard.bind(this)
  }

  randomTerrain(){
    return [...Array(9)].map(el=>Math.floor(Math.random()*5))
  }

  randomSet(){
    let randomizedSet = shuffle(nonCombo)
    let obj = {p1: [], p2: []}
    let i = 0
    this.state.p1.skills.forEach(skill=>obj.p1.push(randomizedSet[i++]))
    this.state.p2.skills.forEach(skill=>obj.p2.push(randomizedSet[i++]))
    return obj
  }

  resetBoard(){
    setTimeout(()=>{
      this.setState({
        results: Array(9).fill(null),
        used: {},
        O: [],
        X: [],
        terrain: this.randomTerrain()
      })
    },500)
  }

  endTurn(i,terrain){
    this.attackPhase(i,terrain)
    setTimeout(()=>{
      if(!this.state.finish) this.enemyTurn()
    },500)
  }

  attackPhase(i,terrain){
    if(terrain === 1){
      if(this.state.results[i] === 'O') this.inflictDmgTo('X', this.state.p1.stats.attack)
      else this.inflictDmgTo('O', this.state.p2.stats.attack)
    }
    this.checkCombo()
    this.checkSkills()
    setTimeout(()=>{
      if(this.state.O.length + this.state.X.length >= 9 && !this.state.finish){
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

  checkSkills(){
    for(let set of this.state.skillSets.p1){
      if(this.state.used[set]) continue
      if(set.every(num=>this.state.O.includes(num))){
        let cloneUsed = {...this.state.used}
        cloneUsed[set] = true
        this.setState({used: cloneUsed})
        return this.inflictDmgTo('X',2*this.state.p1.stats.attack)
      }
    }
    for(let set of this.state.skillSets.p2){
      if(this.state.used[set]) continue
      if(set.every(num=>this.state.X.includes(num))){
        let cloneUsed = {...this.state.used}
        cloneUsed[set] = true
        this.setState({used: cloneUsed})
        return this.inflictDmgTo('O',2*this.state.p2.stats.attack)
      }
    }
  }

  checkCombo(){
    for(let set of combo){
      if(this.state.used[set]) continue
      if(set.every(num=>this.state.O.includes(num))){
        let cloneUsed = {...this.state.used}
        cloneUsed[set] = true
        this.setState({used: cloneUsed})
        return this.inflictDmgTo('X', 3*this.state.p1.stats.attack)
      }else if(set.every(num=>this.state.X.includes(num))){
        let cloneUsed = {...this.state.used}
        cloneUsed[set] = true
        this.setState({used: cloneUsed})
        return this.inflictDmgTo('O', 3*this.state.p2.stats.attack)
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

  inflictDmgTo(player,dmg){
    if(player === 'O'){
      this.state.p1.incomingAtk(dmg)
      this.setState({p1: this.state.p1},this.checkWinner)
    }else{
      this.state.p2.incomingAtk(dmg)
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

  nextStage(){
    this.setState({
      results: Array(9).fill(null),
      next: 0,
      used: {},
      p1: this.state.p1,
      p2: new Enemy('Boss', {attack:20,hp:400},[2]),
      O: [],
      X: [],
      terrain: this.randomTerrain(),
      finish : false,
    })
  }

  render(){
    return(
      <View style={[styles.flexBox,styles.stretchBox,{paddingTop:20}]}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.finish}
        >
          <View style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'}}>
            <View style={{width: 300 , height: 300}}>
              <View>
                <Text>Victory!</Text>

                <Button
                  title = 'Next Stage'
                  onPress={() => {
                    this.nextStage();
                  }}>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
        
        <View style={[styles.flexBox,styles.centerBox]}>
          <Text>Enemy HP = {this.state.p2.stats.hp} Skills = {this.state.skillSets.p2}</Text>
          <Image
            source={sprite}
            style={{resizeMode:'contain',height:'80%'}}
          />
        </View>
        <View style={styles.centerBox}>
          <Text>{this.state.winner}</Text>
          <Text>My HP = {this.state.p1.stats.hp} Skills = {this.state.skillSets.p1}</Text>
        </View>
        <Board
          style={styles.flexBox}
          results = {this.state.results}
          terrain = {this.state.terrain}
          clickHandler = {this.clickHandler}
        />
      </View>
    )
  }
}