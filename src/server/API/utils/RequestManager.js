import axios from 'axios';

export default {
  get: (url, params, callback) => {
    axios
      .get(url, params)
      .then((response) => {
        callback(null, response);
      })
      .catch((err) => {
        callback(err, null);
      });
  },
};
