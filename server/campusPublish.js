Meteor.publish("campus", function(options){
	console.log("campus", options);
	return Campus.find(options);
});