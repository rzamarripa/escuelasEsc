Meteor.publish("aulas",function(){
  	return Aulas.find();
});