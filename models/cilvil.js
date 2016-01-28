Civiles						= new Mongo.Collection("Civiles");
Civiles.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});