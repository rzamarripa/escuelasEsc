Meteor.publish("escuelas",function(){
  	return Escuelas.find({estatus:true});
});