var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Sales Model
 * ==========
 */

var Sale = new keystone.List('Sale');

Sale.add({
	saleDate: {
		type: Types.Date, 
		require: true,
		initial: true, 
		index:true, 
		yearRange:[1990, 2099], 
		default: Date.now
	},
	items: {
		type: Types.Relationship, 
		ref: 'StoreItem', 
		many: true, 
		required: true, 
		initial:true
	},
	quantity:{ 
		type: Number, 
		require:true, 
		initial:true 
	},
	seller: {
		type: Types.Relationship, 
		ref: 'User', 
		required: true, 
		initial:true, 
		index:true

	},
	total: {
		type: Number,
		required:true,
		initial:true
	},
	buyer: {
		type: Types.Relationship, 
		ref: "User", 
		required: true, 
		initial:true, 
		index:true
	}
})

Sale.defaultColumns = "saleDate, seller, total, buyer";
Sale.register();