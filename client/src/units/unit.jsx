export default class Unit{
  constructor(name,stats){
    this.name = name
    this.stats = stats
    this.gold = 0
    this.exp = 0
  }

  attack(){
    console.log(this.name,this.stats.attack)
    return this.stats.attack
  }

  incomingAtk(damage){
    //calculateTotalDamage(damage)
    if(this.stats.hp <= damage){
      this.die()
    }else{
      this.stats.hp -= damage
    }
  }

  die(){
    this.stats.hp = 0
    return [this.gold,this.exp]
  }
}