angular
.module("casserole")
.controller("MaestroGruposCtrl", MaestroGruposCtrl);
 function MaestroGruposCtrl($scope, $meteor, $reactive , $state, $stateParams){
 	let rc = $reactive(this).attach($scope);
 	this.hoy = new Date();
	//this.grupos = [];
	/*
	this.mmgs = [];
	$meteor.call("getGrupos").then(function (data) {
    rc.mmgs = data;
  });
	*/
	this.grupos_id = [];
	this.maestros_id = [];
	this.materias_id = [];
	this.alumnos_id = [];
	this.subscribe('grupos', () => {		
		return [{
			_id : {$in:this.getReactively('grupos_id')}
		}]
	});
	this.subscribe('maestros', () => {		
		return [{
			_id : {$in:this.getReactively('maestros_id')}
		}]
	});
	this.subscribe('materias', () => {		
		return [{
			_id : {$in:this.getReactively('materias_id')}
		}]
	});

	this.subscribe('inscripciones', () => {		
		return [{
			maestro_id : {$in:this.getReactively('maestros_id')}
		}]
	});

	this.subscribe('maestrosMateriasGrupos', () => {		
		return [{
			maestro_id: Meteor.user().profile.maestro_id
		}]
	});

 this.helpers({		
		grupo : () => {
			return Grupos.findOne($stateParams.id);
		},
		mmgs : ()=>{
			var mmgs = MaestrosMateriasGrupos.find().fetch();
			if(mmgs != undefined){
				this.grupos_id = _.pluck(mmgs, 'grupo_id')
				this.materias_id = _.pluck(mmgs, 'materia_id')
				this.maestros_id = _.pluck(mmgs, 'maestro_id')
				_.each(mmgs, function(mmg){
					mmg.alumnos = [];
					mmg.maestro = Maestros.findOne(mmg.maestro_id);
		      mmg.materia = Materias.findOne(mmg.materia_id);
		      mmg.grupo = Grupos.findOne(mmg.grupo_id);
	       	var inscripciones = Inscripciones.find({grupo_id:mmg.grupo_id}).fetch();
	       	this.alumnos_id = _.pluck(inscripciones, 'alumno_id')
		     	_.each(inscripciones,function(inscripcion){
		        var alumno = Alumnos.findOne({_id:inscripcion.alumno_id});
		        mmg.alumnos.push(alumno);
		      });
				})
				return mmgs
			}

		}
  });
};