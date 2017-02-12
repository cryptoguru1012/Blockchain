var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User');

User.add({
	Name: { type: Types.Name, required: true, index: true, initial:false },
	Email: { type: Types.Email, initial: true, required: true, index: true },
	Password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {

	UserType: {type: Boolean, index: true}//1 to buyer, 0 to seller
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Registration
 */
User.defaultColumns = 'Name, Email, UserType';
User.register();
