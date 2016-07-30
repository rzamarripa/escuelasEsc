Meteor.publish("secciones",function(params){
	console.log("secciones",params);
  	return Secciones.find(params);
});

