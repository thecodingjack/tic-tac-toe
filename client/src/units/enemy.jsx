import Unit from './unit.jsx'

export default class Enemy extends Unit{
  constructor(name,stats){
    super()
    this.name = name
    this.stats = stats
    this.skills = []
    this.exp = 400
    this.level = 1
  }
}

