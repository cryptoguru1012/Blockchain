var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Category Model
 * ==========
 */

var Category = new keystone.List('Category', {
    map: { 
        name: 'Name' 
    },
	autokey: { 
	    from: 'Name', 
	    path: 'key', 
	    unique: true
	},
});

Category.add({
    Name:{ 
        type: String, 
        required: true, 
        initial: true
    },
    CategoryDescription: { 
        type: Types.Html, 
        wysiwyg: true,
        initial: true 
    }
})

Category.defaultColumns = "Name, CategoryDescription";
Category.register();