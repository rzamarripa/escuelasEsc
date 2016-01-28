Meteor.publish("secciones",function(){
  	return Secciones.find({estatus:true});
});

