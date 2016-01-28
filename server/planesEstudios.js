Meteor.publish("planesEstudios", function(){
	return PlanesEstudios.find({estatus:true});
});