Meteor.publish("alumnos",function(options){
	let selector = {
  	nombreCompleto: { '$regex' : '.*' + options.where.nombre || '' + '.*', '$options' : 'i' }
	}	
	return Alumnos.find(selector, options.options);
});

Meteor.publish("alumno",function(options){
  return Alumnos.find(options.id);
});

Meteor.publish("alumnoss",function(params){
  return Alumnos.find(params);
});