Meteor.publish("prospecto", function(options){
	return Prospectos.find({_id:options.id});
});

Meteor.publish("prospectos",function(options){
	let selector = {
  	nombre: { '$regex' : '.*' + options.where.nombre || '' + '.*', '$options' : 'i' },
  	estatus: 1
	}	
	return Prospectos.find(selector, options.options);
});

Meteor.publish("prospectosStaff",function(options){
	let selector = {
  	nombre: { '$regex' : '.*' + options.where.nombre || '' + '.*', '$options' : 'i' },
  	estatus: options.where.estatus,
  	empleado_id: options.where.empleado_id
	}	
	return Prospectos.find(selector, options.options);
});

Meteor.publish("prospectosSeguimiento",function(options){
	let selector = {
  	nombre: { '$regex' : '.*' + options.where.nombre || '' + '.*', '$options' : 'i' }
	}	
	return Prospectos.find(selector, options.options);
});