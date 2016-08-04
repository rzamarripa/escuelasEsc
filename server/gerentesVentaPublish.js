Meteor.publish("gerentesVenta", function(){
	return Roles.getUsersInRole( 'gerenteVenta');
});

Meteor.publish("usuarios", function(options){
	return  Meteor.users.find(options);
});