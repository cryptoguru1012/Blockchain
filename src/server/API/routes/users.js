import createUser from '../controllers/users/create_user';

const userRoutes = (app) => {
  app.post('/API/user', (req, res, next) => {
    createUser(req.body, (err, result) => {
      if (err) {
        return next(err);
      }

      return res.status(result.status).send(result);
    });
  });
};

export default userRoutes;
