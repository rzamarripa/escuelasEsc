Meteor.publish("planeaciones", function(params){
	if(params != undefined)
		return  Planeaciones.find(params);
	else
		return Planeaciones.find();
});