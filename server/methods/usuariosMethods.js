Meteor.methods({
  createUsuario: function (usuario, rol) {
	  console.log(usuario);
	  console.log(rol);
	  profile = {
				email: usuario.correo,
				nombre: usuario.nombre,
				apellidos: usuario.apPaterno + " " + usuario.apMaterno,
				nombreCompleto : usuario.nombre  + " " + usuario.apPaterno + " " + (usuario.apMaterno ? usuario.apMaterno : ""),
				fotografia : usuario.fotografia,
				estatus:true
			}
		if(usuario.maestro_id != undefined)
			profile.maestro_id = usuario.maestro_id;
		
		var usuario_id = Accounts.createUser({
			username: usuario.nombreUsuario,
			password: usuario.contrasena,			
			profile: profile
		});
		
		Roles.addUsersToRoles(usuario_id, rol);
		
	},
	userIsInRole: function(usuario, rol, grupo, vista){
		if (!Roles.userIsInRole(usuario, rol, grupo)) {
	    throw new Meteor.Error(403, "Usted no tiene permiso para entrar a " + vista);
	  }
	},
	updateUsuario: function (usuario, id, rol) {
		
	  var user = Meteor.users.findOne({"_id" : id});
	  console.log(user);
	  console.log(usuario.nombreUsuario);
	  Meteor.users.update({_id: user._id}, {$set:{
			username: usuario.nombreUsuario,
			roles: [rol],
			profile: {
				email: usuario.correo,
				nombre: usuario.nombre,
				apellidos: usuario.apPaterno + " " + usuario.apMaterno,
				nombreCompleto : usuario.nombre  + " " + usuario.apPaterno + " " + usuario.apMaterno,
				fotografia : usuario.fotografia,
				empleado_id : id
			}
		}});
		
		Accounts.setPassword(id, usuario.contrasena, {logout: false});		
	},
	createGerenteVenta: function (usuario, rol) {
	  console.log(usuario.profile);
	  console.log(rol);
	  
		if(usuario.maestro_id != undefined)
			profile.maestro_id = usuario.maestro_id;
		
		var usuario_id = Accounts.createUser({
			username: usuario.username,
			password: usuario.password,			
			profile: usuario.profile
		});
		
		Roles.addUsersToRoles(usuario_id, rol);
		
	},
	updateGerenteVenta: function (usuario, rol) {		
	  var user = Meteor.users.findOne({"_id" : usuario._id});
	  console.log(user._id);
	  console.log(usuario.username);
	  Meteor.users.update({_id: usuario._id}, {$set:{
			username: usuario.username,
			roles: [rol],
			profile: usuario.profile
		}});
		
		Accounts.setPassword(usuario._id, usuario.password, {logout: false});		
	},
});