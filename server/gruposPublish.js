Meteor.publish("grupos",function(options){
	console.log("grupo", options);
 	return Grupos.find(options);
});