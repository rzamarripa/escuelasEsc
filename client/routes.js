angular.module("casserole").run(function ($rootScope, $state, toastr) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    switch(error) {
      case "AUTH_REQUIRED":
        $state.go('anon.login');
        break;
      case "FORBIDDEN":
        //$state.go('root.home');
        break;
      case "UNAUTHORIZED":
      	toastr.error("Acceso Denegado");
				toastr.error("No tiene permiso para ver esta opción");
        break;
      default:
        $state.go('internal-client-error');
    }
/*
    if (error === 'AUTH_REQUIRED') {
      $state.go('anon.login');
    }
*/
  });
});

angular.module('casserole').config(['$injector', function ($injector) {
  var $stateProvider = $injector.get('$stateProvider');
  var $urlRouterProvider = $injector.get('$urlRouterProvider');
  var $locationProvider = $injector.get('$locationProvider');

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  /***************************
   * Anonymous Routes
   ***************************/
  $stateProvider
    .state('anon', {
      url: '',
      abstract: true,
      template: '<ui-view/>'
    })
    .state('anon.login', {
      url: '/login',
      templateUrl: 'client/login/login.ng.html',
      controller: 'LoginCtrl',
      controllerAs: 'lc'
    })
    .state('anon.pagosImprimir', {
      url: '/pagosImprimir/:id',
      templateUrl: 'client/pagos/pagosImprimir.ng.html',
      controller: 'PagosImprimirCtrl as pi',
      params: { 'semanas': ':semanas' },
    })
    .state('anon.logout', {
      url: '/logout',
      resolve: {
        'logout': ['$meteor', '$state', 'toastr', function ($meteor, $state, toastr) {
          return $meteor.logout().then(
            function () {
	            toastr.success("Vuelva pronto.");
              $state.go('anon.login');
            },
            function (error) {
              toastr.error(error.reason);
            }
          );
        }]
      }
    });

  /***************************
   * Login Users Routes
   ***************************/
  $stateProvider
    .state('root', {
      url: '',
      abstract: true,
      templateUrl: 'client/layouts/root.ng.html',
      controller: 'RootCtrl',
    })
    .state('root.home', {
      url: '/',
      templateUrl: 'client/home/home.ng.html',      
      resolve: {
	      "currentUser": ["$meteor", function($meteor){
	        return $meteor.requireUser();
	      }]
	    }
    })
    .state('root.alumnos', {
      url: '/alumnos',
      templateUrl: 'client/alumnos/alumnos.ng.html',
      controller: 'AlumnosCtrl as al',
    })
    .state('root.nuevoAlumno', {
      url: '/nuevoAlumno',
      templateUrl: 'client/alumnos/form.ng.html',
      controller: 'AlumnosCtrl as al',
    })
    .state('root.editarAlumno', {
      url: '/editarAlumno/:id',
      templateUrl: 'client/alumnos/form.ng.html',
      controller: 'AlumnosDetalleCtrl as al',
    })
    .state('root.alumnoDetalle', {
      url: '/alumnos/:id',
      templateUrl: 'client/alumnos/detalle.ng.html',
      controller: 'AlumnosDetalleCtrl as al',
    })
    .state('root.ciclos', {
      url: '/ciclos',
      templateUrl: 'client/ciclos/ciclos.ng.html',
      controller: 'CiclosCtrl as cl',
    })
     .state('root.subCiclos', {
      url: '/subCiclos',
      templateUrl: 'client/subCiclos/subCiclos.ng.html',
      controller: 'SubCiclosCtrl as sub',
    })
     .state('root.periodos', {
      url: '/periodos',
      templateUrl: 'client/periodos/periodos.ng.html',
      controller: 'PeriodosCtrl as per',
    })
    .state('root.deptosAcademicos', {
      url: '/deptosAcademicos',
      templateUrl: 'client/deptosAcademicos/deptosAcademicos.ng.html',
      controller: 'DeptosAcademicosCtrl as da',
    })
    .state('root.materias', {
      url: '/materias',
      templateUrl: 'client/materias/materias.ng.html',
      controller: 'MateriasCtrl as mat',
    })
    .state('root.ocupaciones', {
      url: '/ocupaciones',
      templateUrl: 'client/ocupaciones/ocupaciones.ng.html',
      controller: 'OcupacionesCtrl as oc',
    })
    .state('root.tiposIngresos', {
      url: '/tiposIngresos',
      templateUrl: 'client/tiposingresos/tiposIngresos.ng.html',
      controller: 'TiposIngresosCtrl as tiping',
    })
    .state('root.empresas', {
      url: '/empresas',
      templateUrl: 'client/empresas/empresas.ng.html',
      controller: 'EmpresasCtrl as emp',
    })
    .state('root.estadoCivil', {
      url: '/estadoCivil',
      templateUrl: 'client/estadoCivil/estadoCivil.ng.html',
      controller: 'CivilesCtrl as civ',
    })
    .state('root.titulos', {
      url: '/titulos',
      templateUrl: 'client/titulos/titulos.ng.html',
      controller: 'TitulosCtrl as tit',
    })
    .state('root.secciones', {
      url: '/secciones',
      templateUrl: 'client/secciones/secciones.ng.html',
      controller: 'SeccionesCtrl as sec',
    })
    .state('root.nacionalidad', {
      url: '/nacionalidad',
      templateUrl: 'client/nacionalidad/nacionalidad.ng.html',
      controller: 'NacionalidadesCtrl as nac',
    })
    .state('root.planEstudio', {
      url: '/planEstudios',
      templateUrl: 'client/planEstudios/planEstudios.index.ng.html',
      controller: 'PlanEstudiosIndexCtrl as pl',
    })
    .state('root.nuevoPlanEstudio', {
      url: '/nuevoPlanEstudios',
      templateUrl: 'client/planEstudios/planEstudios.form.ng.html',
      controller: 'PlanEstudiosIndexCtrl as pl',
    })
    .state('root.editarPlanEstudio', {
      url: '/editarPlanEstudios/:id',
      templateUrl: 'client/planEstudios/planEstudios.form.ng.html',
      controller: 'PlanEstudiosIndexCtrl as pl',
    })
    .state('root.planEstudioDetalle', {
      url: '/planEstudios/:id',
      templateUrl: 'client/planEstudios/planEstudios.detalle.ng.html',
      controller: 'PlanEstudiosDetalleCtrl as pl',
    })
    .state('root.turnos', {
      url: '/turnos',
      templateUrl: 'client/turnos/turnos.ng.html',
      controller: 'TurnosCtrl as tn',
    })
    .state('root.grupos', {
      url: '/grupos',
      templateUrl: 'client/grupos/grupos.ng.html',
      controller: 'GruposCtrl as gp',
    })
    .state('root.grupoDetalle', {
      url: '/gruposDetalle/:id',
      templateUrl: 'client/grupos/gruposDetalle.ng.html',
      controller: 'GruposDetalleCtrl as gp',
    })
    .state('root.inscripciones', {
      url: '/inscripciones/:id',
      templateUrl: 'client/inscripciones/inscripciones.ng.html',
      controller: 'InscripcionesCtrl as ins',
    })
    .state('root.pagos', {
      url: '/pagos',
      templateUrl: 'client/pagos/buscarAlumno.ng.html',
      controller: 'PagosCtrl as pa',
    })
    .state('root.archivos', {
      url: '/archivos/:id',
      templateUrl: 'client/archivos/archivos.ng.html',
      controller: 'ArchivosCtrl as ar',
    })
    .state('root.detallePagos', {
      url: '/pagos/:id',
      templateUrl: 'client/pagos/detallePagos.ng.html',
      controller: 'DetallePagosCtrl as pa',
    })
    .state('root.inscripcionNueva', {
      url: '/nuevaInscripcion',
      templateUrl: 'client/inscripciones/form.ng.html',
      controller: 'NuevaInscripcionCtrl as ins',
    })
		.state('root.grupo', {
      url: '/grupo/:id',
      templateUrl: 'client/grupos/form.ng.html',
      controller: 'NuevoGrupoCtrl as gp',
    })
    .state('root.editarGrupo', {
      url: '/grupo',
      templateUrl: 'client/grupos/form.ng.html',
      controller: 'NuevoGrupoCtrl as gp',
    })
    .state('root.generaciones', {
      url: '/generaciones',
      templateUrl: 'client/generaciones/generaciones.ng.html',
      controller: 'GeneracionesCtrl as gen',
    })
    .state('root.instituciones', {
      url: '/instituciones',
      templateUrl: 'client/instituciones/instituciones.ng.html',
      controller: 'InstitucionesCt rl',
    })
    .state('root.campus', {
      url: '/campus',
      templateUrl: 'client/campus/campus.ng.html',
      controller: 'CampusCtrl as cp',
    })    
    .state('root.campusDetalle', {
      url: '/campus/:id',
      templateUrl: 'client/campus/campusDetalle.ng.html',
      controller: 'CampusDetalleCtrl as cd',
    })
    .state('root.aulas', {
      url: '/aulas',
      templateUrl: 'client/aulas/aulas.ng.html',
      controller: 'AulasCtrl as au',
    })
    .state('root.maestros', {
      url: '/maestros',
      templateUrl: 'client/maestros/maestros.ng.html',
      controller: 'MaestrosCtrl as maes',
    })
    .state('root.tareas', {
      url: '/tareas/:id/:maestros_id',
      templateUrl: 'client/maestro/tareas/tareas.ng.html',
      controller: 'TareasCtrl as tarea',
    })
    .state('root.documentos', {
      url: '/documentos',
      templateUrl: 'client/documentos/documentos.ng.html',
      controller: 'DocumentosCtrl as doc',
    })
    .state('root.escuela', {
      url: '/escuela',
      templateUrl: 'client/escuela/escuela.ng.html',
      controller: 'EscuelaCtrl as escu',
    })
    .state('root.trabajadores', {
      url: '/trabajadores',
      templateUrl: 'client/empleados/trabajadores.ng.html',
      controller: 'TrabajadoresCtrl as emp',
    })
    .state('root.nuevoHorario', {
      url: '/nuevoHorario/:id',
      templateUrl: 'client/horarios/form.ng.html',
      controller: 'HorarioDetalleCtrl as ho',
    })     
    .state('root.rvoe', {
      url: '/rvoe',
      templateUrl: 'client/rvoe/rvoe.ng.html',
      controller: 'RvoeCtrl as rv',
    })     
    .state('root.conceptosPago', {
      url: '/conceptosPago',
      templateUrl: 'client/conceptosPago/conceptosPago.ng.html',
      controller: 'ConceptosPagoCtrl as cp',
    })    
    .state('root.editarHorario', {
      url: '/editarHorario/:id',
      templateUrl: 'client/horarios/form.ng.html',
      controller: 'HorarioDetalleCtrl as ho',
    })
    .state('root.listarHorarios', {
      url: '/horarios',
      templateUrl: 'client/horarios/horarios.ng.html',
      controller: 'HorariosCtrl as ho',
    })    
    .state('root.gerentesVenta', {
      url: '/gerentesVenta',
      templateUrl: 'client/gerentesVenta/gerentesVenta.html',
      controller: 'GerentesVentaCtrl as gv',
    })       
    .state('root.vendedores', {
      url: '/vendedores',
      templateUrl: 'client/vendedores/vendedores.html',
      controller: 'VendedoresCtrl as v',
    })
    .state('root.prospectos', {
      url: '/prospectos',
      templateUrl: 'client/prospectos/prospectos.html',
      controller: 'ProspectosCtrl as fa',
    })
    .state('root.nuevoProspecto', {
      url: '/nuevoProspecto',
      templateUrl: 'client/prospectos/nuevoProspecto.html',
      controller: 'ProspectosCtrl as fa',
    })        
    .state('root.prospecto', {
      url: '/prospecto/:id',
      templateUrl: 'client/prospceto/prospecto.html',
      controller: 'ProspectoCtrl as fa',
    })
    .state('root.etapasVenta', {
      url: '/etapasVenta',
      templateUrl: 'client/etapasVenta/etapasVenta.html',
      controller: 'EtapasVentaCtrl as ev',
    })
    .state('root.asistenciaGrupo', {
      url: '/asistenciaGrupo/:id/:materia_id',
      templateUrl: 'client/maestro/asistencias/asistencias.ng.html',
      controller: 'MaestroAsistenciasCtrl as masas',
      resolve: {
				"currentUser": ["$meteor", "toastr", function($meteor, toastr){
					return $meteor.requireValidUser(function(user) {
						if(user.roles[0] == "maestro"){
							return true;
						}else{
							return 'UNAUTHORIZED'; 
						}
         });
       }]
      }
    })       
    .state('root.verAsistencias', {
      url: '/verAsistencias/:id/:materia_id',
      templateUrl: 'client/maestro/asistencias/verAsistencias.ng.html',
      controller: 'MaestroVerAsistenciasCtrl as mast',
      resolve: {
				"currentUser": ["$meteor", "toastr", function($meteor, toastr){
					return $meteor.requireValidUser(function(user) {
						if(user.roles[0] == "maestro"){
							return true;
						}else{
							return 'UNAUTHORIZED'; 
						}
         });
       }]
      }
    })
    .state('root.maestroGrupos', {
      url: '/gruposMaestro/:_id',
      templateUrl: 'client/maestro/grupos/grupos.ng.html',
      controller: 'MaestroGruposCtrl as masgrupo',
      resolve: {
				"currentUser": ["$meteor", "toastr", function($meteor, toastr){
					return $meteor.requireValidUser(function(user) {
						if(user.roles[0] == "maestro"){
							return true;
						}else{
							return 'UNAUTHORIZED'; 
						}
         });
       }]
      }
    })
    .state('root.alumnoCalificaciones', {
      url: '/alumnoCalificaciones',
      templateUrl: 'client/alumno/calificaciones/calificaciones.ng.html',
      controller: 'AlumnoCalificacionesCtrl',
      resolve: {
				"currentUser": ["$meteor", "toastr", function($meteor, toastr){
					return $meteor.requireValidUser(function(user) {
						if(user.roles[0] == "alumno"){
							return true;
						}else{
							return 'UNAUTHORIZED'; 
						}					 	
         });
       }]
    	}
    }); 
}]);     