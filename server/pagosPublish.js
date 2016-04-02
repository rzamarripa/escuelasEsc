Meteor.publish("pagos", function(){
	return Pagos.find({estatus:true});
});

Meteor.publish("pagosAlumno",function(options){
  return Pagos.find({alumno_id: options.alumno_id});
});

Meteor.publish("pagosTotales", function(options){
	return Pagos.aggregate([{$group:{_id:{alumno_id: options.alumno_id}, total:{$sum:"$importe"},pagos:{$sum:1}}}]);
})