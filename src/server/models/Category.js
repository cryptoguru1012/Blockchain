var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Category Model
 * ==========
 */

var Category = new keystone.List('Category');

Category.add({
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

Category.defaultColumns = "Title, CategoryDescription";
Category.register();