const keystone = require('keystone');

const Types = keystone.Field.Types;

/**
 * Category Model
 * ==========
 */

const Offer = new keystone.List('Offer');

Offer.add({
  offer: { type: String },
  cert: { type: String, default: '' },
  txid: { type: String },
  expires_in: { type: Number },
  expires_on: { type: Number },
  expired: { type: Boolean },
  height: { type: String },
  time: { type: Date, default: Date.now() },
  category: { type: String },
  title: { type: String },
  quantity: { type: String },
  currency: { type: String },
  sysprice: { type: Number },
  price: { type: String },
  ismine: { type: Boolean },
  commission: { type: String },
  offerlink: { type: String },
  offerlink_guid: { type: String, default: '' },
  offerlink_seller: { type: String, default: '' },
  private: { type: String },
  safesearch: { type: String, default: '' },
  safetylevel: { type: Number, default: 0 },
  paymentoptions: { type: Number },
  paymentoptions_display: { type: String },
  alias_peg: { type: String },
  description: { type: String },
  alias: { type: String },
  address: { type: String },
  alias_rating: { type: Number, default: 0 },
  alias_rating_count: { type: Number, default: 0 },
  alias_rating_display: { type: String },
  geolocation: { type: String, default: '' },
  offers_sold: { type: Number, default: 0 },
});

Offer.defaultColumns = 'offer, description';
Offer.register();
