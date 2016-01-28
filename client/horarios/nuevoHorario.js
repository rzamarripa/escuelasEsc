angular.module("casserole").controller("HorarioDetalleCtrl", 
	['$scope', '$meteor', '$state','$stateParams', 'toastr', '$compile',
	function($scope, $meteor, $state, $stateParams, toastr, $compile)
{
	$scope.clase = {};
  $scope.actionAgregar = true;
  $scope.colorSeleccionado = null;
  
  var clasesTotales = [];
  var aulasTotales = [];
  
  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();
  
  $scope.maestros = $meteor.collection(function() {return Maestros.find();}).subscribe("maestros");
  $scope.materias = $meteor.collection(function() {return Materias.find();}).subscribe("materias");
  $scope.horarios = $meteor.collection(function() {return Horarios.find();}).subscribe("horarios");
	$scope.aulas 		= $meteor.collection(function() {return Aulas.find();}).subscribe("aulas");
		
	if($stateParams.id != ""){
		$scope.horario 	= $meteor.object(Horarios, $stateParams.id, false);
		$scope.action 	= false;
	}else{
		$scope.horario 	= {};
	  $scope.horario.clases = [];
	  $scope.horario.estatus = true;
	  $scope.action 	= true;	  
	}
	
  $scope.agregarClase = function(clase){
	  eliminarTemporalesOcupados();
	  var materia 	= $meteor.object(Materias, clase.materia_id, false);
		var maestro 	= $meteor.object(Maestros, clase.maestro_id, false);
		var aula 			= $meteor.object(Aulas, clase.aula_id, false);

	  clase.materia = materia.descripcionCorta;
	  clase.title 	= maestro.nombre + " " + maestro.apPaterno + "\n"+ materia.descripcionCorta + "\n" + aula.nombre;
	  clase.maestro = maestro.nombre + " " + maestro.apPaterno;
	  clase.aula 		= aula.nombre;
	  clase.className = ["event", $scope.clase.className];
	  clase.estatus = true;
	  clase.start 	= moment(clase.start).format("YYYY-MM-DD HH:mm");
		clase.end 		= moment(clase.end).format("YYYY-MM-DD HH:mm");
	  
	  $scope.horario.clases.push(clase);
	  $scope.horario.semana = moment(clase.start).week();
	  $scope.clase 	= {};
  }
  
  $scope.cancelarClase = function(){
	  eliminarTemporalesOcupados();
	  for(i = 0; i < $scope.horario.clases.length; i++){
		  if($scope.horario.clases[i]._id == $scope.clase._id){
				$scope.horario.clases[i].className = $scope.colorSeleccionado;
			}
		}
	  
	  $scope.actionAgregar = true; 
	  $scope.clase 	= {};
  }

  $scope.modificarClase = function(clase){
	  
	  _.each($scope.horario.clases, function(claseActual){
		  if(claseActual._id == clase._id){
			  var materia = $meteor.object(Materias, $scope.clase.materia_id, false);
				var maestro = $meteor.object(Maestros, $scope.clase.maestro_id, false);
				var aula 		= $meteor.object(Aulas, $scope.clase.aula_id, false);
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
	  $scope.clase = {};
	  $scope.actionAgregar = true;
	  eliminarTemporalesOcupados();
  }
  
  $scope.modificarHorario = function(horario){
	  $scope.horario.semana = horario.semana;
		$scope.horario.save();
		toastr.success("Se modificó el horario");
  }
   
  $scope.muestraMateriasMaestro = function(maestro_id){
	  var horariosTotales = angular.copy($scope.horarios);
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
  
  $scope.muestraAulasMaestro = function(aula_id){
	  var horariosTotales = angular.copy($scope.horarios);		
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
  $scope.alertOnEventClick = function(date, jsEvent, view){
	  eliminarTemporalesOcupados();
	  for(i = 0; i < $scope.horario.clases.length; i++){
		  if($scope.horario.clases[i]._id == date._id){
			  $scope.horario.clases[i].className = ["event", "bg-color-orange"];
			}else if($scope.horario.clases[i]._id == $scope.clase._id){
				$scope.horario.clases[i].className = $scope.clase.className;
			}
		}

    $scope.clase = angular.copy(date);
    $scope.colorSeleccionado = date.className;
    $scope.clase.start 	= moment(date.start).format("YYYY-MM-DD HH:mm");
    $scope.clase.end 		= moment(date.end).format("YYYY-MM-DD HH:mm");
    $scope.actionAgregar = false;
  };
  
  /* alert on Drop */
	$scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
		console.log(delta);
		/*
		moment($scope.clase.start).add(delta._data.milliseconds, 'milliseconds');
		moment($scope.clase.start).add(delta._data.seconds, 'seconds');
		moment($scope.clase.start).add(delta._data.minutes, 'minutes');
		moment($scope.clase.start).add(delta._data.hours+1, 'hours');
		moment($scope.clase.start).add(delta._data.days, 'days');
		moment($scope.clase.start).add(delta._data.months, 'months');
		moment($scope.clase.start).add(delta._data.years, 'years');
		
		moment($scope.clase.end).add(delta._data.milliseconds, 'milliseconds');
		moment($scope.clase.end).add(delta._data.seconds, 'seconds');
		moment($scope.clase.end).add(delta._data.minutes, 'minutes');
		moment($scope.clase.end).add(delta._data.hours+1, 'hours');
		moment($scope.clase.end).add(delta._data.days, 'days');
		moment($scope.clase.end).add(delta._data.months, 'months');
		moment($scope.clase.end).add(delta._data.years, 'years');
		*/
		
		$scope.clase.start 	= moment($scope.clase.start).add(delta).add('hours', -1).format("YYYY-MM-DD HH:mm");
		$scope.clase.end 		= moment($scope.clase.end).add(delta).add('hours', -1).format("YYYY-MM-DD HH:mm");
		$scope.actionAgregar = false;
  };
  
  /* alert on Resize */
  $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
     $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
  };
  
  /* add custom event*/
  $scope.guardarHorario = function() {
	  eliminarTemporalesOcupados();
    $scope.horarios.push($scope.horario);
    toastr.success("Se guardó el horario");
  };
  
  /* remove event */
  $scope.eliminarClase = function() {
	  eliminarTemporalesOcupados();
	  for(i = 0; i <= $scope.horario.clases.length -1; i++){
		  if($scope.horario.clases[i]._id == $scope.clase._id){
			  $scope.horario.clases.splice(i, 1);
			  $scope.actionAgregar = true;
			  $scope.clase = {};
		  }
	  }
  };
  
  var eliminarTemporalesOcupados = function(){
	  while(aulasTotales.length>0)aulasTotales.pop();
	  while(clasesTotales.length>0)clasesTotales.pop();
  }
    
  /* Render Tooltip */
  $scope.eventRender = function( event, element, view ) { 
    element.attr({'tooltip': event.title, 'tooltip-append-to-body': true});
    $compile(element)($scope);
  };
  
  /* config object */
  $scope.uiConfig = {
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
      dayNames : ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      dayNamesShort : ["Dom", "Lun", "Ma", "Mi", "Jue", "Vie", "Sab"],
      eventClick: $scope.alertOnEventClick,
      eventDrop: $scope.alertOnDrop,
      eventResize: $scope.alertOnResize,
      eventRender: $scope.eventRender
    }
  };

  /* event sources array*/
  $scope.eventSources = [$scope.horario.clases, clasesTotales, aulasTotales];
}]);