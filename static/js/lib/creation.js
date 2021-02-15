class Creation {
 freePoints = 20;
 charClass = "peasant";
 lastPointsUsed = 0;
 
 constructor(){
  this.attach();
  Socket.emit('player-creation', null);
 }
 
 attach(){
  var t = this;
  Socket.on('player-creation-result', (data) => {
	  DC.Tpl.display(data);
	 });
	 
	 $(document).on('click', '.creationStatClick', function(e){
	  e.preventDefault();
	   
	  var type = $(this).attr('data-type');
	  var inc = $(this).attr('data-inc');
	  t.statClick(type, inc);
	 });
	  
	 $(document).on('mouseup', '.creationClass', function(e){
	  e.preventDefault();
	   
	  var type = $(this).val();
	   
	  if(t.lastPointsUsed > 0){
	   var addedBack = t.freePoints + t.lastPointsUsed;
	    
	   t.pointChange(addedBack);
	   t.lastPointsUsed = 0;
	  }
    
   var query,
    cost = 1,
    error,
    cause;
    
   $('.creationClass').prop('checked', false);
   if(!$('#' + type +'CreationClass').is(':checked')){
    $('#' + type +'CreationClass').prop('checked', true);
   }
   switch(type){
    case 'peasant':
     cost = 0;
     break;
    
    case 'noble':
     cost = 12;
     $("#nobleCreationClass").prop('checked', true);
     break;
    case 'warrior':
     cost = 8;
     $("#warriorCreationClass").prop('checked', true);
     break;
    case 'wizard':
     cost = 9;
     $("#wizardCreationClass").prop('checked', true);
     break;
     case 'trader':
      cost = 10;
      $("#traderCreationClass").prop('checked', true);
      break;
    }
     
    t.lastPointsUsed = cost;
    query = (t.freePoints - cost < 0);
    error = "You do not have enough free points!";
    cause = t.freePoints - cost;
     
    if(query){
     DC.Tpl.modal("error", "Oops!", "<strong>"+error+"</strong>");
    }else{
     t.charClass = type;
     t.pointChange(cause);
    }
   });
	  
	  $(document).on('click', '#creationSubmit', function(e){
	   e.preventDefault();
	   
	   if(parseInt($('#freePts').text()) > 0){
	    DC.Tpl.modal("error", "Oops!", "<strong>You still have free points to distribute.</strong>");
	    return;
	   }
	   
	   var guts = parseInt($('#gutsStat').text());
	   var wits = parseInt($('#witsStat').text());
	   var charm = parseInt($('#charmStat').text());
	   var cash = parseInt($('#cashStat').text());
	   var bg = $('#background').text();
	   
	   var createObj = {
	    owner: DC.User.id,
	    guts: guts,
	    wits: wits,
	    charm: charm,
	    cash: cash,
	    charClass: t.charClass,
	    bg: bg
	   };
	   
	   Socket.emit('player-create', createObj);
	   DC.Game.statScreen();
	  });
 }
 
 statClick(type, inc){
  var t = this;
  var statPts = parseInt($('#'+type+'Stat').text());
	 var cost = 1,
	  error,
	  cause,
	  effect,
	  add;
	 
	 if(type == "guts" || type == "wits" || type == "charm"){
	  cost = 3;
	 }
	 
	 if(inc == "plus"){
	  query = (t.freePoints - cost < 0);
	  error = "You do not have enough free points!";
	  cause = t.freePoints - cost;
	  if(type == "cash"){
	   add = 25;
	  }else{
	   add = 1;
	  }
	  effect = statPts + add;
	 }else{
	  if(type == "cash"){
	   add = 25;
	  }else{
	   add = 1;
	  }
	  query = (statPts - add < 0);
	  error = "You cannot reduce a stat below 0!";
	  cause = t.freePoints + cost;
	  effect = statPts - add;
	 }
	 
	 if(query){
	  DC.Tpl.modal("error", "Oops!", "<strong>"+error+"</strong>", {});
	 }else{
	  $('#'+type+'Stat').text(effect);
	  t.pointChange(cause);
	 }
 }
 
 pointChange(amt){
  this.freePoints = amt;
	 $('#freePts').text(this.freePoints);
 }
}