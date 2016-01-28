Meteor.publish("nacionalidades",function(){
  	return Nacionalidades.find({estatus:true});
});

