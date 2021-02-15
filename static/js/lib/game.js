class Game {
 container = {};
 region = {};
 
 constructor(){
  this.container = $('.gameDiv');
  this.attach();
  this.start();
 }
 
 attach(){
  var t = this;
  $(document).on('click', '#statsStart', function(e){
   e.preventDefault();
   t.play();
  });
  
  Socket.on('player-awaken-result', (data) => {
   console.log(data);
   DC.Tpl.display(data);
  });
  
  DC.Region.listeners.init();
  DC.Region.events.init();
 }
 
 start(){
  if(!DC.User.hasChar){
	  new Creation();
	 }else{
	  this.awakenScreen();
	 }
 }
 
 awakenScreen(){
  console.log('awaken');
  Socket.emit('player-awaken', null);
 }
 
 play(){
  DC.Region.init(DC.Player.region);
 }
}

