Meteor.publish("alumnos",function(options){
	console.log(options.where.nombre);
	let selector = {
  	nombre: { '$regex' : '.*' + options.where.nombre || '' + '.*', '$options' : 'i' }
	}	
	return Alumnos.find(selector, options.options);
});

Meteor.publish("alumno",function(options){
  return Alumnos.find(options.id);
});