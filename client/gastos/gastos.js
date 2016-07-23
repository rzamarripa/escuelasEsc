angular
  .module('casserole')
  .controller('GastosCtrl', GastosCtrl);
 
function GastosCtrl($scope, $meteor, $reactive, $state, toastr) {
	$reactive(this).attach($scope);
  this.tipoGasto = 'cheques';
  this.gasto = {};
  this.gasto.fechaLimite = new Date();
  semanaActual = moment(new Date()).isoWeek();
  console.log(semanaActual);
  this.subscribe('gastos', () => {
    return [{tipoGasto: this.getReactively('tipoGasto'), campus_id: Meteor.user() != undefined ? Meteor.user().profile.campus_id : ''}];
  });

  this.subscribe('conceptosGasto', () => {
    return [{estatus: true, tipoGasto: this.getReactively('tipoGasto'), campus_id: Meteor.user() != undefined ? Meteor.user().profile.campus_id : ''}];
  });

  this.helpers({
		gastos : () => {
			return Gastos.find();
		},
    conceptos : () =>{
      return ConceptosGasto.find()
    }
  });

  this.cambiar = function(tipoGasto){
    this.tipoGasto = tipoGasto;
    this.gasto = {};
  }

  this.guardar = function(gasto, form){
    if(form.$invalid){
      toastr.error('error.');
      return;
    }
    gasto.campus_id = Meteor.user().profile.campus_id;
    gasto.tipoGasto = this.tipoGasto;
    Gastos.insert(gasto);
    form.$setPristine();
    form.$setUntouched();
    this.gasto = {}; 
    $('.collapse').collapse('hide');
    return toastr.success('Guardado correctamente');
  }

  this.guardarConcepto = function(concepto, form){
    if(form.$invalid){
      toastr.error('error.');
      return;
    }
    concepto.campus_id = Meteor.user().profile.campus_id;
    concepto.tipoGasto = this.tipoGasto;
    concepto.estatus = true;
    ConceptosGasto.insert(concepto);
    this.concepto = {}; 
    form.$setPristine();
    form.$setUntouched();
    return toastr.success('Guardado correctamente');
  }

  this.getConcepto = function(concepto_id){
    concepto = ConceptosGasto.findOne(concepto_id);
    if(concepto != undefined)
      return concepto.codigo + " | " + concepto.nombre;
  }

  this.sum = function(){
    var sum = _.reduce(this.gastos, function(memo, gasto){ return memo + gasto.importe; },0);
    return sum
  }
};