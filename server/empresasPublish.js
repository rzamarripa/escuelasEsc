Meteor.publish("empresas",function(){
  	return Empresas.find({estatus:true});
});

