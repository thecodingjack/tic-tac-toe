import Unit from './unit.js'

export default class Enemy extends Unit{
  constructor(name,stats,skills){
    super()
    this.name = name
    this.stats = stats
    this.skills = skills
    this.exp = 400
    this.level = 1
  }
}

