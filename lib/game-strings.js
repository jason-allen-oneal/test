class GameStrings {
 constructor(){
  this.strings = require('./strings');
 }
 
 creation(){
  return this.strings.creation;
 }
 
 awaken(){
  return this.strings.awaken;
 }
}


module.exports = () => {
 return new GameStrings();
};