Meteor.publish("grupos",function(options){
  	return Grupos.find({estatus:true},options);
});