Materias = new Mongo.Collection("Materias");

Materias.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

var MateriasSchema = new SimpleSchema({
 	deptoAcademico_id: {
   		type: String,
   		optional: false,
   		label: "Departamento Academico",
 	},
 	clave: {
  		type:String,
  		optional: false,
  		label: "Clave"
	},
	etiqueta: {
	  	type: String,
	  	optional: true,
	  	label: "Etiqueta"
	},
	descripcionCorta: {
	  	type: String,
	  	optional: false,
	  	label: "Descripción Corta"
	},
	descripcion: {
	  	type: String,
	  	optional: false,
	  	label: "Descripción"
	},
	estatus: {
	 	type: Boolean,
	 	optional: false,
	 	label: "Estatus",
	}
});
Materias.attachSchema(MateriasSchema);