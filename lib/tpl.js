var GameStrings = require('./game-strings');
class Tpl {
 constructor(){
  this.creationStrings = GameStrings.creation();
  this.awakenStrings = GaneStrings.awaken();
 }
 
 format(col, str){
  col = typeof col === 'object' ? col : Array.prototype.slice.call(arguments, 1);
  return str.replace(/\{\{|\}\}|\{(\w+)\}/g, function(m, n){
   if(m == "{{"){
    return "{";
   }
   if(m == "}}"){
    return "}";
   }
   return col[n];
  });
 }
 
 awakenText(place, loc){
  var text;
  if(User.firstRun){
   text = this.awakenStrings.first;
  }else{
   switch(User.region){
    case 'town':
     switch(place){
      case 'tavern':
       text += this.awakenStrings.place.tavern;
       switch(loc){
        default:
        case 'floor':
         text += this.awakenStrings.location.floor;
         break;
        case 'room':
         text += this.awakenStrings.location.room;
         break;
        case 'suite':
         text += this.awakenStrings.location.suite;
         break;
       }
       break;
      case 'outside':
       
       break;
     }
     break;
    
    case 'fields':
     
     break;
   }
   
   var getStipend = false;
   if(Player.rankString != 'Peasant'){
    getStipend = true;
   }
   
   if(getStipend){
    var base = 2048;
    var gain = Math.floor((base * Player.rank) * (Player.level / 2));
    Player.cashToday = Player.cashToday + gain;
    Player.cash = Player.cash + gain;
    
    text += "<br /><br />"+this.format(this.awakenStrings.stipend, [gain]);
   }
  }
  
  return text;
 }
 
 generateBackstory(){
  let r = this.creationStrings.race[Math.floor(Math.random()*this.creationStrings.race.length)],
   a = this.creationStrings.adj[Math.floor(Math.random()*this.creationStrings.adj.length)],
   l = this.creationStrings.loc[Math.floor(Math.random()*this.creationStrings.loc.length)],
   d = this.creationStrings.desc[Math.floor(Math.random()*this.creationStrings.desc.length)];
  let story = ["You are a " + a + " " + r + " from " + l + ", who " + d +"."];
  return story;
 }
 
 render(view, callback){
	fs.readFile("views/partials/"+view+".html", "UTF8", (err, html) => {
   if (err) { throw err };
   
   callback(html);
	});
 }
}

module.exports = () => {
 return new Tpl();
};