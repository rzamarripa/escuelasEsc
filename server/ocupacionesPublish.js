Meteor.publish("ocupaciones", function(){
	return Ocupaciones.find({estatus:true});
});