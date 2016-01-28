Meteor.publish("generaciones", function(){
	return Generaciones.find({estatus:true});
});