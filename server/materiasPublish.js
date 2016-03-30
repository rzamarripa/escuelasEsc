Meteor.publish("materias", function(){
	return  Materias.find();
});