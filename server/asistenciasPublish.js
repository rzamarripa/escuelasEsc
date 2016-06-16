Meteor.publish("asistencias", function(){
	return Asistencias.find();
});

Meteor.publish("asistencia", function(){
	return Asistencias.find();
});