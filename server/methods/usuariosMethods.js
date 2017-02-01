Meteor.methods({
  createUsuario: function (usuario, rol) {
  	usuario.contrasena = Math.random().toString(36).substring(2,7);
	  profile = {
				email: usuario.correo,
				nombre: usuario.nombre,
				apellidos: usuario.apPaterno + " " + usuario.apMaterno,
				nombreCompleto : usuario.nombre  + " " + usuario.apPaterno + " " + (usuario.apMaterno ? usuario.apMaterno : ""),
				fotografia : usuario.fotografia,
				estatus:true,
				campus_id : usuario.campus_id,
				seccion_id : usuario.seccion_id
			}
		if(usuario.maestro_id != undefined)
		profile.maestro_id = usuario.maestro_id;
		
		var usuario_id = Accounts.createUser({
			username: usuario.nombreUsuario,
			password: usuario.contrasena,			
			profile: profile
		});

		Roles.addUsersToRoles(usuario_id, rol);

    Meteor.call('sendEmail',
			profile.email,
			'sistema@casserole.edu.mx',
			'Bienvenido a Casserole',
			'Usuario: '+ usuario.nombreUsuario + ' contraseña: '+ usuario.contrasena
		);
		return usuario_id;
	},
	sendEmail: function (to, from, subject, text) {
    this.unblock();
    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    });
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
	  Meteor.users.update({_id: user._id}, {$set:{
			username: usuario.username,
			roles: [rol],
			profile: usuario.profile
		}});
		
		Accounts.setPassword(user._id, usuario.password, {logout: false});		
	},
});