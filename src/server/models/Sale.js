var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Sales Model
 * ==========
 */

var Sales = new keystone.List('Sales');

Sales.add({
    saleDate: {type: Types.Date, require: true, index:true, yearRange:[1990, 2099], default: Date.now},
    items: {type: Types.Relationship, ref: 'StoreItem', many: true, required: true, initial:false},
    seller: {type: Types.Relationship, ref: 'User', required: true, initial:false},
    total: {type: Types.Money, currency:"USD"},
    buyer: {type: Types.Relationship, ref: "User", required: true, initial:false}
})

Sales.defaultColumns = "saleDate, seller, total, buyer";
Sales.register();