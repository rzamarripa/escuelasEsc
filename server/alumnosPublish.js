Meteor.publish("alumnos",function(options){
  	return Alumnos.find({estatus:true},options);
});

