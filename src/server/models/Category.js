const keystone = require('keystone');

const Types = keystone.Field.Types;

/**
 * Category Model
 * ==========
 */

const Category = new keystone.List('Category', {
  map: {
    name: 'name',
  },
  autokey: {
    from: 'name',
    path: 'key',
    unique: true,
  },
});

Category.add({
  name: {
    type: String,
    required: true,
    initial: true,
  },
  categoryDescription: {
    type: Types.Html,
    wysiwyg: true,
    initial: true,
  },
});

Category.defaultColumns = 'name, categoryDescription';
Category.register();
