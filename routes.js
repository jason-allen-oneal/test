const router = express.Router();
var UserService = require('./lib/services/user')(db);
var PlayerService = require('./lib/services/player')(db);
var jwt = require('jsonwebtoken');
var localStorage = require('localStorage');

const { body, validationResult } = require('express-validator');

var Router = function(){
 router.get("/", (req, res) => {
			res.render('site-home', {
				layout: 'site',
				pageTitle: 'Home',
			});
		});
 
		router.get('/login/', (req, res) => {
			res.render('user-login', {
				layout: 'site',
				pageTitle: 'Login',
			});
		});
		
		router.post('/login/', (req, res) => {
			var data = {
				username: req.body.username,
				password: req.body.password
			};
			
			UserService.login(data, (result) => {
				if(result.status == "error"){
					res.send(result.error);
				}else{
					global.User = result.data;
					localStorage.setItem('token', User.token);
					res.redirect('/game/');
				}
			});
		});
 
		router.get('/register/', (req, res) => {
			res.render('user-register', {
				layout: 'site',
				pageTitle: 'Register',
			});
		});

		router.post('/register/', body('email').isEmail().normalizeEmail(), (req, res) => {
			const errors = validationResult(req);
			var data = {
				username: req.body.username,
				email: req.body.email,
				password: req.body.password
			};
			
			UserService.create(data, () => {
				res.redirect('/login/');
			});
		})

		router.get('/game/', (req, res) => {
			if(typeof User == 'undefined'){
				res.redirect('/login/');
			}else{
				var token = localStorage.getItem('token');
				if(token == null || token == "undefined"){
					res.redirect('/login/');
				}
				jwt.verify(token, process.env.SECRET, (err, decoded) => {
					if (err) console.log(err);
					
					if(typeof Player == 'undefined'){
						global.Player = {
							owner: 0,
							region: '',
							charClass: '',
							background: '',
							guild: 0,
							effects: '',
							stats: {
								guts: 0,
								gutsMax: 0,
								wits: 0,
								witsMax: 0,
								charm: 0,
								charmMax: 0,
								attack: 0,
								defend: 0,
								skill: 0,
							},
							skills: {
								fighter: {
									skill: 0,
									max: 0,
								},
								magic: {
									skill: 0,
									max: 0,
								},
								trade: {
									skill: 0,
									max: 0,
								}
							},
							level: 0,
							experience: 0,
							quests: 0,
							questsMax: 0,
							storage: 0,
							storageMax: 0,
							cash: 0,
							rank: 0,
							fame: 0,
							favor: 0,
							skilled: 0,
						};
						global.Player.rankString = '';
						global.Player.nameRankString = '';
					}
					res.render('game-main', {
						layout: 'game',
						pageTitle: 'Play',
						User: User,
						Player: Player,
					});
				});
			}
		});
 
 return router;
};

module.exports = Router();




