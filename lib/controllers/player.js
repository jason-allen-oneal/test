const PlayerService = require('../services/player')();
var fs = require('fs');

module.exports = {init};

function init(socket){
 socket.on('player-get', (id) => {
  PlayerService.get(id, function(result){
   socket.emit('player-seed', result);
  });
 });
 
 socket.on('player-creation', (data) => {
	Tpl.render('creation', (html) => {
		let json = {
			data: {
				freePts: 20,
				backstory: Tpl.generateBackstory()
			},
			html: html
		};
		socket.emit('player-creation-result', json);
	});
 });
 
 socket.on('player-create', (data) => {
  PlayerService.create(data, function(owner){
   PlayerService.get(owner, function(result){
    socket.emit('player-seed', result);
   });
  });
 });
 
 socket.on('player-awaken', () => {
  console.log('player awaken');
  Tpl.render('gameStats', (html) => {
   var text = Tpl.awakenText('tavern', 'room');
   console.log(text);
   let json = {
    data: {
     name: User.name,
     awaken: text
    },
    html: data
   };
   console.log(json);
   socket.emit('player-awaken-result', json);
  });
 });
 
 socket.on('player-statbar', (id) => {
      fs.readFile("views/partials/statbar.html", "UTF8", (err, data) => {
        if(err) { throw err };
        
        let json = {
          data: {},
          html: data
        };
        socket.emit('player-statbar-result', json);
      });
    });
  socket.on('player-character', (id) => {
      fs.readFile("views/partials/character.html", "UTF8", (err, data) => {
        if(err) throw err;
        
        let json = {
          data: {},
          html: data
        };
        socket.emit('player-character-result', json);
      });
    });
 }