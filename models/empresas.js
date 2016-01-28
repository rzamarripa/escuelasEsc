Empresas 						= new Mongo.Collection("Empresas");
Empresas.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});