Meteor.publish("campus", function(){
	return Campus.find({estatus:true});
});