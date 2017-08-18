const keystone = require('keystone');

const Types = keystone.Field.Types;

/**
 * StoreItem Model
 * ==========
 */

const StoreItem = new keystone.List('StoreItem');

StoreItem.add({
  name: {
    type: String,
    required: true,
    initial: true,
    index: true,
  },
  publishedDate: {
    type: Types.Date,
    default: Date.now(),
  },
  publisher: {
    type: Types.Relationship,
    ref: 'User',
    initial: true,
    required: true,
    index: true,
  },
  category: {
    type: Types.Relationship,
    ref: 'Category',
    initial: true,
    required: true,
    index: true,
  },
  price: {
    type: Number,
    required: true,
    initial: true,
    index: true,
  },
  currency: {
    type: Types.Select,
    options: 'BTC, USD, EUR',
    require: true,
    initial: true,
  },
  paymentOptions: {
    type: Types.Select,
    options: 'SYS',
    required: true,
    initial: true,
  },
  certificate: {
    type: Boolean,
  },
  itemDescription: {
    type: Types.Html,
    wysiwyg: true,
    initial: true,
  },
  productVideo: {
    type: Types.S3File,
  },
});


StoreItem.defaultColumns = 'name, category, price, itemDescription';
StoreItem.register();

