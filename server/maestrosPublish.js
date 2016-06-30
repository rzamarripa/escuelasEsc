Meteor.publish("maestros",function(params){
		if(params != undefined)
  		return Maestros.find(params);
  	else
  		return Maestros.find()
});