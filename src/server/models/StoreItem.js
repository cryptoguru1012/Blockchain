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
        initial:true,
        index:true

    },
    Category:{ 
        type: String, 
        initial:true, 
        required: true,
        index:true
    },
    Price: { 
        type: Number, 
        required:true, 
        initial:true,
        index:true 
    },
    Quantity:{ 
        type: Number, 
        require:true, 
        initial:true 
    },
    Currency:{ 
        type: String,  
        require:true, 
        initial:true 
    },
    PaymentOptions: { 
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
    Certificate: {
        type: Boolean    
    },
    ItemDescription: { type:String }

})

StoreItem.defaultColumns = "Title, Category, Price, ItemDescription";
StoreItem.register();