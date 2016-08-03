angular
  .module('casserole')
  .controller('BitacoraCtrl', BitacoraCtrl);
 
function BitacoraCtrl($scope, $meteor, $reactive, $state, toastr) {
	$reactive(this).attach($scope);
	var self = this;

	self.perPage = 10;
    self.page = 1;
    self.sort = {
      fecha: 1
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
		}]
	});
  
	self.helpers({
			bitacoras : () => {
			  	return Bitacora.find();
		  	},
		  	bitacoraCount: () => {
		        return Counts.get('numberOfBitacora');
		    }
	});
	self.pageChanged = (newPage) => {
      	self.page = newPage;
    };

};