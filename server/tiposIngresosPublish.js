Meteor.publish("tiposingresos", function(){
	return TiposIngresos.find({estatus:true});
});