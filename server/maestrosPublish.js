Meteor.publish("maestros",function(){
  	return Maestros.find({estatus:true});
});