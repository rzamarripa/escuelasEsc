Secciones 						= new Mongo.Collection("Secciones");
Secciones.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});
Secciones.getSeccionById=function(id){
	return Secciones.find({_id:id}).fetch()[0];
};