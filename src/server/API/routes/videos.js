import axios from 'axios';

const videoRoutes = (app) => {
  app.post('/API/videos/create', (req, res, next) => {
    axios
      .post('https://d3j22jloo6hpq6.cloudfront.net/API/parse', req.body)
      .then((response) => {
        res.json(response.data);
      })
      .catch((err) => {
        res.json(err);
      });
  });
};

export default videoRoutes;
