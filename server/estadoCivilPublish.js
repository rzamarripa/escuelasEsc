Meteor.publish("civiles",function(){
  	return Civiles.find({estatus:true});
});

