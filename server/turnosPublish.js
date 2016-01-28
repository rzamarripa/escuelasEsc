Meteor.publish("turnos", function(){
	return Turnos.find({estatus:true});
});