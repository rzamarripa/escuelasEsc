Meteor.publish("buscarAlumnos",function(options){
	let selector = {
  	nombreCompleto: { '$regex' : '.*' + options.where.nombre || '' + '.*', '$options' : 'i' },
  	campus_id: options.where.campus_id
	}	
	return Alumnos.find(selector, options.options);
});

Meteor.publish("alumno",function(options){
  return Alumnos.find(options.id);
});

Meteor.publish("alumnos",function(params){
	console.log(params)
  return Alumnos.find(params);
});

Meteor.publish("buscarUsuario",function(options){
	if(options.where.nombreUsuario.length > 3){		
		return Meteor.users.find({username : options.where.nombreUsuario});
	}	
});