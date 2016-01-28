Meteor.publish("horarios", function(){
	return Horarios.find();
});