class User {
 observers = new Set();
 id = 0;
 name = '';
 email = '';
 chat = 'global';
 hasChar = 0;
 firstRun = 1;
 
 constructor(data){
  this.id = data.id;
  this.name = data.name;
  this.email = data.email;
  this.chat = data.chat;
  this.hasChar = data.hasChar;
  this.firstRun = data.firstRun;
 }
 
 subscribe(observer){
  this.observers.add(observer);
 }
 
 notify(message){
  this.observers.forEach((observer) => {
   observer.update(message);
  });
 }
}

