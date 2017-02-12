var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Sales Model
 * ==========
 */

var Sales = new keystone.List('Sales');

Sales.add({
    SaleDate: {type: Types.Date, require: true, index:true, yearRange:[1990, 2099], default: Date.now},
    Items: {type: Types.Relationship, ref: 'StoreItem', many: true, required: true, initial:false},
    Seller: {type: Types.Relationship, ref: 'User', required: true, initial:false, index:true},
    Total: {type: Types.Money, currency:"USD"},
    Buyer: {type: Types.Relationship, ref: "User", required: true, initial:false, index:true}
})

Sales.defaultColumns = "SaleDate, Seller, Total, Buyer";
Sales.register();