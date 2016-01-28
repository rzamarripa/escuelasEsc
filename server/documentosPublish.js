Meteor.publish("documentos",function(){
  	return Documentos.find({estatus:true});
});