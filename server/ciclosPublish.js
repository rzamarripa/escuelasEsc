Meteor.publish("ciclos", function(){
	return Ciclos.find({estatus:true});
}); 