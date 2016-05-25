Meteor.publish("periodos", function(params){
	return Perdiodos.find(params);
}); 

