angular
.module("casserole")
.controller("GerenteVendedoresCtrl", GerenteVendedoresCtrl);
function GerenteVendedoresCtrl($scope, $meteor, $reactive,  $state, $stateParams, toastr) {
	
  let rc = $reactive(this).attach($scope);
  this.action = true;
  this.nuevo = true;
  this.vendedor_id = "";
  this.buscar = {};
  this.buscar.fechaInicial = new Date();
  this.buscar.fechaFinal = new Date();
  this.vendeores_id = [];
  this.fechaInicial = moment(new Date()).format("DD-MM-YYYY");
  this.fechaFinal = moment(new Date()).format("DD-MM-YYYY");
  this.mensajeNuevo = true;
  this.mensaje = {};
  moment.locale("es");
	
	this.subscribe('vendedores',()=>{
		return [{campus_id : Meteor.user() != undefined ? Meteor.user().profile.campus_id : "" }]
	});

	this.subscribe('etapasVenta',()=>{
		return [{campus_id : Meteor.user() != undefined ? Meteor.user().profile.campus_id : "", estatus : true}]
	});
	
	this.subscribe('inscripciones',()=>{
		return [{campus_id : Meteor.user() != undefined ? Meteor.user().profile.campus_id : "" }]
	});
	
	this.subscribe('prospectosPorVendedor',()=>{
		return [{
			campus_id : Meteor.user() != undefined ? Meteor.user().profile.campus_id : "",  
			vendedor_id : this.getCollectionReactively("vendedores_id")}]
	});
 
  this.helpers({
	  vendedores : () => {
		  if(Meteor.user()){
			  var usuarios = Meteor.users.find().fetch();
			  var vendedoresDelGerente = [];
			  _.each(usuarios, function(usuario){
				  if(usuario.roles[0] == "vendedor"){					  
					  vendedoresDelGerente.push(usuario);
				  }
			  });
			  vendedores_id = _.pluck(vendedoresDelGerente, "_id");
			  return vendedoresDelGerente;
		  }
	  },
	  ultimosProspectos : () => {
		  return Prospectos.find({vendedor_id : this.getReactively("vendedor_id")}).fetch();
	  },
	  etapasVenta : () => {
		  return EtapasVenta.find();
	  },
	  graficaVendedores : () => {
		  data = [];
			
		  if(this.vendedores){
			  _.each(this.getReactively("vendedores"), function(vendedor){
				  var primerdato = {name : vendedor.profile.nombre + " " + vendedor.profile.apPaterno + " " 
					  + vendedor.profile.apMaterno, y : rc.getCantidadProspectos(vendedor._id), 
					  drilldown : vendedor.profile.nombre + " " + vendedor.profile.apPaterno + " " + vendedor.profile.apMaterno};
				  data.push(primerdato);
			  });
		  }
		  
		  console.log("prueb",data);
		  
		  var datos = {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Prospectos por Vendedor '
        },
        subtitle: {
          text:  "Del " + moment(rc.fechaInicial).format('LL') + ' al ' + moment(rc.fechaInicial).format('LL')
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
	        title: {
	          text: 'Prospectos'
	        }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: '{point.y:.0f} P'
            }
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}</b> prospectos<br/>'
        },
        series: [{
          name: 'Prospectos',
          colorByPoint: true,
          data: data
        }],
        drilldown: {
            series: [{
                name: 'Microsoft Internet Explorer',
                id: 'Microsoft Internet Explorer',
                data: [
                    [
                        'v11.0',
                        24.13
                    ],
                    [
                        'v8.0',
                        17.2
                    ],
                    [
                        'v9.0',
                        8.11
                    ],
                    [
                        'v10.0',
                        5.33
                    ],
                    [
                        'v6.0',
                        1.06
                    ],
                    [
                        'v7.0',
                        0.5
                    ]
                ]
            }, {
                name: 'Chrome',
                id: 'Chrome',
                data: [
                    [
                        'v40.0',
                        5
                    ],
                    [
                        'v41.0',
                        4.32
                    ],
                    [
                        'v42.0',
                        3.68
                    ],
                    [
                        'v39.0',
                        2.96
                    ],
                    [
                        'v36.0',
                        2.53
                    ],
                    [
                        'v43.0',
                        1.45
                    ],
                    [
                        'v31.0',
                        1.24
                    ],
                    [
                        'v35.0',
                        0.85
                    ],
                    [
                        'v38.0',
                        0.6
                    ],
                    [
                        'v32.0',
                        0.55
                    ],
                    [
                        'v37.0',
                        0.38
                    ],
                    [
                        'v33.0',
                        0.19
                    ],
                    [
                        'v34.0',
                        0.14
                    ],
                    [
                        'v30.0',
                        0.14
                    ]
                ]
            }, {
                name: 'Firefox',
                id: 'Firefox',
                data: [
                    [
                        'v35',
                        2.76
                    ],
                    [
                        'v36',
                        2.32
                    ],
                    [
                        'v37',
                        2.31
                    ],
                    [
                        'v34',
                        1.27
                    ],
                    [
                        'v38',
                        1.02
                    ],
                    [
                        'v31',
                        0.33
                    ],
                    [
                        'v33',
                        0.22
                    ],
                    [
                        'v32',
                        0.15
                    ]
                ]
            }, {
                name: 'Safari',
                id: 'Safari',
                data: [
                    [
                        'v8.0',
                        2.56
                    ],
                    [
                        'v7.1',
                        0.77
                    ],
                    [
                        'v5.1',
                        0.42
                    ],
                    [
                        'v5.0',
                        0.3
                    ],
                    [
                        'v6.1',
                        0.29
                    ],
                    [
                        'v7.0',
                        0.26
                    ],
                    [
                        'v6.2',
                        0.17
                    ]
                ]
            }, {
                name: 'Opera',
                id: 'Opera',
                data: [
                    [
                        'v12.x',
                        0.34
                    ],
                    [
                        'v28',
                        0.24
                    ],
                    [
                        'v27',
                        0.17
                    ],
                    [
                        'v29',
                        0.16
                    ]
                ]
            }]
        }
    	};
    	console.log("datos",datos);
    	$('#container').highcharts(datos);
    	
		  return datos;
	  }
  });
  
  //Cantidad de prospectos por vendedor y por fecha
  this.getCantidadProspectos = function(vendedor_id){
	  rc.vendedor_id = vendedor_id;
	  var query = {vendedor_id : this.getReactively("vendedor_id"), fecha : { $gte : this.getReactively("fechaInicial"), $lt: this.getReactively("fechaFinal")}};
	  return Prospectos.find(query).count();;
  };
  
  //Cantidad de inscritos por vendedor y por fecha
  this.getCantidadInscritos = function(vendedor_id){
	  return Inscripciones.find({vendedor_id : vendedor_id, fechaInscripcion : { $gte : this.getReactively("fechaInicial"), $lt: this.getReactively("fechaFinal")}}).count();
  }
  
  //Cantidad total de prospectos por vendedor
  this.getCantidadTotalDeProspectosPorVendedor = function(vendedor_id){
	  return Prospectos.find({vendedor_id : vendedor_id}).count();
  }
  
  //Cantidad total de inscritos por vendedor
  this.getCantidadTotalDeInscritosPorVendedor = function(vendedor_id){
	  return Inscripciones.find({vendedor_id : vendedor_id}).count();
  }
  
  //Listado de prospectos por vendedor
  this.getProspectos = function(vendedor_id){
	  console.log(vendedor_id);
	  return Prospectos.find({vendedor_id : vendedor_id}).fetch();
  }
  
  //Cantidad de prospectos por etapa de venta (no se usa)
  this.getProspectosPorEtapa = function(etapaVenta_id){
	  return Prospectos.find({etapaVenta_id : etapaVenta_id}).count();
  }
  
  //Cantidad de prospectos por etapa de venta y por vendedor
  this.getCantidadProspectosPorEtapaVenta = function(vendedor_id, etapaVenta_id){
	  return Prospectos.find({vendedor_id : vendedor_id, etapaVenta_id : etapaVenta_id, fecha : { $gte : this.getReactively("fechaInicial"), $lt: this.getReactively("fechaFinal")}}).count();
  };
  
  //Buscar prospectos entre fechas
  this.buscarProspectos = function(buscar){
	  rc.fechaInicial = buscar.fechaInicial;
	  rc.fechaFinal = buscar.fechaFinal;
	  
	  console.log("grafica", rc.graficaVendedores);
  }
  
  //Actualizar el destinatario para enviar mensaje a un vendedor
  this.nuevoMensaje = function(vendedor_id){
	  rc.mensaje.destinatario_id = vendedor_id;
  }
  
  //Enviar el mensaje a un vendedor
  this.enviarMensaje = function(mensaje,form){
	  if(form.$invalid){
      toastr.error('Error al guardar los datos.');
      return;
	  }
	  
	  mensaje.estatus = true;
		mensaje.campus_id = Meteor.user().profile.campus_id;
		mensaje.usuarioInserto = Meteor.userId();
		MensajesVendedores.insert(mensaje);
		toastr.success('Enviado correctamente.');
		this.mensaje = {};
		$('.collapse').collapse('hide');
		this.mensajeNuevo = true;
  }
  
  //Validar si tiene foto el vendedor
  this.tieneFoto = function(sexo, foto){
	  if(foto === undefined){
		  if(sexo === "masculino")
			  return "img/badmenprofile.jpeg";
			else if(sexo === "femenino"){
				return "img/badgirlprofile.jpeg";
			}else{
				return "img/badprofile.jpeg";
			}
	  }else{
		  return foto;
	  }
  };
};
