class Player {
 observers = new Set();
 owner = 0;
 rankString = '';
 nameAndRank = '';
 region = '';
 charClass = '';
 background = '';
 guild = 0;
 effects = '0';
 stats = {
  guts: 0,
  gutsMax: 0,
  wits: 0,
  witsMax: 0,
  charm: 0,
  charmMax: 0,
  attack: 0,
  defend: 0,
  skill: 0,
 };
 skills = {
  fighter: {
   skill: 0,
   max: 0
  },
  magic: { 
   skill: 0,
   max: 0
  },
  trade: {
   skill: 0,
   max: 0
  }
 };
 level = 0;
 experience = 0;
 quests = 0;
 questsMax = 0;
 cash = 0;
 rank = 0;
 storage = 0;
 storageMax = 0;
 fame = 0;
 favor = 0;
 skilled = 0;
 cashToday = 0;
 expToday = 0;
 gutsToday = 0;
 witsToday = 0;
 charmToday = 0;
 totalGuts = 0;
 totalWits = 0;
 totalCharm = 0;
 totalSkill = 0;
 totalAttack = 0;
 totalDefend = 0;
 questsToday = 0;
 totalGuildSkills = 0;
 
 constructor(data){
  this.owner = data.owner;
  this.rankString = data.rankString;
  this.nameAndRank = data.nameAndRank;
  this.region = data.region;
  this.charClass = data.charClass;
  this.background = data.background;
  this.guild = data.guild;
  this.effects = data.effects;
  this.stats = {
   guts: data.stats.guts,
   gutsMax: data.stats.gutsMax,
   wits: data.stats.wits,
   witsMax: data.stats.witsMax,
   charm: data.stats.charm,
   charmMax: data.stats.charmMax,
   attack: data.stats.attack,
   defend: data.stats.defend,
   skill: data.stats.skill,
  };
  this.skills = {
   fighter: {
    skill: data.skills.fighter.skill,
    max: data.skills.fighter.max
   },
   magic: { 
    skill: data.skills.magic.skill,
    max: data.skills.magic.max
   },
   trade: {
    skill: data.skills.trade.skill,
    max: data.skills.trade.max
   }
  };
  this.level = data.level;
  this.experience = data.experience;
  this.quests = data.quests;
  this.questsMax = data.questsMax;
  this.cash = data.cash;
  this.rank = data.rank;
  this.storage = data.storage;
  this.storageMax = data.storageMax;
  this.fame = data.famr;
  this.favor = data.favor;
  this.skilled = data.skilled;
 }
 
 subscribe(observer){
  this.observers.add(observer);
 }
 
 notify(message){
  this.observers.forEach((observer) => {
   observer.update(message);
  });
 }
 
 attachEvents(){
  $(document).on('click', '.statBarButton', function(e){
   e.preventDefault();
   
   Socket.emit("player-character");
  });
 }
 
 attachListeners(){
  Socket.on("player-character-result", (data) => {
   DC.Tpl.display(data);
  });
  
  Socket.on('player-seed', (d) => {
	   this.owner = d.owner;
	   this.region = d.region;
	   this.charClass = d.charClass;
	   this.background = d.background;
	   this.guild = d.guild;
	   this.effects = d.effects;
	   this.stats.guts = d.stats.guts;
	   this.stats.gutsMax = d.stats.gutsMax;
	   this.stats.wits = d.stats.wits;
	   this.stats.witsMax = d.stats.witsMax;
	   this.stats.charm = d.stats.charm;
	   this.stats.charmMax = d.stats.charmMax;
	   this.stats.attack = d.stats.attack;
	   this.stats.defend = d.stats.defend;
	   this.stats.skill = d.stats.skill;
	   this.skills.fighter.skill = d.skills.fighter.skill;
	   this.skills.fighter.max = d.skills.fighter.max;
	   this.skills.magic.skill = d.skills.magic.skill;
	   this.skills.magic.max = d.skills.magic.max;
	   this.skills.trade.skill = d.skills.trade.skill;
	   this.skills.trade.max = d.skills.trade.max;
	   this.level = d.level;
	   this.experience = d.experience;
	   this.quests = d.quests;
	   this.questsMax = d.questsMax;
	   this.cash = d.cash;
	   this.rank = d.rank;
	   this.storage = d.storage;
	   this.storageMax = d.storageMax;
	   this.fame = d.fame;
	   this.favor = d.favor;
	   this.skilled = d.skilled;
	   this.rankString = d.rankString;
	   this.nameAndRank = d.nameRankString;
	   this.totalGuildSkills = this.skills.fighter.skill + this.skills.magic.skill + this.skills.trade.skill;
	   
	   this.notify(this);
	  });
	  
	  Socket.on('player-statbar-result', (data) => {
	  var tpl = data.html;
	  var statEquipment = "";
	 
	  if($.isEmptyObject(DC.Inventory.equipment.weapon)){
	   statEquipment = "Fists";
	  }else{ 
	   statEquipment = DC.Inventory.equipment.weapon.name;
	  }
	  statEquipment += " & ";
	 
	  if($.isEmptyObject(DC.Inventory.equipment.armor)){
	   statEquipment += "Underwear";
	  }else{
	   statEquipment += DC.Inventory.equipment.armor.name;
	  }
	  
   var statObj = {
    data: {
	    nameAndRank: this.nameAndRank,
	    guts: (this.stats.guts == this.stats.gutsMax) ? this.stats.guts : this.stats.guts+"/"+this.stats.gutsMax,
	    wits: (this.stats.wits == this.stats.witsMax) ? this.stats.wits : this.stats.wits+"/"+this.stats.witsMax,
	    charm: (this.stats.charm == this.stats.charmMax) ? this.stats.charm : this.stats.charm+"/"+this.stats.charmMax,
	    cash: this.cash,
	    quests: (this.quests == this.questsMax) ? this.quests : this.quests+"/"+this.questsMax,
	    level: this.level,
	    experience: this.experience,
	    equippedWeaponAndArmor: statEquipment
    },
	   html: tpl
	  };
	 
	  var html = DC.Tpl.build(statObj);
	  $('.statBar').html(html);
	 });
 }
 
 hasEffect(effect){
  return this.effects.includes(effect);
 }
 
 removeEffect(effect){
 
 }
 
 buildStats(){
	Socket.emit('player-statbar', this.owner);
 }
 
 calculate(){
  var totals = DC.Inventory.equipment.getTotals();
	 this.totalGuts = this.stats.guts + totals.guts;
	 this.totalWits = this.stats.wits + totals.wits;
	 this.totalCharm = this.stats.charm + totals.charm;
	 this.totalAttack = this.stats.attack + totals.attack;
	 this.totalDefend = this.stats.defend + totals.defend;
	     
	 var stat = this.stats.skill + totals.skill;
	 if(DC.Player.hasAbility("Agility")){
	  var inc = stat * 0.1;
	  skillStat = Math.ceil(stat + inc);
	 }else{
	  skillStat = stat;
	 }
	 this.totalSkill = skillStat;
	}
 
 hasEnoughForTransaction(cost){
  if(this.cash - cost >= 0){
   return false;
  }else{
   return true;
  }
 }
 
 getRankString(rank){
  var title;
  switch(rank){
   default:
   case 0:
    title = "Peasant";
    break;
   case 1:
    title = "Squire";
    break;
   case 2:
    title = "Knight";
    break;
   case 3:
    title = "Captain";
    break;
   case 4:
    title = "Baron";
    break;
   case 5:
    title = "Count";
    break;
   case 6:
    title = "Viscount";
    break;
   case 7:
    title = "Marquis";
    break;
   case 8:
    title = "Earl";
    break;
   case 9:
    title = "Duke";
    break;
   case 10:
    title = "Prince";
    break;
   case 11:
    title = "Viceroy";
    break;
   case 12:
    title = "Regent";
    break;
   case 13:
    title = "Seneschal";
    break;
  }
  return title;
 }
}

