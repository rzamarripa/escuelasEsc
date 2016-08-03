angular
  .module('casserole')
  .controller('BitacoraCtrl', BitacoraCtrl);
 
function BitacoraCtrl($scope, $meteor, $reactive, $state, toastr) {
	$reactive(this).attach($scope);
	var self = this;

	self.perPage = 10;
    self.page = 1;
    self.sort = {
      fecha: -1
    };

	self.subscribe('bitacora',()=>{
		return [
		{
          limit: parseInt(self.perPage),
          skip: parseInt((self.getReactively('page') - 1) * self.perPage),
          sort: self.getReactively('sort')
        },
		{
			//seccion_id : Meteor.user() != undefined ? Meteor.user().profile.seccion_id : "",
			//usuario : self.getReactively("usuario_id")
			usuario:{$ne:null}
		}]
	});
  
	self.helpers({
			bitacoras : () => {
			  	return Bitacora.find({},{sort:self.getReactively('sort')});
		  	},
		  	bitacoraCount: () => {
		        return Counts.get('numberOfBitacora');
		    }
	});
	self.pageChanged = (newPage) => {
      	self.page = newPage;
    };
    self.hora = function(fecha){
    	//console.log(fecha)
    	var ahora = new Date();
    	var minuto = 60 * 1000;
    	var hora = minuto * 60;
    	var dia = hora * 24;
    	var anio = dia * 365;
    	var diferencia = ahora-fecha;
    	if(diferencia<minuto)
    		return "Hace menos de un minuto"
    	else if(diferencia<hora)
    		return "Hace "+Math.round(diferencia/minuto)+" minutos"
    	else if(diferencia<dia)
    		return "Hace "+Math.round(diferencia/hora)+" horas"
    	else if(diferencia<anio)
    		return "Hace "+Math.round(diferencia/dia)+" dias"
    	else
    		return "Hace mucho tiempo"

    }

};