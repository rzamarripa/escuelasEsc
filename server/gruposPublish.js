Meteor.publish("grupos",function(options){
 	return Grupos.find(options);
});