var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User');

User.add({
	name: { 
		type: Types.Name, 
		required: true, 
		index: true 
	},
	email: { 
		type: Types.Email, 
		initial: true, 
		required: true, 
		index: true 
	},
	password: { 
		type: Types.Password, 
		initial: true, 
		required: true 
	},
}, 'Permissions', {
	isAdmin: { 
		type: Boolean, 
		label: 'Can access Keystone', 
		index: true 
	},
	userType: {
		type: Types.Select, 
		index: true, 
		options: [
			{ value:"Seller", label: "Seller" }, 
			{ value: "Buyer", label: "Buyer" }
		],
		required:true, 
		initial:true
	}//Seller or Buyer
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Registration
 */
User.defaultColumns = 'name, email, isAdmin';
User.register();
