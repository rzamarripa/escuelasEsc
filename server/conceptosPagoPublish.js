Meteor.publish("conceptosPago", function(){
	return ConceptosPago.find({estatus:true});
});