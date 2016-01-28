Meteor.publish("inscripciones", function(){
	return Inscripciones.find({});
});