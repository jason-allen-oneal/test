class Tpl {
 build(data){
  var template = Handlebars.compile(data.html);
  return template(data.data);
 }
 
 display(data){
  var template = Handlebars.compile(data.html);
  DC.Game.container.html(template(data.data));
 }
 
 modal(id, title, html){
  if(id == "error"){
   console.log(html);
  }
  
  var modalHtml = '<div class="modal fade" id="'+id+'" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title" id="'+id+'-title">'+title+'</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body">'+html+'</div> <div class="modal-footer"> <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div> </div> </div> </div>';
  
  $('body').append(modalHtml);
  $('#'+id).modal();
 }
}

Handlebars.registerHelper('compare', (a, operator, b, options) => {
 var result;
 switch(operator){
  case '==':
   result = a == b;
   break;
  case '===':
   result = a === b;
   break;
  case '!=':
   result = a != b;
   break;
  case '!==':
   result = a !== b;
   break;
  case '<':
   result = a < b;
   break;
  case '>':
   result = a > b;
   break;
  case '<=':
   result = a <= b;
   break;
  case '>=':
   result = a >= b;
   break;
  case 'typeof':
   result = typeof a === b;
   break;
  default: {
   throw new Error('helper {{compare}}: invalid operator: `' + operator + '`');
  }
 }
 return utils.value(result, this, options);
});

var utils = {};
utils.value = function(val, context, options){
 if(utils.isOptions(val)){
  return utils.value(null, val, options);
 }
 if(utils.isOptions(context)){
  return utils.value(val, {}, context);
 }
 if(utils.isBlock(options)){
  return !!val ? options.fn(context) : options.inverse(context);
 }
 return val;
};

utils.isOptions = function(val){
 return utils.isObject(val) && utils.isObject(val.hash);
};

utils.isObject = function(val){
 return typeof val === 'object';
};

utils.isBlock = function(options){
 return utils.isOptions(options) && typeof options.fn === 'function' && typeof options.inverse === 'function';
};