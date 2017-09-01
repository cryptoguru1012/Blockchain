import OfferController from '../controllers/store/OfferController';
import RequestManager from '../utils/RequestManager';
import axios from 'axios';
import geolib from 'geolib';

const offerRoutes = (app) => {
  app.get('/API/offers', (req, res, next) => {
    OfferController.find(null, (err, results) => {
      if (err) {
        res.json(err);

        return;
      }

      res.json(results);
    });
  });

  app.get('/API/offers/sort', (req, res, next) => {
    const { btc, sys, zec, currency, name, geolocation, category } = req.query;

    const params = {},
      symbols = [];

    btc == 'true'
      ? symbols.push('BTC')
      : {
        ...params,
      };
    sys == 'true'
      ? symbols.push('SYS')
      : {
        ...params,
      };
    zec == 'true'
      ? symbols.push('ZEC')
      : {
        ...params,
      };

    if ((category != 'Z-A' || 'A-Z') && category) {
      params.category = category;
    }

    params.paymentoptions_display = new RegExp(symbols.join('|'), 'i');

    OfferController.find(params, (err, results) => {
      if (err) {
        res.json(err);
        return;
      }

      const newResults = results;

      if (category == 'A-Z') {
        newResults.sort((a, b) => {
          const x = a.category.toLowerCase();
          const y = b.category.toLowerCase();
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        });
        res.json(newResults);
        return;
      }
      if (category == 'Z-A') {
        newResults.sort((a, b) => {
          const x = a.category.toLowerCase();
          const y = b.category.toLowerCase();
          if (x < y) {
            return 1;
          }
          if (x > y) {
            return -1;
          }
          return 0;
        });
        res.json(newResults);
        return;
      }
      if (currency == 'currencyLow') {
        newResults.sort((a, b) => a.price - b.price);
        res.json(newResults);
        return;
      }

      if (currency == 'currencyHigh') {
        newResults.sort((a, b) => b.price - a.price);
        res.json(newResults);
        return;
      }

      if (name == 'nameHigh') {
        newResults.sort((a, b) => {
          const x = a.title.toLowerCase();
          const y = b.title.toLowerCase();
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        });
        res.json(newResults);
        return;
      }
      if (name == 'nameLow') {
        newResults.sort((a, b) => {
          const x = a.title.toLowerCase();
          const y = b.title.toLowerCase();
          if (x < y) {
            return 1;
          }
          if (x > y) {
            return -1;
          }
          return 0;
        });
        res.json(newResults);
        return;
      }

      if (geolocation !== undefined && (geolocation === 'Nearest' || 'Furthest')) {
        const locations = [];
        const coords = {
          latitude: '',
          longitude: '',
        };

        newResults.map((value, i) => {
          const newGeoArr = value.geolocation.split(',');
          const finalGeoArray = [];
          newGeoArr.map((item) => {
            finalGeoArray.push(item.trim());
          });
          const coordsObj = Object.assign({}, coords);
          if (finalGeoArray.length <= 1 || finalGeoArray === '') {
            coordsObj.latitude = 0;
            coordsObj.longitude = 0;
            locations.push(coordsObj);
            return;
          }
          coordsObj.latitude = finalGeoArray[0];
          coordsObj.longitude = finalGeoArray[1];
          locations.push(coordsObj);
        });

        const newLocations = locations.reduce(
          (acc, cur, i) => ({
            ...acc,
            [i]: cur,
          }),
          {},
        );

        const currentLocation = {};

        axios
          .get('http://ip-api.com/json')
          .then((response) => {
            const { data } = response;
            currentLocation.latitude = data.lat;
            currentLocation.longitude = data.lon;
            const distance = geolib.orderByDistance(currentLocation, newLocations);

            distance.map((distanceValue, i) => {
              newResults[distanceValue.key].distanceFromUser = distanceValue.distance / 1609.34;

              if (newResults[distanceValue.key].geolocation.length < 1) {
                newResults[distanceValue.key].distanceFromUser = undefined;
              }
            });

            if (geolocation === 'Furthest') {
              newResults.sort(
                (a, b) =>
                  (b.distanceFromUser == undefined) - (a.distanceFromUser == undefined) ||
                  b.distanceFromUser - a.distanceFromUser,
              );
              res.json(newResults);
              return;
            }

            newResults.sort(
              (a, b) =>
                (a.distanceFromUser == undefined) - (b.distanceFromUser == undefined) ||
                a.distanceFromUser - b.distanceFromUser,
            );

            res.json(newResults);
          })
          .catch((err) => {
            console.error(err);
          });
      }
      res.json(newResults);
    });
  });

  app.get('/API/offers/new', (req, res, next) => {
    axios
      .get(
        'https://d2fzm6xoa70bg8.cloudfront.net/login?auth=e4031de36f45af2172fa8d0f054efcdd8d4dfd62',
      )
      .then((response) => {
        axios
          .get('https://d2fzm6xoa70bg8.cloudfront.net/offerfilter?', {
            headers: {
              Token: response.data.token,
            },
          })
          .then((response) => {
            const { data } = response;

            const items = data.map((item, i) => {
              OfferController.findOne(
                {
                  offer: item.offer,
                },
                (err, result) => {
                  if (err) {
                    return next(err);
                  }
                  if (result) {

                    return;
                  }
                  if (!result) {

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
                },
              );
            });

            res.json(items);
          })
          .catch((err) => {
            console.error('err 2nd request', err);
            res.json({
              confirmation: 'fail after 2nd request',
              message: err,
            });
          });
      })
      .catch((err) => {
        console.error('err 1st request');
        res.json({
          confirmation: 'fail before 2nd request',
          message: err,
        });
      });
  });

  app.post('/API/offers/new', (req, res, next) => {
    OfferController.findOne(
      {
        offer: req.body.offer,
      },
      (err, result) => {
        if (err) {
          return next(err);
        }

        if (result) {
          res.json({
            confirmation: 'fail',
            message: 'Offer already exist',
          });

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
                  headers: {
                    Token: token,
                  },
                })
                .then((response) => {
                  res.json({
                    response: response.data,
                  });
                })
                .catch((err) => {
                  res.json({
                    err,
                  });
                });
            })
            .catch((err) => {
              res.json({
                err,
              });
            });
        }
      },
    );
  });

  app.put('/API/offers/edit', (req, res, next) => {
    const url =
      'https://d2fzm6xoa70bg8.cloudfront.net/login?auth=e4031de36f45af2172fa8d0f054efcdd8d4dfd62';
    axios
      .get(url)
      .then((response) => {
        axios
          .post('https://d2fzm6xoa70bg8.cloudfront.net/offerupdate', req.body, {
            headers: {
              Token: response.data.token,
            },
          })
          .then((response) => {
            OfferController.update(
              {
                offer: response.data.offer,
              },
              response.data,
              (err, result) => {
                if (err) {
                  res.json({
                    confirmation: 'fail',
                    message: err,
                  });

                  return;
                }

                res.json({
                  confirmation: 'success',
                  result,
                });
              },
            );
          })
          .catch((err) => {
            console.error('err', err);
            res.json({
              error: err,
            });
          });
      })
      .catch((err) => {
        res.json({
          err,
        });
      });
  });

  app.get('/API/offers/pagination', (req, res, next) => {
    const position = req.query.position;
    const pageSize = req.query.number;

    OfferController.sort(null, position, pageSize, (err, results) => {
      if (err) {
        res.json(err);
        return;
      }

      res.json(results);
    });
  });

  app.get('/API/offers/:id', (req, res, next) => {
    OfferController.findOne(
      {
        _id: req.params.id,
      },
      (err, result) => {
        if (err) {
          res.json({
            confirmation: 'fail',
            message: err,
          });

          return;
        }

        res.json({
          confirmation: 'success',
          result,
        });
      },
    );
  });

  app.get('/API/offers/search/:id', (req, res, next) => {
    const regx = {
      $regex: req.params.id,
    };

    const query = {
      $or: [
        {
          title: regx,
        },
        {
          description: regx,
        },
        {
          alias: regx,
        },
      ],
    };

    OfferController.find(query, (err, result) => {
      if (err) {
        res.json({
          confirmation: 'fail',
          message: err,
        });

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
