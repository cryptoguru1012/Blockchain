var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * StoreItem Model
 * ==========
 */

var StoreItem = new keystone.List('StoreItem');

StoreItem.add({
	name:{ 
		type: String, 
		required: true, 
		initial:true,
		index:true

	},
	category:{ 
		type: Types.Relationship,
		ref: "Category",  
		initial:true, 
		required: true,
		index:true
	},
	price: { 
		type: Number, 
		required:true, 
		initial:true,
		index:true 
	},

	currency:{ 
		type: Types.Select,
		options: 
			[
				{value: "USD", label: "USD"}, 
				{value: "EUR", label:"EUR" }
			],  
		require:true, 
		initial:true 
	},
	paymentOptions: { 
		type: Types.Select, 
		numeric: true, 
		options: 
			[
				{value: 1, label: "Paypal"}, 
				{value: 2, label:"Credit Card" }, 
				{value: 3, label: "Bitcoin"}
			],
		required: true,
		initial:true 
	},
	certificate: {
		type: Boolean    
	},
	itemDescription: { 
		type: Types.Html, 
		wysiwyg: true,
		initial: true 
	}

})

StoreItem.defaultColumns = "name, category, price, itemDescription";
StoreItem.register();