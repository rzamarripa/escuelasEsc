Meteor.publish("escuela",function(){
  	return Escuela.find({estatus:true});
});