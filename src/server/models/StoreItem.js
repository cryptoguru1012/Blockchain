var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * StoreItem Model
 * ==========
 */

var StoreItem = new keystone.List('StoreItem');

StoreItem.add({
    Title:{ 
        type: String, 
        required: true, 
        initial:false,
        index:true

    },
    Category:{ 
        type: Number, 
        initial:false, 
        required: true,
        index:true
    },
    Price: { 
        type: Types.Money, 
        currency: "USD", 
        required:true, 
        initial:false,
        index:true 
    },
    Quantity:{ 
        type: Number, 
        require:true, 
        initial:false 
    },
    Currency:{ 
        type: Types.Money, 
        currency: "USD", 
        require:true, 
        initial:false 
    },
    PaymentOptions: { 
        type: Types.Select, 
        numeric: true, 
        options: 
            [{value: 1, label: "Paypal"}, 
            [{ value:2, label:"Credit Card" }], 
            [{ value: 3, label: "Bitcoin"}]] 
    },
    Certificate: {
        type: Boolean    
    },
    ItemDescription: { type:String }

})

StoreItem.defaultColumns = "Title, Category, Price, ItemDescription";
StoreItem.register();