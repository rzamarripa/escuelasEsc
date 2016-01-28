DeptosAcademicos 						= new Mongo.Collection("deptosacademicos");
DeptosAcademicos.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});
