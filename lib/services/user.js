const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

class User{
  constructor(){}
  
  create(data, callback){
    var error;
    var query = 'SELECT id FROM users WHERE email = "'+data.email+'"';
    db.query(query).then((result) => {
      if(Array.isArray(result) && result.length){
        error = 'Already Registered.';
      }else{
				bcrypt.hash(data.password, 10, function(err, hash) {
					var token = jwt.sign({ data: data.username+":!:"+data.email }, process.env.SECRET, { expiresIn: 60*60 });
					var q = 'INSERT INTO users SET email = "'+data.email+'", name = "'+data.username+'", pass = "'+hash+'", token = "'+token+'"';
					db.query(q).then((results) => {
					  callback();
					}).catch((err) => {
						console.log(err);
					});
				});
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  
  login(data, callback){
	 var t = this;
   var query = 'SELECT * FROM users WHERE name = "'+data.username+'"';
   db.query(query).then((results) => {
    if(results.length){
     bcrypt.compare(data.password, results[0].pass, function(err, result){
      if(err){
       callback({
        status: "error",
        error: err
       });
      }else{
       if(result){
				var token = jwt.sign({ data: results[0].name+":!:"+results[0].email }, process.env.SECRET, { expiresIn: 60*60 });
				
        var u = {
         id: results[0].id,
         name: results[0].name,
         email: results[0].email,
         hasChar: results[0].has_char,
         firstRun: results[0].first_run,
         chat: results[0].chat,
         token: token
        };
        
        t.update(results[0].id, 'token', token, () => {
					callback({
					 status: "ok",
					 data: u
					});
				});
       }else{
        callback({
         status: "error",
         error: "Incorrect username/password"
        });
       }
      }
     });
    }
   }).catch((err) => {
    console.log(err);
   });
  }
  
  get(id, callback){
   var q = "SELECT * FROM users WHERE id = ".id;
		db.query(q).then((results) => {
      var data = {
        id: results[0].id,
        name: results[0].name,
        email: results[0].email,
        token: results[0].token,
        hasChar: results[0].has_char,
        firstRun: results[0].first_run,
        chat: results[0].chat
      };
      
      callback(data);
		}).catch((err) => {
			console.log(err);
		});
  }
  
  update(id, k, v, callback){
		if(k == 'password'){
			bcrypt.hash(v, 10, function(err, hash) {
				var query = 'UPDATE users SET password = "'+hash+'" WHERE id = '+id;
				db.query(query).then((results) => {
					callback();
				}).catch((err) => {
					console.log(err);
				});
			});
    }else{
			var query;
			if(typeof v == 'string'){
				query = 'UPDATE users SET '+k+' = "'+v+'" WHERE id = '+id;
			}else{
				query = 'UPDATE users SET '+k+' = '+v+' WHERE id = '+id;
			}
			db.query(query).then((results) => {
				callback();
			}).catch((err) => {
				console.log(err);
			});
    }
  }
}

module.exports = () => {
  return new User();
}