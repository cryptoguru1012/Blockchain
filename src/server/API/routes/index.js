// Import here your routes. DO NOT CREATE ROUTE FILES OUTSIDE THIS FOLDER
// import ... from ...
import userRoutes from './users';
import storeRoutes from './store';
import offerRoutes from './offers';
import imageRoutes from './images';
import videoRoutes from './videos';

const apiRoutes = (app) => {
  // Use app here like you would in Express
  videoRoutes(app);
  imageRoutes(app);
  offerRoutes(app);
  userRoutes(app);
  storeRoutes(app);
};

export default apiRoutes;
