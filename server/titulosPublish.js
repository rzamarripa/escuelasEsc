Meteor.publish("titulos",function(){
  	return Titulos.find({estatus:true});
});

