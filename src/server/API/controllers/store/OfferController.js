import keystone from 'keystone';

const Offer = keystone.list('Offer').model;

module.exports = {
  find(params, callback) {
    Offer.find(params, (err, offers) => {
      if (err) {
        callback(err, null);
        return;
      }

      callback(null, offers);
    });
  },

  findById(id, callback) {
    Offer.findById(id, (err, offer) => {
      if (err) {
        callback(err, null);
        return;
      }

      callback(null, offer);
    });
  },

  findOne(params, callback) {
    Offer.findOne(params, (err, offer) => {
      if (err) {
        callback(err, null);
        return;
      }

      callback(null, offer);
    });
  },

  create(params, callback) {
    Offer.create(params, (err, offer) => {
      if (err) {
        callback(err, null);
        return;
      }

      callback(null, offer);
    });
  },

  update(foundOne, params, callback) {
    Offer.findOneAndUpdate(foundOne, params, { new: true }, (err, offer) => {
      if (err) {
        callback(err, null);
        return;
      }

      callback(null, offer);
    });
  },

  sort(params, pageStart, pageSize, callback) {
    Offer.find(params, (err, offers) => {
      if (err) {
        callback(err, null);
        return;
      }

      const offerArray = offers;
      const endNumber = Number(pageSize) + Number(pageStart);

      callback(null, offerArray.slice(Number(pageStart), endNumber));
    });
  },
};
