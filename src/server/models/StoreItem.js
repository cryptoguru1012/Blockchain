var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * StoreItem Model
 * ==========
 */

var StoreItem = new keystone.List('StoreItem');

StoreItem.add({
    name:{ type: String, required: true },
    type:{ type: Number, initial:false, required: true },
    description: { type:String },
    price: { type: Types.Money, currency: "USD", required:true, initial:false },
    createBy: {type: Types.Relationship, ref: 'User'}
})

StoreItem.defaultColumns = "name, type, description, price, createBy";
StoreItem.register();