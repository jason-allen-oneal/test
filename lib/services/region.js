class Region{
 constructor(){}
 
 get(id, callback){
  var query = 'SELECT * FROM regions WHERE shortName = "'+id+'"';
  db.query(query).then((results) => {
   var data = {
    id: results[0].id,
    name: results[0].name,
    shortName: results[0].shortName,
    lvl: results[0].lvl
   };
   
   callback(data);
  }).catch((err) => {
   console.log(err);
  });
 }
}

module.exports = () => {
  return new Region();
}

