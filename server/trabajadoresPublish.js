Meteor.publish("trabajadores",function(){
  	return Trabajadores.find({estatus:true});
});