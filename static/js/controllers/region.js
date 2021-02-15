DC.Region = {
 data:  {},
 listeners: {
  init: () => {
   Socket.on('region-init-result', (data) => {
	   DC.Tpl.display(data);
	  });
  }
 },
 events: {
  init: () => {
   $(document).on('click', '.shop', function(e){
    e.preventDefault();
    
    var type = $(this).data().id;
    DC.Shop.init(type);
   });
   
   $(document).on('click', '.region-change', function(e){
    e.preventDefault();
    
    var id = $(this).data().id;
    DC.Region.init(id);
   });
   
   $(document).on('click', '.quest', function(e){
    e.preventDefault();
    
    var r = $(this).data().id;
    DC.Encounter.init(r);
   });
  }
 },
 init: (id) => {
  DC.Player.region = id;
  Socket.emit('region-init', id);
  DC.Player.buildStats();
 }
};