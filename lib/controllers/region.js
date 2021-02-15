const RegionService = require('../services/region')();
var fs = require('fs');

module.exports = {init};

function init(socket){
 socket.on('region-get', (id) => {
  RegionService.get(id, function(result){
   Tpl.render('creation', (html) => {
        let json = {
          data: result,
          html: html
        };
        socket.emit('region-init-result', json);
      });
  });
 });
}