var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Categories Model
 * ==========
 */

var Categories = new keystone.List('Categories');

Categories.add({
    Title:{ 
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

Categories.defaultColumns = "Title, CategoryDescription";
Categories.register();