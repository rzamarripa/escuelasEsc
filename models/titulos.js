Titulos 						= new Meteor.Collection("Titulos");
Titulos.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});