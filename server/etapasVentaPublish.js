Meteor.publish("etapasVenta", function(options){
	return EtapasVenta.find({estatus : true});
});

Meteor.publish("etapaVenta", function(options){
	var etapa = EtapasVenta.find(options);	
	return etapa;
});