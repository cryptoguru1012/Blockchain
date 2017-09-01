import axios from 'axios';

const imageRoutes = (app) => {
  app.post('/API/images/create', (req, res, next) => {
    axios
      .post('https://d3j22jloo6hpq6.cloudfront.net/API/upload', req.body)
      .then((response) => {
        res.json(response.data);
      })
      .catch((err) => {
        res.json(err);
      });
  });
};

export default imageRoutes;
