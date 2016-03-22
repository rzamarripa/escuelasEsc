Meteor.publish("ciclos", function(){
	return Ciclos.find();
}); 