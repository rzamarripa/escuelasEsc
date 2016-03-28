Meteor.publish("deptosAcademicos", function(){
	return DeptosAcademicos.find();
});