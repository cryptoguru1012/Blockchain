import OfferController from '../controllers/store/OfferController';
import RequestManager from '../utils/RequestManager';
import axios from 'axios';

const offerRoutes = (app) => {
  app.get('/API/offers', (req, res, next) => {
    axios
      .get(
        'https://d2fzm6xoa70bg8.cloudfront.net/login?auth=e4031de36f45af2172fa8d0f054efcdd8d4dfd62',
      )
      .then((response) => {
        axios
          .get('https://d2fzm6xoa70bg8.cloudfront.net/offerfilter?', {
            headers: { Token: response.data.token },
          })
          .then((response) => {
            const { data } = response;

            const items = data.map((item, i) => {
              OfferController.findOne({ offer: item.offer }, (err, result) => {
                if (err) {
                  return next(err);
                }
                if (result) {
                  console.log('Offer exist');

                  return;
                }
                if (!result) {
                  console.log('Offer created');

                  const params = {
                    offer: item.offer,
                    cert: item.cert,
                    txid: item.txid,
                    expires_in: item.expires_in,
                    expires_on: item.expires_on,
                    expired: item.expired,
                    height: item.height,
                    time: item.time,
                    category: item.category,
                    title: item.title,
                    quantity: item.quantity,
                    currency: item.currency,
                    sysprice: item.sysprice,
                    price: item.price,
                    ismine: item.ismine,
                    commission: item.commission,
                    offerlink: item.offerlink,
                    offerlink_guid: item.offerlink_guid,
                    offerlink_seller: item.offerlink_seller,
                    private: item.private,
                    safesearch: item.safesearch,
                    safetylevel: item.safetylevel,
                    paymentoptions: item.paymentoptions,
                    paymentoptions_display: item.paymentoptions_display,
                    alias_peg: item.alias_peg,
                    description: item.description,
                    alias: item.description,
                    address: item.address,
                    alias_rating: item.alias_rating,
                    alias_rating_count: item.alias_rating_count,
                    alias_rating_display: item.alias_rating_display,
                    geolocation: item.geolocation,
                    offers_sold: item.offers_sold,
                  };
                  OfferController.create(params, (err, result) => {
                    if (err) {
                      return next(err);
                    }

                    return result;
                  });
                }
              });
            });

            res.json(items);
          })
          .catch((err) => {
            console.log('err 2nd request', err);
            res.json({
              confirmation: 'fail after 2nd request',
              message: err,
            });
          });
      })
      .catch((err) => {
        console.log('err 1st request');
        res.json({
          confirmation: 'fail before 2nd request',
          message: err,
        });
      });
    // RequestManager.get(
    //   'https://d2fzm6xoa70bg8.cloudfront.net/login?auth=e4031de36f45af2172fa8d0f054efcdd8d4dfd62', null,
    //   (err, response) => {
    //     if (err) {
    //       res.json({
    //         confirmation: 'fail',
    //         message: err,
    //       });
    //     }
    //
    //     console.log(response);
    //     res.json({
    //       confirmation: 'success',
    //       message: response,
    //     });
    //   },
    // );
  });
};
export default offerRoutes;
