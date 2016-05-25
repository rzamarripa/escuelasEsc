Meteor.publish("grupos",function(options){
	console.log(options);
 	return Grupos.find(options);
});