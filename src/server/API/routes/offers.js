import OfferController from '../controllers/store/OfferController';
import RequestManager from '../utils/RequestManager';
import axios from 'axios';

const offerRoutes = (app) => {
  app.get('/API/offers', (req, res, next) => {
    OfferController.find(null, (err, results) => {
      if (err) {
        res.json({ confirmation: 'fail', message: err });

        return;
      }

      res.json({
        confirmation: 'success',
        results,
      });
    });
  });

  app.get('/API/offers/sort', (req, res, next) => {
    const { title, price, quantity, currency } = req.query;
    const newItems = Object.assign([], req.query);
    console.log(title, price, quantity, currency);
    console.log(newItems);
  });

  app.get('/API/offers/new', (req, res, next) => {
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
  });

  app.post('/API/offers/new', (req, res, next) => {
    OfferController.findOne({ offer: req.body.offer }, (err, result) => {
      if (err) {
        return next(err);
      }

      if (result) {
        res.json({ confirmation: 'fail', message: 'Offer already exist' });

        return;
      }

      if (!result) {
        const guid = '';
        let token = '';
        const url =
          'https://d2fzm6xoa70bg8.cloudfront.net/login?auth=e4031de36f45af2172fa8d0f054efcdd8d4dfd62';
        axios
          .get(url)
          .then((response) => {
            token = response.data.token;
            axios
              .post('https://d2fzm6xoa70bg8.cloudfront.net/offernew', req.body, {
                headers: { Token: token },
              })
              .then((response) => {
                res.json({ response: response.data });

                // axios
                //   .get('https://d2fzm6xoa70bg8.cloudfront.net/offerinfo?guid=05e851339e6ef25d', {
                //     headers: { Token: token },
                //   })
                //   .then((response) => {
                //     console.log('guidr', guid);
                //     console.log('tokenr', token);
                //     // console.log('response', response);
                //     res.json(response.data);
                //   })
                //   .catch((err) => {
                //     console.log('guide', guid);
                //     console.log('tokene', token);
                //     console.log('err', err);
                //     res.json('err', err);
                //   });
                // if (response.status == 200 && response.data) {
                //   OfferController.create(req.body, (err, result) => {
                //     if (err) {
                //       return next(err);
                //     }
                //
                //     res.json({
                //       confirmation: 'success',
                //       result,
                //     });
                //   });
                // }
              })
              .catch((err) => {
                res.json({ err });
              });
          })
          .catch((err) => {
            res.json({ err });
          });
      }
    });
  });

  app.put('/API/offers/edit', (req, res, next) => {
    const url =
      'https://d2fzm6xoa70bg8.cloudfront.net/login?auth=e4031de36f45af2172fa8d0f054efcdd8d4dfd62';
    axios
      .get(url)
      .then((response) => {
        axios
          .post('https://d2fzm6xoa70bg8.cloudfront.net/offerupdate', req.body, {
            headers: { Token: response.data.token },
          })
          .then((response) => {
            OfferController.update({ offer: response.data.offer }, response.data, (err, result) => {
              if (err) {
                res.json({ confirmation: 'fail', message: err });

                return;
              }

              res.json({
                confirmation: 'success',
                result,
              });
            });
          })
          .catch((err) => {
            console.log('err', err);
            res.json({ error: err });
          });
      })
      .catch((err) => {
        res.json({ err });
      });
  });

  app.get('/API/offers/pagination', (req, res, next) => {
    const position = req.query.position;
    const pageSize = req.query.number;

    console.log('position', position, 'pageSize', pageSize);

    OfferController.sort(null, position, pageSize, (err, results) => {
      if (err) {
        res.json(err);
        return;
      }

      res.json(results);
    });
  });

  app.get('/API/offers/:id', (req, res, next) => {
    OfferController.findOne({ _id: req.params.id }, (err, result) => {
      if (err) {
        res.json({ confirmation: 'fail', message: err });

        return;
      }

      res.json({
        confirmation: 'success',
        result,
      });
    });
  });
};
export default offerRoutes;
