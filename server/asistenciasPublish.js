Meteor.publish("asistencias", function(){
	return Asistencias.find();
});