require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./lib/db'),
 http = require('http').Server(app),
 hb  = require('express-handlebars'),
 io = require('socket.io')();
var https = require('https');
var fs = require('fs');

global.express = express;
global.db = db;

process.on('uncaughtException', (err) => {
	console.log("Uncaught Exception:", err);
	process.exit(1);
});

app.use(express.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/static/'));

handlebars = hb.create({
	extname: '.html',
	defaultLayout: 'game',
	layoutsDir: __dirname+'/views/layouts/',
	partialsDir: __dirname+'/views/partials/',
});
app.engine('html', handlebars.engine);
app.set('view engine', 'html');

var routes = require('./routes');
app.use(routes);

var PlayerController = require('./lib/controllers/player');

global.Tpl = require('./lib/tpl');

http.listen(process.env.PORT, () => {
	console.log('listening on '+process.env.HOST+':'+process.env.PORT);
});

console.log(io);

io.on('connection', socket => {
 console.log(socket.id);
 PlayerController.init(socket);
});



