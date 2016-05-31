Meteor.publish("grupos",function(options){
	console.log("grupo", options);
 	return Grupos.find(options);
});

Meteor.publish("grupo",function(options){
  return Grupos.find(options.id);
});