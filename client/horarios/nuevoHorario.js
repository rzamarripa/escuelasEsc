angular
  .module('casserole')
  .controller('HorarioDetalleCtrl', HorarioDetalleCtrl);
 
function HorarioDetalleCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr) {
	$reactive(this).attach($scope);
	
	this.autorun(() => {
		
	})
	this.clase = {};
  this.actionAgregar = true;
  this.colorSeleccionado = null;
  
  var clasesTotales = [];
  var aulasTotales = [];
  this.horario 	= {};
	this.horario.clases = [];
  
  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();
  
  this.subscribe("maestros");
  this.subscribe("materias");
  this.subscribe("horarios");
  this.subscribe("aulas");
  	
	this.helpers({
		maestros : () => {
			return Maestros.find();
		},
		materias : () => {
			return Materias.find();
		},
		aulas : () => {
			return Aulas.find();
		},
		horarios : () => {
			return Horarios.find();
		},
	});
		
	if($stateParams.id != ""){
		this.horario 	= Horarios.findOne($stateParams.id);
		this.action 	= false;
	}else{
		this.horario 	= {};
	  this.horario.clases = [];
	  this.horario.estatus = true;
	  this.action 	= true;	  
	}
	
  this.agregarClase = function(clase){
	  console.log(clase);
	  eliminarTemporalesOcupados();
	  var materia 	= Materias.findOne(clase.materia_id);
		var maestro 	= Maestros.findOne(clase.maestro_id);
		var aula 			= Aulas.findOne(clase.aula_id);

	  clase.materia = materia.descripcionCorta;
	  clase.title 	= maestro.nombre + " " + maestro.apPaterno + "\n"+ materia.descripcionCorta + "\n" + aula.nombre;
	  clase.maestro = maestro.nombre + " " + maestro.apPaterno;
	  clase.aula 		= aula.nombre;
	  clase.className = ["event", this.clase.className];
	  clase.estatus = true;
	  clase.start 	= moment(clase.start).format("YYYY-MM-DD HH:mm");
		clase.end 		= moment(clase.end).format("YYYY-MM-DD HH:mm");
	  
	  this.horario.clases.push(clase);
	  this.horario.semana = moment(clase.start).week();
	  this.clase 	= {};
  }
  
  this.cancelarClase = function(){
	  eliminarTemporalesOcupados();
	  for(i = 0; i < this.horario.clases.length; i++){
		  if(this.horario.clases[i]._id == this.clase._id){
				this.horario.clases[i].className = this.colorSeleccionado;
			}
		}
	  
	  this.actionAgregar = true; 
	  this.clase 	= {};
  }

  this.modificaClase = function(clase){
	  
	  _.each(this.horario.clases, function(claseActual){
		  if(claseActual._id == clase._id){
			  var materia = $meteor.object(Materias, this.clase.materia_id, false);
				var maestro = $meteor.object(Maestros, this.clase.maestro_id, false);
				var aula 		= $meteor.object(Aulas, this.clase.aula_id, false);
			  clase.materia = materia.descripcionCorta;
			  clase.title = maestro.nombre + " " + maestro.apPaterno + "\n" + materia.descripcionCorta + "\n" + aula.nombre;
			  clase.maestro = maestro.nombre + " " + maestro.apPaterno;
			  clase.aula 	= aula.nombre;
			  clase.estatus = true;
			  
			  var claseCopy = null;
			  claseCopy 	= clase;				
				claseCopy 	= angular.copy(clase);
				claseActual.title 	= claseCopy.title;
				claseActual.id 			= claseCopy.id;
				claseActual.materia_id = claseCopy.materia_id;
				claseActual.maestro_id = claseCopy.maestro_id;
				claseActual.className = claseCopy.className;
				claseActual.aula_id = claseCopy.aula_id;
			  claseActual.materia = claseCopy.materia;
			  claseActual.maestro = claseCopy.maestro;
			  claseActual.aula 		= claseCopy.aula;			  
			  claseActual.start 	= moment(claseCopy.start).format("YYYY-MM-DD HH:mm");
			  claseActual.end 		= moment(claseCopy.end).format("YYYY-MM-DD HH:mm");
			  claseActual.estatus = true;
		  }
	  });
	  this.clase = {};
	  this.actionAgregar = true;
	  eliminarTemporalesOcupados();
  }
  
  this.modificarHorario = function(horario){
	  this.horario.semana = horario.semana;
	  var idTemp = horario._id;
	  delete horario._id;
		Horarios.update({_id:idTemp},{$set:horario});
		toastr.success("Se modificó el horario");
  }
   
  this.muestraMateriasMaestro = function(maestro_id){
	  var horariosTotales = angular.copy(this.horarios);
	  while(clasesTotales.length>0)clasesTotales.pop();
	  _.each(horariosTotales, function(horario){
		  if(horario._id != $stateParams.id){
			  for(i = 0; i < horario.clases.length; i++){
				  if(horario.clases[i].maestro_id == maestro_id){
					  horario.clases[i]._id 	= Math.random();
					  horario.clases[i].start 		= moment(horario.clases[i].start).format("YYYY-MM-DD HH:mm");
					  horario.clases[i].end 			= moment(horario.clases[i].end).format("YYYY-MM-DD HH:mm");
					  horario.clases[i].className = ["event", "bg-color-magenta"];
					  clasesTotales.push(angular.copy(horario.clases[i]));
				  }
			  }		
		  }		    
	  });	  
	  console.log(clasesTotales);
  }
  
  this.muestraAulasMaestro = function(aula_id){
	  var horariosTotales = angular.copy(this.horarios);		
	  while(aulasTotales.length>0)aulasTotales.pop();
	  _.each(horariosTotales, function(horario){
		  if(horario._id != $stateParams.id){
			  for(i = 0; i < horario.clases.length; i++){
				  if(horario.clases[i].aula_id == aula_id){
					  horario.clases[i]._id 	= Math.random();
					  horario.clases[i].start 		= moment(horario.clases[i].start).format("YYYY-MM-DD HH:mm");
					  horario.clases[i].end 			= moment(horario.clases[i].end).format("YYYY-MM-DD HH:mm");
					  horario.clases[i].className = ["event", "bg-color-grayDark"];
					  aulasTotales.push(angular.copy(horario.clases[i]));
				  }
			  }		
		  }
	  });	  
	  console.log(aulasTotales);
  }
  
  /* alert on eventClick */
  this.alertOnEventClick = function(date, jsEvent, view){
	  console.log("entré");
	  eliminarTemporalesOcupados();
	  for(i = 0; i < this.horario.clases.length; i++){
		  if(this.horario.clases[i]._id == date._id){
			  this.horario.clases[i].className = ["event", "bg-color-orange"];
			}else if(this.horario.clases[i]._id == this.clase._id){
				this.horario.clases[i].className = this.clase.className;
			}
		}

    this.clase = angular.copy(date);
    this.colorSeleccionado = date.className;
    this.clase.start 	= moment(date.start).format("YYYY-MM-DD HH:mm");
    this.clase.end 		= moment(date.end).format("YYYY-MM-DD HH:mm");
    this.actionAgregar = false;
  };
  
  /* alert on Drop */
	this.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
		console.log(delta);
		
		this.clase.start 	= moment(this.clase.start).add(delta).add('hours', -1).format("YYYY-MM-DD HH:mm");
		this.clase.end 		= moment(this.clase.end).add(delta).add('hours', -1).format("YYYY-MM-DD HH:mm");
		this.actionAgregar = false;
  };
  
  /* alert on Resize */
  this.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
     this.alertMessage = ('Event Resized to make dayDelta ' + delta);
  };
  
  /* add custom event*/
  this.guardarHorario = function() {
	  eliminarTemporalesOcupados();
    Horarios.insert(this.horario);
    toastr.success("Se guardó el horario");
  };
  
  /* remove event */
  this.eliminarClase = function() {
	  eliminarTemporalesOcupados();
	  for(i = 0; i <= this.horario.clases.length -1; i++){
		  if(this.horario.clases[i]._id == this.clase._id){
			  this.horario.clases.splice(i, 1);
			  this.actionAgregar = true;
			  this.clase = {};
		  }
	  }
  };
  
  var eliminarTemporalesOcupados = function(){
	  while(aulasTotales.length>0)aulasTotales.pop();
	  while(clasesTotales.length>0)clasesTotales.pop();
  }
    
  /* Render Tooltip */
  this.eventRender = function( event, element, view ) { 
    element.attr({'tooltip': event.title, 'tooltip-append-to-body': true});
    $compile(element)(this);
  };
  
  /* config object */
  this.uiConfig = {
    calendar:{
      height: 500,
      editable: true,
      lang:'es',
      defaultView:'agendaWeek',
      weekends : false,
      header:{
        left: 'title',
        center: '',
        right: 'today prev,next'
      },
      buttonText: {
        prev: 'Atrás',
        next: 'Siguiente',
        today: 'Hoy',        
    	},
      allDaySlot:false,
      columnFormat: {
        month: 'dddd',
        week: 'dddd',
        day: 'dddd'
      },
      dayNames : ["Domingo", "Lunes", "Martes", "Miéthisoles", "Jueves", "Viernes", "Sábado"],
      dayNamesShort : ["Dom", "Lun", "Ma", "Mi", "Jue", "Vie", "Sab"],
      eventClick: this.alertOnEventClick,
      eventDrop: this.alertOnDrop,
      eventResize: this.alertOnResize,
      eventRender: this.eventRender
    }
  };

  /* event southises array*/
  this.eventSources = [this.horario.clases, clasesTotales, aulasTotales];
  
  var view = $('#calendar').fullCalendar('getView');
	console.log(view)
};