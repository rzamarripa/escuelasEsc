Meteor.startup(function () {
  if (Meteor.users.find().count() === 0) {
    var usuario_id = Accounts.createUser({
      username: 'zama',
      password: '123',
      profile : {
	      nombre: 'Roberto Zamarripa'
      }
    });
    
    Roles.addUsersToRoles(usuario_id, 'admin');
  }
});