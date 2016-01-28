Ciclos = new Mongo.Collection("ciclos");

Ciclos.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

var CiclosSchema = new SimpleSchema({
 	anioEscolar: {
   		type: Number,
   		optional: false,
   		label: "Año escolar",
 	},
 	complementoEscolar: {
  		type:String,
  		optional: false,
  		label: "Complemento"
 	},
	descripcion: {
	  	type: String,
	  	optional: false,
	  	label: "Descripción"
	},
	anioAdministrativo: {
	  	type: Number,
	  	optional: false,
	  	label: "Año Administrativo"
	},
 	complementoAdministrativo: {
  		type: Number,
   		optional: false,
   		label: "Complemento",
	},
	fechaInicio: {
	  	type: Date,
	  	optional: false,
	  	label: "Fecha de Inicio"
	},
	fechaFin: {
	  	type: Date,
	  	optional: false,
	  	label: "Fecha de Fin"
	},
	fechaBase: {
	  	type: Date,
	  	optional: false,
	  	label: "Fecha Base"
	}
});
Ciclos.attachSchema(CiclosSchema);