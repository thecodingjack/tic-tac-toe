import Unit from './unit.jsx'

export default class Hero extends Unit{
  constructor(name,job,stats){
    super()
    this.name = name
    this.job = job
    this.stats = stats
    this.gold = 100
    this.skills = []
    this.exp = 0
    this.nextExp = 100
    this.statPts = 0
    this.level = 1
  }

  levelUp(){
    this.exp -= this.nextExp
    this.nextExp *= 2
    this.level++
    this.statPts += Math.ceil(this.level / 3 )
  }

  victory(gold,exp){
    this.gold += gold
    this.exp += exp
    while(this.exp >= this.nextExp && this.level < 30) this.levelUp()
  }
}

